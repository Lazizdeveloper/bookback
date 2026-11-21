import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowRight, ShieldCheck, HeartHandshake, Award } from 'lucide-react';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center py-6 px-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Side: Visual Showcase */}
        <div className="flex flex-col items-center justify-center relative">
          {/* Decorative blur elements */}
          <div className="absolute w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl -top-10 -left-10"></div>
          <div className="absolute w-60 h-60 bg-amber-500/10 rounded-full blur-2xl -bottom-10 -right-10"></div>

          {/* Staggered Floating Book Stack Visual representation */}
          <div className="relative z-10 flex flex-col gap-4 w-full max-w-[280px]">
            {/* Book 1 */}
            <div className="bg-gradient-to-tr from-emerald-700 to-teal-900 text-white p-5 rounded-2xl shadow-xl border-l-8 border-emerald-500 rotate-[-4deg] transform hover:rotate-0 transition-transform duration-300">
              <BookOpen className="w-8 h-8 text-emerald-300 mb-4" />
              <h4 className="font-display font-bold text-sm tracking-tight">O‘tkan kunlar</h4>
              <p className="text-[10px] text-emerald-100 italic">Abdulla Qodiriy</p>
              <div className="mt-4 flex justify-between items-center text-[9px] bg-black/25 px-2 py-1 rounded">
                <span>🔄 Ayirboshlash</span>
                <span>Toshkent</span>
              </div>
            </div>

            {/* Book 2 */}
            <div className="bg-gradient-to-tr from-amber-700 to-yellow-900 text-white p-5 rounded-2xl shadow-xl border-l-8 border-amber-500 rotate-[3deg] translate-y-[-12px] transform hover:rotate-0 transition-transform duration-300">
              <BookOpen className="w-8 h-8 text-amber-300 mb-4" />
              <h4 className="font-display font-bold text-sm tracking-tight">Atomic Habits</h4>
              <p className="text-[10px] text-amber-100 italic">Jeyms Klir</p>
              <div className="mt-4 flex justify-between items-center text-[9px] bg-black/25 px-2 py-1 rounded">
                <span>💰 Sotuv (65,000)</span>
                <span>Samarqand</span>
              </div>
            </div>

            {/* Book 3 */}
            <div className="bg-gradient-to-tr from-stone-800 to-neutral-950 text-white p-5 rounded-2xl shadow-xl border-l-8 border-stone-500 rotate-[-2deg] translate-y-[-24px] transform hover:rotate-0 transition-transform duration-300">
              <BookOpen className="w-8 h-8 text-stone-300 mb-4" />
              <h4 className="font-display font-bold text-sm tracking-tight">Dunyoning ishlari</h4>
              <p className="text-[10px] text-stone-300 italic">O‘tkir Hoshimov</p>
              <div className="mt-4 flex justify-between items-center text-[9px] bg-black/25 px-2 py-1 rounded">
                <span>🎁 Bepul (Tekinga)</span>
                <span>Farg‘ona</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Copy & Actions */}
        <div className="flex flex-col gap-6 text-center md:text-left z-10">
          <div className="flex items-center gap-2 text-emerald-600 justify-center md:justify-start">
            <BookOpen className="w-8 h-8 stroke-[2.5]" />
            <span className="text-3xl font-display font-extrabold tracking-tight text-stone-900">
              Book<span className="text-emerald-600">Back</span>
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight text-stone-900 leading-tight">
              “O‘qilgan kitobingiz boshqaga <span className="text-emerald-700">yangi dunyo</span> ochadi.”
            </h1>
            <p className="text-sm text-stone-500 font-medium italic">
              “Kitob almashing, bilim ulashing.”
            </p>
            <p className="text-xs text-stone-600 leading-relaxed mt-2 max-w-md mx-auto md:mx-0">
              O‘qib bo‘lingan kitoblaringiz javonlarda chang bosib yotmasin! BookBack orqali ularni soting, boshqa kitoblarga ayirboshlang, bepul hadya qiling yoki o‘zingiz qidirayotgan asarlarni toping. Kitoblarning erkin aylanishiga hissa qo‘shing.
            </p>
          </div>

          {/* Quick value indicators */}
          <div className="grid grid-cols-3 gap-3 border-y border-stone-200 py-4 my-2 text-center">
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span className="text-[10px] font-bold text-stone-800">Xavfsiz kelishuv</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <HeartHandshake className="w-5 h-5 text-violet-600" />
              <span className="text-[10px] font-bold text-stone-800">Kitob ayirboshlash</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Award className="w-5 h-5 text-amber-500" />
              <span className="text-[10px] font-bold text-stone-800">Bepul ulashish</span>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <button
              onClick={() => navigate('/home')}
              className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl text-sm shadow-md shadow-emerald-700/10 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              Boshlash <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="flex-1 sm:flex-none border border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-bold py-3 px-6 rounded-xl text-sm transition-all cursor-pointer text-center"
            >
              Kirish
            </button>
            <button
              onClick={() => navigate('/register')}
              className="flex-1 sm:flex-none bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold py-3 px-6 rounded-xl text-sm transition-all cursor-pointer text-center"
            >
              Ro‘yxatdan o‘tish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
