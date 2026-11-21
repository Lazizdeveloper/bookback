import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SafetyNotice } from '../components/SafetyNotice';
import { 
  MapPin, Heart, MessageCircle, ArrowLeftRight, 
  AlertTriangle, ArrowLeft, Star, ShieldCheck, BookOpen, Send 
} from 'lucide-react';

export const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { books, savedBookIds, toggleSaveBook, addChatRoom, addProposal, showToast } = useApp();

  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const [myOfferBookTitle, setMyOfferBookTitle] = useState('');

  const book = books.find(b => b.id === id);
  const isSaved = savedBookIds.includes(id || '');

  if (!book) {
    return (
      <div className="py-12 text-center flex flex-col items-center gap-4">
        <AlertTriangle className="w-12 h-12 text-stone-300" />
        <h3 className="text-sm font-bold text-stone-800">Kitob topilmadi</h3>
        <p className="text-xs text-stone-500">Qidirilayotgan kitob o‘chirilgan bo‘lishi mumkin.</p>
        <button onClick={() => navigate('/home')} className="text-xs font-semibold text-emerald-600 hover:underline">
          Bosh sahifaga qaytish
        </button>
      </div>
    );
  }

  const handleMessageOwner = () => {
    // If the book belongs to the current user, show info toast
    if (book.ownerId === 'me') {
      showToast('Bu sizning o‘zingizning e’loningiz!', 'warning');
      return;
    }
    const chatId = addChatRoom(book);
    navigate(`/chat/${chatId}`);
  };

  const handleExchangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!myOfferBookTitle.trim()) {
      showToast('Iltimos, taklif qilmoqchi bo‘lgan kitobingiz nomini yozing', 'warning');
      return;
    }
    addProposal(myOfferBookTitle, book.title, book.ownerName, book.id);
    setIsExchangeModalOpen(false);
    setMyOfferBookTitle('');
  };

  const handleReportBook = () => {
    showToast('Shikoyatingiz qabul qilindi. Moderatsiya jamoasi 24 soat ichida ko‘rib chiqadi.', 'success');
  };

  const formatPrice = (p?: number) => {
    if (p === undefined) return '';
    return p.toLocaleString('uz-UZ') + ' so‘m';
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Back to Results link */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-emerald-700 self-start transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Orqaga qaytish
      </button>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Side: Dynamic tactile Book Cover Design (Span 5 cols) */}
        <div className="md:col-span-5 flex justify-center w-full sticky top-8">
          <div className="relative aspect-3/4 max-w-sm w-full bg-stone-100 rounded-3xl overflow-hidden shadow-xl border border-emerald-950/5 group">
            {/* Save Heart Overlay */}
            <button 
              onClick={() => toggleSaveBook(book.id)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-md text-stone-500 hover:text-rose-500 transition-all active:scale-90 cursor-pointer"
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-stone-500'}`} />
            </button>

            {/* Tactile Book Cover Visual */}
            <div className={`w-full h-full ${book.image} flex flex-col justify-between p-6 relative`}>
              {/* Cover texture and shadows */}
              <div className="absolute top-0 bottom-0 left-4.5 w-[3px] bg-black/20 shadow-[1px_0_1px_rgba(255,255,255,0.05)]"></div>
              <div className="absolute top-0 bottom-0 left-5 w-[1.5px] bg-white/15"></div>
              
              <div className="flex justify-between items-center pl-4">
                <span className="text-xs font-semibold bg-white/20 backdrop-blur-xs text-white px-3 py-1 rounded-full border border-white/20">
                  {book.condition} holatda
                </span>
                
                <span className="text-[11px] font-bold text-white/70 tracking-widest uppercase">
                  BookBack
                </span>
              </div>

              <div className="flex flex-col items-center text-center px-4 py-8 my-auto select-none pl-8">
                <BookOpen className="w-12 h-12 text-white/30 mb-4" />
                <h1 className="text-xl md:text-2xl font-display font-extrabold text-white leading-tight drop-shadow-md">
                  {book.title}
                </h1>
                <p className="text-xs text-white/80 mt-2 italic font-light drop-shadow-xs">
                  {book.author}
                </p>
              </div>

              <div className="flex justify-between items-end pl-4">
                <div className="bg-black/40 backdrop-blur-xs rounded-lg px-2.5 py-1 text-xs text-white flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-bold">{book.ownerRating} / 5.0</span>
                </div>
                
                <span className="text-xs text-white/80 font-mono font-light">
                  ID: {book.id}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Core Metadata & Actions (Span 7 cols) */}
        <div className="md:col-span-7 flex flex-col gap-6">
          {/* Header Title and Authors */}
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap gap-2 items-center mb-1">
              {book.type === 'selling' && (
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full">
                  💰 Sotiladi
                </span>
              )}
              {book.type === 'exchange' && (
                <span className="text-xs font-bold bg-violet-100 text-violet-800 border border-violet-200 px-3 py-1 rounded-full">
                  🔄 Ayirboshlanadi
                </span>
              )}
              {book.type === 'free' && (
                <span className="text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 px-3 py-1 rounded-full">
                  🎁 Bepul (Hadya)
                </span>
              )}
              {book.type === 'request' && (
                <span className="text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200 px-3 py-1 rounded-full">
                  🔍 Qidirilmoqda (So‘rov)
                </span>
              )}
              <span className="text-xs font-semibold bg-stone-100 text-stone-600 border border-stone-200 px-3 py-1 rounded-full">
                {book.genre}
              </span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-display font-black text-stone-900 leading-tight">
              {book.title}
            </h1>
            <p className="text-sm text-stone-500 font-medium">Muallif: <span className="text-stone-800 font-semibold">{book.author}</span></p>
          </div>

          <hr className="border-stone-200/60" />

          {/* Pricing or Exchange Specific details */}
          <div className="bg-white p-5 rounded-2xl border border-emerald-900/5 shadow-xs">
            {book.type === 'selling' ? (
              <div className="flex flex-col gap-1">
                <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider">Kitob narxi</span>
                <p className="text-2xl md:text-3xl font-black text-emerald-700">{formatPrice(book.price)}</p>
              </div>
            ) : book.type === 'exchange' ? (
              <div className="flex flex-col gap-1">
                <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider">Ayirboshlash sharti</span>
                <p className="text-sm font-bold text-violet-800 leading-relaxed">
                  🔄 {book.exchangeCondition || 'Istalgan qiziqarli asarga ayirboshlanadi.'}
                </p>
              </div>
            ) : book.type === 'free' ? (
              <div className="flex flex-col gap-1">
                <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider">Haq to‘lash</span>
                <p className="text-2xl font-black text-amber-600">Mutlaqo bepul (Haq tekin)</p>
                <p className="text-[11px] text-stone-500 mt-0.5">Kitob aylanib, ko‘pchilikka ziyo ulashishi uchun hadya qilinmoqda.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider">So‘rov tavsifi</span>
                <p className="text-sm font-bold text-sky-700 leading-relaxed">
                  🔍 Ushbu kitobni qidiryapman. Kitob sizda bor bo‘lsa, chatda xabar qoldiring.
                </p>
              </div>
            )}
          </div>

          {/* Location and Distance metadata */}
          <div className="flex gap-4 items-center text-sm text-stone-600 bg-stone-100/50 p-4 rounded-xl border border-stone-200/40">
            <div className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>{book.location}</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-stone-300"></div>
            <div className="font-semibold text-stone-800">
              Masofa: ~{book.distance}
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-stone-300"></div>
            <div className="text-stone-400 text-xs">
              E’lon: {book.createdAt}
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-sm text-stone-800 uppercase tracking-wider">Tavsif / Qo‘shimcha ma’lumot</h3>
            <p className="text-xs text-stone-600 leading-relaxed bg-white p-4 rounded-2xl border border-stone-200/50">
              {book.description || 'Kitob holati haqida batafsil ma’lumot yozilmagan.'}
            </p>
          </div>

          {/* Owner details */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-center gap-3">
              <img 
                src={book.ownerAvatar} 
                alt={book.ownerName} 
                className="w-12 h-12 rounded-full border border-emerald-600/20 bg-emerald-50 object-cover"
              />
              <div>
                <h4 className="text-sm font-bold text-stone-800">{book.ownerName}</h4>
                <p className="text-[11px] text-stone-500">Faol foydalanuvchi • {book.location}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-[10px] font-bold text-stone-700">{book.ownerRating} Reyting</span>
                </div>
              </div>
            </div>

            {/* Verification marker */}
            <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-emerald-800 px-3 py-1 rounded-xl text-xs font-semibold shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Verified BookOwner
            </div>
          </div>

          {/* Safety disclaimer widget */}
          <SafetyNotice />

          {/* Primary Action Button Suite */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {/* Action 1: Write Message */}
            <button
              onClick={handleMessageOwner}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-xl text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" /> Xabar yozish
            </button>

            {/* Action 2: Propose Exchange (Only if exchange or free types) */}
            {(book.type === 'exchange' || book.type === 'free' || book.type === 'selling') && (
              <button
                onClick={() => setIsExchangeModalOpen(true)}
                className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-5 rounded-xl text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeftRight className="w-4 h-4" /> Ayirboshlash taklif qilish
              </button>
            )}

            {/* Action 3: Report Book listing */}
            <button
              onClick={handleReportBook}
              className="sm:flex-none border border-stone-200 text-stone-400 hover:text-rose-600 hover:bg-rose-50 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center"
              title="Shikoyat qilish"
            >
              Shikoyat qilish
            </button>
          </div>
        </div>
      </div>

      {/* MODAL: PROPOSE EXCHANGE FORM */}
      {isExchangeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-stone-100 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start border-b border-stone-100 pb-3">
              <div>
                <h3 className="font-bold text-stone-900 text-base flex items-center gap-1.5">
                  <ArrowLeftRight className="w-5 h-5 text-violet-600" />
                  <span>Ayirboshlash taklifi</span>
                </h3>
                <p className="text-[11px] text-stone-500 mt-1">E’lon egasi: {book.ownerName}</p>
              </div>
              <button 
                onClick={() => setIsExchangeModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1 rounded-full hover:bg-stone-100"
              >
                <XButton className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/50 flex gap-3 items-center">
              <div className={`w-8 h-12 shrink-0 ${book.image} rounded-sm relative flex flex-col justify-between p-1`}>
                <div className="w-[1px] h-full absolute left-1 bg-white/20"></div>
              </div>
              <div className="min-w-0">
                <span className="text-[9px] uppercase font-bold text-stone-400">Siz so‘rayotgan kitob</span>
                <h4 className="text-xs font-bold text-stone-800 truncate">{book.title}</h4>
                <p className="text-[10px] text-stone-500 truncate">{book.author}</p>
              </div>
            </div>

            <form onSubmit={handleExchangeSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-stone-700">Siz taklif qiladigan kitob nomi</label>
                <input 
                  type="text"
                  required
                  value={myOfferBookTitle}
                  onChange={(e) => setMyOfferBookTitle(e.target.value)}
                  placeholder="Masalan: Biznes sirlari yoki Alkimyogar"
                  className="w-full bg-stone-50 border border-stone-200 px-3.5 py-2.5 rounded-xl text-xs focus:outline-hidden focus:border-violet-600 focus:bg-white transition-all"
                />
                <span className="text-[10px] text-stone-400">E’lon egasi bu taklifni o‘z sahifasida ko‘radi va qabul qilishi yoki rad etishi mumkin.</span>
              </div>

              <div className="flex gap-2.5 pt-2 justify-end">
                <button
                  type="button"
                  onClick={() => setIsExchangeModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs font-bold cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-violet-700/10 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Taklifni yuborish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Simple visual Close button
const XButton = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
