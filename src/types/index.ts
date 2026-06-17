export interface Course {
  title: string;
  rating: number;
  desc: string;
  image?: string;
  categories?: string[];
  url?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
