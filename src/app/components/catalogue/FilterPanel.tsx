import { Checkbox } from "../ui/checkbox";
import { Slider } from "../ui/slider";
import { motion, AnimatePresence } from "motion/react";
import {
  Package,
  Sparkles,
  Circle,
  CircleDot,
  Grid,
  Ribbon,
  Layers,
  Star,
  Gem,
  Crown,
  Award,
  Zap,
  Hexagon,
  Diamond,
  Flame,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { CATEGORIES } from "../../../lib/data";
import { useState } from "react";

export interface FilterState {
  categories: string[];
  sizeRange: [number, number];
  minRating: number;
}

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
}

export function FilterPanel({ filters, onChange, onReset }: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    size: true,
    rating: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter((c) => c !== categoryId);
    onChange({ ...filters, categories: newCategories });
  };

  const handleSizeChange = (value: number[]) => {
    onChange({ ...filters, sizeRange: [value[0], value[1]] });
  };

  const handleRatingChange = (rating: number) => {
    onChange({ ...filters, minRating: rating });
  };

  const FilterSection = ({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={() => toggleSection(id)}
        className="flex w-full items-center justify-between py-2 text-left"
      >
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        {expandedSections[id] ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      <AnimatePresence>
        {expandedSections[id] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="lg:sticky lg:top-24 space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Filtros</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Limpar
          </motion.button>
        </div>

        <div className="space-y-4">
          {/* Category Filter */}
          <FilterSection id="category" title="Categoria">
            <div className="mt-3 space-y-3">
              {CATEGORIES.map((category) => {
                const Icon = category.icon;
                const isSelected = filters.categories.includes(category.id);
                return (
                  <label
                    key={category.id}
                    className={`flex items-center space-x-3 cursor-pointer rounded-lg p-2 -mx-2 transition-all hover:translate-x-0.5 ${
                      isSelected ? "bg-blue-50" : ""
                    }`}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category.id, checked as boolean)
                      }
                    />
                    <motion.div
                      animate={{ scale: isSelected ? 1.05 : 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className={`h-4 w-4 transition-colors ${
                        isSelected ? "text-blue-600" : "text-gray-500"
                      }`} />
                    </motion.div>
                    <span className={`text-sm transition-colors ${
                      isSelected ? "text-gray-900 font-medium" : "text-gray-700"
                    }`}>
                      {category.name}
                    </span>
                  </label>
                );
              })}
            </div>
          </FilterSection>

          {/* Size Range Filter */}
          <FilterSection id="size" title="Tamanho">
            <div className="mt-4 px-1">
              <Slider
                value={[filters.sizeRange[0], filters.sizeRange[1]]}
                onValueChange={handleSizeChange}
                min={1}
                max={170}
                step={1}
                className="mb-4"
              />
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="font-medium">
                  {filters.sizeRange[0]}mm
                </span>
                <span className="font-medium">
                  {filters.sizeRange[1]}mm
                </span>
              </div>
            </div>
          </FilterSection>

          {/* Rating Filter */}
          <FilterSection id="rating" title="Avaliação Mínima">
            <div className="mt-3 space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <label
                  key={rating}
                  className={`flex items-center space-x-3 cursor-pointer rounded-lg p-2 -mx-2 transition-all hover:translate-x-0.5 ${
                    filters.minRating === rating ? "bg-yellow-50" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.minRating === rating}
                    onChange={() => handleRatingChange(rating)}
                    className="h-4 w-4 border-gray-300 text-black focus:ring-black cursor-pointer"
                  />
                  <div className="flex items-center">
                    <span className={`text-sm transition-colors ${
                      filters.minRating === rating ? "text-gray-900 font-medium" : "text-gray-700"
                    }`}>
                      {rating}
                    </span>
                    <motion.span
                      animate={{
                        scale: filters.minRating === rating ? [1, 1.2, 1] : 1,
                        rotate: filters.minRating === rating ? [0, 10, -10, 0] : 0
                      }}
                      transition={{ duration: 0.5 }}
                      className={`ml-1 ${
                        filters.minRating === rating ? "text-yellow-500" : "text-yellow-400"
                      }`}
                    >
                      ★
                    </motion.span>
                    <span className="ml-1 text-sm text-gray-500">ou mais</span>
                  </div>
                </label>
              ))}
            </div>
          </FilterSection>
        </div>

        {/* Apply Button - Mobile */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition-colors lg:hidden"
        >
          Aplicar Filtros
        </motion.button>
      </motion.div>
    </aside>
  );
}