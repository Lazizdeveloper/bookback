import React from 'react';
import { useApp } from '../context/AppContext';
import { BookCard } from '../components/BookCard';
import { Heart, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SavedPage: React.FC = () => {
  const navigate = useNavigate();
  const { savedBookIds, books } = useApp();

  // Find saved book elements
  const savedBooks = books.filter(b => savedBookIds.includes(b.id));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-display font-extrabold text-stone-900">Saqlangan kitoblar</h2>
        <p className="text-xs text-stone-500">Keyinchalik o‘qish yoki bog‘lanish uchun belgilab qo‘yilgan kitoblaringiz</p>
      </div>

      {savedBooks.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {savedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white p-12 rounded-3xl border border-dashed border-stone-200 text-center flex flex-col items-center gap-4 justify-center py-20">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center animate-pulse">
            <Heart className="w-8 h-8 text-emerald-600" />
          </div>
          <div>
            <h4 className="font-bold text-stone-800 text-sm">Saqlangan kitoblar topilmadi</h4>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              Sizga yoqqan kitoblarni saqlab qo‘yish va keyinroq tezkor bog‘lanish uchun kitob kartasidagi yurakcha ❤️ tugmasini bosing.
            </p>
          </div>
          <button
            onClick={() => navigate('/search')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-5 rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
          >
            Kitoblar katalogini ko‘rish
          </button>
        </div>
      )}
    </div>
  );
};
