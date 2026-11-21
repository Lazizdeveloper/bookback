import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ChatRoom, Message } from '../types';
import { 
  Send, ArrowLeft, ShieldAlert, MessageCircle, 
  HelpCircle, CheckCheck, Smile, Star 
} from 'lucide-react';

export const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { chats, messages, addMessage, showToast, user } = useApp();
  
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of active messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [id, messages]);

  // Find active chat room
  const activeChat = chats.find(c => c.id === id);
  const activeMessages = id ? (messages[id] || []) : [];

  const handleSendMessage = (textToSend: string) => {
    if (!id) return;
    if (!textToSend.trim()) return;
    
    addMessage(id, textToSend);
    setInputText('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  // Quick message tags for single-click conversations
  const quickPhrases = [
    'Kitob hali bormi?',
    'Ayirboshlash mumkinmi?',
    'Qayerdan olib ketsam bo‘ladi?',
    'Narxini kelishsak bo‘ladimi?'
  ];

  // Initiate Support Chat room helper
  const handleStartSupportChat = () => {
    // Check if support chat already exists
    const supportChat = chats.find(c => c.isSupport);
    if (supportChat) {
      navigate(`/chat/${supportChat.id}`);
    } else {
      showToast('BookBack Yordam operatori bilan bog‘lanilmoqda...', 'info');
      // Set timeout or generate a new mock support room
      const supportId = `chat_support`;
      // Direct navigate
      navigate(`/chat/${supportId}`);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-emerald-900/5 shadow-md flex h-[620px] overflow-hidden">
      {/* LEFT PANE: Chat Room list (Hidden on Mobile when specific Chat is open) */}
      <aside className={`w-full md:w-80 border-r border-stone-100 flex flex-col shrink-0 ${id ? 'hidden md:flex' : 'flex'}`}>
        {/* Header */}
        <div className="p-4 border-b border-stone-100 shrink-0">
          <h3 className="font-display font-extrabold text-stone-900 text-lg">Xabarlar</h3>
          <p className="text-[11px] text-stone-500">Kitobxonlar bilan yozishmalar</p>
        </div>

        {/* Support Banner Card */}
        <div className="p-4 bg-emerald-500/5 border-b border-emerald-100/50 shrink-0 flex flex-col gap-2">
          <div className="flex gap-2.5 items-center">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <div>
              <h4 className="text-xs font-bold text-emerald-950">BookBack yordam markazi</h4>
              <p className="text-[10px] text-emerald-800">Sizga savollar yoki texnik xizmatlar kerakmi?</p>
            </div>
          </div>
          <button
            onClick={handleStartSupportChat}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-3 rounded-lg text-[10px] shadow-xs transition-colors cursor-pointer"
          >
            Yordam xizmati bilan bog‘lanish
          </button>
        </div>

        {/* Room List Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
          {chats.map((room) => {
            const isSelected = room.id === id;
            return (
              <div
                key={room.id}
                onClick={() => navigate(`/chat/${room.id}`)}
                className={`p-3 rounded-2xl flex gap-3 items-center cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-emerald-500/10 border-l-4 border-emerald-600' 
                    : 'hover:bg-stone-50 border-l-4 border-transparent'
                }`}
              >
                <img 
                  src={room.partnerAvatar} 
                  alt={room.partnerName} 
                  className="w-10 h-10 rounded-full border border-stone-100 shrink-0 bg-stone-50 object-cover"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-xs font-bold text-stone-800 truncate">{room.partnerName}</h4>
                    <span className="text-[9px] text-stone-400 font-medium shrink-0">{room.lastMessageTime}</span>
                  </div>
                  
                  <span className="text-[10px] font-semibold text-emerald-700 truncate block mt-0.5">
                    📖 {room.bookTitle}
                  </span>
                  
                  <p className="text-[10px] text-stone-500 truncate mt-0.5 leading-snug">
                    {room.lastMessage}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* RIGHT PANE: Chat Room Viewport (Hidden on Mobile when no Chat is selected) */}
      <section className={`flex-1 flex flex-col bg-stone-50/50 ${!id ? 'hidden md:flex justify-center items-center text-center p-6' : 'flex'}`}>
        {activeChat ? (
          <>
            {/* Chat Room Top Bar */}
            <div className="p-4 bg-white border-b border-stone-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                {/* Back button for mobile */}
                <button 
                  onClick={() => navigate('/chat')}
                  className="md:hidden p-1 rounded-full hover:bg-stone-100 text-stone-500"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <img 
                  src={activeChat.partnerAvatar} 
                  alt={activeChat.partnerName} 
                  className="w-10 h-10 rounded-full border border-stone-100 object-cover bg-stone-100 shrink-0"
                />
                
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-stone-900 truncate">{activeChat.partnerName}</h4>
                  <p className="text-[10px] text-emerald-600 font-semibold truncate mt-0.5">
                    Kitob: “{activeChat.bookTitle}”
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-[10px] font-bold shrink-0">
                <Smile className="w-3.5 h-3.5 text-emerald-600" />
                <span>Xavfsiz suhbat oynasi</span>
              </div>
            </div>

            {/* Safety Reminder Alert Banner */}
            <div className="bg-amber-50 text-[10px] text-amber-800 px-4 py-2 border-b border-amber-100 shrink-0 flex items-center gap-1.5 leading-snug">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Pul o‘tkazishdan avval kitobni tekshirib ko‘ring. Hech qachon oldindan to‘lov qilmang!</span>
            </div>

            {/* Messages Area (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {activeMessages.length > 0 ? (
                activeMessages.map((msg) => {
                  const isMe = msg.senderId === 'me';
                  return (
                    <div 
                      key={msg.id}
                      className={`flex flex-col max-w-[75%] gap-1 ${isMe ? 'self-end items-end' : 'self-start items-start'}`}
                    >
                      {/* Bubble content */}
                      <div className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-3xs ${
                        isMe 
                          ? 'bg-emerald-600 text-white rounded-tr-none' 
                          : 'bg-white border border-stone-200/80 text-stone-800 rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                      
                      {/* Message meta */}
                      <div className="flex items-center gap-1 text-[9px] text-stone-400 px-1 font-medium">
                        <span>{msg.time}</span>
                        {isMe && <CheckCheck className="w-3 h-3 text-emerald-500" />}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="my-auto text-center p-8 flex flex-col items-center gap-2">
                  <MessageCircle className="w-10 h-10 text-stone-300" />
                  <p className="text-xs font-semibold text-stone-700">Suhbat boshlandi</p>
                  <p className="text-[11px] text-stone-400">Kitob egasiga salom bering va qayerdan olib ketishingizni so‘rang.</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies Buttons Pane */}
            <div className="px-4 py-2 shrink-0 flex flex-wrap gap-2 bg-white/40 border-t border-stone-100/50">
              {quickPhrases.map((phrase) => (
                <button
                  key={phrase}
                  onClick={() => handleSendMessage(phrase)}
                  className="bg-white hover:bg-emerald-50 border border-stone-200 hover:border-emerald-500 text-[10px] font-semibold text-stone-700 hover:text-emerald-800 px-2.5 py-1 rounded-lg transition-all active:scale-95 cursor-pointer shadow-3xs"
                >
                  {phrase}
                </button>
              ))}
            </div>

            {/* Message input footer form */}
            <form onSubmit={handleFormSubmit} className="p-4 bg-white border-t border-stone-100 shrink-0 flex gap-2">
              <input 
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Xabaringizni yozing..."
                className="flex-1 bg-stone-50 border border-stone-200 px-4 py-3 rounded-xl text-xs focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-all"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white w-11 h-11 rounded-xl flex items-center justify-center shadow-md transition-colors shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center text-center gap-3 p-8">
            <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
              <MessageCircle className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-bold text-stone-800 text-sm">Suhbatni tanlang</h4>
              <p className="text-xs text-stone-500 mt-1 max-w-xs">
                Muloqotni boshlash uchun chap tomondagi xabarlar ro‘yxatidan tanlang yoki kitob sahifasidagi “Xabar yozish” tugmasini bosing.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
