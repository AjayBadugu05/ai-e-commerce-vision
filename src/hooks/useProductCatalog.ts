import { useState, useMemo } from 'react';
import { Product, PRODUCTS } from '../data/products';
import { sanitizeSearchQuery } from '../lib/sanitizer';

export type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';

export interface UseProductCatalogOptions {
  initialCategory?: string;
  initialSort?: SortOption;
  productsPerPage?: number;
}

export function useProductCatalog(options: UseProductCatalogOptions = {}) {
  const {
    initialCategory = 'All',
    initialSort = 'featured',
    productsPerPage = 8,
  } = options;

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>(initialSort);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150000]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [onlySale, setOnlySale] = useState<boolean>(false);

  const categories = useMemo(() => {
    const set = new Set<string>();
    set.add('All');
    PRODUCTS.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, []);

  const maxPrice = useMemo(() => {
    return Math.max(...PRODUCTS.map((p) => p.price), 150000);
  }, []);

  const filteredProducts = useMemo(() => {
    const sanitizedQuery = sanitizeSearchQuery(searchQuery).toLowerCase();

    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (sanitizedQuery) {
        const matchesName = product.name.toLowerCase().includes(sanitizedQuery);
        const matchesTagline = product.tagline.toLowerCase().includes(sanitizedQuery);
        const matchesBrand = product.brand.toLowerCase().includes(sanitizedQuery);
        const matchesCategory = product.category.toLowerCase().includes(sanitizedQuery);
        if (!matchesName && !matchesTagline && !matchesBrand && !matchesCategory) {
          return false;
        }
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // In stock filter
      if (onlyInStock && product.stock <= 0) {
        return false;
      }

      // Sale filter
      if (onlySale && !product.isSale) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortOption) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'featured':
        default:
          return b.aiMatchScore - a.aiMatchScore;
      }
    });
  }, [selectedCategory, searchQuery, priceRange, sortOption, onlyInStock, onlySale]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage) || 1;

  const paginatedProducts = useMemo(() => {
    const startIdx = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIdx, startIdx + productsPerPage);
  }, [filteredProducts, currentPage, productsPerPage]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortOption('featured');
    setPriceRange([0, maxPrice]);
    setCurrentPage(1);
    setOnlyInStock(false);
    setOnlySale(false);
  };

  return {
    products: paginatedProducts,
    totalProducts: filteredProducts.length,
    allProducts: PRODUCTS,
    categories,
    selectedCategory,
    setSelectedCategory: (cat: string) => {
      setSelectedCategory(cat);
      setCurrentPage(1);
    },
    searchQuery,
    setSearchQuery: (q: string) => {
      setSearchQuery(q);
      setCurrentPage(1);
    },
    sortOption,
    setSortOption,
    priceRange,
    setPriceRange,
    maxPrice,
    currentPage,
    setCurrentPage,
    totalPages,
    onlyInStock,
    setOnlyInStock,
    onlySale,
    setOnlySale,
    resetFilters,
  };
}
