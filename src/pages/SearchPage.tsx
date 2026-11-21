import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { BookCard } from '../components/BookCard';
import { EX_CITIES } from '../data';
import { Search, Filter, RefreshCw, AlertCircle, X } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const { books } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search parameters from URL
  const queryParam = searchParams.get('q') || '';
  const typeParam = searchParams.get('type') || '';
  const locationParam = searchParams.get('location') || '';
  const genreParam = searchParams.get('genre') || '';

  // Local state for filters
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [selectedType, setSelectedType] = useState(typeParam);
  const [selectedLocation, setSelectedLocation] = useState(locationParam);
  const [selectedGenre, setSelectedGenre] = useState(genreParam);
  const [selectedCondition, setSelectedCondition] = useState('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');

  // Update local search term if URL search term changes
  useEffect(() => {
    setSearchTerm(queryParam);
    setSelectedType(typeParam);
    setSelectedLocation(locationParam);
    setSelectedGenre(genreParam);
  }, [queryParam, typeParam, locationParam, genreParam]);

  // Synchronize URL search params with active filter states
  const applyFiltersToUrl = (newQuery: string, newType: string, newLoc: string, newGenre: string) => {
    const params: Record<string, string> = {};
    if (newQuery) params.q = newQuery;
    if (newType) params.type = newType;
    if (newLoc) params.location = newLoc;
    if (newGenre) params.genre = newGenre;
    setSearchParams(params);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFiltersToUrl(searchTerm, selectedType, selectedLocation, selectedGenre);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setSelectedLocation('');
    setSelectedGenre('');
    setSelectedCondition('');
    setMaxPrice('');
    setSearchParams({});
  };

  // Filtered books selection
  const filteredBooks = books.filter(book => {
    // Search Term Filter
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      const titleMatch = book.title.toLowerCase().includes(s);
      const authorMatch = book.author.toLowerCase().includes(s);
      const genreMatch = book.genre.toLowerCase().includes(s);
      if (!titleMatch && !authorMatch && !genreMatch) return false;
    }

    // Type Filter
    if (selectedType && book.type !== selectedType) return false;

    // Location Filter
    if (selectedLocation && book.location.toLowerCase() !== selectedLocation.toLowerCase()) return false;

    // Genre Filter
    if (selectedGenre && book.genre.toLowerCase() !== selectedGenre.toLowerCase()) return false;

    // Condition Filter
    if (selectedCondition && book.condition !== selectedCondition) return false;

    // Price Filter (only for selling types)
    if (maxPrice !== '') {
      if (book.type === 'selling') {
        if (book.price && book.price > maxPrice) return false;
      } else {
        // If they specify a price limit, exclude free/exchange/request? 
        // No, we let them keep free books, but let's hide books where selling price is higher
      }
    }

    return true;
  });

  const genres = [
    'Badiiy adabiyot',
    'Shaxsiy rivojlanish',
    'Dasturlash / IT',
    'Biznes va moliya',
    'Tarixiy / Klassika',
    'Bolalar adabiyoti',
    'Sarguzasht'
  ];

  const types = [
    { value: 'selling', label: 'Sotib olish' },
    { value: 'exchange', label: 'Ayirboshlash' },
    { value: 'free', label: 'Bepul (Haq tekin)' },
    { value: 'request', label: 'So‘rov / Izlamoqda' }
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Search Bar header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-display font-extrabold text-stone-900">Kitoblar katalogi</h2>
        <p className="text-xs text-stone-500">Istagan kitobingizni filtrlar yordamida tezkor toping</p>
      </div>

      {/* Grid of Search Inputs & Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Filters Panel (Left Sidebar on Desktop, Collapsible on Mobile) */}
        <aside className="bg-white p-6 rounded-3xl border border-emerald-900/5 shadow-xs flex flex-col gap-5 lg:sticky lg:top-8">
          <div className="flex justify-between items-center border-b border-stone-100 pb-3">
            <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-emerald-600" />
              <span>Filtrlash</span>
            </h3>
            <button 
              onClick={handleResetFilters}
              className="text-stone-400 hover:text-rose-600 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3 h-3" /> Tozalash
            </button>
          </div>

          {/* Type Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-stone-700">Bitim turi</label>
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => {
                  setSelectedType('');
                  applyFiltersToUrl(searchTerm, '', selectedLocation, selectedGenre);
                }}
                className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedType === '' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
              >
                Barcha e’lonlar
              </button>
              {types.map(t => (
                <button
                  key={t.value}
                  onClick={() => {
                    setSelectedType(t.value);
                    applyFiltersToUrl(searchTerm, t.value, selectedLocation, selectedGenre);
                  }}
                  className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedType === t.value ? 'bg-emerald-600 text-white shadow-xs' : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-stone-100" />

          {/* Location Filter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-stone-700">Hududni tanlang</label>
            <select
              value={selectedLocation}
              onChange={(e) => {
                setSelectedLocation(e.target.value);
                applyFiltersToUrl(searchTerm, selectedType, e.target.value, selectedGenre);
              }}
              className="w-full bg-stone-50 border border-stone-200 px-3 py-2.5 rounded-xl text-xs font-semibold focus:outline-hidden focus:border-emerald-600 cursor-pointer"
            >
              <option value="">O‘zbekiston bo‘ylab</option>
              {EX_CITIES.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Genre Filter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-stone-700">Janrlar</label>
            <select
              value={selectedGenre}
              onChange={(e) => {
                setSelectedGenre(e.target.value);
                applyFiltersToUrl(searchTerm, selectedType, selectedLocation, e.target.value);
              }}
              className="w-full bg-stone-50 border border-stone-200 px-3 py-2.5 rounded-xl text-xs font-semibold focus:outline-hidden focus:border-emerald-600 cursor-pointer"
            >
              <option value="">Barcha janrlar</option>
              {genres.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Condition Filter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-stone-700">Kitob holati</label>
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 px-3 py-2.5 rounded-xl text-xs font-semibold focus:outline-hidden focus:border-emerald-600 cursor-pointer"
            >
              <option value="">Istalgan holatda</option>
              <option value="Yangi">Yangi (Paketda)</option>
              <option value="Yaxshi">Yaxshi (Kam o‘qilgan)</option>
              <option value="O‘rtacha">O‘rtacha (O‘qilgan)</option>
              <option value="Eskirgan">Eskirgan (Varaqlari sarg‘aygan)</option>
            </select>
          </div>

          {/* Max Price Filter (Conditional) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-stone-700">Maksimal narx (UZS)</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="Masalan: 50000"
              className="w-full bg-stone-50 border border-stone-200 px-3 py-2 rounded-xl text-xs focus:outline-hidden focus:border-emerald-600"
            />
          </div>
        </aside>

        {/* Search Results Display (Right 3 Columns on Desktop) */}
        <div className="lg:col-span-3 flex flex-col gap-5">
          {/* Main search submission bar */}
          <form onSubmit={handleSearchSubmit} className="flex gap-2 bg-white p-2 rounded-2xl border border-emerald-900/5 shadow-xs">
            <div className="flex-1 flex items-center gap-2 px-3 text-stone-400">
              <Search className="w-5 h-5 text-emerald-600 shrink-0" />
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Kitob nomi, muallif yoki kalit so‘zlarni yozing..."
                className="bg-transparent text-stone-800 placeholder-stone-400 text-sm focus:outline-hidden w-full"
              />
              {searchTerm && (
                <button 
                  type="button" 
                  onClick={() => setSearchTerm('')} 
                  className="p-1 hover:bg-stone-100 rounded-full text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <button 
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Qidirish
            </button>
          </form>

          {/* Active Chips displaying selection summary */}
          <div className="flex flex-wrap gap-2 text-xs">
            {selectedType && (
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5">
                Tur: {selectedType === 'selling' ? 'Sotuv' : selectedType === 'exchange' ? 'Ayirboshlash' : selectedType === 'free' ? 'Bepul' : 'So‘rov'}
                <X className="w-3 h-3 hover:text-rose-600 cursor-pointer" onClick={() => { setSelectedType(''); applyFiltersToUrl(searchTerm, '', selectedLocation, selectedGenre); }} />
              </span>
            )}
            {selectedLocation && (
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5">
                Hudud: {selectedLocation}
                <X className="w-3 h-3 hover:text-rose-600 cursor-pointer" onClick={() => { setSelectedLocation(''); applyFiltersToUrl(searchTerm, selectedType, '', selectedGenre); }} />
              </span>
            )}
            {selectedGenre && (
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5">
                Janr: {selectedGenre}
                <X className="w-3 h-3 hover:text-rose-600 cursor-pointer" onClick={() => { setSelectedGenre(''); applyFiltersToUrl(searchTerm, selectedType, selectedLocation, ''); }} />
              </span>
            )}
            {selectedCondition && (
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5">
                Holati: {selectedCondition}
                <X className="w-3 h-3 hover:text-rose-600 cursor-pointer" onClick={() => setSelectedCondition('')} />
              </span>
            )}
            {maxPrice !== '' && (
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5">
                Narx &lt;= {maxPrice.toLocaleString()} so‘m
                <X className="w-3 h-3 hover:text-rose-600 cursor-pointer" onClick={() => setMaxPrice('')} />
              </span>
            )}
          </div>

          {/* Results Summary count */}
          <div className="flex justify-between items-center bg-stone-100/50 p-3 rounded-2xl border border-stone-200/40">
            <span className="text-xs font-semibold text-stone-600">{filteredBooks.length} ta e’lon topildi</span>
          </div>

          {/* Books Grid */}
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            /* Empty State Container */
            <div className="bg-white p-12 rounded-3xl border border-dashed border-stone-200 text-center flex flex-col items-center gap-4 justify-center py-16">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-stone-800 text-sm">Hech qanday kitob topilmadi</h4>
                <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                  Siz tanlagan filtrlarga mos keluvchi kitoblar topilmadi. Filtr parametrlarini o‘zgartirib qaytadan urinib ko‘ring.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-5 rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
              >
                Barcha filtrlarni tozalash
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
