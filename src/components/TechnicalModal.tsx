import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  ShieldCheck, 
  Sprout, 
  Award, 
  Printer, 
  Check, 
  ShoppingCart, 
  Clock, 
  TrendingUp, 
  Droplet,
  Info,
  Plus,
  Minus
} from 'lucide-react';
import { Product } from '../types';

interface TechnicalModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const TechnicalModal: React.FC<TechnicalModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 1000);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div 
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-emerald-600/30 text-emerald-400 border border-emerald-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                Ficha Técnica de Insumo Agrícola
              </span>
              <h2 className="text-lg font-bold font-heading text-white line-clamp-1">
                {product.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrintPdf}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-xs flex items-center gap-1.5 font-medium"
              title="Imprimir / Guardar Ficha PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Imprimir Ficha</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          
          {/* Main Info Hero inside Modal */}
          <div className="grid md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 aspect-4/3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  {product.category}
                </span>
                {product.badge && (
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-xs font-bold">
                    {product.badge}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold font-heading text-slate-900">
                {product.name}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {product.shortDescription}
              </p>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Precio por {product.unit}</span>
                  <span className="text-2xl font-black text-slate-900">
                    {formatCurrency(product.price)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-emerald-700 font-bold block">Disponibilidad en Bodega</span>
                  <span className="text-xs text-slate-600">{product.stock} unidades en stock</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications Grid (Ficha Agronómica) */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Especificaciones Técnicas & Parámetros Agronómicos</span>
              </h4>
              <span className="text-[11px] font-mono text-slate-500">
                ICA: {product.specs.icaRegister || 'En trámite oficial'}
              </span>
            </div>

            <div className="p-4 grid sm:grid-cols-2 gap-4 text-xs bg-white">
              
              {/* Variety */}
              {product.specs.variety && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 font-medium block">Variedad / Cultivar</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">
                    {product.specs.variety}
                  </span>
                </div>
              )}

              {/* Germination Rate */}
              {product.specs.germinationRate && (
                <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <span className="text-emerald-700 font-medium block flex items-center gap-1">
                    <Sprout className="w-3.5 h-3.5" />
                    % Germinación Mínima
                  </span>
                  <span className="font-bold text-emerald-900 text-sm mt-0.5 block">
                    {product.specs.germinationRate}
                  </span>
                </div>
              )}

              {/* Presentation */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 font-medium block">Presentación Comercial</span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">
                  {product.specs.presentation}
                </span>
              </div>

              {/* Crop Cycle */}
              {product.specs.cropCycle && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 font-medium block flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    Ciclo de Cultivo / Período
                  </span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">
                    {product.specs.cropCycle}
                  </span>
                </div>
              )}

              {/* Estimated Yield */}
              {product.specs.estimatedYield && (
                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100">
                  <span className="text-amber-800 font-medium block flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                    Rendimiento Estimado
                  </span>
                  <span className="font-bold text-amber-950 text-sm mt-0.5 block">
                    {product.specs.estimatedYield}
                  </span>
                </div>
              )}

              {/* Dosage */}
              {product.specs.dosage && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 font-medium block flex items-center gap-1">
                    <Droplet className="w-3.5 h-3.5 text-blue-500" />
                    Dosis Recomendada por Hectárea
                  </span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">
                    {product.specs.dosage}
                  </span>
                </div>
              )}

              {/* Active Component */}
              {product.specs.activeComponent && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 sm:col-span-2">
                  <span className="text-slate-400 font-medium block">Composición Química / Ingrediente Activo</span>
                  <span className="font-semibold text-slate-800 text-xs mt-0.5 block">
                    {product.specs.activeComponent}
                  </span>
                </div>
              )}

            </div>
          </div>

          {/* Usage Notice */}
          <div className="p-3 bg-blue-50 text-blue-900 border border-blue-200 rounded-xl text-xs flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Recomendación Fitosanitaria</span>
              <span>
                Para la aplicación de este producto, se aconseja consultar con el Ingeniero Agrónomo de AGRANDA o realizar análisis previo de agua y suelo.
              </span>
            </div>
          </div>

        </div>

        {/* Modal Footer Action Bar */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between gap-4">
          
          <div className="flex items-center border border-slate-300 rounded-xl bg-white p-1">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 text-slate-600 hover:text-slate-900 transition-colors"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center text-sm font-bold text-slate-900">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="p-2 text-slate-600 hover:text-slate-900 transition-colors"
              disabled={quantity >= product.stock}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center space-x-3 flex-1 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors"
            >
              Cerrar
            </button>

            <button
              onClick={handleAdd}
              disabled={addedAnimation}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 text-white shadow-md transition-all ${
                addedAnimation ? 'bg-emerald-800' : 'bg-emerald-700 hover:bg-emerald-800'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Añadido al Carrito</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Añadir ({formatCurrency(product.price * quantity)})</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
