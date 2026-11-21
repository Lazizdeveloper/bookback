import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, ExchangeProposal, BookClub, Notification, ChatRoom, Message } from '../types';
import { MOCK_BOOKS, MOCK_CLUBS, MOCK_EXCHANGES, MOCK_NOTIFICATIONS, MOCK_CHATS, MOCK_MESSAGES } from '../data';

interface User {
  name: string;
  phone: string;
  email: string;
  region: string;
  rating: number;
  avatar: string;
}

interface AppContextType {
  user: User | null;
  books: Book[];
  savedBookIds: string[];
  proposals: ExchangeProposal[];
  notifications: Notification[];
  chats: ChatRoom[];
  messages: Record<string, Message[]>;
  clubs: BookClub[];
  login: (name: string, phone: string, email: string, region: string) => void;
  logout: () => void;
  addBook: (bookData: Omit<Book, 'id' | 'ownerId' | 'ownerName' | 'ownerAvatar' | 'ownerRating' | 'createdAt'>) => void;
  deleteBook: (bookId: string) => void;
  updateBook: (bookId: string, updatedFields: Partial<Book>) => void;
  toggleSaveBook: (bookId: string) => void;
  addProposal: (myBook: string, requestedBook: string, ownerName: string, bookId: string) => void;
  updateProposalStatus: (proposalId: string, newStatus: ExchangeProposal['status']) => void;
  addMessage: (chatId: string, text: string) => void;
  addChatRoom: (book: Book) => string;
  toggleClubJoin: (clubId: string) => void;
  markNotificationRead: (notifId: string) => void;
  markAllNotificationsRead: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  toast: { message: string; type: 'success' | 'info' | 'warning' } | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states from localStorage or mock
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('bb_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name && (parsed.name.includes('Sherzod') || parsed.name.toLowerCase().includes('sherzod'))) {
          parsed.name = 'Anisa Karimova';
          parsed.email = 'anisa@example.com';
          parsed.avatar = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150';
          localStorage.setItem('bb_user', JSON.stringify(parsed));
          return parsed;
        }
        return parsed;
      } catch {
        // fallback
      }
    }
    return {
      name: 'Anisa Karimova',
      phone: '+998 90 123 45 67',
      email: 'anisa@example.com',
      region: 'Toshkent',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
    }; // Default logged in for easier demo, can login/logout in UI
  });

  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem('bb_books');
    return saved ? JSON.parse(saved) : MOCK_BOOKS;
  });

  const [savedBookIds, setSavedBookIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('bb_saved_ids');
    return saved ? JSON.parse(saved) : ['1', '3', '5']; // Default saves
  });

  const [proposals, setProposals] = useState<ExchangeProposal[]>(() => {
    const saved = localStorage.getItem('bb_proposals');
    return saved ? JSON.parse(saved) : MOCK_EXCHANGES;
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('bb_notifications');
    return saved ? JSON.parse(saved) : MOCK_NOTIFICATIONS;
  });

  const [chats, setChats] = useState<ChatRoom[]>(() => {
    const saved = localStorage.getItem('bb_chats');
    return saved ? JSON.parse(saved) : MOCK_CHATS;
  });

  const [messages, setMessages] = useState<Record<string, Message[]>>(() => {
    const saved = localStorage.getItem('bb_messages');
    return saved ? JSON.parse(saved) : MOCK_MESSAGES;
  });

  const [clubs, setClubs] = useState<BookClub[]>(() => {
    const saved = localStorage.getItem('bb_clubs');
    return saved ? JSON.parse(saved) : MOCK_CLUBS;
  });

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // Synchronize storage
  useEffect(() => {
    localStorage.setItem('bb_user', user ? JSON.stringify(user) : '');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('bb_books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('bb_saved_ids', JSON.stringify(savedBookIds));
  }, [savedBookIds]);

  useEffect(() => {
    localStorage.setItem('bb_proposals', JSON.stringify(proposals));
  }, [proposals]);

  useEffect(() => {
    localStorage.setItem('bb_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('bb_chats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem('bb_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('bb_clubs', JSON.stringify(clubs));
  }, [clubs]);

  // Actions
  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const login = (name: string, phone: string, email: string, region: string) => {
    const newUser = {
      name,
      phone,
      email,
      region,
      rating: 5.0,
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`
    };
    setUser(newUser);
    showToast('Tizimga muvaffaqiyatli kirdingiz!', 'success');
  };

  const logout = () => {
    setUser(null);
    showToast('Tizimdan chiqdingiz.', 'info');
  };

  const addBook = (bookData: Omit<Book, 'id' | 'ownerId' | 'ownerName' | 'ownerAvatar' | 'ownerRating' | 'createdAt'>) => {
    const newBook: Book = {
      ...bookData,
      id: `book_${Date.now()}`,
      ownerId: 'me',
      ownerName: user?.name || 'Mening Profilim',
      ownerAvatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      ownerRating: user?.rating || 5.0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setBooks([newBook, ...books]);
    showToast('E’loningiz muvaffaqiyatli joylandi!', 'success');
  };

  const deleteBook = (bookId: string) => {
    setBooks(books.filter(b => b.id !== bookId));
    showToast('E’lon muvaffaqiyatli o‘chirildi.', 'info');
  };

  const updateBook = (bookId: string, updatedFields: Partial<Book>) => {
    setBooks(books.map(b => b.id === bookId ? { ...b, ...updatedFields } : b));
    showToast('E’lon muvaffaqiyatli tahrirlandi.', 'success');
  };

  const toggleSaveBook = (bookId: string) => {
    if (savedBookIds.includes(bookId)) {
      setSavedBookIds(savedBookIds.filter(id => id !== bookId));
      showToast('Kitob saqlanganlardan olib tashlandi.', 'info');
    } else {
      setSavedBookIds([...savedBookIds, bookId]);
      showToast('Kitob saqlanganlarga qo‘shildi!', 'success');
    }
  };

  const addProposal = (myBook: string, requestedBook: string, ownerName: string, bookId: string) => {
    const newProposal: ExchangeProposal = {
      id: `p_${Date.now()}`,
      myBookTitle: myBook,
      requestedBookTitle: requestedBook,
      status: 'Kutilmoqda',
      date: 'Hozirgina',
      ownerName,
      bookId
    };
    setProposals([newProposal, ...proposals]);
    showToast('Ayirboshlash taklifi yuborildi!', 'success');

    // Create a notification for the system/user
    const newNotif: Notification = {
      id: `n_${Date.now()}`,
      title: 'Taklif yuborildi',
      text: `Sizning “${myBook}” kitobingiz evaziga “${ownerName}”dan “${requestedBook}”ni olish bo‘yicha taklifingiz yuborildi.`,
      time: 'Hozirgina',
      type: 'offer',
      isRead: false
    };
    setNotifications([newNotif, ...notifications]);
  };

  const updateProposalStatus = (proposalId: string, newStatus: ExchangeProposal['status']) => {
    setProposals(proposals.map(p => p.id === proposalId ? { ...p, status: newStatus } : p));
    showToast(`Taklif holati o‘zgartirildi: ${newStatus}`, 'info');

    // Notification of status change
    const proposal = proposals.find(p => p.id === proposalId);
    if (proposal) {
      const newNotif: Notification = {
        id: `n_${Date.now()}`,
        title: 'Taklif holati yangilandi',
        text: `“${proposal.ownerName}”ga yuborilgan taklifingiz holati: “${newStatus}” bo‘ldi.`,
        time: 'Hozirgina',
        type: 'match',
        isRead: false
      };
      setNotifications([newNotif, ...notifications]);
    }
  };

  const addMessage = (chatId: string, text: string) => {
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      senderId: 'me',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMessage]
    }));

    // Update last message in the chat room list
    setChats(prev => prev.map(c => c.id === chatId ? {
      ...c,
      lastMessage: text,
      lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } : c));

    // Auto simulated reply after 1.5 seconds to make the app feel alive!
    setTimeout(() => {
      const chat = chats.find(c => c.id === chatId);
      if (!chat) return;

      const replyText = chat.isSupport 
        ? "Assalomu alaykum! BookBack qo‘llab-quvvatlash xizmati sizga yordam berishdan mamnun. Muammoingiz bartaraf etilishi uchun operatorlarimiz tez orada bog‘lanishadi."
        : `Tushunarli. Kitob haqida gaplashib olsak bo‘ladi, kelishilgan joyda uchrashamiz. Men kitobni “${chat.bookTitle}” bilan birga olib kelaman!`;

      const autoReply: Message = {
        id: `msg_reply_${Date.now()}`,
        senderId: chat.partnerId,
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), autoReply]
      }));

      setChats(prev => prev.map(c => c.id === chatId ? {
        ...c,
        lastMessage: replyText,
        lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      } : c));

      // Trigger a message notification
      const newNotif: Notification = {
        id: `n_${Date.now()}`,
        title: `Yangi xabar: ${chat.partnerName}`,
        text: `“${chat.bookTitle}” kitobi yuzasidan xabar keldi.`,
        time: 'Hozirgina',
        type: 'chat',
        isRead: false
      };
      setNotifications(prev => [newNotif, ...prev]);
    }, 1500);
  };

  const addChatRoom = (book: Book): string => {
    // Check if chat room already exists
    const existing = chats.find(c => c.bookId === book.id && c.partnerId === book.ownerId);
    if (existing) return existing.id;

    const newChatId = `chat_${Date.now()}`;
    const newRoom: ChatRoom = {
      id: newChatId,
      bookTitle: book.title,
      bookId: book.id,
      partnerId: book.ownerId,
      partnerName: book.ownerName,
      partnerAvatar: book.ownerAvatar,
      lastMessage: 'Suhbat boshlandi...',
      lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChats([newRoom, ...chats]);
    setMessages(prev => ({
      ...prev,
      [newChatId]: []
    }));

    return newChatId;
  };

  const toggleClubJoin = (clubId: string) => {
    setClubs(clubs.map(c => {
      if (c.id === clubId) {
        const joined = !c.isJoined;
        showToast(joined ? `“${c.name}” klubiga a’zo bo‘ldingiz!` : `“${c.name}” klubini tark etdingiz.`, joined ? 'success' : 'info');
        return { ...c, isJoined: joined };
      }
      return c;
    }));
  };

  const markNotificationRead = (notifId: string) => {
    setNotifications(notifications.map(n => n.id === notifId ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    showToast('Barcha bildirishnomalar o‘qildi deb belgilandi.', 'info');
  };

  return (
    <AppContext.Provider value={{
      user, books, savedBookIds, proposals, notifications, chats, messages, clubs,
      login, logout, addBook, deleteBook, updateBook, toggleSaveBook,
      addProposal, updateProposalStatus, addMessage, addChatRoom, toggleClubJoin,
      markNotificationRead, markAllNotificationsRead, showToast, toast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
