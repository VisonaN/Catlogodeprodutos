import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Star, Heart, ShoppingCart, Package } from "lucide-react";
import { Product } from "../../../lib/data";
import { clsx } from "clsx";
import { useState } from "react";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Block body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuantity(1);
      setIsAdding(false);
    }
  }, [isOpen]);

  if (!product) return null;

  const price = product.isOnSale ? product.salePrice : product.price;

  const handleAddToCart = () => {
    setIsAdding(true);
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    setTimeout(() => {
      setIsAdding(false);
      onClose();
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl pointer-events-auto"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500 shadow-sm"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
                {/* Left Column - Image */}
                <div className="relative">
                  {/* Badges */}
                  <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
                        NOVO
                      </span>
                    )}
                    {product.isOnSale && (
                      <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                        PROMOÇÃO
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500 shadow-sm"
                    aria-label="Adicionar aos favoritos"
                  >
                    <Heart
                      className={clsx("h-5 w-5 transition-colors", {
                        "fill-red-500 text-red-500": isWishlisted,
                        "text-gray-600": !isWishlisted,
                      })}
                    />
                  </button>

                  <a
                    href="https://www.figma.com/make/aT3HJdgHmZ03hvwBaPwjkS/Criar-informativo-para-Dente?t=ZnYNfur6foDevuF5-20&fullscreen=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 cursor-pointer group/image"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover object-center transition-transform duration-300 group-hover/image:scale-105"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-3">
                        <svg
                          className="h-6 w-6 text-gray-900"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>

                {/* Right Column - Details */}
                <div className="flex flex-col">
                  {/* Category */}
                  <div className="mb-2">
                    <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                      {product.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {product.name}
                  </h2>

                  {/* Rating */}
                  <div className="mb-6 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={clsx("h-5 w-5", {
                            "fill-yellow-400 text-yellow-400":
                              i < Math.floor(product.rating),
                            "text-gray-300": i >= Math.floor(product.rating),
                          })}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                      {product.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({product.reviews} avaliações)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    {product.isOnSale && (
                      <span className="text-lg text-gray-500 line-through block mb-1">
                        R$ {product.price.toFixed(2)}
                      </span>
                    )}
                    <span
                      className={clsx("text-4xl font-bold", {
                        "text-red-600": product.isOnSale,
                        "text-gray-900": !product.isOnSale,
                      })}
                    >
                      R$ {price?.toFixed(2)}
                    </span>
                    {product.isOnSale && (
                      <span className="ml-3 inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-600">
                        {Math.round(
                          ((product.price - product.salePrice!) /
                            product.price) *
                            100
                        )}
                        % OFF
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                      Descrição
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Size */}
                  <div className="mb-6 flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Package className="h-5 w-5 text-gray-600" />
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Tamanho:
                      </span>
                      <span className="ml-2 text-lg font-bold text-gray-900">
                        {product.size}mm
                      </span>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="mb-6">
                    <label className="text-sm font-semibold text-gray-900 mb-2 block uppercase tracking-wide">
                      Quantidade
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-gray-300 text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50 font-semibold"
                      >
                        −
                      </button>
                      <span className="text-xl font-bold text-gray-900 w-12 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-gray-300 text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50 font-semibold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="w-full flex items-center justify-center gap-3 rounded-xl bg-black px-6 py-4 text-base font-bold text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {isAdding ? "Adicionado ao Carrinho!" : "Adicionar ao Carrinho"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}