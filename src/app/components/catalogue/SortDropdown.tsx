import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ArrowUpDown, TrendingUp, TrendingDown } from "lucide-react";
import { SORT_OPTIONS } from "../../../lib/data";

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = SORT_OPTIONS.find((opt) => opt.id === value);

  const getIcon = (id: string) => {
    switch (id) {
      case "price-asc":
        return <TrendingDown className="h-4 w-4" />;
      case "price-desc":
        return <TrendingUp className="h-4 w-4" />;
      case "rating":
        return <span className="text-yellow-400">★</span>;
      default:
        return <ArrowUpDown className="h-4 w-4" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>Ordenar por: {selectedOption?.label}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 z-20 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg"
            >
              <div className="py-1">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      onChange(option.id);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-gray-50 ${
                      value === option.id
                        ? "bg-gray-50 font-medium text-gray-900"
                        : "text-gray-700"
                    }`}
                  >
                    <span className="flex items-center justify-center w-4">
                      {getIcon(option.id)}
                    </span>
                    <span>{option.label}</span>
                    {value === option.id && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto text-black"
                      >
                        ✓
                      </motion.span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}