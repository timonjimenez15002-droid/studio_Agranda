import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { TechnicalModal } from './components/TechnicalModal';
import { CheckoutModal } from './components/CheckoutModal';
import { NewsSection } from './components/NewsSection';
import { PqrsSection } from './components/PqrsSection';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { AdminAuthModal } from './components/admin/AdminAuthModal';
import { AdminDashboard } from './components/admin/AdminDashboard';

import { Product, ProductCategory, CartItem, AdminUser, Order } from './types';
import { 
  getStoredProducts, 
  getStoredCart, 
  saveStoredCart, 
  getAdminSession, 
  saveAdminSession 
} from './services/storage';
import { 
  Sprout, 
  ShieldCheck, 
  Truck, 
  PhoneCall, 
  Lock, 
  HelpCircle, 
  Newspaper, 
  Package, 
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'store' | 'news' | 'pqrs' | 'admin'>('store');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart State (Persisted in LocalStorage `ag_cart`)
  const [cart, setCart] = useState<CartItem[]>(() => getStoredCart());

  // Products State (Persisted in LocalStorage `ag_products`)
  const [products, setProducts] = useState<Product[]>(() => getStoredProducts());

  // Technical Modal & Checkout State
  const [selectedTechnicalProduct, setSelectedTechnicalProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Admin Auth State
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => getAdminSession());
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);

  // Sync Cart changes to LocalStorage
  useEffect(() => {
    saveStoredCart(cart);
  }, [cart]);

  // Handle Cart Operations
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Total cart items count for navbar badge
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Handle Admin Button Click
  const handleOpenAdminTrigger = () => {
    if (adminUser && adminUser.isLoggedIn) {
      setActiveTab('admin');
    } else {
      setIsAdminAuthModalOpen(true);
    }
  };

  const handleAdminLoginSuccess = (user: AdminUser) => {
    setAdminUser(user);
    saveAdminSession(user);
    setActiveTab('admin');
  };

  const handleAdminLogout = () => {
    setAdminUser(null);
    saveAdminSession(null);
    setActiveTab('store');
  };

  // Filter Products for Store View
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAF9] font-sans text-[#1A1A1A]">
      
      {/* 1. Header Sticky Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCheckoutOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onOpenAdmin={handleOpenAdminTrigger}
        activeTab={activeTab === 'admin' ? 'store' : activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          // Refresh products when returning to store
          if (tab === 'store') setProducts(getStoredProducts());
        }}
        isAdminLoggedIn={!!adminUser?.isLoggedIn}
      />

      {/* 2. Main View Renderer based on activeTab */}
      <main className="flex-1">
        
        {/* VIEW A: ADMIN DASHBOARD */}
        {activeTab === 'admin' && adminUser ? (
          <AdminDashboard
            adminUser={adminUser}
            onLogout={handleAdminLogout}
            onCloseAdminView={() => {
              setActiveTab('store');
              setProducts(getStoredProducts());
            }}
          />
        ) : activeTab === 'news' ? (
          /* VIEW B: NOTICIAS AGROPECUARIAS */
          <NewsSection />
        ) : activeTab === 'pqrs' ? (
          /* VIEW C: ATENCIÓN AL CLIENTE & PQRS */
          <PqrsSection />
        ) : (
          /* VIEW D: STOREFRONT & CATALOG (DEFAULT) */
          <div className="space-y-12 pb-16">
            
            {/* Hero Banner with CTAs & Category Tiles */}
            <HeroBanner
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                const catalogEl = document.getElementById('catalog-section');
                if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
              }}
              onExploreCatalog={() => {
                setSelectedCategory('all');
                const catalogEl = document.getElementById('catalog-section');
                if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenConsultation={() => setActiveTab('pqrs')}
            />

            {/* Catalog Section */}
            <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
              
              {/* Category Filter Pills & Search Status */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#E5E7EB] pb-4">
                <div>
                  <h2 className="text-2xl font-bold font-heading text-[#2D5A27] tracking-tight flex items-center gap-2">
                    <Sprout className="w-6 h-6 text-[#2D5A27]" />
                    <span>Catálogo de Insumos & Semillas Certificadas</span>
                  </h2>
                  <p className="text-xs text-[#6B7280] mt-1">
                    {filteredProducts.length} producto(s) disponibles para envío directo a finca.
                  </p>
                </div>

                {/* Quick Category Buttons */}
                <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none text-xs font-semibold">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3.5 py-2 rounded-lg transition-all ${
                      selectedCategory === 'all'
                        ? 'bg-[#2D5A27] text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-[#E5E7EB]'
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setSelectedCategory('fertilizantes')}
                    className={`px-3.5 py-2 rounded-lg transition-all ${
                      selectedCategory === 'fertilizantes'
                        ? 'bg-[#2D5A27] text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-[#E5E7EB]'
                    }`}
                  >
                    Fertilizantes
                  </button>
                  <button
                    onClick={() => setSelectedCategory('semillas')}
                    className={`px-3.5 py-2 rounded-lg transition-all ${
                      selectedCategory === 'semillas'
                        ? 'bg-[#2D5A27] text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-[#E5E7EB]'
                    }`}
                  >
                    Semillas
                  </button>
                  <button
                    onClick={() => setSelectedCategory('maquinaria')}
                    className={`px-3.5 py-2 rounded-lg transition-all ${
                      selectedCategory === 'maquinaria'
                        ? 'bg-[#2D5A27] text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-[#E5E7EB]'
                    }`}
                  >
                    Maquinaria
                  </button>
                  <button
                    onClick={() => setSelectedCategory('agroquimicos')}
                    className={`px-3.5 py-2 rounded-lg transition-all ${
                      selectedCategory === 'agroquimicos'
                        ? 'bg-[#2D5A27] text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-[#E5E7EB]'
                    }`}
                  >
                    Agroquímicos
                  </button>
                </div>
              </div>

              {/* Product Cards Grid */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Package className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">No encontramos insumos con ese criterio</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Intenta cambiar los términos de búsqueda o selecciona otra categoría en el menú superior.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl"
                  >
                    Restablecer Filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOpenSpecs={(p) => setSelectedTechnicalProduct(p)}
                      onAddToCart={(p, qty) => handleAddToCart(p, qty)}
                    />
                  ))}
                </div>
              )}

            </section>
          </div>
        )}

      </main>

      {/* 3. Interactive Modals */}
      
      {/* Advanced Technical Modal */}
      <TechnicalModal
        product={selectedTechnicalProduct}
        onClose={() => setSelectedTechnicalProduct(null)}
        onAddToCart={(p, qty) => handleAddToCart(p, qty)}
      />

      {/* Multi-Step Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onOrderCompleted={(order) => {
          // Refresh products stock if needed
          setProducts(getStoredProducts());
        }}
      />

      {/* Admin Auth Modal */}
      <AdminAuthModal
        isOpen={isAdminAuthModalOpen}
        onClose={() => setIsAdminAuthModalOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {/* 4. Floating WhatsApp Contact Widget */}
      <WhatsAppWidget />

      {/* 5. Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Brand Column */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                  AG
                </div>
                <span className="text-xl font-bold font-heading text-white tracking-tight">
                  AGRANDA
                </span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Plataforma e-commerce especializada en insumos agrícolas premium, semillas híbridas certificadas, nutrición de suelos y equipos para el campo.
              </p>
              <span className="inline-block text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded-md border border-emerald-800/50">
                Acreditación ICA Vigente • Red Nacional de Fincas
              </span>
            </div>

            {/* Quick Links */}
            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">
                Categorías de Insumos
              </h4>
              <ul className="space-y-1.5 text-slate-400">
                <li><button onClick={() => { setSelectedCategory('fertilizantes'); setActiveTab('store'); }} className="hover:text-emerald-400">Fertilizantes NPK & Foliares</button></li>
                <li><button onClick={() => { setSelectedCategory('semillas'); setActiveTab('store'); }} className="hover:text-emerald-400">Semillas Certificadas ICA</button></li>
                <li><button onClick={() => { setSelectedCategory('maquinaria'); setActiveTab('store'); }} className="hover:text-emerald-400">Tractores & Fumigadoras</button></li>
                <li><button onClick={() => { setSelectedCategory('agroquimicos'); setActiveTab('store'); }} className="hover:text-emerald-400">Agroquímicos & Biocontrol</button></li>
              </ul>
            </div>

            {/* Customer Care */}
            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">
                Atención al Productor
              </h4>
              <ul className="space-y-1.5 text-slate-400">
                <li><button onClick={() => setActiveTab('news')} className="hover:text-emerald-400">Noticias Fitosanitarias</button></li>
                <li><button onClick={() => setActiveTab('pqrs')} className="hover:text-emerald-400">Buzón de PQRS & Asesoría</button></li>
                <li><button onClick={() => setIsCheckoutOpen(true)} className="hover:text-emerald-400">Estado de Mi Pedido</button></li>
                <li><button onClick={handleOpenAdminTrigger} className="hover:text-amber-400 font-semibold text-amber-300">Acceso Panel Admin (/admin)</button></li>
              </ul>
            </div>

            {/* Security Notice */}
            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">
                Garantía Agropecuaria
              </h4>
              <p className="text-[11px] text-slate-400">
                Todos nuestros lotes de fertilizante y semilla cuentan con trazabilidad oficial, ficha de seguridad fitosanitaria y acompañamiento por Ingenieros Agrónomos.
              </p>
              <div className="p-3 bg-slate-800 rounded-xl border border-slate-700/80 text-[10px] text-slate-300">
                <span>Atención Telefónica Fincas: <strong>(601) 800-AGRO</strong></span>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            <span>© {new Date().getFullYear()} AGRANDA - Insumos Agrícolas Premium. Todos los derechos reservados.</span>
            <div className="flex items-center space-x-4">
              <span>Persistencia: LocalStorage (`ag_v` & `ag_q`)</span>
              <span>•</span>
              <button 
                onClick={handleOpenAdminTrigger}
                className="text-amber-400 hover:underline font-semibold"
              >
                Panel de Administración
              </button>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
