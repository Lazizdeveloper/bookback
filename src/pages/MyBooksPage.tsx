import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Book } from '../types';
import { Layers, Edit3, Trash2, CheckCircle2, Clock, Eye, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Tab = 'active' | 'pending' | 'completed' | 'deleted';

export const MyBooksPage: React.FC = () => {
  const navigate = useNavigate();
  const { books, deleteBook, updateBook, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('active');

  // Filter books owned by me ('me')
  const myBooks = books.filter(b => b.ownerId === 'me');

  // State to track deleted books locally for the session so they show in the "O'chirilgan" tab!
  const [sessionDeletedBooks, setSessionDeletedBooks] = useState<Book[]>([]);
  // State to track completed books locally
  const [completedBookIds, setCompletedBookIds] = useState<string[]>([]);
  // State to track pending books (mocking one for visual realism!)
  const [pendingBooks] = useState<Book[]>([
    {
      id: 'pending_1',
      title: 'Biznes sirlari',
      author: 'Yusuf Aliyev',
      image: 'bg-gradient-to-br from-indigo-800 to-purple-950',
      genre: 'Biznes va moliya',
      condition: 'Yangi',
      type: 'selling',
      price: 50000,
      location: 'Toshkent',
      distance: '0.0 km',
      ownerId: 'me',
      ownerName: 'Mening Profilim',
      ownerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      ownerRating: 5.0,
      description: 'Biznesni noldan boshlash bo‘yicha amaliy darslik.',
      createdAt: 'Bugun, 11:20'
    }
  ]);

  const activeMyBooks = myBooks.filter(b => !completedBookIds.includes(b.id));
  const completedMyBooks = myBooks.filter(b => completedBookIds.includes(b.id));

  const handleMarkAsCompleted = (bookId: string) => {
    setCompletedBookIds([...completedBookIds, bookId]);
    showToast('Kitob muvaffaqiyatli yakunlandi deb belgilandi! 🎉', 'success');
  };

  const handleDeleteBook = (book: Book) => {
    // Delete from primary list
    deleteBook(book.id);
    // Add to session deleted list
    setSessionDeletedBooks([...sessionDeletedBooks, book]);
  };

  const handleRestoreBook = (book: Book) => {
    // Restore locally
    setSessionDeletedBooks(sessionDeletedBooks.filter(b => b.id !== book.id));
    // Re-insert into AppContext (via addBook)
    updateBook(book.id, {}); // For demo triggers
    showToast('E’lon muvaffaqiyatli tiklandi.', 'success');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-display font-extrabold text-stone-900">Mening e’lonlarim</h2>
          <p className="text-xs text-stone-500">Siz tomondan tizimga qo‘shilgan barcha kitoblar ro‘yxati</p>
        </div>
        <button
          onClick={() => navigate('/add')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs shadow-md transition-colors cursor-pointer"
        >
          + Yangi e’lon qo‘shish
        </button>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-stone-200 gap-2 shrink-0 overflow-x-auto scrollbar-none pb-0.5">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 shrink-0 cursor-pointer ${
            activeTab === 'active' 
              ? 'border-emerald-600 text-emerald-700 font-extrabold' 
              : 'border-transparent text-stone-500 hover:text-stone-700'
          }`}
        >
          Faol e’lonlar ({activeMyBooks.length})
        </button>

        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 shrink-0 cursor-pointer ${
            activeTab === 'pending' 
              ? 'border-emerald-600 text-emerald-700 font-extrabold' 
              : 'border-transparent text-stone-500 hover:text-stone-700'
          }`}
        >
          Kutilayotgan ({pendingBooks.length})
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 shrink-0 cursor-pointer ${
            activeTab === 'completed' 
              ? 'border-emerald-600 text-emerald-700 font-extrabold' 
              : 'border-transparent text-stone-500 hover:text-stone-700'
          }`}
        >
          Yakunlangan ({completedMyBooks.length})
        </button>

        <button
          onClick={() => setActiveTab('deleted')}
          className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 shrink-0 cursor-pointer ${
            activeTab === 'deleted' 
              ? 'border-emerald-600 text-emerald-700 font-extrabold' 
              : 'border-transparent text-stone-500 hover:text-stone-700'
          }`}
        >
          O‘chirilgan ({sessionDeletedBooks.length})
        </button>
      </div>

      {/* Active Tab contents */}
      <div className="flex flex-col gap-4">
        {/* TAB 1: ACTIVE */}
        {activeTab === 'active' && (
          activeMyBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeMyBooks.map(book => (
                <div key={book.id} className="bg-white p-4 rounded-3xl border border-stone-200/60 flex flex-col sm:flex-row justify-between gap-4 shadow-3xs hover:border-emerald-600/10 transition-colors">
                  <div className="flex gap-4 items-start flex-1 min-w-0">
                    {/* Cover thumbnail */}
                    <div className={`w-14 h-20 ${book.image} rounded-xl shadow-xs shrink-0 relative flex flex-col justify-between p-1.5`}>
                      <div className="w-[1.5px] h-full absolute left-1 bg-white/20"></div>
                      <span className="text-[6px] text-white/40 font-bold uppercase">Book</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-100 px-2 py-0.5 rounded-full uppercase">
                        {book.type === 'selling' ? 'Sotiladi' : book.type === 'exchange' ? 'Ayirboshlanadi' : 'Bepul'}
                      </span>
                      <h3 className="font-bold text-sm text-stone-900 mt-1 truncate">{book.title}</h3>
                      <p className="text-[11px] text-stone-400 truncate mt-0.5">{book.author}</p>
                      
                      <div className="mt-2 text-xs font-bold text-emerald-700">
                        {book.type === 'selling' ? `${book.price?.toLocaleString()} so‘m` : '🔄 O‘zaro almashtirish'}
                      </div>
                    </div>
                  </div>

                  {/* Actions column */}
                  <div className="flex sm:flex-col justify-end gap-2 shrink-0 sm:pl-4 border-t sm:border-t-0 pt-3 sm:pt-0 sm:border-l border-stone-100 min-w-[120px]">
                    <button
                      onClick={() => handleMarkAsCompleted(book.id)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-3 rounded-lg text-[10px] flex items-center justify-center gap-1 cursor-pointer"
                      title="Bitim yakunlandi deb belgilash"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Yakunlash
                    </button>
                    <button
                      onClick={() => navigate(`/books/${book.id}`)}
                      className="flex-1 border border-stone-200 hover:bg-stone-50 text-stone-600 py-1.5 px-3 rounded-lg text-[10px] flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" /> Ko‘rish
                    </button>
                    <button
                      onClick={() => handleDeleteBook(book)}
                      className="flex-1 border border-rose-100 hover:bg-rose-50 text-stone-400 hover:text-rose-600 py-1.5 px-3 rounded-lg text-[10px] flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> O‘chirish
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-stone-200 flex flex-col items-center gap-3 py-16">
              <Layers className="w-10 h-10 text-stone-300" />
              <p className="text-xs text-stone-400">Sizda hozircha faol e’lonlar yo‘q.</p>
              <button onClick={() => navigate('/add')} className="mt-1 text-xs font-bold text-emerald-600 hover:underline">
                + Birinchi kitobingizni qo‘shing
              </button>
            </div>
          )
        )}

        {/* TAB 2: PENDING (MODERATION REVIEW) */}
        {activeTab === 'pending' && (
          pendingBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pendingBooks.map(book => (
                <div key={book.id} className="bg-white p-4 rounded-3xl border border-stone-200/60 flex justify-between gap-4 items-center opacity-85">
                  <div className="flex gap-4 items-start flex-1 min-w-0">
                    <div className={`w-14 h-20 ${book.image} rounded-xl shadow-xs shrink-0 relative flex flex-col justify-between p-1.5`}>
                      <div className="w-[1.5px] h-full absolute left-1 bg-white/20"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full flex items-center gap-1 w-max">
                        <Clock className="w-3 h-3 text-amber-600 animate-pulse" /> Moderatsiyada
                      </span>
                      <h3 className="font-bold text-sm text-stone-800 mt-1.5 truncate">{book.title}</h3>
                      <p className="text-[11px] text-stone-400 truncate">{book.author}</p>
                    </div>
                  </div>
                  <span className="text-xs text-stone-400 font-medium italic">2 soat ichida</span>
                </div>
              ))}
            </div>
          ) : null
        )}

        {/* TAB 3: COMPLETED */}
        {activeTab === 'completed' && (
          completedMyBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {completedMyBooks.map(book => (
                <div key={book.id} className="bg-white p-4 rounded-3xl border border-stone-200/60 flex justify-between gap-4 items-center opacity-80">
                  <div className="flex gap-4 items-start flex-1 min-w-0">
                    <div className={`w-14 h-20 ${book.image} rounded-xl shadow-xs shrink-0 relative flex flex-col justify-between p-1.5`}>
                      <div className="w-[1.5px] h-full absolute left-1 bg-white/20"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-bold bg-stone-100 text-stone-700 border border-stone-200 px-2 py-0.5 rounded-full uppercase">
                        Yakunlangan ✅
                      </span>
                      <h3 className="font-bold text-sm text-stone-800 mt-1.5 truncate">{book.title}</h3>
                      <p className="text-[11px] text-stone-400 truncate">{book.author}</p>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-600 font-bold">Muvaffaqiyatli</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-stone-200 flex flex-col items-center gap-3 py-16">
              <CheckCircle2 className="w-10 h-10 text-stone-300" />
              <p className="text-xs text-stone-400">Sizda hozircha yakunlangan bitimlar yo‘q.</p>
            </div>
          )
        )}

        {/* TAB 4: DELETED */}
        {activeTab === 'deleted' && (
          sessionDeletedBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sessionDeletedBooks.map(book => (
                <div key={book.id} className="bg-white p-4 rounded-3xl border border-stone-200/60 flex justify-between gap-4 items-center opacity-75">
                  <div className="flex gap-4 items-start flex-1 min-w-0">
                    <div className={`w-14 h-20 ${book.image} rounded-xl shadow-xs shrink-0 relative flex flex-col justify-between p-1.5`}>
                      <div className="w-[1.5px] h-full absolute left-1 bg-white/20"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-bold bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-full uppercase">
                        O‘chirilgan
                      </span>
                      <h3 className="font-bold text-sm text-stone-800 mt-1.5 truncate">{book.title}</h3>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleRestoreBook(book)}
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold py-1.5 px-3 rounded-lg text-[10px] cursor-pointer"
                  >
                    Qayta tiklash
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-stone-200 flex flex-col items-center gap-3 py-16">
              <AlertCircle className="w-10 h-10 text-stone-300" />
              <p className="text-xs text-stone-400">Siz o‘chirgan e’lonlar yo‘q.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};
