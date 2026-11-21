import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeftRight, Check, X, Clock, HelpCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ExchangePage: React.FC = () => {
  const navigate = useNavigate();
  const { proposals, updateProposalStatus, books } = useApp();

  const getStatusStyle = (status: typeof proposals[0]['status']) => {
    switch (status) {
      case 'Kutilmoqda':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          text: 'Kutilmoqda',
          icon: <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
        };
      case 'Qabul qilindi':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          text: 'Qabul qilindi',
          icon: <Check className="w-3.5 h-3.5 text-emerald-600" />
        };
      case 'Rad etildi':
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          text: 'Rad etildi',
          icon: <X className="w-3.5 h-3.5 text-rose-600" />
        };
      case 'Yakunlandi':
        return {
          bg: 'bg-stone-50 text-stone-800 border-stone-200',
          text: 'Yakunlandi',
          icon: <Check className="w-3.5 h-3.5 text-stone-600" />
        };
      default:
        return {
          bg: 'bg-stone-100 text-stone-800 border-stone-200',
          text: status,
          icon: null
        };
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-display font-extrabold text-stone-900">Ayirboshlash shartnomalari</h2>
        <p className="text-xs text-stone-500">Kitob almashish bo‘yicha yuborilgan va qabul qilingan barcha takliflar nazorati</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Core summary statistics */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200/50 flex flex-col justify-between shadow-3xs">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Kutilayotganlar</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-black text-amber-600">
              {proposals.filter(p => p.status === 'Kutilmoqda').length} ta
            </span>
            <span className="text-xs text-stone-400 font-medium">ko‘rib chiqilmoqda</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200/50 flex flex-col justify-between shadow-3xs">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Kelishilganlar</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-black text-emerald-600">
              {proposals.filter(p => p.status === 'Qabul qilindi').length} ta
            </span>
            <span className="text-xs text-stone-400 font-medium">almashishga tayyor</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200/50 flex flex-col justify-between shadow-3xs">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Yakunlanganlar</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-black text-stone-700">
              {proposals.filter(p => p.status === 'Yakunlandi').length} ta
            </span>
            <span className="text-xs text-stone-400 font-medium">kitob aylanib ulgurdi</span>
          </div>
        </div>
      </div>

      {/* Main List Container */}
      <div className="bg-white p-6 rounded-3xl border border-emerald-900/5 shadow-xs flex flex-col gap-4">
        <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wider">Takliflar ro‘yxati</h3>

        {proposals.length > 0 ? (
          <div className="flex flex-col gap-4">
            {proposals.map((prop) => {
              const { bg, text, icon } = getStatusStyle(prop.status);
              
              // Find related book details if any
              const matchedBook = books.find(b => b.id === prop.bookId);

              return (
                <div 
                  key={prop.id}
                  className="p-5 rounded-2xl border border-stone-200/60 hover:border-emerald-600/10 hover:bg-stone-50/10 transition-all flex flex-col sm:flex-row justify-between gap-4 items-stretch"
                >
                  <div className="flex flex-col gap-3 flex-1">
                    {/* Header meta */}
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-full flex items-center gap-1.5 ${bg}`}>
                        {icon}
                        <span>{text}</span>
                      </span>
                      <span className="text-[10px] text-stone-400 font-medium">
                        Kelishuv sanasi: {prop.date}
                      </span>
                    </div>

                    {/* Transaction Visuals */}
                    <div className="grid grid-cols-1 sm:grid-cols-9 gap-2 items-center">
                      {/* Left: My book */}
                      <div className="sm:col-span-4 bg-stone-100 p-3.5 rounded-xl border border-stone-200/40">
                        <span className="text-[9px] uppercase font-bold text-stone-400">Men beraman (Sizda)</span>
                        <h4 className="text-xs font-bold text-stone-800 truncate mt-0.5" title={prop.myBookTitle}>
                          📘 {prop.myBookTitle}
                        </h4>
                      </div>

                      {/* Middle connector icon */}
                      <div className="sm:col-span-1 flex justify-center text-stone-400">
                        <ArrowLeftRight className="w-5 h-5 stroke-[1.5] rotate-90 sm:rotate-0" />
                      </div>

                      {/* Right: Partner book */}
                      <div className="sm:col-span-4 bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100/40">
                        <span className="text-[9px] uppercase font-bold text-emerald-600">Men olaman ({prop.ownerName}dan)</span>
                        <h4 className="text-xs font-bold text-emerald-950 truncate mt-0.5" title={prop.requestedBookTitle}>
                          📙 {prop.requestedBookTitle}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Right Side actions based on status */}
                  <div className="flex sm:flex-col justify-end gap-2 items-end shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 sm:pl-4 sm:border-l border-stone-100 min-w-[120px]">
                    {prop.status === 'Kutilmoqda' ? (
                      <div className="flex sm:flex-col gap-2 w-full">
                        <button
                          onClick={() => updateProposalStatus(prop.id, 'Qabul qilindi')}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" /> Qabul qilish
                        </button>
                        <button
                          onClick={() => updateProposalStatus(prop.id, 'Rad etildi')}
                          className="flex-1 border border-stone-200 hover:bg-stone-50 text-stone-500 hover:text-rose-600 py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" /> Rad etish
                        </button>
                      </div>
                    ) : prop.status === 'Qabul qilindi' ? (
                      <div className="flex flex-col gap-2 w-full">
                        <button
                          onClick={() => updateProposalStatus(prop.id, 'Yakunlandi')}
                          className="w-full bg-stone-900 hover:bg-stone-850 text-white font-bold py-2 px-3.5 rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer"
                        >
                          Mark completed ✅
                        </button>
                        {matchedBook && (
                          <button
                            onClick={() => navigate(`/chat`)}
                            className="w-full border border-stone-200 hover:bg-stone-50 text-stone-600 py-2 px-3 rounded-xl text-xs font-semibold"
                          >
                            Chatga o‘tish
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="text-right flex flex-col justify-center h-full">
                        <span className="text-[11px] font-bold text-stone-400">Amallar mavjud emas</span>
                        <p className="text-[9px] text-stone-400 mt-0.5">Kelishuv yopilgan.</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center bg-stone-50 rounded-2xl border border-dashed border-stone-200 flex flex-col items-center gap-3 py-16">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-stone-700 text-sm">Hozircha hech qanday kelishuvlar yo‘q</h4>
              <p className="text-xs text-stone-500 mt-1">Kitobingizni almashtirish uchun kitob tafsilotlari sahifasidan taklif yuboring.</p>
            </div>
            <button 
              onClick={() => navigate('/home')}
              className="mt-2 text-xs font-semibold text-emerald-600 hover:underline"
            >
              Kitoblar qidirish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
