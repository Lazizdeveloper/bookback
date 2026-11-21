import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { EX_CITIES } from '../data';
import { Book } from '../types';
import { 
  ArrowLeft, CheckCircle2, Upload, BookOpen, 
  DollarSign, ArrowLeftRight, Gift, HelpCircle, Sparkles, Phone, MessageSquare 
} from 'lucide-react';

type Step = 'choice' | 'form';

export const AddBookPage: React.FC = () => {
  const navigate = useNavigate();
  const { addBook, user } = useApp();

  const [step, setStep] = useState<Step>('choice');
  const [type, setType] = useState<Book['type']>('exchange');

  // Form Fields
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('Badiiy adabiyot');
  const [condition, setCondition] = useState<Book['condition']>('Yaxshi');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(user?.region || 'Toshkent');
  const [price, setPrice] = useState<number>(0);
  const [exchangeCondition, setExchangeCondition] = useState('');
  const [contactType, setContactType] = useState<'chat' | 'phone'>('chat');
  
  // Image selection mock
  const [selectedGradient, setSelectedGradient] = useState('bg-gradient-to-br from-emerald-800 to-teal-950');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const gradients = [
    { label: 'Yashil charim', value: 'bg-gradient-to-br from-emerald-800 to-teal-950' },
    { label: 'Ko‘k okean', value: 'bg-gradient-to-br from-blue-800 to-cyan-950' },
    { label: 'Tilla qum', value: 'bg-gradient-to-br from-amber-700 to-yellow-900' },
    { label: 'To‘q yoqut', value: 'bg-gradient-to-br from-red-800 to-stone-900' },
    { label: 'Binafsha sirlar', value: 'bg-gradient-to-br from-violet-800 to-purple-950' },
    { label: 'Kosmik tun', value: 'bg-gradient-to-br from-stone-800 to-neutral-950' }
  ];

  const handleChooseType = (chosenType: Book['type']) => {
    setType(chosenType);
    setStep('form');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addBook({
      title,
      author,
      genre,
      condition,
      type,
      price: type === 'selling' ? price : undefined,
      exchangeCondition: type === 'exchange' ? exchangeCondition : undefined,
      location,
      distance: '1.0 km', // mock distance for user added
      description
    });

    setIsSuccessModalOpen(true);
  };

  const handleCloseSuccess = () => {
    setIsSuccessModalOpen(false);
    navigate('/my-books');
  };

  const genres = [
    'Badiiy adabiyot',
    'Shaxsiy rivojlanish',
    'Dasturlash / IT',
    'Biznes va moliya',
    'Tarixiy / Klassika',
    'Bolalar adabiyoti',
    'Sarguzasht',
    'Ilmiy-ommabop',
    'Diniy-ma’rifiy'
  ];

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      {/* Back button */}
      {step === 'form' && (
        <button 
          onClick={() => setStep('choice')}
          className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-emerald-700 self-start transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Orqaga qaytish
        </button>
      )}

      {/* Step 1: Choice panel */}
      {step === 'choice' && (
        <div className="flex flex-col gap-6">
          <div className="text-center flex flex-col items-center gap-2">
            <h2 className="text-2xl font-display font-extrabold text-stone-900">Yangi e’lon joylash</h2>
            <p className="text-xs text-stone-500 max-w-sm">Quyidagi amallardan birini tanlang va e’loningizni tezda chop eting</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <button 
              onClick={() => handleChooseType('exchange')}
              className="bg-white p-6 rounded-3xl border border-stone-200 hover:border-violet-600 hover:bg-violet-50/10 text-left flex gap-4 transition-all duration-300 shadow-2xs group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <ArrowLeftRight className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-sm">Kitob ayirboshlash</h4>
                <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">Mendagi kitobni o‘qib bo‘ldim, boshqa kitobxonning kitobiga ayirboshlamoqchiman.</p>
              </div>
            </button>

            <button 
              onClick={() => handleChooseType('selling')}
              className="bg-white p-6 rounded-3xl border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/10 text-left flex gap-4 transition-all duration-300 shadow-2xs group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-sm">Kitob sotish</h4>
                <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">Kitobimni boshqa kitobxonlarga kelishilgan holda arzonroq sotmoqchiman.</p>
              </div>
            </button>

            <button 
              onClick={() => handleChooseType('free')}
              className="bg-white p-6 rounded-3xl border border-stone-200 hover:border-amber-500 hover:bg-amber-50/10 text-left flex gap-4 transition-all duration-300 shadow-2xs group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-sm">Bepul berish (Hadya)</h4>
                <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">Kitobni boshqa muhtoj kitobxonlarga mutlaqo bepul (tekinga) hadya qilaman.</p>
              </div>
            </button>

            <button 
              onClick={() => handleChooseType('request')}
              className="bg-white p-6 rounded-3xl border border-stone-200 hover:border-sky-600 hover:bg-sky-50/10 text-left flex gap-4 transition-all duration-300 shadow-2xs group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-sm">Kitob so‘rash (Qidiruv)</h4>
                <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">Menga kerakli biror kitobni sotib olish, ijaraga olish yoki ayirboshlashga qidiryapman.</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Form */}
      {step === 'form' && (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-emerald-900/5 shadow-xl flex flex-col gap-6">
          <div className="flex justify-between items-center border-b border-stone-100 pb-4">
            <div>
              <span className="text-[10px] font-bold tracking-wider text-emerald-600 uppercase">2-Bosqich: Tafsilotlar</span>
              <h2 className="text-xl font-display font-extrabold text-stone-900">
                {type === 'selling' && 'Sotiladigan kitob e’loni'}
                {type === 'exchange' && 'Almashiladigan kitob e’loni'}
                {type === 'free' && 'Hadya qilinadigan bepul kitob'}
                {type === 'request' && 'Qidirilayotgan kitob so‘rovi'}
              </h2>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-100 font-bold px-3 py-1 rounded-full capitalize">
              {type === 'selling' ? 'Sotuv' : type === 'exchange' ? 'Ayirboshlash' : type === 'free' ? 'Bepul' : 'So‘rov'}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Mock Drag & Drop Upload Container */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-stone-700">Kitob muqovasi uchun rang va dizayn tanlang</label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-stone-50 p-4 rounded-2xl border border-stone-200/60">
                {/* Book Preview Visualizer */}
                <div className="flex justify-center shrink-0">
                  <div className={`w-28 h-40 ${selectedGradient} rounded-2xl shadow-md border-l-4 border-black/20 flex flex-col justify-between p-3 relative overflow-hidden select-none`}>
                    <div className="absolute left-1.5 top-0 bottom-0 w-[1px] bg-white/10"></div>
                    <BookOpen className="w-5 h-5 text-white/30" />
                    <div className="my-auto text-center pl-3">
                      <p className="text-[10px] font-bold text-white line-clamp-2 leading-snug">{title || 'Kitob nomi'}</p>
                      <p className="text-[8px] text-white/70 italic truncate mt-0.5">{author || 'Muallif'}</p>
                    </div>
                    <span className="text-[7px] text-white/60 tracking-wider text-right uppercase">BookBack</span>
                  </div>
                </div>

                {/* Color swatches */}
                <div className="flex flex-col gap-2 w-full">
                  <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">Muqova ranglari</p>
                  <div className="grid grid-cols-3 gap-2">
                    {gradients.map((g) => (
                      <button
                        key={g.value}
                        type="button"
                        onClick={() => setSelectedGradient(g.value)}
                        className={`h-8 rounded-lg ${g.value} border-2 transition-all ${selectedGradient === g.value ? 'border-emerald-600 scale-105' : 'border-transparent'}`}
                        title={g.label}
                      ></button>
                    ))}
                  </div>

                  {/* Mock file picker */}
                  <div className="mt-2 border border-dashed border-stone-300 bg-white hover:bg-stone-50 rounded-xl p-3 text-center flex flex-col items-center justify-center gap-1 cursor-pointer">
                    <Upload className="w-4 h-4 text-stone-400" />
                    <span className="text-[10px] text-stone-500 font-semibold">Real rasm yuklash (Rasm)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Title & Author */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-stone-700">Kitob nomi</label>
                <input 
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Masalan: Ikki eshik orasi"
                  className="w-full bg-stone-50 border border-stone-200 px-3.5 py-2.5 rounded-xl text-xs focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-stone-700">Kitob muallifi</label>
                <input 
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Masalan: O‘tkir Hoshimov"
                  className="w-full bg-stone-50 border border-stone-200 px-3.5 py-2.5 rounded-xl text-xs focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Genre & Condition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-stone-700">Janri</label>
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 px-3.5 py-2.5 rounded-xl text-xs focus:outline-hidden focus:border-emerald-600 cursor-pointer appearance-none"
                >
                  {genres.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-stone-700">Kitob holati</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as Book['condition'])}
                  className="w-full bg-stone-50 border border-stone-200 px-3.5 py-2.5 rounded-xl text-xs focus:outline-hidden focus:border-emerald-600 cursor-pointer appearance-none"
                >
                  <option value="Yangi">Yangi (Paketda ochiq ko‘rilmagan)</option>
                  <option value="Yaxshi">Yaxshi (Sahifalari toza, barcha varaqlari butun)</option>
                  <option value="O‘rtacha">O‘rtacha (O‘qilgan, yengil chizilgan bo‘lishi mumkin)</option>
                  <option value="Eskirgan">Eskirgan (Varaqlari ancha sarg‘aygan)</option>
                </select>
              </div>
            </div>

            {/* Dynamic fields based on Type */}
            {type === 'selling' && (
              <div className="flex flex-col gap-1.5 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <label className="text-xs font-bold text-emerald-950">Sotish narxi (UZS / so‘m)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-emerald-600 font-bold text-xs">
                    UZS
                  </span>
                  <input 
                    type="number"
                    required
                    value={price || ''}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="Masalan: 45000"
                    className="w-full pl-12 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-all font-bold"
                  />
                </div>
              </div>
            )}

            {type === 'exchange' && (
              <div className="flex flex-col gap-1.5 p-4 rounded-2xl bg-violet-50/50 border border-violet-100">
                <label className="text-xs font-bold text-violet-950">Ayirboshlash sharti (Qaysi kitobga almashasiz?)</label>
                <input 
                  type="text"
                  required
                  value={exchangeCondition}
                  onChange={(e) => setExchangeCondition(e.target.value)}
                  placeholder="Masalan: Shaxsiy rivojlanishga oid yoki 'Alkimyogar' kitobiga"
                  className="w-full bg-white border border-stone-200 px-3.5 py-2.5 rounded-xl text-xs focus:outline-hidden focus:border-violet-600 focus:bg-white transition-all font-medium"
                />
              </div>
            )}

            {/* Description & Location */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-stone-700">Tavsif (Kitobning kamchiliklari, qayerda uchrashish qulayligi va h.k.)</label>
              <textarea 
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Kitobning holati haqida qisqacha ma’lumot bering..."
                className="w-full bg-stone-50 border border-stone-200 px-3.5 py-2.5 rounded-xl text-xs focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-all resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-stone-700">Siz joylashgan hudud (E’londagi manzil)</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 px-3.5 py-2.5 rounded-xl text-xs focus:outline-hidden focus:border-emerald-600 cursor-pointer appearance-none"
                >
                  {EX_CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Aloqa turi (Contact Type: Chat vs Phone) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-stone-700">Aloqa turi</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setContactType('chat')}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                      contactType === 'chat' 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold' 
                        : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <span>Ichki Chat</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setContactType('phone')}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                      contactType === 'phone' 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold' 
                        : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    <span>Telefon</span>
                  </button>
                </div>
              </div>
            </div>

            {/* E'lon joylash button */}
            <button
              type="submit"
              className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>E’lonni joylashtirish</span>
            </button>
          </form>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full border border-stone-100 shadow-2xl flex flex-col items-center text-center gap-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-md animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <div>
              <h3 className="font-extrabold text-stone-900 text-lg">Muvaffaqiyatli!</h3>
              <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                “{title}” kitobingiz uchun e’loningiz muvaffaqiyatli joylashtirildi. E’lon tez orada qidiruv natijalarida va Home feedda ko‘rina boshlaydi.
              </p>
            </div>

            <button
              onClick={handleCloseSuccess}
              className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Mening e’lonlarimga o‘tish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
