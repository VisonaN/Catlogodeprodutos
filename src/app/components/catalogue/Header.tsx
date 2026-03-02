import { useState, useEffect } from "react";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logo from "figma:asset/37aed1173d45ba7ea7027bec25fcd07064b45393.png";

interface HeaderProps {
  cartCount?: number;
  onSearchChange?: (query: string) => void;
  onCartClick?: () => void;
}

export function Header({ cartCount = 0, onSearchChange, onCartClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange?.(value);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 shadow-md backdrop-blur-lg"
          : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <motion.img
              src={logo}
              alt="NYBC Aviamentos"
              className="h-12 w-auto"
              whileHover={{ scale: 1.05 }}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Loja
            </a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Categorias
            </a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Novidades
            </a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Promoções
            </a>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs font-bold text-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="hidden md:block p-2 text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="User profile"
            >
              <User className="h-6 w-6" />
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-gray-200 bg-white"
          >
            <nav className="flex flex-col space-y-4 px-4 py-6">
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Loja
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Categorias
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Novidades
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Promoções
              </a>
              <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                <User className="h-5 w-5" />
                Perfil
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}