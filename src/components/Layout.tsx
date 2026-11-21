import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Toast } from './Toast';
import { 
  Home, Search, Plus, MessageCircle, User, 
  BookOpen, ArrowLeftRight, Map, Heart, 
  Layers, Bell, Compass, Users, Sparkles, LogOut 
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, notifications } = useApp();

  const currentPath = location.pathname;

  // Unread notifications count
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const menuItems = [
    { label: 'Bosh sahifa', path: '/home', icon: <Home className="w-5 h-5" /> },
    { label: 'Qidiruv / Izlash', path: '/search', icon: <Search className="w-5 h-5" /> },
    { label: 'Xarita', path: '/map', icon: <Map className="w-5 h-5" /> },
    { label: 'Ayirboshlashlar', path: '/exchange', icon: <ArrowLeftRight className="w-5 h-5" /> },
    { label: 'Kitob klublari', path: '/clubs', icon: <Users className="w-5 h-5" /> },
    { label: 'Tavsiyalar', path: '/recommendations', icon: <Sparkles className="w-5 h-5" /> },
    { label: 'Saqlanganlar', path: '/saved', icon: <Heart className="w-5 h-5" /> },
    { label: 'Xabarlar', path: '/chat', icon: <MessageCircle className="w-5 h-5" />, badge: true },
    { label: 'Mening e’lonlarim', path: '/my-books', icon: <Layers className="w-5 h-5" /> },
    { label: 'Bildirishnomalar', path: '/notifications', icon: <Bell className="w-5 h-5" />, notifCount: unreadCount },
    { label: 'Profil / Sozlamalar', path: '/profile', icon: <User className="w-5 h-5" /> }
  ];

  // For bottom nav on mobile
  const mobileNavItems = [
    { label: 'Asosiy', path: '/home', icon: <Home className="w-5.5 h-5.5" /> },
    { label: 'Qidiruv', path: '/search', icon: <Search className="w-5.5 h-5.5" /> },
    { label: 'Qo‘shish', path: '/add', icon: <Plus className="w-6 h-6 text-white" />, isCenter: true },
    { label: 'Xabarlar', path: '/chat', icon: <MessageCircle className="w-5.5 h-5.5" />, badge: true },
    { label: 'Profil', path: '/profile', icon: <User className="w-5.5 h-5.5" /> }
  ];

  const handleNav = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#faf8f5]">
      <Toast />

      {/* DESKTOP SIDEBAR NAVIGATION (Hidden on Mobile) */}
      <aside className="hidden md:flex flex-col w-72 bg-[#121814] text-white shrink-0 sticky top-0 h-screen p-6 border-r border-emerald-950/20 shadow-xl justify-between">
        <div className="flex flex-col gap-6 overflow-y-auto pr-1">
          {/* Logo and Brand */}
          <div className="flex flex-col gap-1.5 cursor-pointer" onClick={() => navigate('/home')}>
            <div className="flex items-center gap-2 text-emerald-400">
              <BookOpen className="w-8 h-8 fill-emerald-500/10 stroke-2" />
              <span className="text-2xl font-display font-extrabold tracking-tight text-white">
                Book<span className="text-emerald-400">Back</span>
              </span>
            </div>
            <p className="text-[10px] text-stone-400 font-medium italic tracking-wide mt-1 pl-0.5">
              “Kitob almashing, bilim ulashing”
            </p>
          </div>

          <hr className="border-emerald-900/40" />

          {/* Nav Links */}
          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const isActive = currentPath === item.path || (item.path !== '/home' && currentPath.startsWith(item.path));
              return (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.path)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-900/10 translate-x-1' 
                      : 'text-stone-300 hover:text-white hover:bg-emerald-900/15'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  
                  {/* Badge support */}
                  {item.badge && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  )}
                  {item.notifCount !== undefined && item.notifCount > 0 ? (
                    <span className="bg-amber-500 text-stone-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                      {item.notifCount}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User profile footer info */}
        <div className="pt-4 border-t border-emerald-900/40 flex flex-col gap-3 shrink-0">
          {user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3" onClick={() => navigate('/profile')}>
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full border border-emerald-800 bg-emerald-950/20 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                />
                <div className="cursor-pointer" onClick={() => navigate('/profile')}>
                  <h4 className="text-xs font-bold text-white truncate max-w-[120px]">{user.name}</h4>
                  <p className="text-[10px] text-stone-400 truncate max-w-[120px]">{user.region}</p>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  logout();
                  navigate('/welcome');
                }}
                className="p-2 rounded-lg text-stone-400 hover:text-rose-400 hover:bg-rose-950/10 transition-colors cursor-pointer"
                title="Chiqish"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-xs font-semibold shadow-md transition-colors"
            >
              Kirish / Ro‘yxatdan o‘tish
            </button>
          )}
          <div className="text-[10px] text-stone-500 text-center font-light">
            © 2026 BookBack Uzbekistan
          </div>
        </div>
      </aside>

      {/* MOBILE HEADER (Sticky Top Bar, Hidden on Desktop) */}
      <header className="md:hidden sticky top-0 z-40 bg-[#121814] text-white px-4 py-3 flex items-center justify-between border-b border-emerald-950/20 shadow-md">
        <div className="flex items-center gap-2" onClick={() => navigate('/home')}>
          <BookOpen className="w-6 h-6 text-emerald-400" />
          <span className="text-xl font-display font-extrabold text-white">
            Book<span className="text-emerald-400">Back</span>
          </span>
        </div>
        
        {/* Floating Bell Icon for Notifications */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/notifications')}
            className="p-1.5 rounded-full hover:bg-emerald-900/35 relative text-stone-200 hover:text-white transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-[#121814]"></span>
            )}
          </button>

          {user ? (
            <img 
              onClick={() => navigate('/profile')}
              src={user.avatar} 
              alt={user.name} 
              className="w-8 h-8 rounded-full border border-emerald-800 bg-emerald-950/20 object-cover cursor-pointer"
            />
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300"
            >
              Kirish
            </button>
          )}
        </div>
      </header>

      {/* MAIN VIEWPORT BODY */}
      <main className="flex-1 overflow-x-hidden pb-24 md:pb-6 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>

      {/* MOBILE BOTTOM NAVIGATION BAR (Fixed at bottom on Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/60 shadow-lg px-2 py-2.5 flex justify-around items-end">
        {mobileNavItems.map((item) => {
          const isActive = currentPath === item.path || (item.path !== '/home' && currentPath.startsWith(item.path));
          
          if (item.isCenter) {
            return (
              <button
                key={item.label}
                onClick={() => handleNav(item.path)}
                className="relative -top-5 w-14 h-14 bg-gradient-to-tr from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-full flex items-center justify-center shadow-lg border-4 border-white text-white active:scale-95 transition-all cursor-pointer"
                title={item.label}
              >
                {item.icon}
              </button>
            );
          }

          return (
            <button
              key={item.label}
              onClick={() => handleNav(item.path)}
              className={`flex flex-col items-center gap-1 cursor-pointer w-14 transition-all duration-200 ${
                isActive ? 'text-emerald-600 scale-105 font-semibold' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badge && (
                  <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                )}
              </div>
              <span className="text-[9px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
