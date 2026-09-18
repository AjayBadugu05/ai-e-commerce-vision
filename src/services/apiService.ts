import { PRODUCTS, Product, CATEGORIES, Category } from '../data/products';
import { sanitizeSearchQuery } from '../lib/sanitizer';

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export class ApiService {
  /**
   * Fetch all products from catalog with zero-cost offline fallback.
   */
  static async getProducts(): Promise<ApiResponse<Product[]>> {
    try {
      return {
        data: PRODUCTS,
        error: null,
        status: 200,
      };
    } catch (err) {
      return {
        data: [],
        error: err instanceof Error ? err.message : 'Failed to fetch catalog',
        status: 500,
      };
    }
  }

  /**
   * Fetch single product by ID.
   */
  static async getProductById(id: string): Promise<ApiResponse<Product>> {
    try {
      const product = PRODUCTS.find((p) => p.id === id);
      if (!product) {
        return { data: null, error: `Product '${id}' not found`, status: 404 };
      }
      return { data: product, error: null, status: 200 };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : 'Error fetching product',
        status: 500,
      };
    }
  }

  /**
   * Query catalog by search text with sanitization.
   */
  static async searchProducts(query: string): Promise<ApiResponse<Product[]>> {
    try {
      const clean = sanitizeSearchQuery(query).toLowerCase();
      if (!clean) {
        return { data: PRODUCTS, error: null, status: 200 };
      }
      const matches = PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(clean) ||
          p.tagline.toLowerCase().includes(clean) ||
          p.category.toLowerCase().includes(clean)
      );
      return { data: matches, error: null, status: 200 };
    } catch (err) {
      return {
        data: [],
        error: err instanceof Error ? err.message : 'Search error',
        status: 500,
      };
    }
  }

  /**
   * Fetch categories list.
   */
  static async getCategories(): Promise<ApiResponse<Category[]>> {
    return {
      data: CATEGORIES,
      error: null,
      status: 200,
    };
  }
}
