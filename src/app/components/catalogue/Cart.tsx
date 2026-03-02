import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Product } from "../../../lib/data";
import { useEffect } from "react";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartProps) {
  const subtotal = items.reduce((total, item) => {
    const price = item.product.isOnSale ? item.product.salePrice! : item.product.price;
    return total + price * item.quantity;
  }, 0);

  const shipping = subtotal > 0 ? 15.0 : 0;
  const total = subtotal + shipping;

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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
            className="fixed inset-0 z-40 bg-black/50 cursor-pointer"
          />

          {/* Slide-in Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 flex-shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                <h2 className="text-lg font-bold text-gray-900">
                  Carrinho ({items.length})
                </h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                aria-label="Fechar carrinho"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Cart Items - Scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                  </motion.div>
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Seu carrinho está vazio
                  </p>
                  <p className="text-sm text-gray-600 mb-6">
                    Adicione produtos para começar suas compras
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
                  >
                    Continuar Comprando
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {items.map((item, index) => {
                      const price = item.product.isOnSale
                        ? item.product.salePrice!
                        : item.product.price;

                      return (
                        <motion.div
                          key={item.product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 100, height: 0 }}
                          transition={{ delay: index * 0.05 }}
                          layout
                          className="flex gap-4 border-b border-gray-100 pb-4 last:border-b-0"
                        >
                          {/* Product Image */}
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex flex-1 flex-col">
                            <div className="flex justify-between">
                              <div className="flex-1">
                                <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                                  {item.product.name}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                  {item.product.category}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Tamanho: {item.product.size}mm
                                </p>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onRemoveItem(item.product.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                                aria-label="Remover item"
                              >
                                <Trash2 className="h-4 w-4" />
                              </motion.button>
                            </div>

                            {/* Quantity Controls */}
                            <div className="mt-3 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() =>
                                    onUpdateQuantity(
                                      item.product.id,
                                      Math.max(1, item.quantity - 1)
                                    )
                                  }
                                  className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                                  aria-label="Diminuir quantidade"
                                >
                                  <Minus className="h-3 w-3" />
                                </motion.button>
                                <span className="w-8 text-center text-sm font-medium">
                                  {item.quantity}
                                </span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() =>
                                    onUpdateQuantity(item.product.id, item.quantity + 1)
                                  }
                                  className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                                  aria-label="Aumentar quantidade"
                                >
                                  <Plus className="h-3 w-3" />
                                </motion.button>
                              </div>
                              <div className="text-right">
                                {item.product.isOnSale && (
                                  <p className="text-xs text-gray-500 line-through">
                                    R$ {item.product.price.toFixed(2)}
                                  </p>
                                )}
                                <p className="text-sm font-bold text-gray-900">
                                  R$ {price.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer with Totals */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 bg-white px-6 py-4 flex-shrink-0">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">
                      R$ {subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Frete</span>
                    <span className="font-medium text-gray-900">
                      R$ {shipping.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2">
                    <span className="text-base font-semibold text-gray-900">Total</span>
                    <span className="text-base font-bold text-gray-900">
                      R$ {total.toFixed(2)}
                    </span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-lg bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
                >
                  Finalizar Compra
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Continuar Comprando
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}