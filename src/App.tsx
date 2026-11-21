import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';

// Pages
import { WelcomePage } from './pages/WelcomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { BookDetailPage } from './pages/BookDetailPage';
import { AddBookPage } from './pages/AddBookPage';
import { ExchangePage } from './pages/ExchangePage';
import { MapPage } from './pages/MapPage';
import { BookClubsPage } from './pages/BookClubsPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { SavedPage } from './pages/SavedPage';
import { ChatPage } from './pages/ChatPage';
import { MyBooksPage } from './pages/MyBooksPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';

// Authenticated Route guard/wrapper that mounts the Layout shell
const MainLayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useApp();

  // If user is logged out, we still let them explore for a seamless playground experience,
  // but if needed, we can also redirect. Let's allow visiting but show layout.
  return <Layout>{children}</Layout>;
};

// Root route dispatcher
const RootDispatcher: React.FC = () => {
  const { user } = useApp();
  // Redirect to home if logged in, else to welcome
  return user ? <Navigate to="/home" replace /> : <Navigate to="/welcome" replace />;
};

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          {/* Fullscreen standalone onboarding modules */}
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Catalog and utility pages wrapped in layouts */}
          <Route path="/home" element={<MainLayoutWrapper><HomePage /></MainLayoutWrapper>} />
          <Route path="/search" element={<MainLayoutWrapper><SearchPage /></MainLayoutWrapper>} />
          <Route path="/books/:id" element={<MainLayoutWrapper><BookDetailPage /></MainLayoutWrapper>} />
          <Route path="/add" element={<MainLayoutWrapper><AddBookPage /></MainLayoutWrapper>} />
          <Route path="/exchange" element={<MainLayoutWrapper><ExchangePage /></MainLayoutWrapper>} />
          <Route path="/map" element={<MainLayoutWrapper><MapPage /></MainLayoutWrapper>} />
          <Route path="/clubs" element={<MainLayoutWrapper><BookClubsPage /></MainLayoutWrapper>} />
          <Route path="/recommendations" element={<MainLayoutWrapper><RecommendationsPage /></MainLayoutWrapper>} />
          <Route path="/saved" element={<MainLayoutWrapper><SavedPage /></MainLayoutWrapper>} />
          <Route path="/chat" element={<MainLayoutWrapper><ChatPage /></MainLayoutWrapper>} />
          <Route path="/chat/:id" element={<MainLayoutWrapper><ChatPage /></MainLayoutWrapper>} />
          <Route path="/my-books" element={<MainLayoutWrapper><MyBooksPage /></MainLayoutWrapper>} />
          <Route path="/notifications" element={<MainLayoutWrapper><NotificationsPage /></MainLayoutWrapper>} />
          <Route path="/profile" element={<MainLayoutWrapper><ProfilePage /></MainLayoutWrapper>} />

          {/* Dispatch Root */}
          <Route path="/" element={<RootDispatcher />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
