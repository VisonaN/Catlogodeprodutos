import { useState, useMemo } from "react";
import { Header } from "./components/catalogue/Header";
import { FilterPanel, FilterState } from "./components/catalogue/FilterPanel";
import { SortDropdown } from "./components/catalogue/SortDropdown";
import { ProductCard } from "./components/catalogue/ProductCard";
import { Footer } from "./components/catalogue/Footer";
import { MobileFilterButton } from "./components/catalogue/MobileFilterButton";
import { Cart, CartItem } from "./components/catalogue/Cart";
import { ProductModal } from "./components/catalogue/ProductModal";
import { PRODUCTS, Product } from "../lib/data";
import backgroundImg from "figma:asset/caf37aa3d8be6b4ce5a4bd3e7cf4d1c97ee2ac77.png";

const INITIAL_FILTERS: FilterState = {
  categories: [],
  sizeRange: [1, 170],
  minRating: 0,
};

export default function App() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState("relevance");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    // Apply size filter
    result = result.filter((product) => {
      return product.size >= filters.sizeRange[0] && product.size <= filters.sizeRange[1];
    });

    // Apply rating filter
    if (filters.minRating > 0) {
      result = result.filter((product) => product.rating >= filters.minRating);
    }

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => {
          const priceA = a.isOnSale ? a.salePrice! : a.price;
          const priceB = b.isOnSale ? b.salePrice! : b.price;
          return priceA - priceB;
        });
        break;
      case "price-desc":
        result.sort((a, b) => {
          const priceA = a.isOnSale ? a.salePrice! : a.price;
          const priceB = b.isOnSale ? b.salePrice! : b.price;
          return priceB - priceA;
        });
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));
        break;
      default:
        // relevance - keep original order
        break;
    }

    return result;
  }, [filters, sortBy, searchQuery]);

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartCount={totalCartItems}
        onSearchChange={setSearchQuery}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 relative">
        {/* Background Layer with 50% opacity */}
        <div 
          className="absolute inset-0 -mx-4 sm:-mx-6 lg:-mx-8 pointer-events-none"
          style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundRepeat: 'repeat',
            backgroundSize: 'auto',
            opacity: 0.5,
            zIndex: 0
          }}
        />
        
        {/* Content Layer */}
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <FilterPanel
                filters={filters}
                onChange={setFilters}
                onReset={handleResetFilters}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Controls Bar */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <MobileFilterButton>
                    <FilterPanel
                      filters={filters}
                      onChange={setFilters}
                      onReset={handleResetFilters}
                    />
                  </MobileFilterButton>

                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">
                      {filteredAndSortedProducts.length}
                    </span>{" "}
                    produtos encontrados
                  </p>
                </div>

                <SortDropdown value={sortBy} onChange={setSortBy} />
              </div>

              {/* Products Grid */}
              {filteredAndSortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredAndSortedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      onProductClick={setSelectedProduct}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="text-center">
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      Nenhum produto encontrado
                    </p>
                    <p className="text-sm text-gray-600 mb-6">
                      Tente ajustar seus filtros ou termo de busca
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
                    >
                      Limpar Filtros
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <ProductModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}