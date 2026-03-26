import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import CreatePage from './pages/CreatePage';
import BookmarksPage from './pages/BookmarksPage';
import ScrollToTop from './components/ui/ScrollToTop';
import NotFoundPage from './components/ui/NotFoundPage';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
