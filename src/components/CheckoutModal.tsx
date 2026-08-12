import React, { useState } from 'react';
import { 
  X, 
  ShoppingCart, 
  Trash2, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  CreditCard, 
  Building2, 
  Truck, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  FileText, 
  QrCode, 
  MessageSquare,
  Sparkles,
  Plus,
  Minus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Order, OrderCustomer } from '../types';
import { saveOrder } from '../services/storage';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOrderCompleted: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderCompleted
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Customer Form State
  const [customer, setCustomer] = useState<OrderCustomer>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    department: '',
    farmName: '',
    notes: ''
  });

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'digital_transfer' | 'cash_on_delivery'>('digital_transfer');
  const [cardNumber, setCardNumber] = useState('');
  const [transferRef, setTransferRef] = useState('');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  // Calculation Math
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = subtotal > 1500000 ? 0 : 35000;
  const total = subtotal + shippingCost;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleNextToShipping = () => {
    if (cart.length === 0) return;
    setStep(2);
  };

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.fullName || !customer.email || !customer.phone || !customer.address || !customer.city || !customer.department) {
      alert('Por favor completa todos los campos requeridos de envío.');
      return;
    }
    setStep(3);
  };

  const handleFinalizeOrder = () => {
    if (paymentMethod === 'credit_card' && cardNumber.length < 15) {
      alert('Por favor ingresa un número de tarjeta válido.');
      return;
    }

    const orderNumber = `AG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      date: formattedDate,
      customer,
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price,
        unit: item.product.unit,
        image: item.product.image
      })),
      subtotal,
      shippingCost,
      total,
      paymentMethod,
      paymentDetails: {
        cardLast4: cardNumber ? cardNumber.slice(-4) : undefined,
        transferRef: transferRef || `NEQUI-${Math.floor(100000 + Math.random() * 900000)}`
      },
      status: 'Pendiente'
    };

    // Save to ag_v in LocalStorage
    saveOrder(newOrder);
    setCompletedOrder(newOrder);
    onOrderCompleted(newOrder);
    onClearCart();

    // Trigger Confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });

    setStep(4);
  };

  const handleSendWhatsAppOrder = () => {
    if (!completedOrder) return;
    const text = encodeURIComponent(
      `¡Hola AGRANDA! Acabo de realizar el Pedido #${completedOrder.orderNumber} por valor de ${formatCurrency(completedOrder.total)}.\n\nCliente: ${completedOrder.customer.fullName}\nFinca: ${completedOrder.customer.farmName || 'N/A'}\nCiudad: ${completedOrder.customer.city}, ${completedOrder.customer.department}.\nQuedo atento a la confirmación de despacho.`
    );
    window.open(`https://wa.me/573009001122?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div 
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-600/30 text-emerald-400">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                Proceso de Compra Segura
              </span>
              <h2 className="text-lg font-bold font-heading text-white">
                AGRANDA Checkout
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Indicator Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3">
          <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
            <div className={`flex items-center justify-center gap-1.5 p-2 rounded-lg ${step === 1 ? 'bg-emerald-700 text-white shadow-xs' : step > 1 ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-200 text-slate-500'}`}>
              <span className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center text-[10px]">1</span>
              <span className="hidden sm:inline">Carrito</span>
            </div>
            <div className={`flex items-center justify-center gap-1.5 p-2 rounded-lg ${step === 2 ? 'bg-emerald-700 text-white shadow-xs' : step > 2 ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-200 text-slate-500'}`}>
              <span className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center text-[10px]">2</span>
              <span className="hidden sm:inline">Envío Finca</span>
            </div>
            <div className={`flex items-center justify-center gap-1.5 p-2 rounded-lg ${step === 3 ? 'bg-emerald-700 text-white shadow-xs' : step > 3 ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-200 text-slate-500'}`}>
              <span className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center text-[10px]">3</span>
              <span className="hidden sm:inline">Pago</span>
            </div>
            <div className={`flex items-center justify-center gap-1.5 p-2 rounded-lg ${step === 4 ? 'bg-amber-500 text-white shadow-xs' : 'bg-slate-200 text-slate-500'}`}>
              <span className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center text-[10px]">4</span>
              <span className="hidden sm:inline">Confirmación</span>
            </div>
          </div>
        </div>

        {/* Modal Main Content View */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* STEP 1: RESUMEN DEL CARRITO */}
          {step === 1 && (
            <div className="space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                    <ShoppingCart className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">Tu carrito está vacío</h3>
                  <p className="text-xs text-slate-500">Agrega fertilizantes, semillas o agroquímicos del catálogo.</p>
                </div>
              ) : (
                <>
                  <div className="divide-y divide-slate-100">
                    {cart.map((item) => (
                      <div key={item.product.id} className="py-4 flex items-center justify-between gap-4">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-xl border border-slate-200 shrink-0" 
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-slate-900 truncate">
                            {item.product.name}
                          </h4>
                          <span className="text-xs text-slate-500 block">
                            Presentación: {item.product.unit}
                          </span>
                          <span className="text-xs font-bold text-emerald-700">
                            {formatCurrency(item.product.price)} c/u
                          </span>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1.5 text-slate-600 hover:text-slate-900"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1.5 text-slate-600 hover:text-slate-900"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Total per line */}
                        <div className="text-right font-bold text-slate-900 text-sm">
                          {formatCurrency(item.product.price * item.quantity)}
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-400 hover:text-rose-600 p-1.5 transition-colors"
                          title="Eliminar ítem"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Summary Pricing Footer */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal Insumos:</span>
                      <span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Flete Finca Directo:</span>
                      <span className="font-semibold text-slate-900">
                        {shippingCost === 0 ? '¡GRATIS! (Pedido superior a $1.5M)' : formatCurrency(shippingCost)}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-900">
                      <span>Total General COP:</span>
                      <span className="text-base text-emerald-800">{formatCurrency(total)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* STEP 2: DATOS DE ENVÍO */}
          {step === 2 && (
            <form onSubmit={handleNextToPayment} className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Información de Despacho y Finca Destino</span>
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre Completo *</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Ej: Juan Carlos Restrepo"
                      value={customer.fullName}
                      onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Correo Electrónico *</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="ejemplo@agromail.com"
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Teléfono Celular *</label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="+57 300 000 0000"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre de la Finca / Predio</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ej: Finca San José Lote 3"
                      value={customer.farmName}
                      onChange={(e) => setCustomer({ ...customer, farmName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    />
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Dirección / Vereda de Entrega *</label>
                  <input
                    type="text"
                    required
                    placeholder="Vereda, Kilómetro o referencia exacta para el conductor"
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Ciudad / Municipio *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Chinchiná"
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Departamento *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Caldas"
                    value={customer.department}
                    onChange={(e) => setCustomer({ ...customer, department: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Observaciones para el Conductor</label>
                  <textarea
                    rows={2}
                    placeholder="Instrucciones adicionales para la descarga de sacos o maquinaria..."
                    value={customer.notes}
                    onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <button type="submit" className="hidden" id="submit-step-2" />
            </form>
          )}

          {/* STEP 3: MÉTODO DE PAGO */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <span>Selecciona la Forma de Pago</span>
              </h3>

              <div className="grid sm:grid-cols-3 gap-3">
                
                {/* Transfer / Nequi */}
                <div 
                  onClick={() => setPaymentMethod('digital_transfer')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'digital_transfer' 
                      ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-600/20' 
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">Transferencia Nequi / Daviplata / PSE</h4>
                  <p className="text-[11px] text-slate-500 mt-1">Pago inmediato sin comisiones adicionales.</p>
                </div>

                {/* Credit Card */}
                <div 
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'credit_card' 
                      ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-600/20' 
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center mb-2">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">Tarjeta de Crédito / Débito</h4>
                  <p className="text-[11px] text-slate-500 mt-1">Visa, Mastercard, Amex con cifrado seguro.</p>
                </div>

                {/* Cash on Delivery */}
                <div 
                  onClick={() => setPaymentMethod('cash_on_delivery')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cash_on_delivery' 
                      ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-600/20' 
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-2">
                    <Truck className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">Pago Contraentrega en Finca</h4>
                  <p className="text-[11px] text-slate-500 mt-1">Paga en efectivo al recibir tu insumo en la puerta.</p>
                </div>

              </div>

              {/* Dynamic Payment Method Fields */}
              {paymentMethod === 'digital_transfer' && (
                <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-emerald-950 block">Datos para Transferencia Digital:</span>
                      <span className="text-slate-600">Nequi / Daviplata: <strong className="text-slate-900">300 900 1122</strong></span>
                    </div>
                    <div className="w-16 h-16 bg-white p-1 rounded-lg border border-emerald-300 flex items-center justify-center">
                      <QrCode className="w-12 h-12 text-slate-800" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Número de Comprobante / Referencia (Opcional):</label>
                    <input
                      type="text"
                      placeholder="Ej: NEQUI-881920"
                      value={transferRef}
                      onChange={(e) => setTransferRef(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'credit_card' && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Número de Tarjeta *</label>
                    <input
                      type="text"
                      required
                      placeholder="4500 0000 0000 0000"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Vencimiento (MM/AA)</label>
                      <input
                        type="text"
                        placeholder="12/28"
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Código CVC</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cash_on_delivery' && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs space-y-1 text-amber-950">
                  <span className="font-bold block">✓ Modalidad Pago en Finca Activada</span>
                  <p>Nuestro conductor llevará el datáfono o recibirá el pago en efectivo contra la verificación de los bultos/equipos.</p>
                </div>
              )}

              {/* Order total reminder */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Total a Pagar:</span>
                  <span className="text-xl font-black text-emerald-400">{formatCurrency(total)}</span>
                </div>
                <button
                  type="button"
                  onClick={handleFinalizeOrder}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-lg"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirmar & Finalizar Pedido</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CONFIRMACIÓN EXITOSA */}
          {step === 4 && completedOrder && (
            <div className="text-center py-6 space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full inline-block mb-2">
                  ¡Pedido Registrado con Éxito!
                </span>
                <h3 className="text-2xl font-extrabold font-heading text-slate-900">
                  Orden #{completedOrder.orderNumber}
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Hemos enviado la confirmación y guía de rastreo a <strong>{completedOrder.customer.email}</strong>.
                </p>
              </div>

              {/* Order Summary Box */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-3 max-w-lg mx-auto">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Destinatario:</span>
                  <span className="font-bold text-slate-900">{completedOrder.customer.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Destino:</span>
                  <span className="font-semibold text-slate-900">{completedOrder.customer.city}, {completedOrder.customer.department}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Método de Pago:</span>
                  <span className="font-semibold text-emerald-700 capitalize">
                    {completedOrder.paymentMethod.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-extrabold text-slate-900">
                  <span>Monto Total:</span>
                  <span className="text-emerald-800">{formatCurrency(completedOrder.total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleSendWhatsAppOrder}
                  className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Notificar Despacho por WhatsApp</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all"
                >
                  Volver a la Tienda
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        {step < 4 && (
          <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as any)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver</span>
              </button>
            ) : (
              <div />
            )}

            {step === 1 && (
              <button
                type="button"
                disabled={cart.length === 0}
                onClick={handleNextToShipping}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-sm"
              >
                <span>Continuar a Envío ({formatCurrency(total)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {step === 2 && (
              <button
                type="button"
                onClick={() => {
                  const formBtn = document.getElementById('submit-step-2');
                  if (formBtn) formBtn.click();
                }}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-sm"
              >
                <span>Continuar a Pago</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
