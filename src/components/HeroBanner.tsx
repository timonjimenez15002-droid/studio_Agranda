import React from 'react';
import { 
  Sprout, 
  ShieldCheck, 
  Truck, 
  Award, 
  ArrowRight, 
  Droplet, 
  Tractor, 
  CheckCircle2, 
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { ProductCategory } from '../types';

interface HeroBannerProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onExploreCatalog: () => void;
  onOpenConsultation: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectCategory,
  onExploreCatalog,
  onOpenConsultation
}) => {
  return (
    <div className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80"
          alt="Campo agrícola de alta productividad"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Subtle Gradient Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-slate-900/80 to-emerald-900/60 z-0" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-20">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2D5A27]/30 border border-[#2D5A27]/50 text-emerald-200 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#F4A261]" />
              <span>Tecnología & Nutrición para la Tierra Colombiana</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white tracking-tight leading-[1.15]">
              Impulsa la Máxima <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-amber-200 to-[#F4A261]">
                Productividad de tus Cosechas
              </span>
            </h1>

            <p className="text-slate-200 text-sm sm:text-base max-w-xl leading-relaxed">
              Insumos agrícolas de alto rendimiento con entrega certificada en finca. Fertilizantes de alta solubilidad, semillas híbridas certificadas por el ICA y maquinaria pesada.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreCatalog}
                className="px-6 py-3 bg-[#2D5A27] hover:bg-[#23481f] text-white font-semibold text-sm rounded-md transition-all shadow-md flex items-center gap-2 group"
              >
                <span>Ver Catálogo Premium</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenConsultation}
                className="px-5 py-3 bg-slate-800/90 hover:bg-slate-800 text-emerald-200 border border-emerald-500/30 font-semibold text-sm rounded-md transition-all flex items-center gap-2 backdrop-blur-xs"
              >
                <PhoneCall className="w-4 h-4 text-[#F4A261]" />
                <span>Asesoría Técnica Gratuita</span>
              </button>
            </div>

            {/* Badges */}
            <div className="pt-4 grid grid-cols-3 gap-2 sm:gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Registro ICA Vigente</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Asistencia en Finca</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pago Contraentrega</span>
              </div>
            </div>
          </div>

          {/* Quick Access Category Cards Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
            
            {/* Category Tile: Fertilizantes */}
            <div 
              onClick={() => onSelectCategory('fertilizantes')}
              className="group cursor-pointer bg-slate-800/80 hover:bg-emerald-900/60 border border-slate-700/80 hover:border-emerald-500/50 p-4 rounded-2xl transition-all shadow-md backdrop-blur-md hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Sprout className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm group-hover:text-emerald-300 transition-colors">
                Fertilizantes
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                NPK, Orgánicos & Foliares
              </p>
            </div>

            {/* Category Tile: Semillas */}
            <div 
              onClick={() => onSelectCategory('semillas')}
              className="group cursor-pointer bg-slate-800/80 hover:bg-emerald-900/60 border border-slate-700/80 hover:border-emerald-500/50 p-4 rounded-2xl transition-all shadow-md backdrop-blur-md hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors">
                Semillas
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Híbridos Certificados ICA
              </p>
            </div>

            {/* Category Tile: Maquinaria */}
            <div 
              onClick={() => onSelectCategory('maquinaria')}
              className="group cursor-pointer bg-slate-800/80 hover:bg-emerald-900/60 border border-slate-700/80 hover:border-emerald-500/50 p-4 rounded-2xl transition-all shadow-md backdrop-blur-md hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Tractor className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm group-hover:text-blue-300 transition-colors">
                Maquinaria
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Tractores & Aspersión
              </p>
            </div>

            {/* Category Tile: Agroquímicos */}
            <div 
              onClick={() => onSelectCategory('agroquimicos')}
              className="group cursor-pointer bg-slate-800/80 hover:bg-emerald-900/60 border border-slate-700/80 hover:border-emerald-500/50 p-4 rounded-2xl transition-all shadow-md backdrop-blur-md hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Droplet className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm group-hover:text-purple-300 transition-colors">
                Agroquímicos
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Fungicidas & Biocontrol
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Value Proposition Bar */}
      <div className="bg-slate-950/90 border-t border-slate-800/80 py-4 px-4 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-300 text-xs font-medium">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-900/50 text-emerald-400 flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">Logística Finca a Finca</p>
              <p className="text-[11px] text-slate-400">Envíos rastreados con flete agro</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-900/50 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">Garantía de Germinación</p>
              <p className="text-[11px] text-slate-400">Lotes de semilla de alta pureza</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-900/50 text-emerald-400 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">Soporte por Agrónomos</p>
              <p className="text-[11px] text-slate-400">Recomendaciones de dosis y mezcla</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-900/50 text-emerald-400 flex items-center justify-center shrink-0">
              <Sprout className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">Línea Eco-Sostenible</p>
              <p className="text-[11px] text-slate-400">Bioinsumos con certificación limpia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
