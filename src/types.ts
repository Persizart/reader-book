export interface Chapter {
  title: string;
  content: string;
  wordCount?: number;
}

export interface Book {
  id: string;
  title: string;
  genre: string;
  description: string;
  cover: string | null;
  chapters: Chapter[];
  createdAt: string;
  updatedAt: string;
}

export interface ReaderSettings {
  fontSize: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  readingTheme: 'paper' | 'light' | 'dark' | 'sepia';
  fontFamily: 'serif' | 'sans' | 'mono';
}
