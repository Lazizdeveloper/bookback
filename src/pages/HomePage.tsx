import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { BookCard } from '../components/BookCard';
import { EX_CITIES } from '../data';
import { 
  Search, MapPin, Sparkles, BookOpen, 
  ArrowLeftRight, Gift, HelpCircle, Map, ChevronRight, Filter 
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, books } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(user?.region || 'Toshkent');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/search');
    }
  };

  // Filter books by city/region
  const cityBooks = books.filter(b => b.location.toLowerCase() === selectedCity.toLowerCase());

  // Section 1: Yaqin atrofdagi kitoblar (distance < 3km or matched city)
  const nearbyBooks = cityBooks.filter(b => {
    const distNum = parseFloat(b.distance);
    return isNaN(distNum) || distNum <= 3.0;
  }).slice(0, 4);

  // Fallback if nearby is empty: show any books from that city
  const finalNearby = nearbyBooks.length > 0 ? nearbyBooks : cityBooks.slice(0, 4);

  // Section 2: Eng yangi e'lonlar
  const latestBooks = [...books].slice(0, 4);

  // Section 3: Ayirboshlash uchun tavsiyalar (type === 'exchange')
  const exchangeRecommendations = books.filter(b => b.type === 'exchange').slice(0, 4);

  // Section 4: Bepul berilayotgan kitoblar (type === 'free')
  const freeGiveaways = books.filter(b => b.type === 'free').slice(0, 4);

  // Genre categories
  const genres = [
    { name: 'Badiiy adabiyot', count: books.filter(b => b.genre === 'Badiiy adabiyot').length },
    { name: 'Shaxsiy rivojlanish', count: books.filter(b => b.genre === 'Shaxsiy rivojlanish').length },
    { name: 'Dasturlash / IT', count: books.filter(b => b.genre === 'Dasturlash / IT').length },
    { name: 'Biznes va moliya', count: books.filter(b => b.genre === 'Biznes va moliya').length },
    { name: 'Tarixiy / Klassika', count: books.filter(b => b.genre.includes('Tarixiy') || b.genre.includes('Klassika')).length }
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Banner and Search Section */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-emerald-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg">
        {/* Decorative elements */}
        <div className="absolute w-60 h-60 bg-emerald-500/10 rounded-full blur-2xl -top-20 -right-20"></div>
        <div className="absolute w-40 h-40 bg-amber-500/10 rounded-full blur-xl -bottom-10 -left-10"></div>
        
        <div className="relative z-10 max-w-3xl flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl md:text-2xl font-display font-extrabold tracking-tight">
                Salom, {user ? user.name.split(' ')[0] : 'kitobxon'}! 👋
              </h2>
              <p className="text-emerald-200 text-xs mt-1">Bugun qanday yangi asarlarni kashf qilamiz?</p>
            </div>
            
            {/* Quick city changer */}
            <div className="bg-emerald-800/60 border border-emerald-700 rounded-xl px-3 py-1.5 flex items-center gap-1.5 self-start shrink-0">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <select 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent text-white text-xs font-bold focus:outline-hidden appearance-none pr-4 cursor-pointer"
              >
                {EX_CITIES.map(city => (
                  <option key={city} value={city} className="bg-emerald-900 text-white">{city}</option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-sm font-medium mt-1 text-emerald-100 max-w-xl">
            “Kitoblar aylanib yursin, bilim tarqalsin!” O‘zingizga eng yaqin kitobdonlar bilan uchrashing.
          </p>

          {/* Search bar form */}
          <form onSubmit={handleSearchSubmit} className="mt-4 flex gap-2 w-full max-w-2xl bg-white p-1.5 rounded-2xl shadow-md">
            <div className="flex-1 flex items-center gap-2 px-3 text-stone-400">
              <Search className="w-5 h-5 shrink-0 text-emerald-600" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Kitob nomi, muallif yoki janr bo‘yicha qidiring..."
                className="bg-transparent text-stone-800 placeholder-stone-400 text-sm focus:outline-hidden w-full"
              />
            </div>
            <button 
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
            >
              Izlash
            </button>
          </form>
        </div>
      </section>

      {/* Quick category buttons */}
      <section className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <button 
          onClick={() => navigate('/search?type=selling')}
          className="bg-white p-4 rounded-2xl border border-emerald-900/5 hover:border-emerald-600/20 hover:bg-emerald-50/20 shadow-xs flex flex-col items-center text-center gap-2 transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-stone-800">Sotib olish</span>
        </button>

        <button 
          onClick={() => navigate('/search?type=exchange')}
          className="bg-white p-4 rounded-2xl border border-emerald-900/5 hover:border-emerald-600/20 hover:bg-emerald-50/20 shadow-xs flex flex-col items-center text-center gap-2 transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center">
            <ArrowLeftRight className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-stone-800">Ayirboshlash</span>
        </button>

        <button 
          onClick={() => navigate('/search?type=free')}
          className="bg-white p-4 rounded-2xl border border-emerald-900/5 hover:border-emerald-600/20 hover:bg-emerald-50/20 shadow-xs flex flex-col items-center text-center gap-2 transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
            <Gift className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-stone-800">Bepul kitoblar</span>
        </button>

        <button 
          onClick={() => navigate('/search?type=request')}
          className="bg-white p-4 rounded-2xl border border-emerald-900/5 hover:border-emerald-600/20 hover:bg-emerald-50/20 shadow-xs flex flex-col items-center text-center gap-2 transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-stone-800">Kitob so‘rash</span>
        </button>

        <button 
          onClick={() => navigate('/map')}
          className="col-span-2 sm:col-span-1 bg-gradient-to-tr from-amber-50 to-amber-100/50 p-4 rounded-2xl border border-amber-200/50 hover:border-amber-400 shadow-xs flex flex-col items-center text-center gap-2 transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-xs">
            <Map className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-amber-950">Yaqinimdagi</span>
        </button>
      </section>

      {/* Section 1: Yaqin atrofdagi kitoblar */}
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-display font-bold text-stone-900">Yaqin atrofdagi kitoblar</h3>
            <p className="text-[11px] text-stone-500">Siz tanlagan hudud ({selectedCity}) bo‘yicha eng yaqin joylanganlar</p>
          </div>
          <button 
            onClick={() => navigate(`/search?location=${selectedCity}`)}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5 cursor-pointer"
          >
            Barchasi <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {finalNearby.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {finalNearby.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-stone-200">
            <p className="text-xs text-stone-400">Bu hududda hozircha kitoblar mavjud emas.</p>
            <button 
              onClick={() => navigate('/add')}
              className="mt-2 text-xs font-semibold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
            >
              + Birinchi bo‘lib siz joylang
            </button>
          </div>
        )}
      </section>

      {/* Section 2: Eng yangi e’lonlar */}
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-display font-bold text-stone-900">Eng yangi e’lonlar</h3>
            <p className="text-[11px] text-stone-500">Barcha hududlar bo‘yicha tizimga qo‘shilgan oxirgi kitoblar</p>
          </div>
          <button 
            onClick={() => navigate('/search')}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5 cursor-pointer"
          >
            Barchasi <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {latestBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Section 3: Ayirboshlash uchun tavsiyalar */}
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-display font-bold text-stone-900">Ayirboshlash (Almashish) uchun tavsiyalar</h3>
            <p className="text-[11px] text-stone-500">Boshqa asarlarga o‘zaro almashtiriladigan qiziqarli kitoblar</p>
          </div>
          <button 
            onClick={() => navigate('/search?type=exchange')}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5 cursor-pointer"
          >
            Barchasi <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {exchangeRecommendations.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Section 4: Bepul berilayotgan kitoblar */}
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-display font-bold text-stone-900">Hadyaga berilayotgan bepul kitoblar</h3>
            <p className="text-[11px] text-stone-500">Egalari tomonidan bepul (tekinga) ulashilayotgan kitoblar</p>
          </div>
          <button 
            onClick={() => navigate('/search?type=free')}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5 cursor-pointer"
          >
            Barchasi <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {freeGiveaways.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Popular Genres Section */}
      <section className="flex flex-col gap-4 bg-emerald-500/5 border border-emerald-900/5 p-6 rounded-3xl">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-display font-bold text-emerald-950">Mashhur janrlar</h3>
            <p className="text-[11px] text-emerald-800">Kitobxonlar eng ko‘p qiziqayotgan sohalar</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {genres.map(genre => (
            <button
              key={genre.name}
              onClick={() => navigate(`/search?genre=${encodeURIComponent(genre.name)}`)}
              className="bg-white hover:bg-emerald-600 hover:text-white border border-emerald-900/10 px-4 py-2.5 rounded-xl text-xs font-semibold text-stone-800 transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>{genre.name}</span>
              <span className="bg-stone-100 text-stone-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full group-hover:bg-emerald-700 group-hover:text-white">
                {genre.count}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
