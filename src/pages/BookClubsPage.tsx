import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, BookOpen, Send, Check, MessageSquare, Star, Landmark } from 'lucide-react';

export const BookClubsPage: React.FC = () => {
  const { clubs, toggleJoinClub, showToast, user } = useApp();
  
  // Local state to manage discussions inside a club
  const [selectedClubId, setSelectedClubId] = useState<string>(clubs[0]?.id || '');
  const [clubMessageInputs, setClubMessageInputs] = useState<Record<string, string>>({});
  
  // Hardcoded mock initial messages for each club so they can see rich conversations!
  const [clubMessages, setClubMessages] = useState<Record<string, Array<{ id: string; sender: string; avatar: string; text: string; time: string }>>>({
    'club_1': [
      { id: 'm1', sender: 'Jasur Shodiyev', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', text: 'Assalomu alaykum! "Ufq" trilogiyasini birgalikda o‘qish boshlandimi?', time: '09:15' },
      { id: 'm2', sender: 'Malika Karimova', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', text: 'Ha, bugun birinchi qismni tugatamiz. Judayam mazmunli asar ekan.', time: '10:02' }
    ],
    'club_2': [
      { id: 'm3', sender: 'Ravshan Anvarov', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', text: 'Navoiy g‘azallari tahlili qachon bo‘ladi?', time: 'Kechagi' },
      { id: 'm4', sender: 'Dildora Alimova', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', text: 'Har juma soat 18:00 da onlayn tahlil uyushtiryapmiz.', time: 'Kechagi' }
    ],
    'club_3': [
      { id: 'm5', sender: 'Olimjon G‘ofurov', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', text: '"Yetti odat" kitobidan kim qanaqa xulosa oldi?', time: 'Bugun, 08:30' }
    ],
    'club_4': [
      { id: 'm6', sender: 'Azizbek Karimov', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100', text: 'Clean Code kitobining elektron variantini kimda bor?', time: 'Yarim soat avval' }
    ]
  });

  const handleSendMessage = (clubId: string, e: React.FormEvent) => {
    e.preventDefault();
    const txt = clubMessageInputs[clubId] || '';
    if (!txt.trim()) return;

    // Check if user is joined before allowing messages!
    const activeClub = clubs.find(c => c.id === clubId);
    if (activeClub && !activeClub.isJoined) {
      showToast('Xabar yozish uchun avval ushbu klubga a’zo bo‘lishingiz kerak!', 'warning');
      return;
    }

    const newMessage = {
      id: Date.now().toString(),
      sender: user?.name || 'Mening Profilim',
      avatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      text: txt,
      time: 'Hozirgina'
    };

    setClubMessages({
      ...clubMessages,
      [clubId]: [...(clubMessages[clubId] || []), newMessage]
    });

    setClubMessageInputs({
      ...clubMessageInputs,
      [clubId]: ''
    });

    showToast('Fikringiz klub muhokamasiga yuborildi!', 'success');
  };

  const handleJoinToggle = (clubId: string) => {
    toggleJoinClub(clubId);
  };

  const currentClub = clubs.find(c => c.id === selectedClubId);
  const currentMessages = clubMessages[selectedClubId] || [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-display font-extrabold text-stone-900">Kitobxonlik klublari</h2>
        <p className="text-xs text-stone-500">Mavzular va hududlar bo‘yicha birlashgan kitobxonlar jamoalariga qo‘shiling</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Clubs directory (Span 5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Klublar ro‘yxati</span>
          
          <div className="flex flex-col gap-3">
            {clubs.map((club) => {
              const isSelected = club.id === selectedClubId;
              return (
                <div
                  key={club.id}
                  onClick={() => setSelectedClubId(club.id)}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col gap-3 ${
                    isSelected 
                      ? 'bg-white border-emerald-600 shadow-sm' 
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="min-w-0">
                      <h3 className="font-extrabold text-stone-950 text-sm truncate">{club.name}</h3>
                      <p className="text-[10px] text-stone-400 mt-0.5 font-medium">{club.category}</p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJoinToggle(club.id);
                      }}
                      className={`text-[10px] font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer shrink-0 ${
                        club.isJoined 
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                      }`}
                    >
                      {club.isJoined ? (
                        <span className="flex items-center gap-1">
                          <Check className="w-3 h-3 shrink-0" /> A’zosiz
                        </span>
                      ) : (
                        'A’zo bo‘lish'
                      )}
                    </button>
                  </div>

                  <div className="flex flex-col gap-2 bg-stone-50 p-3 rounded-2xl border border-stone-100">
                    <span className="text-[9px] uppercase font-bold text-stone-400 tracking-wider">Hozir o‘qilmoqda</span>
                    <div className="flex items-center gap-2 text-xs">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-bold text-stone-800 truncate">{club.activeBook}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      {club.members} a’zo
                    </span>
                    <span>Moderator: <span className="font-bold text-stone-700">{club.moderator}</span></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Selected Club active Chatroom Forum (Span 7 cols) */}
        <div className="lg:col-span-7 flex flex-col h-[520px] bg-white rounded-3xl border border-emerald-900/5 shadow-md overflow-hidden">
          {currentClub ? (
            <>
              {/* Forum header */}
              <div className="p-4 bg-emerald-950 text-white flex justify-between items-center shrink-0">
                <div className="min-w-0">
                  <h3 className="font-display font-black text-xs truncate uppercase tracking-widest text-emerald-400">
                    {currentClub.category} Muhokama forumi
                  </h3>
                  <h4 className="font-bold text-sm text-white truncate mt-0.5">{currentClub.name}</h4>
                </div>
                
                <span className="bg-emerald-800/60 text-[10px] text-emerald-300 font-bold px-2.5 py-1 rounded-lg">
                  {currentClub.members} a’zo faol
                </span>
              </div>

              {/* Chat Content Scroll */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-stone-50/40">
                {currentMessages.length > 0 ? (
                  currentMessages.map((msg) => (
                    <div key={msg.id} className="flex gap-3 items-start max-w-[85%]">
                      <img 
                        src={msg.avatar} 
                        alt={msg.sender} 
                        className="w-8 h-8 rounded-full border border-stone-150 shrink-0 object-cover"
                      />
                      <div className="flex flex-col gap-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-[10px] font-bold text-stone-800">{msg.sender}</span>
                          <span className="text-[8px] text-stone-400 font-medium">{msg.time}</span>
                        </div>
                        <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-stone-200/50 text-xs text-stone-700 leading-relaxed shadow-3xs">
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="my-auto text-center p-8 flex flex-col items-center gap-2">
                    <MessageSquare className="w-10 h-10 text-stone-300 animate-bounce" />
                    <h4 className="font-bold text-stone-700 text-xs">Muhokama bo‘sh</h4>
                    <p className="text-[11px] text-stone-400 max-w-xs">Klubga qo‘shilib o‘zingizning birinchi fikringizni bildiring.</p>
                  </div>
                )}
              </div>

              {/* Chat input submission form */}
              <form 
                onSubmit={(e) => handleSendMessage(currentClub.id, e)}
                className="p-4 border-t border-stone-100 shrink-0 flex gap-2 bg-white"
              >
                <input 
                  type="text"
                  value={clubMessageInputs[currentClub.id] || ''}
                  onChange={(e) => setClubMessageInputs({ ...clubMessageInputs, [currentClub.id]: e.target.value })}
                  placeholder={currentClub.isJoined ? "Muhokamada fikringizni yozing..." : "Xabar yozish uchun avval klubga a’zo bo‘ling"}
                  disabled={!currentClub.isJoined}
                  className="flex-1 bg-stone-50 border border-stone-200 px-4 py-3 rounded-xl text-xs focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!currentClub.isJoined}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-300 text-white w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-xs transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="my-auto text-center p-8 flex flex-col items-center justify-center h-full">
              <Users className="w-12 h-12 text-stone-300" />
              <h4 className="font-bold text-stone-700 text-sm mt-3">Klub tanlanmagan</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
