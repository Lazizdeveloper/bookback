import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Check, Trash, CheckSquare, MessageSquare, ArrowLeftRight, Flame, Star, Sparkles } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, showToast } = useApp();

  const handleMarkRead = (id: string) => {
    markNotificationRead(id);
  };

  const getNotifIcon = (type: typeof notifications[0]['type']) => {
    switch (type) {
      case 'offer':
        return <ArrowLeftRight className="w-5 h-5 text-violet-600" />;
      case 'match':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'chat':
        return <MessageSquare className="w-5 h-5 text-emerald-600" />;
      default:
        return <Bell className="w-5 h-5 text-stone-500" />;
    }
  };

  const handleCleanAll = () => {
    markAllNotificationsRead();
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-display font-extrabold text-stone-900">Bildirishnomalar</h2>
          <p className="text-xs text-stone-500">Kitoblaringizga kelgan takliflar va yangi xabarlar haqida bildirishnomalar</p>
        </div>

        {notifications.some(n => !n.isRead) && (
          <button
            onClick={handleCleanAll}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <CheckSquare className="w-4 h-4" /> Barchasini o‘qildi deb belgilash
          </button>
        )}
      </div>

      <div className="bg-white rounded-3xl border border-emerald-900/5 shadow-xs overflow-hidden">
        {notifications.length > 0 ? (
          <div className="divide-y divide-stone-100">
            {notifications.map((notif) => (
              <div 
                key={notif.id}
                onClick={() => handleMarkRead(notif.id)}
                className={`p-5 flex gap-4 items-start cursor-pointer transition-colors relative ${
                  notif.isRead ? 'bg-white hover:bg-stone-50/50' : 'bg-emerald-50/15 hover:bg-emerald-50/20'
                }`}
              >
                {/* Unread circle badge */}
                {!notif.isRead && (
                  <span className="absolute top-5 left-3 w-2 h-2 rounded-full bg-emerald-600"></span>
                )}

                {/* Left icon wrapper */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  notif.isRead ? 'bg-stone-100 text-stone-500' : 'bg-white text-emerald-600 shadow-3xs border border-stone-100'
                }`}>
                  {getNotifIcon(notif.type)}
                </div>

                <div className="flex-1 min-w-0 pr-4">
                  <div className="flex justify-between items-baseline gap-2">
                    <h4 className={`text-xs font-bold truncate ${notif.isRead ? 'text-stone-700' : 'text-stone-950 font-black'}`}>
                      {notif.title}
                    </h4>
                    <span className="text-[10px] text-stone-400 font-medium shrink-0">{notif.time}</span>
                  </div>
                  <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                    {notif.text}
                  </p>
                </div>

                {/* Right button to manual tick */}
                {!notif.isRead && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkRead(notif.id);
                    }}
                    className="p-1.5 rounded-full hover:bg-emerald-50 text-stone-400 hover:text-emerald-600 transition-colors"
                    title="O‘qildi"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-16 text-center flex flex-col items-center gap-4 py-20">
            <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-stone-800 text-sm">Hozircha hech qanday bildirishnomalar yo‘q</h4>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Kelgusi takliflar, uchrashuv belgilash xabarlari yoki yangi xabarlar shu yerda aks etadi.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
