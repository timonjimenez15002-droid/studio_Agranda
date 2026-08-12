import React, { useState } from 'react';
import { 
  FileText, 
  ShoppingCart, 
  Check, 
  Sparkles, 
  Leaf, 
  Award, 
  ShieldCheck, 
  Info,
  Plus,
  Minus
} from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOpenSpecs: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenSpecs,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const getBadgeStyle = (badge?: Product['badge']) => {
    switch (badge) {
      case 'Más Vendido':
        return 'bg-[#F4A261] text-white';
      case 'Ecológico':
        return 'bg-[#10B981] text-white';
      case 'Alto Rendimiento':
        return 'bg-[#2563EB] text-white';
      case 'Oferta Especial':
        return 'bg-[#EF4444] text-white';
      default:
        return 'bg-[#8B5E3C] text-white';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="group bg-white rounded-xl border border-[#F3F4F6] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden hover:-translate-y-0.5">
      {/* Image & Badge Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-[#F9FAF9]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badge Overlay */}
        {product.badge && (
          <span className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getBadgeStyle(product.badge)} flex items-center gap-1`}>
            {product.badge === 'Ecológico' && <Leaf className="w-3 h-3" />}
            {product.badge === 'Más Vendido' && <Sparkles className="w-3 h-3" />}
            {product.badge}
          </span>
        )}

        {/* Stock Badge */}
        <span className={`absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold ${product.stock > 10 ? 'bg-[#2D5A27] text-white' : 'bg-[#8B5E3C] text-white'}`}>
          {product.stock > 10 ? `Stock: ${product.stock}` : `¡Últimas ${product.stock} un.!`}
        </span>
      </div>

      {/* Product Information Body */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Subtitle */}
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#2D5A27] mb-1">
            <span>{product.category}</span>
            <span className="text-[#6B7280] font-normal">{product.unit}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-semibold text-[#1A1A1A] text-sm line-clamp-2 leading-snug group-hover:text-[#2D5A27] transition-colors">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[#6B7280] line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Key Specs Pills */}
          <div className="mt-2.5 flex flex-wrap gap-1">
            {product.specs.germinationRate && (
              <span className="bg-[#F9FAF9] text-[#2D5A27] border border-[#E5E7EB] text-[10px] font-semibold px-1.5 py-0.5 rounded">
                Germinación: {product.specs.germinationRate}
              </span>
            )}
            {product.specs.icaRegister && (
              <span className="bg-[#F3F4F6] text-slate-700 text-[10px] font-semibold px-1.5 py-0.5 rounded flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#2D5A27]" />
                {product.specs.icaRegister}
              </span>
            )}
          </div>
        </div>

        {/* Price & Action Area */}
        <div className="mt-3 pt-2.5 border-t border-[#F3F4F6]">
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-base font-bold text-[#2D5A27]">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="ml-2 text-xs text-[#999999] line-through font-normal">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#6B7280]">
              / {product.unit}
            </span>
          </div>

          {/* Quantity Controls & Add to Cart */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              {/* Quantity Selector */}
              <div className="flex items-center border border-[#E5E7EB] rounded bg-[#F9FAF9]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-40"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-6 text-center text-xs font-bold text-slate-800">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-1 text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-40"
                  disabled={quantity >= product.stock}
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAdd}
                disabled={addedAnimation}
                className={`flex-1 py-1.5 px-2.5 rounded font-bold text-xs flex items-center justify-center gap-1 transition-all shadow-xs ${
                  addedAnimation 
                    ? 'bg-[#1e3f1b] text-white' 
                    : 'bg-[#2D5A27] hover:bg-[#23481f] text-white'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#F4A261]" />
                    <span>¡Añadido!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Añadir</span>
                  </>
                )}
              </button>
            </div>

            {/* Technical Modal Spec Trigger */}
            <button
              type="button"
              onClick={() => onOpenSpecs(product)}
              className="w-full py-1 text-slate-600 hover:text-[#2D5A27] bg-[#F9FAF9] hover:bg-slate-100 rounded text-xs border border-[#E5E7EB] transition-colors flex items-center justify-center gap-1"
            >
              <FileText className="w-3 h-3 text-[#2D5A27]" />
              <span>Ver Ficha Técnica</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
