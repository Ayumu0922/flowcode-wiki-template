import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bookmark, Clock, Tag } from 'lucide-react';
import { usewikiStore, wikiCategories } from '../store/wikiStore';

export default function HomePage() {
  const { articles, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = usewikiStore();
  const filtered = articles
    .filter((a) => !selectedCategory || a.category === selectedCategory)
    .filter((a) => a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.tags.some((t) => t.includes(searchQuery)));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">ナレッジベース</h1>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="記事を検索..."
          className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-accent-500/50" />
      </div>
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setSelectedCategory(null)} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${!selectedCategory ? 'bg-accent-500/10 text-accent-400' : 'text-zinc-400 hover:text-white'}`}>すべて</button>
        {wikiCategories.map((c) => (
          <button key={c} onClick={() => setSelectedCategory(c)} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${selectedCategory === c ? 'bg-accent-500/10 text-accent-400' : 'text-zinc-400 hover:text-white'}`}>{c}</button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.map((article) => (
          <Link key={article.id} to={`/article/${article.id}`} className="block bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-4 hover:border-zinc-700 transition-colors group">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-white group-hover:text-accent-400 transition-colors">{article.title}</h3>
              {article.bookmarked && <Bookmark className="w-3.5 h-3.5 text-accent-400 fill-accent-400" />}
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <span className="px-2 py-0.5 rounded-full bg-zinc-800">{article.category}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.updatedAt}</span>
              <span>{article.author}</span>
            </div>
            <div className="flex gap-1.5 mt-2">
              {article.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-0.5 text-[10px] text-zinc-500"><Tag className="w-2.5 h-2.5" />{tag}</span>
              ))}
            </div>
          </Link>
        ))}
        {filtered.length === 0 && <p className="text-center text-zinc-500 py-12">記事が見つかりません</p>}
      </div>
    </div>
  );
}
