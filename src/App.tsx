import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { UserProvider } from "@/contexts/UserContext";
import { ThemeProvider } from "@/hooks/useTheme";
import { NeumorphicBackground } from "@/components/layout/NeumorphicBackground";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

// Lazy-loaded route components for optimal bundle splitting and performance
const Index = lazy(() => import("./pages/Index"));
const Shop = lazy(() => import("./pages/Shop"));
const Categories = lazy(() => import("./pages/Categories"));
const Deals = lazy(() => import("./pages/Deals"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-neu-flat">
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 neu-concave rounded-full flex items-center justify-center p-3 animate-spin-slow">
        <div className="w-full h-full rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
      </div>
      <p className="font-mono text-xs tracking-widest uppercase text-neu-muted animate-pulse">
        Loading AETHER Vision...
      </p>
    </div>
  </div>
);

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <UserProvider>
            <WishlistProvider>
              <CartProvider>
                <NeumorphicBackground />
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/categories" element={<Categories />} />
                      <Route path="/categories/:id" element={<Shop />} />
                      <Route path="/deals" element={<Deals />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </BrowserRouter>
              </CartProvider>
            </WishlistProvider>
          </UserProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
