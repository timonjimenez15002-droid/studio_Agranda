import React, { useState } from 'react';
import { 
  HelpCircle, 
  Send, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  MessageSquareText, 
  ChevronDown, 
  ChevronUp,
  FileText
} from 'lucide-react';
import { PqrsType } from '../types';
import { savePqrsMessage } from '../services/storage';

export const PqrsSection: React.FC = () => {
  const [formData, setFormData] = useState({
    type: 'Consulta Técnica' as PqrsType,
    name: '',
    email: '',
    phone: '',
    orderNumber: '',
    subject: '',
    message: ''
  });

  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      alert('Por favor completa todos los campos obligatorios (*).');
      return;
    }

    // Save into LocalStorage ag_q
    savePqrsMessage(formData);
    setSubmittedSuccess(true);
    setFormData({
      type: 'Consulta Técnica',
      name: '',
      email: '',
      phone: '',
      orderNumber: '',
      subject: '',
      message: ''
    });

    setTimeout(() => {
      setSubmittedSuccess(false);
    }, 5000);
  };

  const faqs = [
    {
      q: '¿Cómo funciona la garantía de germinación en semillas certificadas?',
      a: 'Todas nuestras semillas cuentan con lote verificado ante el ICA con mínimo 95% a 98% de poder germinativo. Si sigues el protocolo técnico de prueba en húmedo y obtienes un porcentaje menor, reemplazamos el lote sin costo.'
    },
    {
      q: '¿Cuánto tardan los envíos directos a finca o vereda?',
      a: 'Los despachos a cabeceras municipales toman de 24 a 48 horas. Para zonas rurales alejadas o fincas de difícil acceso, coordinamos con transportadores locales o punto de encuentro en 48 a 72 horas.'
    },
    {
      q: '¿Puedo solicitar visita de un Ingeniero Agrónomo a mi cultivo?',
      a: 'Sí, para compras superiores a 50 bultos de fertilizante o paquetes integrales de siembra, agendamos asesoría en campo sin costo adicional en Caldas, Quindío, Risaralda, Tolima, Huila, Cundinamarca y Antioquia.'
    },
    {
      q: '¿Qué medios de pago aceptan para pagos contraentrega?',
      a: 'Aceptamos efectivo al transportador y transferencia inmediata mediante Nequi, Daviplata o datáfono móvil con tarjetas débito y crédito.'
    }
  ];

  return (
    <section className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>Atención Comercial & PQRS Digital</span>
          </div>
          <h2 className="text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
            Canal Directo de Atención y Consultas Técnicas
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Envía tus peticiones, quejas, reclamos, sugerencias o dudas agronómicas. Nuestro equipo responderá en menos de 24 horas.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form Box */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
                <MessageSquareText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Formulario Oficial de PQRS & Asesoría
                </h3>
                <p className="text-xs text-slate-500">
                  Registrado directamente en el sistema de gestión `ag_q`.
                </p>
              </div>
            </div>

            {submittedSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-3 animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold block">¡Mensaje Enviado Exitosamente!</span>
                  <span>Tu reporte ha sido guardado en el buzón `ag_q`. Un gestor agronómico te contactará muy pronto.</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tipo de Solicitud *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as PqrsType })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                >
                  <option value="Consulta Técnica">Consulta Técnica Agronómica</option>
                  <option value="Sugerencia">Sugerencia de Productos</option>
                  <option value="Queja">Queja sobre Servicio / Despacho</option>
                  <option value="Reclamo">Reclamo sobre Producto o Garantía</option>
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Pedro Antonio Morales"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    placeholder="pedro.morales@finca.co"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Teléfono Celular *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+57 312 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Número de Orden (Si Aplica)</label>
                  <input
                    type="text"
                    placeholder="Ej: AG-2026-8812"
                    value={formData.orderNumber}
                    onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Asunto de la Solicitud *</label>
                <input
                  type="text"
                  required
                  placeholder="Resumen de la duda o reclamo..."
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Detalle del Mensaje *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe con precisión tu requerimiento o especificaciones del lote de siembra..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Enviar PQRS a la Administración</span>
              </button>
            </form>
          </div>

          {/* Right Info & FAQ Box */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-4 shadow-md">
              <h3 className="font-bold text-sm font-heading text-emerald-400">
                Líneas de Atención Presencial & Telefónica
              </h3>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">PBX Nacional Fincas</span>
                    <span>(601) 800-AGRO / +57 300 900 1122</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Correo de Atención Comercial</span>
                    <span>contacto@agranda-insumos.co</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Central de Distribución Principal</span>
                    <span>Zona Industrial Agropecuaria No. 4, Manizales - Caldas</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Horario de Despacho</span>
                    <span>Lunes a Sábado: 6:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Accordion Box */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-4">
              <h3 className="font-bold text-sm text-slate-900">
                Preguntas Frecuentes sobre Insumos
              </h3>

              <div className="divide-y divide-slate-100">
                {faqs.map((faq, index) => (
                  <div key={index} className="py-3">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between text-left font-bold text-xs text-slate-800 hover:text-emerald-700"
                    >
                      <span>{faq.q}</span>
                      {openFaq === index ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                      )}
                    </button>
                    {openFaq === index && (
                      <p className="mt-2 text-xs text-slate-500 leading-relaxed pl-2 border-l-2 border-emerald-500">
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
