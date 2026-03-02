import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Filter, X } from "lucide-react";

interface MobileFilterButtonProps {
  children: React.ReactNode;
}

export function MobileFilterButton({ children }: MobileFilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when modal is open
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
    <>
      {/* Trigger Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 lg:hidden"
      >
        <Filter className="h-4 w-4" />
        Filtros
      </motion.button>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden cursor-pointer"
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed left-0 top-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 flex-shrink-0">
                <h2 className="text-lg font-bold text-gray-900">Filtros</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  aria-label="Fechar filtros"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">{children}</div>
              <div className="border-t border-gray-200 bg-white p-4 flex-shrink-0">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsOpen(false)}
                  className="w-full rounded-lg bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
                >
                  Mostrar Resultados
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}