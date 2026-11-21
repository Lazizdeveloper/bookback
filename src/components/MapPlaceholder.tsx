import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Book } from '../types';
import { MapPin, Navigation, Info, Search, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CityCoord {
  name: string;
  x: number; // percentage from left
  y: number; // percentage from top
  desc: string;
}

const CITIES_COORDS: CityCoord[] = [
  { name: 'Toshkent', x: 80, y: 35, desc: 'Toshkent shahri, Yunusobod tumani' },
  { name: 'Samarqand', x: 50, y: 55, desc: 'Samarqand shahri, Registon yaqinida' },
  { name: 'Farg‘ona', x: 88, y: 48, desc: 'Farg‘ona shahri, markazga yaqin' },
  { name: 'Andijon', x: 92, y: 40, desc: 'Andijon shahri, Bobur maydoni atrofi' },
  { name: 'Namangan', x: 86, y: 30, desc: 'Namangan shahri, Chorsu yaqinida' },
  { name: 'Buxoro', x: 35, y: 50, desc: 'Buxoro shahri, Labi Hovuz atrofi' },
  { name: 'Navoiy', x: 42, y: 42, desc: 'Navoiy shahri, Karmana tumani' },
  { name: 'Urgut', x: 52, y: 65, desc: 'Urgut tumani, tog‘ bag‘rida' }
];

export const MapPlaceholder: React.FC = () => {
  const navigate = useNavigate();
  const { books } = useApp();
  const [selectedCity, setSelectedCity] = useState<string>('Toshkent');

  // Filter books in the selected city
  const cityBooks = books.filter(b => b.location.toLowerCase() === selectedCity.toLowerCase());

  const currentCityInfo = CITIES_COORDS.find(c => c.name.toLowerCase() === selectedCity.toLowerCase()) || CITIES_COORDS[0];

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-emerald-900/5 shadow-sm flex flex-col h-[600px] w-full">
      {/* Top bar with city details */}
      <div className="p-4 bg-emerald-900 text-white flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-emerald-400 animate-pulse" />
          <div>
            <h3 className="font-semibold text-sm">BookBack Interaktiv Xarita</h3>
            <p className="text-[11px] text-emerald-200">Yaqiningizdagi kitoblarni qidiring (Taxminiy joylashuv)</p>
          </div>
        </div>
        <div className="bg-emerald-800/80 px-3 py-1 rounded-full border border-emerald-700 text-xs flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-medium text-amber-100">{selectedCity}</span>
        </div>
      </div>

      {/* Main Map Viewport */}
      <div className="flex-1 bg-stone-50 relative overflow-hidden select-none flex items-center justify-center p-4">
        {/* Abstract Stylized Vector Grid of Uzbekistan Map */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        {/* Simulated stylized desert/mountains visual border */}
        <svg className="w-full h-full absolute inset-0 text-emerald-100/35" viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main country border boundary simulation */}
          <path d="M 100,200 C 150,150 250,120 300,100 C 400,80 500,120 600,100 C 700,80 750,140 800,150 C 850,160 900,120 950,200 C 970,250 930,300 950,350 C 970,400 900,450 850,480 C 800,500 780,450 720,440 C 650,430 600,520 500,550 C 400,580 320,530 250,510 C 180,490 120,440 80,380 C 50,320 80,250 100,200 Z" fill="currentColor" stroke="#10b981" strokeWidth="2" strokeDasharray="6 6"/>
          {/* Aral Sea or desert lines */}
          <path d="M 180,180 Q 220,160 200,210 Z" fill="#93c5fd" className="opacity-30" />
        </svg>

        {/* Mapbox token reminder badge */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs border border-stone-200 p-2.5 rounded-lg max-w-xs shadow-xs z-10 hidden sm:block">
          <div className="flex gap-2 items-start text-[11px] text-stone-600">
            <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              Loyihaga real Mapbox xaritasini ulash uchun <code className="bg-stone-100 px-1 py-0.5 rounded text-emerald-700">VITE_MAPBOX_TOKEN</code> o‘rnating. Hozircha interaktiv mockup xarita ishlamoqda.
            </p>
          </div>
        </div>

        {/* Regional City Pins */}
        {CITIES_COORDS.map((city) => (
          <button
            key={city.name}
            onClick={() => setSelectedCity(city.name)}
            style={{ left: `${city.x}%`, top: `${city.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 flex flex-col items-center cursor-pointer"
          >
            {/* Pulsing ring */}
            <span className={`absolute inline-flex h-8 w-8 rounded-full bg-emerald-500/30 animate-ping duration-1000 ${selectedCity === city.name ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}></span>
            
            {/* Map pin */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${selectedCity === city.name ? 'bg-emerald-600 text-white scale-125' : 'bg-white text-emerald-700 hover:bg-emerald-50'}`}>
              <MapPin className="w-4 h-4" />
            </div>

            {/* City Label */}
            <span className={`mt-1.5 px-2 py-0.5 rounded-md text-[11px] font-bold shadow-xs border transition-all ${selectedCity === city.name ? 'bg-emerald-900 text-white border-emerald-800' : 'bg-white text-stone-800 border-stone-100'}`}>
              {city.name}
            </span>
          </button>
        ))}
      </div>

      {/* Selected City Books Panel */}
      <div className="p-4 border-t border-stone-100 bg-stone-50 max-h-[220px] overflow-y-auto shrink-0 flex flex-col gap-2">
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
            <span>📍 {currentCityInfo.desc}</span>
          </h4>
          <span className="text-[11px] text-stone-500 font-medium">{cityBooks.length} ta kitob topildi</span>
        </div>

        {cityBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cityBooks.map((book) => (
              <div 
                key={book.id}
                onClick={() => navigate(`/books/${book.id}`)}
                className="bg-white p-3 rounded-xl border border-stone-200/60 hover:border-emerald-500/30 flex items-center gap-3 cursor-pointer shadow-xs hover:shadow-xs transition-all duration-200"
              >
                {/* Micro cover preview */}
                <div className={`w-10 h-14 ${book.image} rounded-md flex flex-col items-center justify-center p-1 relative shrink-0 overflow-hidden`}>
                  <div className="absolute top-0 bottom-0 left-1 w-[1px] bg-white/20"></div>
                  <span className="text-[7px] text-white/50 text-center uppercase tracking-tighter">Book</span>
                </div>

                <div className="flex-1 min-w-0">
                  <h5 className="text-xs font-bold text-stone-800 truncate">{book.title}</h5>
                  <p className="text-[10px] text-stone-400 truncate">{book.author}</p>
                  
                  <div className="flex justify-between items-center mt-1.5">
                    {book.type === 'selling' ? (
                      <span className="text-[10px] font-bold text-emerald-600">
                        {book.price?.toLocaleString()} so‘m
                      </span>
                    ) : book.type === 'exchange' ? (
                      <span className="text-[10px] font-semibold text-violet-600 truncate max-w-[100px]">
                        🔄 Almashiladi
                      </span>
                    ) : book.type === 'free' ? (
                      <span className="text-[10px] font-semibold text-amber-500">
                        🎁 Bepul (Tekin)
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-sky-500">
                        🔍 Izlamoqda
                      </span>
                    )}
                    <span className="text-[10px] font-medium text-stone-500 shrink-0">{book.distance}</span>
                  </div>
                </div>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/books/${book.id}`);
                  }}
                  className="p-1.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors shrink-0"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center bg-white rounded-xl border border-dashed border-stone-200">
            <p className="text-xs text-stone-400">Bu hududda hozircha kitoblar mavjud emas. Birinchi bo‘lib siz joylang!</p>
            <button 
              onClick={() => navigate('/add')}
              className="mt-2 text-xs font-semibold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
            >
              + Kitob qo‘shish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
