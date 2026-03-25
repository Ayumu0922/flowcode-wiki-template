import { Link } from 'react-router-dom';
import { Bookmark, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { usewikiStore } from '../store/wikiStore';

export default function BookmarksPage() {
  const { articles } = usewikiStore();
  const bookmarked = articles.filter((a) => a.bookmarked);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">ブックマーク</h1>
      {bookmarked.length === 0 ? (
        <p className="text-zinc-500 text-center py-12">ブックマークがありません</p>
      ) : (
        <div className="space-y-2">
          {bookmarked.map((a) => (
            <Link key={a.id} to={`/article/${a.id}`} className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-4 hover:border-zinc-700 transition-colors">
              <Bookmark className="w-4 h-4 text-teal-400 fill-teal-400 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{a.title}</p>
                <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" />{a.updatedAt}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  );
}
