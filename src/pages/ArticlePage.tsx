import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Bookmark, Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { usewikiStore } from '../store/wikiStore';

export default function ArticlePage() {
  const { id } = useParams();
  const { articles, toggleBookmark } = usewikiStore();
  const article = articles.find((a) => a.id === id);

  if (!article) return <div className="text-center py-24"><p className="text-zinc-500">記事が見つかりません</p></div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-6"><ArrowLeft className="w-4 h-4" />戻る</Link>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400">{article.category}</span>
        <button onClick={() => toggleBookmark(article.id)} className="text-zinc-400 hover:text-teal-400">
          <Bookmark className={`w-5 h-5 ${article.bookmarked ? 'fill-teal-400 text-teal-400' : ''}`} />
        </button>
      </div>
      <h1 className="text-2xl font-bold text-white mb-3">{article.title}</h1>
      <div className="flex items-center gap-4 text-sm text-zinc-500 mb-8 pb-6 border-b border-zinc-800">
        <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{article.author}</span>
        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{article.updatedAt}</span>
      </div>
      <div className="space-y-4">
        {article.content.split('\n').map((line, i) =>
          line.startsWith('## ') ? <h2 key={i} className="text-lg font-bold text-white mt-6 mb-2">{line.replace('## ', '')}</h2> :
          line.startsWith('- ') ? <p key={i} className="text-sm text-zinc-300 ml-4">• {line.slice(2)}</p> :
          line.match(/^\d+\./) ? <p key={i} className="text-sm text-zinc-300 ml-4">{line}</p> :
          line ? <p key={i} className="text-sm text-zinc-300 leading-relaxed">{line}</p> : <br key={i} />
        )}
      </div>
      <div className="flex gap-2 mt-8 pt-6 border-t border-zinc-800">
        {article.tags.map((tag) => <span key={tag} className="text-xs px-3 py-1 rounded-full bg-zinc-800 text-zinc-400">#{tag}</span>)}
      </div>
    </motion.div>
  );
}
