import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { EX_CITIES } from '../data';
import { 
  User, MapPin, Star, Layers, ArrowLeftRight, Heart, 
  MessageSquare, Settings, Globe, LogOut, Check, Save 
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, login, logout, books, proposals, showToast } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [editRegion, setEditRegion] = useState(user?.region || 'Toshkent');

  if (!user) {
    return (
      <div className="py-12 text-center flex flex-col items-center gap-4">
        <User className="w-12 h-12 text-stone-300" />
        <h3 className="text-sm font-bold text-stone-800">Siz tizimga kirmagansiz</h3>
        <p className="text-xs text-stone-500">Profil ma’lumotlarini ko‘rish uchun iltimos tizimga kiring.</p>
        <button 
          onClick={() => navigate('/login')} 
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-5 rounded-xl text-xs transition-colors"
        >
          Kirish sahifasi
        </button>
      </div>
    );
  }

  // Statistics calculations
  const myUploadedBooksCount = books.filter(b => b.ownerId === 'me').length;
  const completedExchangesCount = proposals.filter(p => p.status === 'Yakunlandi').length;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    login(editName, editPhone, editEmail, editRegion);
    setIsEditing(false);
    showToast('Profil sozlamalari saqlandi!', 'success');
  };

  const menuItems = [
    { label: 'Mening e’lonlarim', desc: 'Siz joylashtirgan kitoblar', icon: <Layers className="w-5 h-5 text-emerald-600" />, path: '/my-books' },
    { label: 'Mening ayirboshlashlarim', desc: 'Almashuv takliflari nazorati', icon: <ArrowLeftRight className="w-5 h-5 text-violet-600" />, path: '/exchange' },
    { label: 'Saqlangan kitoblar', desc: 'Keyinroq ko‘rishga belgilanganlar', icon: <Heart className="w-5 h-5 text-rose-600" />, path: '/saved' },
    { label: 'Suhbatlar / Xabarlar', desc: 'Yozishmalar va kelishuvlar', icon: <MessageSquare className="w-5 h-5 text-sky-600" />, path: '/chat' }
  ];

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      {/* Profile Overview Card */}
      <div className="bg-gradient-to-br from-[#121814] to-emerald-950 p-6 rounded-3xl text-white relative overflow-hidden shadow-lg">
        <div className="absolute w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl -top-10 -right-10"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-20 h-20 rounded-full border-4 border-emerald-500/35 bg-emerald-900/40 object-cover"
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-display font-black tracking-tight">{user.name}</h2>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-stone-300 mt-1.5 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {user.region}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-md text-[11px] text-amber-400">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                {user.rating} Reyting
              </span>
            </div>
          </div>
          
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-emerald-600/35 hover:bg-emerald-600 text-white border border-emerald-500/40 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            {isEditing ? 'Bekor qilish' : 'Tahrirlash'}
          </button>
        </div>

        {/* Quick statistics widgets */}
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-emerald-900/50 text-center relative z-10">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">Yuklangan kitoblar</span>
            <span className="text-xl font-black text-white">{myUploadedBooksCount} ta</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">Muvaffaqiyatli almashuvlar</span>
            <span className="text-xl font-black text-amber-400">{completedExchangesCount} ta</span>
          </div>
        </div>
      </div>

      {/* COLLAPSIBLE EDIT PROFILE SETTINGS FORM */}
      {isEditing && (
        <div className="bg-white p-6 rounded-3xl border border-emerald-900/5 shadow-md">
          <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wider mb-4 flex items-center gap-1.5 border-b border-stone-100 pb-2">
            <Settings className="w-4 h-4 text-emerald-600" />
            <span>Profilni tahrirlash</span>
          </h3>

          <form onSubmit={handleSaveSettings} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-stone-700">Ism va familiya</label>
              <input 
                type="text"
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 px-3.5 py-2.5 rounded-xl text-xs focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-stone-700">Telefon raqam</label>
                <input 
                  type="tel"
                  required
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 px-3.5 py-2.5 rounded-xl text-xs focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-stone-700">Elektron pochta</label>
                <input 
                  type="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 px-3.5 py-2.5 rounded-xl text-xs focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-stone-700">Hududingiz (Viloyat / Shahar)</label>
              <select
                value={editRegion}
                onChange={(e) => setEditRegion(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 px-3.5 py-2.5 rounded-xl text-xs focus:outline-hidden focus:border-emerald-600 cursor-pointer appearance-none"
              >
                {EX_CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer self-end"
            >
              <Save className="w-4 h-4" /> Saqlash
            </button>
          </form>
        </div>
      )}

      {/* Main interactive profile menu options */}
      <div className="bg-white rounded-3xl border border-emerald-900/5 shadow-xs overflow-hidden">
        <div className="p-4 bg-stone-50 border-b border-stone-100">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Tezkor havolalar</span>
        </div>

        <div className="divide-y divide-stone-100">
          {menuItems.map((item) => (
            <div 
              key={item.label}
              onClick={() => navigate(item.path)}
              className="p-4 hover:bg-stone-50 flex items-center justify-between cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-800">{item.label}</h4>
                  <p className="text-[10px] text-stone-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
              <span className="text-stone-300 text-sm">➔</span>
            </div>
          ))}
        </div>
      </div>

      {/* Language Preferences and Log out */}
      <div className="bg-white rounded-3xl border border-emerald-900/5 shadow-xs p-4 flex flex-col gap-3">
        {/* Language selector */}
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-stone-700 flex items-center gap-2">
            <Globe className="w-4 h-4 text-stone-400 shrink-0" />
            <span>Ilova tili</span>
          </span>
          <div className="flex gap-1.5 items-center">
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded text-[10px] font-bold">
              O‘zbekcha (O‘zbekiston)
            </span>
            <span className="text-stone-300">|</span>
            <span className="text-[10px] text-stone-400 hover:text-emerald-600 font-medium cursor-pointer">
              English
            </span>
          </div>
        </div>

        <hr className="border-stone-100" />

        {/* Log out */}
        <button
          onClick={() => {
            logout();
            navigate('/welcome');
          }}
          className="w-full text-left py-2 hover:bg-rose-50 rounded-xl px-2 flex items-center gap-2.5 text-xs text-rose-600 font-bold hover:text-rose-700 transition-colors cursor-pointer"
        >
          <LogOut className="w-4.5 h-4.5 text-rose-500 shrink-0" />
          <span>Tizimdan chiqish</span>
        </button>
      </div>
    </div>
  );
};
