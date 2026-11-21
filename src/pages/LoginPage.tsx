import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { BookOpen, LogIn, Mail, Phone, Lock, Sparkles } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useApp();

  const [phone, setPhone] = useState('+998 90 123 45 67');
  const [email, setEmail] = useState('sherzod@example.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Sherzod Ro‘ziyev');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(name || 'Mehmon', phone, email, 'Toshkent');
    navigate('/home');
  };

  const handleQuickLogin = () => {
    login('Sherzod Ro‘ziyev', '+998 90 123 45 67', 'sherzod@example.com', 'Toshkent');
    navigate('/home');
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center py-6 px-4">
      <div className="bg-white p-8 rounded-3xl border border-emerald-900/5 shadow-xl w-full max-w-md">
        <div className="text-center flex flex-col items-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-display font-extrabold text-stone-900">Xush kelibsiz!</h2>
          <p className="text-xs text-stone-500">BookBack hisobingizga kiring yoki sinov rejimidan foydalaning</p>
        </div>

        {/* Quick login helper button */}
        <button
          type="button"
          onClick={handleQuickLogin}
          className="w-full mb-6 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Demo hisob bilan tezkor kirish (Bir marta bosish)</span>
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-stone-700">Ism (Demo uchun)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-stone-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ismingizni kiriting"
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-stone-700">Telefon raqam</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-stone-400">
                <Phone className="w-4 h-4" />
              </span>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+998 90 123 45 67"
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-stone-700">Elektron pochta (Email)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-stone-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="misol@pochta.uz"
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-stone-700">Parol</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-stone-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogIn className="w-4 h-4" /> Kirish
          </button>
        </form>

        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-stone-200"></div>
          <span className="flex-shrink mx-4 text-xs text-stone-400 font-medium">yoki ijtimoiy tarmoqlar</span>
          <div className="flex-grow border-t border-stone-200"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleQuickLogin}
            className="border border-stone-200 hover:bg-stone-50 text-stone-700 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.7 0 3.3.6 4.5 1.7l2.4-2.4C17.3 1.5 14.9.5 12.24.5c-5.8 0-10.5 4.7-10.5 10.5s4.7 10.5 10.5 10.5c5.7 0 10.5-4.1 10.5-10.5 0-.7-.1-1.3-.2-1.7H12.24z"/>
            </svg>
            <span>Google</span>
          </button>
          <button
            onClick={handleQuickLogin}
            className="border border-stone-200 hover:bg-stone-50 text-stone-700 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#0088cc]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.94-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.37.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .26z"/>
            </svg>
            <span>Telegram</span>
          </button>
        </div>

        <p className="text-center text-xs text-stone-500 mt-6">
          Akkauntingiz yo‘qmi?{' '}
          <span 
            onClick={() => navigate('/register')} 
            className="text-emerald-600 font-bold hover:underline cursor-pointer"
          >
            Ro‘yxatdan o‘ting
          </span>
        </p>
      </div>
    </div>
  );
};
