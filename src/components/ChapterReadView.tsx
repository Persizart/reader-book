import { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Settings2, BookOpen } from 'lucide-react';
import { Book, ReaderSettings } from '../types';

interface ChapterReadViewProps {
  book: Book;
  chapterIdx: number;
  onBack: () => void;
  onNavigateChapter: (idx: number) => void;
}

export default function ChapterReadView({
  book,
  chapterIdx,
  onBack,
  onNavigateChapter,
}: ChapterReadViewProps) {
  const chapter = book.chapters[chapterIdx];

  const [settings, setSettings] = useState<ReaderSettings>({
    fontSize: 'lg',
    readingTheme: 'paper',
    fontFamily: 'serif',
  });

  const [showSettings, setShowSettings] = useState(false);

  const themeStyles = {
    paper: 'bg-[#0A0B0D] text-[#E2E8F0] border-[#2D3139]',
    light: 'bg-[#F4F6F8] text-gray-900 border-gray-200',
    dark: 'bg-[#050506] text-[#A0AEC0] border-[#1F2228]',
    sepia: 'bg-[#0F1115] text-[#CBB26A] border-[#2D3139]',
  };

  const fontStyles = {
    serif: 'font-serif tracking-normal leading-relaxed',
    sans: 'font-sans tracking-wide leading-relaxed',
    mono: 'font-mono tracking-normal leading-loose text-sm',
  };

  const sizeStyles = {
    sm: 'text-sm md:text-base',
    md: 'text-base md:text-lg',
    lg: 'text-lg md:text-xl',
    xl: 'text-xl md:text-2xl',
    '2xl': 'text-2.5xl md:text-3xl',
  };

  if (!chapter) return null;

  const isDarkBase = settings.readingTheme === 'dark' || settings.readingTheme === 'paper' || settings.readingTheme === 'sepia';

  return (
    <div className={`min-h-screen py-10 transition-colors duration-300 ${themeStyles[settings.readingTheme].split(' ')[0]}`}>
      <nav className={`fixed top-14 left-0 right-0 z-40 px-6 py-2.5 flex items-center justify-between border-b shadow-sm transition-colors backdrop-blur-md bg-opacity-95 ${
        isDarkBase 
          ? 'bg-[#0F1115]/95 border-[#2D3139] text-[#E2E8F0]' 
          : 'bg-[#fffdf7]/95 border-gray-200 text-gray-900'
      }`}>
        <button
          onClick={onBack}
          id="btn-reader-back-to-book"
          className="flex items-center gap-2 text-xs font-semibold hover:text-[#CBB26A] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao livro</span>
        </button>

        <div className="text-center max-w-[50%] truncate hidden sm:block">
          <span className="text-[10px] tracking-widest uppercase block opacity-60">
            {book.title}
          </span>
          <span className="font-serif text-xs font-semibold truncate block text-[#CBB26A]">
            {chapter.title}
          </span>
        </div>

        <button
          onClick={() => setShowSettings(!showSettings)}
          id="btn-toggle-reader-settings"
          className="flex items-center gap-1 text-xs font-semibold py-1.5 px-3 rounded border border-current/30 hover:text-[#CBB26A] hover:border-[#CBB26A] transition-colors cursor-pointer"
        >
          <Settings2 className="w-3.5 h-3.5" />
          <span>Formato</span>
        </button>
      </nav>

      {showSettings && (
        <div className={`fixed top-28 right-6 z-50 p-5 rounded-xl shadow-xl max-w-[280px] border font-sans text-xs ${
          isDarkBase
            ? 'bg-[#1A1D23] border-[#2D3139] text-[#E2E8F0]'
            : 'bg-[#fffdf7] border-gray-200 text-gray-900'
        }`}>
          <div className="mb-4">
            <span className="block font-bold tracking-wider uppercase mb-2 opacity-80">Paleta de Fundo</span>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => setSettings(p => ({ ...p, readingTheme: 'paper' }))}
                className={`py-1 rounded border text-center font-semibold text-[10px] cursor-pointer ${
                  settings.readingTheme === 'paper' ? 'ring-2 ring-[#CBB26A] border-transparent' : 'border-[#2D3139]'
                } bg-[#0A0B0D] text-[#E2E8F0]`}
              >
                Noite
              </button>
              <button
                onClick={() => setSettings(p => ({ ...p, readingTheme: 'light' }))}
                className={`py-1 rounded border text-center font-semibold text-[10px] cursor-pointer ${
                  settings.readingTheme === 'light' ? 'ring-2 ring-[#CBB26A] border-transparent' : 'border-gray-300'
                } bg-[#F4F6F8] text-gray-900`}
              >
                Claro
              </button>
              <button
                onClick={() => setSettings(p => ({ ...p, readingTheme: 'dark' }))}
                className={`py-1 rounded border text-center font-semibold text-[10px] cursor-pointer ${
                  settings.readingTheme === 'dark' ? 'ring-2 ring-[#CBB26A] border-transparent' : 'border-[#1F2228]'
                } bg-[#050506] text-[#A0AEC0]`}
              >
                Penumbra
              </button>
              <button
                onClick={() => setSettings(p => ({ ...p, readingTheme: 'sepia' }))}
                className={`py-1 rounded border text-center font-semibold text-[10px] cursor-pointer ${
                  settings.readingTheme === 'sepia' ? 'ring-2 ring-[#CBB26A] border-transparent' : 'border-[#2D3139]'
                } bg-[#0F1115] text-[#CBB26A]`}
              >
                Estúdio
              </button>
            </div>
          </div>

          <div className="mb-4">
            <span className="block font-bold tracking-wider uppercase mb-2 opacity-80">Tipografia</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSettings(p => ({ ...p, fontFamily: 'serif' }))}
                className={`py-1 rounded border font-serif cursor-pointer text-center ${
                  settings.fontFamily === 'serif' ? 'border-[#CBB26A] bg-[#CBB26A]/15 text-[#CBB26A] font-bold' : 'border-current/20'
                }`}
              >
                Serif
              </button>
              <button
                onClick={() => setSettings(p => ({ ...p, fontFamily: 'sans' }))}
                className={`py-1 rounded border font-sans cursor-pointer text-center ${
                  settings.fontFamily === 'sans' ? 'border-[#CBB26A] bg-[#CBB26A]/15 text-[#CBB26A] font-bold' : 'border-current/20'
                }`}
              >
                Sans
              </button>
              <button
                onClick={() => setSettings(p => ({ ...p, fontFamily: 'mono' }))}
                className={`py-1 rounded border font-mono cursor-pointer text-center ${
                  settings.fontFamily === 'mono' ? 'border-[#CBB26A] bg-[#CBB26A]/15 text-[#CBB26A] font-bold' : 'border-current/20'
                }`}
              >
                Mono
              </button>
            </div>
          </div>

          <div>
            <span className="block font-bold tracking-wider uppercase mb-2 opacity-80">Tamanho da Letra</span>
            <div className="flex justify-between gap-1">
              {(['sm', 'md', 'lg', 'xl', '2xl'] as const).map(sz => (
                <button
                  key={sz}
                  onClick={() => setSettings(p => ({ ...p, fontSize: sz }))}
                  className={`flex-1 py-1 rounded text-center border uppercase text-[10px] cursor-pointer ${
                    settings.fontSize === sz ? 'bg-[#CBB26A]/20 border-[#CBB26A] text-[#CBB26A] font-bold' : 'border-current/10 hover:bg-current/5'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-6 pt-24 pb-16">
        <article className={`editor-content-render ${fontStyles[settings.fontFamily]} ${sizeStyles[settings.fontSize]}`}>
          <header className="text-center mb-12 border-b border-current/10 pb-8">
            <span className="uppercase text-xs tracking-[0.2em] font-sans font-bold text-[#CBB26A] block mb-2">
              Capítulo {chapterIdx + 1}
            </span>
            <h1 className="font-serif text-3xl md:text-4.5xl font-bold tracking-tight leading-loose">
              {chapter.title}
            </h1>
            <div className="w-12 h-[2px] bg-[#CBB26A]/60 mx-auto mt-4"></div>
          </header>

          <div 
            id="reader-main-content"
            className="prose prose-stone max-w-none break-words"
            dangerouslySetInnerHTML={{ __html: chapter.content || '<p><em>Capítulo sem conteúdo.</em></p>' }}
          />

          <div className="flex justify-center items-center gap-2 mt-16 text-[#CBB26A] opacity-50 text-xs">
            <span className="w-8 h-[1px] bg-current"></span>
            <span>Finis</span>
            <span className="w-8 h-[1px] bg-current"></span>
          </div>
        </article>

        <section className="flex items-center justify-between border-t border-current/10 pt-8 mt-12 font-sans text-xs sm:text-sm">
          {chapterIdx > 0 ? (
            <button
              onClick={() => { onNavigateChapter(chapterIdx - 1); window.scrollTo(0, 0); }}
              id="btn-reader-prev-chapter"
              className="flex items-center gap-1.5 py-2 px-3.5 rounded border border-current/20 hover:bg-current/5 hover:text-[#CBB26A] transition-all cursor-pointer font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>
          ) : (
            <span />
          )}

          <div className="text-center text-xs opacity-60 font-medium">
            {chapterIdx + 1} de {book.chapters.length} cap.
          </div>

          {chapterIdx < book.chapters.length - 1 ? (
            <button
              onClick={() => { onNavigateChapter(chapterIdx + 1); window.scrollTo(0, 0); }}
              id="btn-reader-next-chapter"
              className="flex items-center gap-1.5 py-2 px-3.5 rounded bg-[#CBB26A]/85 text-[#0A0B0D] hover:bg-[#CBB26A] transition-all cursor-pointer font-bold"
            >
              <span>Próximo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onBack}
              id="btn-reader-finish-book"
              className="flex items-center gap-1.5 py-2 px-3.5 rounded bg-[#CBB26A] text-[#0A0B0D] hover:bg-[#CBB26A]/95 hover:scale-[1.02] shadow transition-all cursor-pointer font-bold"
            >
              <span>Concluir</span>
              <BookOpen className="w-4 h-4" />
            </button>
          )}
        </section>
      </div>
    </div>
  );
}
