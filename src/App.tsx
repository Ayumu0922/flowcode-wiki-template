import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import CreatePage from './pages/CreatePage';
import BookmarksPage from './pages/BookmarksPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
      </Route>
    </Routes>
  );
}
