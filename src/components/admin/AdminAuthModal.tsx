import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  UserCheck, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Check
} from 'lucide-react';
import { AdminUser } from '../../types';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AdminUser) => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('admin@agranda.com');
  const [password, setPassword] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  if (!isOpen) return null;

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@agranda.com' && password === 'admin123') {
      const admin: AdminUser = {
        email,
        name: 'Ing. Carlos Mendoza (Administrador General)',
        role: 'Super Admin Agro',
        isLoggedIn: true,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      };
      onLoginSuccess(admin);
      onClose();
    } else {
      setErrorMsg('Credenciales incorrectas. Usa: admin@agranda.com / admin123');
    }
  };

  const handleGoogleOneTapLogin = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      const admin: AdminUser = {
        email: 'carlos.mendoza.google@agranda.com',
        name: 'Carlos Mendoza (Google OAuth 2.0)',
        role: 'Administrador Certificado',
        isLoggedIn: true,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
      };
      setIsGoogleLoading(false);
      onLoginSuccess(admin);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-xl bg-emerald-600/30 text-emerald-400 flex items-center justify-center mb-3 border border-emerald-500/30">
            <Lock className="w-6 h-6" />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
            Acceso Restringido
          </span>
          <h2 className="text-xl font-bold font-heading text-white">
            Panel de Administración AGRANDA
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Gestión de inventario, ventas `ag_v` y atención `ag_q`.
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          
          {errorMsg && (
            <div className="p-3 bg-rose-50 text-rose-800 border border-rose-200 text-xs rounded-xl font-medium">
              {errorMsg}
            </div>
          )}

          {/* Google One Tap / OAuth 2.0 Button */}
          <div>
            <button
              onClick={handleGoogleOneTapLogin}
              disabled={isGoogleLoading}
              className="w-full py-2.5 px-4 border border-slate-300 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-3 transition-colors shadow-xs"
            >
              {/* Google SVG G Logo */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{isGoogleLoading ? 'Verificando con Google...' : 'Iniciar Sesión con Google OAuth 2.0'}</span>
            </button>
            <span className="text-[10px] text-slate-400 block text-center mt-1">
              Google One Tap Activado para Administradores
            </span>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[10px] uppercase tracking-wider font-bold text-slate-400 absolute">
              O con credenciales
            </span>
          </div>

          {/* Manual Credentials Form */}
          <form onSubmit={handleManualLogin} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Correo Electrónico de Administrador
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Ingresar al Panel de Control</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500">
            <span className="font-bold text-slate-700 block">Credenciales de Prueba:</span>
            <span>Usuario: <code>admin@agranda.com</code> / Clave: <code>admin123</code></span>
          </div>

        </div>
      </div>
    </div>
  );
};
