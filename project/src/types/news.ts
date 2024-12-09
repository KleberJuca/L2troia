export interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  published: boolean;
  image?: string;
}