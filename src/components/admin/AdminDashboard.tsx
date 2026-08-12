import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Package, 
  HelpCircle, 
  ShoppingCart, 
  Plus, 
  Search, 
  LogOut, 
  X, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  MessageSquare, 
  BarChart3, 
  ShieldCheck, 
  FileText, 
  Sprout, 
  RefreshCw,
  Eye,
  Send,
  AlertTriangle,
  User,
  Clock
} from 'lucide-react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement 
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

import { Product, Order, PqrsMessage, AdminUser, ProductCategory } from '../../types';
import { 
  getStoredOrders, 
  getStoredProducts, 
  getStoredPqrs, 
  updateOrderStatus, 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  respondToPqrs 
} from '../../services/storage';

// Register Chart.js elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface AdminDashboardProps {
  adminUser: AdminUser;
  onLogout: () => void;
  onCloseAdminView: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  adminUser,
  onLogout,
  onCloseAdminView
}) => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'inventory' | 'pqrs'>('metrics');

  // State loaded from LocalStorage
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [pqrsList, setPqrsList] = useState<PqrsMessage[]>([]);

  // Search & Filter state
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');

  const [pqrsFilter, setPqrsFilter] = useState<string>('all');

  // Modal States
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [respondingPqrs, setRespondingPqrs] = useState<PqrsMessage | null>(null);
  const [responseText, setResponseText] = useState('');

  // Form State for New/Edit Product
  const [productForm, setProductForm] = useState<Omit<Product, 'id'>>({
    name: '',
    category: 'fertilizantes',
    subcategory: '',
    price: 100000,
    unit: 'Bulto 50 Kg',
    badge: undefined,
    image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=800&q=80',
    shortDescription: '',
    stock: 50,
    specs: {
      presentation: 'Bulto 50 Kg',
      dosage: '',
      cropCycle: '',
      estimatedYield: '',
      icaRegister: '',
      germinationRate: '',
      variety: '',
      activeComponent: ''
    }
  });

  // Reload data from LocalStorage
  const refreshData = () => {
    setOrders(getStoredOrders());
    setProducts(getStoredProducts());
    setPqrsList(getStoredPqrs());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // KPI Calculations
  const totalSales = orders.reduce((acc, curr) => acc + curr.total, 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'Pendiente' || o.status === 'Cosechando / Despacho').length;
  const totalProductsCount = products.length;
  const totalPqrsCount = pqrsList.length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Order status update handler
  const handleOrderStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
    refreshData();
  };

  // Product Save Handler (Add / Edit)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) return;

    if (editingProduct) {
      updateProduct({
        ...productForm,
        id: editingProduct.id
      });
    } else {
      addProduct(productForm);
    }

    setIsAddProductModalOpen(false);
    setEditingProduct(null);
    refreshData();
  };

  const handleEditProductClick = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      subcategory: product.subcategory,
      price: product.price,
      originalPrice: product.originalPrice,
      unit: product.unit,
      badge: product.badge,
      image: product.image,
      shortDescription: product.shortDescription,
      stock: product.stock,
      specs: { ...product.specs }
    });
    setIsAddProductModalOpen(true);
  };

  const handleDeleteProductClick = (productId: string) => {
    if (confirm('¿Estás seguro de eliminar este insumo del catálogo?')) {
      deleteProduct(productId);
      refreshData();
    }
  };

  // PQRS Response Handler
  const handleSendPqrsResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!respondingPqrs || !responseText) return;
    respondToPqrs(respondingPqrs.id, responseText);
    setRespondingPqrs(null);
    setResponseText('');
    refreshData();
  };

  // Chart Data preparation
  const salesBarData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
    datasets: [
      {
        label: 'Ventas de Insumos ($ COP)',
        data: [12500000, 18400000, 15200000, 22100000, 28900000, 31000000, 34500000, totalSales || 42000000],
        backgroundColor: '#2D5A27',
        borderRadius: 6,
      }
    ]
  };

  const categoryDoughnutData = {
    labels: ['Fertilizantes', 'Semillas', 'Maquinaria', 'Agroquímicos'],
    datasets: [
      {
        data: [
          products.filter(p => p.category === 'fertilizantes').length,
          products.filter(p => p.category === 'semillas').length,
          products.filter(p => p.category === 'maquinaria').length,
          products.filter(p => p.category === 'agroquimicos').length,
        ],
        backgroundColor: ['#2D5A27', '#8B5E3C', '#F4A261', '#2563eb'],
      }
    ]
  };

  // Filtered Lists
  const filteredOrders = orders.filter(o => {
    const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    const matchesSearch = 
      o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.city.toLowerCase().includes(orderSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredProducts = products.filter(p => {
    const matchesCategory = productCategoryFilter === 'all' || p.category === productCategoryFilter;
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredPqrs = pqrsList.filter(msg => {
    return pqrsFilter === 'all' || msg.status === pqrsFilter || msg.type === pqrsFilter;
  });

  return (
    <div className="bg-slate-100 min-h-screen">
      
      {/* Top Admin Navigation Header */}
      <div className="bg-slate-900 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold text-sm shadow-md">
              AG
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm font-heading text-white">Panel de Control AGRANDA</span>
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase border border-amber-500/30">
                  {adminUser.role}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 block">
                Sesión activa: {adminUser.name}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={refreshData}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs flex items-center gap-1.5 transition-colors"
              title="Actualizar datos LocalStorage"
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline">Sincronizar `ag_v` / `ag_q`</span>
            </button>

            <button
              onClick={onCloseAdminView}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-lg transition-colors"
            >
              Ver Tienda Pública
            </button>

            <button
              onClick={onLogout}
              className="p-2 text-rose-400 hover:text-white hover:bg-rose-900/50 rounded-lg transition-colors"
              title="Cerrar Sesión Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Tab Sub-Header */}
        <div className="border-t border-slate-800 bg-slate-950/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-2 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('metrics')}
              className={`py-3 px-4 flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'metrics'
                  ? 'border-[#F4A261] text-[#F4A261] bg-slate-800/80'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Ventas & Reportes (`ag_v`)</span>
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`py-3 px-4 flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'inventory'
                  ? 'border-[#F4A261] text-[#F4A261] bg-slate-800/80'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Gestión de Inventario ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('pqrs')}
              className={`py-3 px-4 flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'pqrs'
                  ? 'border-[#F4A261] text-[#F4A261] bg-slate-800/80'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Buzón PQRS (`ag_q`)</span>
              {pqrsList.filter(m => m.status === 'Pendiente').length > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {pqrsList.filter(m => m.status === 'Pendiente').length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin View Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* KPI CARDS BAR (Always visible) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Ventas Acumuladas
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 block">
                {formatCurrency(totalSales)}
              </span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">
                Persistido en `ag_v` LocalStorage
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Pedidos Activos / Pendientes
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 block">
                {pendingOrdersCount}
              </span>
              <span className="text-[10px] text-amber-600 font-bold mt-1 block">
                {orders.length} pedidos totales registrados
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <ShoppingCart className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Insumos en Catálogo
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 block">
                {totalProductsCount}
              </span>
              <span className="text-[10px] text-blue-600 font-bold mt-1 block">
                Fertilizantes, Semillas, Equipos
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
              <Package className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Mensajes PQRS (`ag_q`)
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 block">
                {totalPqrsCount}
              </span>
              <span className="text-[10px] text-purple-600 font-bold mt-1 block">
                {pqrsList.filter(p => p.status === 'Pendiente').length} requieren respuesta
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* TAB 1: METRICS & SALES TABLE */}
        {activeTab === 'metrics' && (
          <div className="space-y-8">
            
            {/* Chart.js Visualization Cards */}
            <div className="grid lg:grid-cols-12 gap-6">
              
              <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                <h3 className="font-bold text-sm text-slate-900 mb-4 flex items-center justify-between">
                  <span>Métricas de Ingresos Mensuales ($ COP)</span>
                  <span className="text-xs text-slate-400 font-normal">Generado con Chart.js</span>
                </h3>
                <div className="h-64">
                  <Bar 
                    data={salesBarData} 
                    options={{ 
                      responsive: true, 
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } }
                    }} 
                  />
                </div>
              </div>

              <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                <h3 className="font-bold text-sm text-slate-900 mb-4">
                  Distribución por Categorías
                </h3>
                <div className="h-64 flex items-center justify-center">
                  <Doughnut 
                    data={categoryDoughnutData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false
                    }}
                  />
                </div>
              </div>

            </div>

            {/* Recent Orders Table (`ag_v`) */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden space-y-4 p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold font-heading text-lg text-slate-900">
                    Histórico de Ordenes de Compra (`ag_v`)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Cambia el estado de despacho en tiempo real para actualizar el almacenamiento local.
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <input
                      type="text"
                      placeholder="Buscar orden o cliente..."
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>

                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className="px-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white"
                  >
                    <option value="all">Todos los Estados</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Cosechando / Despacho">Cosechando / Despacho</option>
                    <option value="En Camino">En Camino</option>
                    <option value="Entregado">Entregado</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="p-3">Nº Orden</th>
                      <th className="p-3">Cliente & Finca</th>
                      <th className="p-3">Ítems</th>
                      <th className="p-3">Total COP</th>
                      <th className="p-3">Pago</th>
                      <th className="p-3">Estado de Despacho</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-slate-400">
                          No se encontraron órdenes en el histórico `ag_v`.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3 font-bold text-slate-900">
                            {order.orderNumber}
                            <span className="block text-[10px] text-slate-400 font-normal">{order.date}</span>
                          </td>

                          <td className="p-3">
                            <span className="font-bold text-slate-900 block">{order.customer.fullName}</span>
                            <span className="text-[11px] text-slate-500 block">
                              {order.customer.city}, {order.customer.department} ({order.customer.farmName || 'Predio'})
                            </span>
                            <span className="text-[10px] text-slate-400">{order.customer.phone}</span>
                          </td>

                          <td className="p-3">
                            <span className="font-semibold text-slate-800 block">
                              {order.items.length} producto(s)
                            </span>
                            <span className="text-[10px] text-slate-500 line-clamp-1">
                              {order.items.map(i => `${i.quantity}x ${i.productName}`).join(', ')}
                            </span>
                          </td>

                          <td className="p-3 font-extrabold text-slate-900 text-sm">
                            {formatCurrency(order.total)}
                          </td>

                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold uppercase">
                              {order.paymentMethod.replace('_', ' ')}
                            </span>
                          </td>

                          <td className="p-3">
                            <select
                              value={order.status}
                              onChange={(e) => handleOrderStatusChange(order.id, e.target.value as Order['status'])}
                              className={`px-2.5 py-1 text-xs font-bold rounded-lg border focus:outline-hidden ${
                                order.status === 'Entregado' ? 'bg-emerald-100 text-emerald-900 border-emerald-300' :
                                order.status === 'En Camino' ? 'bg-blue-100 text-blue-900 border-blue-300' :
                                order.status === 'Cancelado' ? 'bg-rose-100 text-rose-900 border-rose-300' :
                                'bg-amber-100 text-amber-900 border-amber-300'
                              }`}
                            >
                              <option value="Pendiente">Pendiente</option>
                              <option value="Cosechando / Despacho">Cosechando / Despacho</option>
                              <option value="En Camino">En Camino</option>
                              <option value="Entregado">Entregado</option>
                              <option value="Cancelado">Cancelado</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: INVENTORY MANAGEMENT */}
        {activeTab === 'inventory' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold font-heading text-xl text-slate-900">
                  Inventario de Insumos & Fichas Técnicas
                </h3>
                <p className="text-xs text-slate-500">
                  Agrega nuevos fertilizantes, semillas certificadas, agroquímicos y maquinaria pesada.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <input
                    type="text"
                    placeholder="Buscar producto..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50"
                >
                  <option value="all">Todas las Categorías</option>
                  <option value="fertilizantes">Fertilizantes</option>
                  <option value="semillas">Semillas</option>
                  <option value="maquinaria">Maquinaria</option>
                  <option value="agroquimicos">Agroquímicos</option>
                </select>

                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setProductForm({
                      name: '',
                      category: 'fertilizantes',
                      subcategory: 'General',
                      price: 150000,
                      unit: 'Bulto 50 Kg',
                      image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=800&q=80',
                      shortDescription: '',
                      stock: 50,
                      specs: { presentation: 'Bulto 50 Kg' }
                    });
                    setIsAddProductModalOpen(true);
                  }}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar Nuevo Insumo</span>
                </button>
              </div>
            </div>

            {/* Inventory Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="p-3">Insumo / Nombre</th>
                    <th className="p-3">Categoría</th>
                    <th className="p-3">Precio COP</th>
                    <th className="p-3">Stock Disponible</th>
                    <th className="p-3">Registro ICA / Ficha</th>
                    <th className="p-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 flex items-center gap-3">
                        <img 
                          src={p.image} 
                          alt={p.name}
                          className="w-12 h-12 object-cover rounded-xl border border-slate-200 shrink-0" 
                        />
                        <div>
                          <span className="font-bold text-slate-900 block text-xs">{p.name}</span>
                          <span className="text-[10px] text-slate-500">{p.unit}</span>
                        </div>
                      </td>

                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[10px] font-bold uppercase">
                          {p.category}
                        </span>
                      </td>

                      <td className="p-3 font-extrabold text-slate-900">
                        {formatCurrency(p.price)}
                      </td>

                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          p.stock > 10 ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                        }`}>
                          {p.stock} un.
                        </span>
                      </td>

                      <td className="p-3 text-slate-500 text-[11px]">
                        {p.specs.icaRegister || 'Sin Registro'}
                      </td>

                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleEditProductClick(p)}
                            className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Editar Insumo"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProductClick(p.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 3: PQRS INBOX (`ag_q`) */}
        {activeTab === 'pqrs' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold font-heading text-xl text-slate-900">
                  Buzón de Atención y PQRS (`ag_q`)
                </h3>
                <p className="text-xs text-slate-500">
                  Revisa y da respuesta oficial a las inquietudes agronómicas o reclamos de los clientes.
                </p>
              </div>

              <select
                value={pqrsFilter}
                onChange={(e) => setPqrsFilter(e.target.value)}
                className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50"
              >
                <option value="all">Todos los Mensajes</option>
                <option value="Pendiente">Pendientes de Respuesta</option>
                <option value="Resuelto">Resueltos</option>
                <option value="Consulta Técnica">Consultas Técnicas</option>
                <option value="Queja">Quejas</option>
              </select>
            </div>

            <div className="space-y-4">
              {filteredPqrs.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No hay mensajes registrados en el buzón `ag_q`.
                </div>
              ) : (
                filteredPqrs.map((msg) => (
                  <div key={msg.id} className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                          msg.type === 'Queja' ? 'bg-rose-100 text-rose-800' :
                          msg.type === 'Reclamo' ? 'bg-amber-100 text-amber-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {msg.type}
                        </span>
                        <span className="font-bold text-xs text-slate-900">{msg.subject}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400">{msg.date}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          msg.status === 'Resuelto' ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
                        }`}>
                          {msg.status}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-700 space-y-1">
                      <div className="flex items-center gap-4 text-slate-500 text-[11px]">
                        <span>Cliente: <strong className="text-slate-800">{msg.name}</strong></span>
                        <span>Correo: {msg.email}</span>
                        <span>Teléfono: {msg.phone}</span>
                        {msg.orderNumber && <span>Orden: <strong>{msg.orderNumber}</strong></span>}
                      </div>
                      <p className="p-3 bg-white rounded-xl border border-slate-200 text-slate-800 mt-2">
                        "{msg.message}"
                      </p>
                    </div>

                    {msg.adminResponse ? (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-1 text-emerald-950">
                        <span className="font-bold flex items-center gap-1 text-emerald-800">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Respuesta Registrada ({msg.respondedAt}):
                        </span>
                        <p className="italic">{msg.adminResponse}</p>
                      </div>
                    ) : (
                      <button
                        onClick={() => setRespondingPqrs(msg)}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Dar Respuesta Oficial</span>
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>

          </div>
        )}

      </div>

      {/* MODAL: ADD / EDIT PRODUCT */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-8 max-h-[90vh] flex flex-col">
            
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
              <h3 className="font-bold font-heading text-base">
                {editingProduct ? 'Editar Insumo Agrícola' : 'Agregar Nuevo Insumo al Catálogo'}
              </h3>
              <button
                onClick={() => setIsAddProductModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Nombre Comercial del Insumo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Fertilizante Soluble Calcio-Boro 10 Kg"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Categoría Principal *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value as ProductCategory })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50"
                  >
                    <option value="fertilizantes">Fertilizantes</option>
                    <option value="semillas">Semillas Certificadas</option>
                    <option value="maquinaria">Maquinaria & Equipos</option>
                    <option value="agroquimicos">Agroquímicos & Biocontrol</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Precio COP ($) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Presentación Comercial *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Bulto 50 Kg, Galón 5L"
                    value={productForm.unit}
                    onChange={(e) => setProductForm({ ...productForm, unit: e.target.value, specs: { ...productForm.specs, presentation: e.target.value } })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Stock Inicial *</label>
                  <input
                    type="number"
                    required
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Imagen URL *</label>
                  <input
                    type="text"
                    required
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Descripción Corta</label>
                  <textarea
                    rows={2}
                    placeholder="Resumen agronómico del insumo..."
                    value={productForm.shortDescription}
                    onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>

                {/* Technical Specs Inputs */}
                <div className="sm:col-span-2 p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <span className="font-bold text-slate-800 block text-xs">Ficha Técnica Agronómica:</span>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-600">Registro ICA</label>
                      <input
                        type="text"
                        placeholder="ICA No. 00000"
                        value={productForm.specs.icaRegister || ''}
                        onChange={(e) => setProductForm({ ...productForm, specs: { ...productForm.specs, icaRegister: e.target.value } })}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600">% Germinación / Pureza</label>
                      <input
                        type="text"
                        placeholder="98% Mínimo"
                        value={productForm.specs.germinationRate || ''}
                        onChange={(e) => setProductForm({ ...productForm, specs: { ...productForm.specs, germinationRate: e.target.value } })}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600">Dosis Recomendada</label>
                      <input
                        type="text"
                        placeholder="150-200 Kg/ha"
                        value={productForm.specs.dosage || ''}
                        onChange={(e) => setProductForm({ ...productForm, specs: { ...productForm.specs, dosage: e.target.value } })}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600">Ciclo de Cultivo</label>
                      <input
                        type="text"
                        placeholder="120 Días"
                        value={productForm.specs.cropCycle || ''}
                        onChange={(e) => setProductForm({ ...productForm, specs: { ...productForm.specs, cropCycle: e.target.value } })}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                      />
                    </div>
                  </div>
                </div>

              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl"
                >
                  Guardar en Inventario
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* MODAL: RESPOND TO PQRS */}
      {respondingPqrs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
            
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
              <h3 className="font-bold text-sm font-heading">
                Responder Solicitud #{respondingPqrs.id}
              </h3>
              <button
                onClick={() => setRespondingPqrs(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendPqrsResponse} className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800 block">Cliente: {respondingPqrs.name}</span>
                <span className="text-slate-500 block">Asunto: {respondingPqrs.subject}</span>
                <p className="mt-2 italic text-slate-700">"{respondingPqrs.message}"</p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Respuesta Oficial de la Administración AGRANDA *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Escribe la solución técnica, número de guía o respuesta para el cliente..."
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setRespondingPqrs(null)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar Respuesta & Marcar Resuelto</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
