export interface Book {
  id: string;
  title: string;
  author: string;
  image: string;
  genre: string;
  condition: 'Yangi' | 'Yaxshi' | 'O‘rtacha' | 'Eskirgan';
  type: 'selling' | 'exchange' | 'free' | 'request';
  price?: number; // only if type === 'selling'
  exchangeCondition?: string; // only if type === 'exchange'
  location: string;
  distance: string;
  ownerId: string;
  ownerName: string;
  ownerAvatar: string;
  ownerRating: number;
  description: string;
  createdAt: string;
  isSaved?: boolean;
}

export interface ExchangeProposal {
  id: string;
  myBookTitle: string;
  requestedBookTitle: string;
  status: 'Kutilmoqda' | 'Qabul qilindi' | 'Rad etildi' | 'Yakunlandi';
  date: string;
  ownerName: string;
  bookId?: string;
}

export interface ChatRoom {
  id: string;
  bookTitle: string;
  bookId: string;
  partnerId: string;
  partnerName: string;
  partnerAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  isSupport?: boolean;
}

export interface Message {
  id: string;
  senderId: string; // 'me' or partnerId
  text: string;
  time: string;
}

export interface Notification {
  id: string;
  title: string;
  text: string;
  time: string;
  type: 'offer' | 'match' | 'chat' | 'system';
  isRead: boolean;
}

export interface BookClub {
  id: string;
  name: string;
  topic: string;
  membersCount: number;
  location: string;
  image: string;
  isJoined?: boolean;
}
