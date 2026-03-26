import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usewikiStore, wikiCategories } from '../store/wikiStore';
import PageTransition from '../components/ui/PageTransition';
import { useToast } from '../components/ui/Toast';

export default function CreatePage() {
  const { addArticle } = usewikiStore();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(wikiCategories[0]);
  const [tagsInput, setTagsInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    addArticle({ title: title.trim(), content: content.trim(), category, tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean), author: '自分' });
    showToast('記事を作成しました', 'success');
    navigate('/');
  };

  return (
    <PageTransition className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-6">記事作成</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="タイトル" required
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-foreground placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-accent-500/50" />
        <div className="flex gap-4">
          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent-500/50">
            {wikiCategories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="タグ（カンマ区切り）"
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-accent-500/50" />
        </div>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={16} placeholder="記事の内容（Markdown対応）" required
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-foreground placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-accent-500/50 resize-none font-mono" />
        <button type="submit" className="bg-accent-600 hover:bg-accent-500 text-on-accent px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">公開する</button>
      </form>
    </PageTransition>
  );
}
