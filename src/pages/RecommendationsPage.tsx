import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookCard } from '../components/BookCard';
import { Sparkles, BrainCircuit, RefreshCw, Compass, Bookmark, ShieldCheck } from 'lucide-react';

export const RecommendationsPage: React.FC = () => {
  const { books, showToast } = useApp();

  const [favGenre, setFavGenre] = useState('Badiiy adabiyot');
  const [readingGoal, setReadingGoal] = useState('Dam olish / Hordiq');
  const [preferredCondition, setPreferredCondition] = useState('Yaxshi');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState<Array<{ book: typeof books[0]; score: number; reason: string }>>([]);

  const handleGenerateRecommendations = () => {
    setIsGenerating(true);
    showToast('Tavsiyalar tizimi tahlil qilmoqda...', 'info');

    setTimeout(() => {
      // Find books that match the favorite genre, or similar genres
      const matches = books
        .filter(b => b.genre === favGenre || b.condition === preferredCondition)
        .slice(0, 3)
        .map((b, idx) => {
          // Calculate a simulated matching score
          const score = 90 + (3 - idx) * 3 - (b.condition === preferredCondition ? 0 : 4);
          
          let reason = '';
          if (favGenre === 'Badiiy adabiyot') {
            reason = 'Ushbu asar mutolaasi siz so‘ragan dam olish va badiiy zavq ulashish talablariga 100% javob beradi.';
          } else if (favGenre === 'Shaxsiy rivojlanish') {
            reason = 'Shaxsiy o‘sish, vaqt boshqaruvi va samaradorlikni oshirishda ushbu kitob eng yuqori reytingga ega.';
          } else if (favGenre === 'Dasturlash / IT') {
            reason = 'IT muhandislarining sevimli asari bo‘lib, dasturlash falsafasini chuqur tushunishga yordam beradi.';
          } else {
            reason = 'Siz tanlagan qiziqishlar va kitobxonlar reytingi asosida eng ommabop asarlar ro‘yxatidan tanlandi.';
          }

          return { book: b, score: Math.min(score, 100), reason };
        });

      setRecommendations(matches);
      setIsGenerating(false);
      showToast('Tavsiyalar muvaffaqiyatli tayyorlandi! 🎯', 'success');
    }, 1200);
  };

  const genres = [
    'Badiiy adabiyot',
    'Shaxsiy rivojlanish',
    'Dasturlash / IT',
    'Biznes va moliya',
    'Tarixiy / Klassika',
    'Bolalar adabiyoti',
    'Sarguzasht'
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-display font-extrabold text-stone-900">Aqlli kitob tavsiyalari</h2>
        <p className="text-xs text-stone-500">Mutolaa maqsadlaringiz va qiziqishlaringizdan kelib chiqib mos keluvchi kitoblarni toping</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left column: Questionnaire questionnaire (Span 5 cols) */}
        <div className="md:col-span-5 bg-white p-6 rounded-3xl border border-emerald-900/5 shadow-xs flex flex-col gap-4">
          <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-100 pb-2">
            <BrainCircuit className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span>Afzalliklaringiz</span>
          </h3>

          <div className="flex flex-col gap-4">
            {/* Preferred Genre */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-stone-700">Sevimli janringiz</label>
              <select
                value={favGenre}
                onChange={(e) => setFavGenre(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 px-3 py-2.5 rounded-xl text-xs font-semibold focus:outline-hidden focus:border-emerald-600 cursor-pointer appearance-none"
              >
                {genres.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {/* Reading goal */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-stone-700">Mutolaadan maqsad nima?</label>
              <select
                value={readingGoal}
                onChange={(e) => setReadingGoal(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 px-3 py-2.5 rounded-xl text-xs font-semibold focus:outline-hidden focus:border-emerald-600 cursor-pointer appearance-none"
              >
                <option value="Dam olish / Hordiq">Dam olish / Hordiq chiqarish</option>
                <option value="Bilim orttirish">Yangi bilimlar va ko‘nikmalar olish</option>
                <option value="Ish / Karyera">Karyera yoki biznesda o‘sish</option>
                <option value="Tarix va falsafa">Dunyoqarashni kengaytirish</option>
              </select>
            </div>

            {/* Preferred Condition */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-stone-700">Kitobning istalgan holati</label>
              <select
                value={preferredCondition}
                onChange={(e) => setPreferredCondition(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 px-3 py-2.5 rounded-xl text-xs font-semibold focus:outline-hidden focus:border-emerald-600 cursor-pointer appearance-none"
              >
                <option value="Yangi">Yangi (Faqat paketdagilar)</option>
                <option value="Yaxshi">Yaxshi (Ozroq o‘qilgan, toza)</option>
                <option value="O‘rtacha">Istalgan holatda</option>
              </select>
            </div>

            {/* Submit Recommendation Search */}
            <button
              onClick={handleGenerateRecommendations}
              disabled={isGenerating}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-300 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Tahlil qilinmoqda...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tavsiyalarni shakllantirish</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right column: Matches result feed (Span 7 cols) */}
        <div className="md:col-span-7 flex flex-col gap-4">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1">
            <Compass className="w-4 h-4 text-emerald-600" /> Tavsiya etilgan mosliklar
          </span>

          {recommendations.length > 0 ? (
            <div className="flex flex-col gap-4">
              {recommendations.map(({ book, score, reason }) => (
                <div 
                  key={book.id}
                  className="bg-white p-5 rounded-3xl border border-stone-200/60 shadow-3xs hover:border-emerald-600/10 transition-colors flex flex-col sm:flex-row gap-5 items-stretch"
                >
                  {/* Left mini cover card */}
                  <div className={`w-20 h-28 ${book.image} rounded-2xl shadow-xs shrink-0 relative flex flex-col justify-between p-2`}>
                    <div className="w-[1.5px] h-full absolute left-1 bg-white/25"></div>
                    <Bookmark className="w-4 h-4 text-white/30" />
                    <span className="text-[6px] text-white/50 tracking-wider text-right font-mono">BookBack</span>
                  </div>

                  {/* Middle and Right side */}
                  <div className="flex-1 flex flex-col justify-between gap-3 min-w-0">
                    <div>
                      {/* Matching score tag */}
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                          🔥 {score}% Mos kelish!
                        </span>
                        
                        <span className="text-[10px] text-emerald-700 font-bold">
                          {book.type === 'selling' ? `${book.price?.toLocaleString()} so‘m` : '🔄 Ayirboshlash'}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-stone-900 text-sm mt-2 truncate">{book.title}</h3>
                      <p className="text-[11px] text-stone-400 mt-0.5 truncate">{book.author}</p>
                      
                      <p className="text-[11px] text-stone-500 italic mt-2 bg-stone-50 p-2.5 rounded-xl border border-stone-100 leading-normal">
                        "{reason}"
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-1">
                      <span className="text-[10px] text-stone-400 font-medium">Joylashuv: {book.location}</span>
                      <button 
                        onClick={() => window.location.hash = `#/books/${book.id}`}
                        className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5 cursor-pointer"
                      >
                        Tafsilotlar ➔
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl border border-dashed border-stone-200 text-center flex flex-col items-center gap-3 py-16 justify-center">
              <Sparkles className="w-10 h-10 text-stone-300 animate-pulse" />
              <h4 className="font-bold text-stone-700 text-xs">Tavsiyalar hozircha bo‘sh</h4>
              <p className="text-[11px] text-stone-400 max-w-xs leading-relaxed">
                Chap tomondagi anketani to‘ldiring va qiziqishlaringizga mos keluvchi kitoblarni topish uchun "Tavsiyalarni shakllantirish" tugmasini bosing.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
