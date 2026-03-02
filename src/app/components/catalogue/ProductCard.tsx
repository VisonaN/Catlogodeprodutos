import { useState } from "react";
import { motion } from "motion/react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Product } from "../../../lib/data";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onProductClick }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const price = product.isOnSale ? product.salePrice : product.price;

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(product);
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <motion.div
      className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-xl border border-gray-100 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
      onClick={() => onProductClick?.(product)}
    >
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
        onClick={(e) => {
          e.stopPropagation();
          setIsWishlisted(!isWishlisted);
        }}
        className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500"
        aria-label="Add to wishlist"
      >
        <Heart
          className={clsx("h-5 w-5 transition-colors", {
            "fill-red-500 text-red-500": isWishlisted,
            "text-gray-600": !isWishlisted,
          })}
        />
      </button>

      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <motion.img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-1">
            {product.category}
          </p>
        </div>

        {/* Rating */}
        <div className="mb-3 flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-gray-900">
            {product.rating}
          </span>
          <span className="text-sm text-gray-500">
            ({product.reviews})
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            {product.isOnSale && (
              <span className="text-sm text-gray-500 line-through">
                R$ {product.price.toFixed(2)}
              </span>
            )}
            <span className={clsx("text-xl font-bold", {
              "text-red-600": product.isOnSale,
              "text-gray-900": !product.isOnSale
            })}>
              R$ {price?.toFixed(2)}
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            disabled={isAdding}
            className="flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
          >
            <ShoppingCart className="h-4 w-4" />
            {isAdding ? "Adicionado!" : "Adicionar"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}