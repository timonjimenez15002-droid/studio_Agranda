import React, { useState } from 'react';
import { 
  Sprout, 
  Search, 
  ShoppingCart, 
  UserCheck, 
  Menu, 
  X, 
  Phone, 
  Newspaper, 
  HelpCircle, 
  Package, 
  ShieldCheck, 
  Tractor, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { ProductCategory } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: ProductCategory | 'all';
  setSelectedCategory: (cat: ProductCategory | 'all') => void;
  onOpenAdmin: () => void;
  activeTab: 'store' | 'news' | 'pqrs';
  setActiveTab: (tab: 'store' | 'news' | 'pqrs') => void;
  isAdminLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onOpenAdmin,
  activeTab,
  setActiveTab,
  isAdminLoggedIn
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCategoryClick = (cat: ProductCategory | 'all') => {
    setSelectedCategory(cat);
    setActiveTab('store');
    setMobileMenuOpen(false);
    // Smooth scroll to catalog
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTabClick = (tab: 'store' | 'news' | 'pqrs') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs">
      {/* Top Banner Bar */}
      <div className="bg-[#1e3f1b] text-emerald-100 text-xs py-1.5 px-4 hidden sm:block border-b border-[#2D5A27]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F4A261]" />
              Insumos Registrados ICA - Calidad 100% Garantizada
            </span>
            <span className="text-emerald-400/30">|</span>
            <span className="flex items-center gap-1.5">
              <Tractor className="w-3.5 h-3.5 text-[#F4A261]" />
              Despachos directos a finca en todo el país
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="tel:+573009001122" className="hover:text-white transition-colors flex items-center gap-1">
              <Phone className="w-3 h-3 text-[#F4A261]" />
              Asesoría Técnica: (601) 800-AGRO
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => handleTabClick('store')}
              className="flex items-center space-x-2.5 text-left group focus:outline-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-[#2D5A27] flex items-center justify-center text-white shadow-md shadow-[#2D5A27]/20 group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight text-[#2D5A27] font-heading block leading-none">
                  AGRANDA
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B5E3C] block mt-0.5">
                  Insumos Agrícolas Premium
                </span>
              </div>
            </button>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar insumos, semillas o maquinaria..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (activeTab !== 'store') setActiveTab('store');
                }}
                className="w-full pl-10 pr-4 py-2 text-sm bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2D5A27] focus:border-transparent transition-all placeholder:text-[#6B7280]"
              />
              <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6B7280] hover:text-slate-900"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Admin Panel Toggle */}
            <button
              onClick={onOpenAdmin}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all ${
                isAdminLoggedIn 
                  ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100' 
                  : 'bg-[#F3F4F6] text-slate-800 border-[#E5E7EB] hover:bg-slate-200 hover:text-slate-900'
              }`}
              title="Panel de Administración"
            >
              <UserCheck className={`w-4 h-4 ${isAdminLoggedIn ? 'text-amber-600' : 'text-[#2D5A27]'}`} />
              <span className="hidden sm:inline">
                {isAdminLoggedIn ? 'Admin Panel (Activo)' : 'Admin Panel'}
              </span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center justify-center p-2 sm:px-3.5 sm:py-2 bg-[#2D5A27] text-white rounded-lg hover:bg-[#23481f] transition-colors shadow-xs font-semibold text-xs sm:text-sm"
              aria-label="Carrito de Compras"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline ml-2 font-semibold">Carrito</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#EF4444] text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 md:hidden rounded-lg hover:bg-slate-100"
              aria-label="Abrir Menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="mt-2.5 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar insumos, semillas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg focus:bg-white focus:ring-2 focus:ring-[#2D5A27] focus:outline-hidden"
            />
            <Search className="w-3.5 h-3.5 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Category Navigation Bar (Desktop) */}
      <nav className="bg-[#2D5A27] text-white text-xs font-semibold border-t border-[#23481f] hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handleCategoryClick('all')}
              className={`px-4 py-2.5 flex items-center gap-1.5 transition-colors border-b-2 ${
                activeTab === 'store' && selectedCategory === 'all'
                  ? 'border-[#F4A261] text-[#F4A261] bg-[#23481f]'
                  : 'border-transparent text-emerald-100 hover:text-white hover:bg-[#23481f]'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              Todo el Catálogo
            </button>
            <button
              onClick={() => handleCategoryClick('fertilizantes')}
              className={`px-4 py-2.5 transition-colors border-b-2 ${
                activeTab === 'store' && selectedCategory === 'fertilizantes'
                  ? 'border-[#F4A261] text-[#F4A261] bg-[#23481f]'
                  : 'border-transparent text-emerald-100 hover:text-white hover:bg-[#23481f]'
              }`}
            >
              Fertilizantes & Abonos
            </button>
            <button
              onClick={() => handleCategoryClick('semillas')}
              className={`px-4 py-2.5 transition-colors border-b-2 ${
                activeTab === 'store' && selectedCategory === 'semillas'
                  ? 'border-[#F4A261] text-[#F4A261] bg-[#23481f]'
                  : 'border-transparent text-emerald-100 hover:text-white hover:bg-[#23481f]'
              }`}
            >
              Semillas Certificadas
            </button>
            <button
              onClick={() => handleCategoryClick('maquinaria')}
              className={`px-4 py-2.5 transition-colors border-b-2 ${
                activeTab === 'store' && selectedCategory === 'maquinaria'
                  ? 'border-[#F4A261] text-[#F4A261] bg-[#23481f]'
                  : 'border-transparent text-emerald-100 hover:text-white hover:bg-[#23481f]'
              }`}
            >
              Maquinaria & Equipos
            </button>
            <button
              onClick={() => handleCategoryClick('agroquimicos')}
              className={`px-4 py-2.5 transition-colors border-b-2 ${
                activeTab === 'store' && selectedCategory === 'agroquimicos'
                  ? 'border-[#F4A261] text-[#F4A261] bg-[#23481f]'
                  : 'border-transparent text-emerald-100 hover:text-white hover:bg-[#23481f]'
              }`}
            >
              Agroquímicos & Biocontrol
            </button>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => handleTabClick('news')}
              className={`px-3 py-2.5 flex items-center gap-1.5 transition-colors ${
                activeTab === 'news' ? 'text-[#F4A261] font-bold' : 'text-emerald-100 hover:text-white'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5 text-[#F4A261]" />
              Noticias Agropecuarias
            </button>
            <button
              onClick={() => handleTabClick('pqrs')}
              className={`px-3 py-2.5 flex items-center gap-1.5 transition-colors ${
                activeTab === 'pqrs' ? 'text-[#F4A261] font-bold' : 'text-emerald-100 hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#F4A261]" />
              Atención / PQRS
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 text-slate-100 border-t border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Categorías de Insumos
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleCategoryClick('all')}
              className="p-2 bg-slate-800 rounded-lg text-left flex items-center justify-between"
            >
              <span>Todos los Insumos</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
            <button
              onClick={() => handleCategoryClick('fertilizantes')}
              className="p-2 bg-slate-800 rounded-lg text-left flex items-center justify-between"
            >
              <span>Fertilizantes</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
            <button
              onClick={() => handleCategoryClick('semillas')}
              className="p-2 bg-slate-800 rounded-lg text-left flex items-center justify-between"
            >
              <span>Semillas</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
            <button
              onClick={() => handleCategoryClick('maquinaria')}
              className="p-2 bg-slate-800 rounded-lg text-left flex items-center justify-between"
            >
              <span>Maquinaria</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
            <button
              onClick={() => handleCategoryClick('agroquimicos')}
              className="p-2 bg-slate-800 rounded-lg text-left flex items-center justify-between col-span-2"
            >
              <span>Agroquímicos & Biocontrol</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-col space-y-2 text-xs">
            <button
              onClick={() => handleTabClick('news')}
              className="p-2 text-left flex items-center gap-2 hover:bg-slate-800 rounded-lg"
            >
              <Newspaper className="w-4 h-4 text-amber-400" />
              <span>Noticias del Sector Agro</span>
            </button>
            <button
              onClick={() => handleTabClick('pqrs')}
              className="p-2 text-left flex items-center gap-2 hover:bg-slate-800 rounded-lg"
            >
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>Atención al Cliente & PQRS</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
