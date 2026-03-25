import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  updatedAt: string;
  bookmarked: boolean;
}

interface WikiState {
  articles: Article[];
  searchQuery: string;
  selectedCategory: string | null;
  setSearchQuery: (q: string) => void;
  setSelectedCategory: (c: string | null) => void;
  addArticle: (article: Omit<Article, 'id' | 'updatedAt' | 'bookmarked'>) => void;
  updateArticle: (id: string, data: Partial<Article>) => void;
  toggleBookmark: (id: string) => void;
  deleteArticle: (id: string) => void;
}

const defaultArticles: Article[] = [
  { id: '1', title: '社内VPN接続マニュアル', content: '## 概要\nGlobalProtectを使った社内VPN接続の手順です。\n\n## 手順\n1. GlobalProtectをインストール\n2. サーバーアドレス: vpn.company.example.com\n3. 社員IDとパスワードでログイン\n4. MFA認証を完了\n\n## トラブルシューティング\n- 接続できない場合はIT部門（内線:1234）へ\n- パスワードリセットはセルフサービスポータルから', category: '情報システム', tags: ['VPN', 'ネットワーク', 'セキュリティ'], author: 'IT部 山田', updatedAt: '2024-01-20', bookmarked: false },
  { id: '2', title: '有給休暇の取得ルール', content: '## 付与日数\n- 入社6ヶ月後: 10日\n- 1年6ヶ月後: 11日\n- 以降毎年1日ずつ増加（最大20日）\n\n## 申請方法\n1. 勤怠システムにログイン\n2. 「休暇申請」を選択\n3. 日程と理由を入力\n4. 上長承認を待つ\n\n## 注意事項\n- 3営業日前までに申請\n- 年5日以上の取得が義務', category: '人事・総務', tags: ['有給', '休暇', '申請'], author: '総務部 佐藤', updatedAt: '2024-01-18', bookmarked: true },
  { id: '3', title: '経費精算の手続き', content: '## 対象経費\n- 交通費\n- 出張費（宿泊・日当）\n- 接待交際費（事前承認要）\n- 備品購入（1万円未満）\n\n## 申請フロー\n1. 領収書を保存\n2. 経費精算システムで申請\n3. 上長承認\n4. 経理部処理\n5. 翌月25日に振込\n\n## 期限\n支出日から1ヶ月以内', category: '人事・総務', tags: ['経費', '精算', '申請'], author: '経理部 田中', updatedAt: '2024-01-15', bookmarked: false },
  { id: '4', title: 'Slack利用ガイドライン', content: '## チャンネル命名規則\n- #proj-xxx: プロジェクト\n- #team-xxx: チーム\n- #info-xxx: 情報共有\n- #random: 雑談\n\n## マナー\n- @channelは緊急時のみ\n- スレッドを活用\n- 業務時間外のメンションは控える\n\n## 便利な使い方\n- /remind でリマインダー設定\n- ブックマークで重要メッセージを保存', category: '情報システム', tags: ['Slack', 'コミュニケーション'], author: 'IT部 鈴木', updatedAt: '2024-01-12', bookmarked: false },
  { id: '5', title: 'リモートワーク規定', content: '## 対象\n全正社員（試用期間除く）\n\n## ルール\n- 週3日まで取得可能\n- コアタイム: 10:00-15:00はオンライン必須\n- 前日17時までに申請\n\n## 環境要件\n- 安定したインターネット回線\n- VPN接続可能な環境\n- Web会議対応の静かな場所\n\n## 申請方法\n社内ポータル→ワークスタイル申請', category: '人事・総務', tags: ['リモート', '在宅', '勤務'], author: '人事部 高橋', updatedAt: '2024-01-10', bookmarked: true },
  { id: '6', title: '新入社員オンボーディング', content: '## Week 1\n- 会社概要・ビジョン説明\n- 各部署紹介\n- アカウント設定\n\n## Week 2\n- ビジネスマナー研修\n- 社内ツール研修（Slack, Jira, Confluence）\n\n## Week 3\n- 部署別専門研修\n- メンターとの面談\n\n## Week 4\n- OJT開始\n- 1ヶ月振り返り面談', category: '人材開発', tags: ['研修', 'オンボーディング', '新入社員'], author: '人事部 中村', updatedAt: '2024-01-08', bookmarked: false },
];

export const usewikiStore = create<WikiState>()(
  persist(
    (set) => ({
      articles: defaultArticles,
      searchQuery: '',
      selectedCategory: null,
      setSearchQuery: (q) => set({ searchQuery: q }),
      setSelectedCategory: (c) => set({ selectedCategory: c }),
      addArticle: (article) =>
        set((s) => ({ articles: [{ ...article, id: crypto.randomUUID(), updatedAt: new Date().toISOString().split('T')[0], bookmarked: false }, ...s.articles] })),
      updateArticle: (id, data) =>
        set((s) => ({ articles: s.articles.map((a) => a.id === id ? { ...a, ...data, updatedAt: new Date().toISOString().split('T')[0] } : a) })),
      toggleBookmark: (id) =>
        set((s) => ({ articles: s.articles.map((a) => a.id === id ? { ...a, bookmarked: !a.bookmarked } : a) })),
      deleteArticle: (id) =>
        set((s) => ({ articles: s.articles.filter((a) => a.id !== id) })),
    }),
    { name: 'wiki-storage' }
  )
);

export const wikiCategories = ['情報システム', '人事・総務', '人材開発', '営業', '開発'];
