import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '../types';
import { useApp } from '../context/AppContext';
import { MapPin, Heart, BookOpen, Star } from 'lucide-react';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const navigate = useNavigate();
  const { savedBookIds, toggleSaveBook } = useApp();
  const isSaved = savedBookIds.includes(book.id);

  const getConditionColor = (cond: Book['condition']) => {
    switch (cond) {
      case 'Yangi': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Yaxshi': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'O‘rtacha': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Eskirgan': return 'bg-stone-100 text-stone-700 border-stone-200';
      default: return 'bg-stone-100 text-stone-800';
    }
  };

  const formatPrice = (p?: number) => {
    if (p === undefined) return '';
    return p.toLocaleString('uz-UZ') + ' so‘m';
  };

  return (
    <div 
      onClick={() => navigate(`/books/${book.id}`)}
      className="group bg-white rounded-2xl overflow-hidden border border-emerald-900/5 hover:border-emerald-600/20 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full cursor-pointer relative"
    >
      {/* Heart Save button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          toggleSaveBook(book.id);
        }}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs hover:bg-white text-stone-500 hover:text-rose-500 transition-all duration-200 active:scale-95"
      >
        <Heart 
          className={`w-4 h-4 transition-colors ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-stone-500'}`} 
        />
      </button>

      {/* Tactile Book Cover Visualizer */}
      <div className="relative aspect-3/4 w-full overflow-hidden bg-stone-100 shrink-0">
        <div className={`w-full h-full ${book.image} flex flex-col justify-between p-4 relative`}>
          {/* Leather spine indentation line to mimic a premium bound book */}
          <div className="absolute top-0 bottom-0 left-2.5 w-[2px] bg-black/15 shadow-[1px_0_1px_rgba(255,255,255,0.05)]"></div>
          <div className="absolute top-0 bottom-0 left-3 w-[1px] bg-white/10"></div>
          
          <div className="flex justify-between items-start pl-3">
            {/* Condition badge */}
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${getConditionColor(book.condition)}`}>
              {book.condition}
            </span>
          </div>

          <div className="flex flex-col items-center text-center px-4 py-6 my-auto select-none pl-6">
            <BookOpen className="w-8 h-8 text-white/40 mb-3" />
            <h3 className="text-sm font-display font-bold text-white leading-tight line-clamp-2 drop-shadow-md">
              {book.title}
            </h3>
            <p className="text-[11px] text-white/80 mt-1 italic font-light truncate max-w-full drop-shadow-xs">
              {book.author}
            </p>
          </div>

          <div className="flex justify-between items-end pl-3">
            {/* Tag type badge */}
            {book.type === 'selling' && (
              <span className="text-[10px] font-semibold bg-emerald-600 text-white px-2 py-0.5 rounded-md shadow-xs">
                Sotuv
              </span>
            )}
            {book.type === 'exchange' && (
              <span className="text-[10px] font-semibold bg-violet-600 text-white px-2 py-0.5 rounded-md shadow-xs">
                Ayirboshlash
              </span>
            )}
            {book.type === 'free' && (
              <span className="text-[10px] font-semibold bg-amber-500 text-white px-2 py-0.5 rounded-md shadow-xs">
                Bepul
              </span>
            )}
            {book.type === 'request' && (
              <span className="text-[10px] font-semibold bg-sky-600 text-white px-2 py-0.5 rounded-md shadow-xs">
                Izlanmoqda
              </span>
            )}
            
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-1.5 py-0.5 rounded-sm text-[9px] text-white">
              <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
              <span>{book.ownerRating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Book details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-2 bg-white">
        <div>
          <h4 className="text-sm font-semibold text-stone-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
            {book.title}
          </h4>
          <p className="text-xs text-stone-500 mt-0.5 truncate">{book.author}</p>
        </div>

        <div className="pt-2 border-t border-stone-100 flex flex-col gap-1.5">
          {/* Price / Exchange conditions display */}
          <div className="min-h-5">
            {book.type === 'selling' ? (
              <p className="text-sm font-bold text-emerald-700">{formatPrice(book.price)}</p>
            ) : book.type === 'exchange' ? (
              <p className="text-xs text-violet-700 font-medium truncate italic" title={book.exchangeCondition}>
                🔄 {book.exchangeCondition || 'Almashiladi'}
              </p>
            ) : book.type === 'free' ? (
              <p className="text-sm font-bold text-amber-600">Tekinga (Bepul)</p>
            ) : (
              <p className="text-xs text-sky-600 font-medium truncate">🔍 Izlamoqda (So‘rov)</p>
            )}
          </div>

          {/* Location and Distance */}
          <div className="flex items-center justify-between text-[11px] text-stone-400">
            <span className="flex items-center gap-1 truncate max-w-[65%]">
              <MapPin className="w-3 h-3 text-emerald-600/70 shrink-0" />
              <span className="truncate">{book.location}</span>
            </span>
            <span className="shrink-0 font-medium text-stone-500">{book.distance}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
