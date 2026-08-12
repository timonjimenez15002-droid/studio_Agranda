import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(
      customMsg || '¡Hola AGRANDA! Requiero asesoría técnica para la compra de insumos agrícolas y fertilizantes.'
    );
    window.open(`https://wa.me/573009001122?text=${text}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-fade-in text-slate-800">
          
          {/* Header */}
          <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-xs border border-emerald-500">
                  AG
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-emerald-800 absolute bottom-0 right-0" />
              </div>
              <div>
                <h4 className="font-bold text-xs font-heading">Asesoría WhatsApp AGRANDA</h4>
                <span className="text-[10px] text-emerald-200 block">Agrónomo de turno en línea</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-emerald-200 hover:text-white rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-slate-50 space-y-3 text-xs">
            <div className="p-3 bg-white rounded-xl shadow-xs border border-slate-200/80 text-slate-700 space-y-1">
              <span className="font-bold text-emerald-800 block text-[11px]">Ing. Mauricio - Dpto. Técnico</span>
              <p>¡Hola! 👋 ¿En qué cultivo o dosis de fertilización necesitas apoyo hoy?</p>
            </div>

            <div>
              <textarea
                rows={2}
                placeholder="Escribe tu consulta aquí..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="w-full p-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden bg-white"
              />
            </div>

            <button
              onClick={handleOpenWhatsApp}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Iniciar Chat en WhatsApp</span>
            </button>
          </div>

        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl flex items-center justify-center transition-all hover:scale-110 group relative"
        aria-label="Atención por WhatsApp"
      >
        <MessageCircle className="w-7 h-7 stroke-[2.2]" />
        
        {/* Pulse Indicator */}
        <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-amber-400 border-2 border-white animate-ping" />
        <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-amber-400 border-2 border-white" />
      </button>
    </div>
  );
};
