import { ArrowLeft, BookOpen, Edit3, Trash2, Plus, Play, Calendar } from 'lucide-react';
import { Book } from '../types';
import BookCover from './BookCover';

interface BookDetailViewProps {
  book: Book;
  onBack: () => void;
  onReadChapter: (chapterIdx: number) => void;
  onAddChapter: () => void;
  onEditChapter: (chapterIdx: number) => void;
  onDeleteChapter: (chapterIdx: number) => void;
  onEditBook: () => void;
  userRole: 'admin' | 'leitor';
}

export default function BookDetailView({
  book,
  onBack,
  onReadChapter,
  onAddChapter,
  onEditChapter,
  onDeleteChapter,
  onEditBook,
  userRole,
}: BookDetailViewProps) {
  const chapters = book.chapters || [];

  const formatDate = (isoStr: string) => {
    try {
      return new Date(isoStr).toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return 'N/A';
    }
  };

  const totalWords = chapters.reduce((sum, ch) => sum + (ch.wordCount || 0), 0);
  const estReadingTime = Math.ceil(totalWords / 200);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-fade-in text-[#E2E8F0]" id={`book-detail-view-${book.id}`}>
      <button
        onClick={onBack}
        id="btn-back-to-library"
        className="flex items-center gap-2 text-sm text-[#A0AEC0] hover:text-[#CBB26A] transition-colors mb-8 group cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Voltar à biblioteca</span>
      </button>

      <section className="bg-[#1A1D23] border border-[#2D3139] rounded-2xl p-6 md:p-10 mb-10 shadow-lg">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="mx-auto md:mx-0 shrink-0 select-none">
            <BookCover book={book} size="lg" />
            {userRole === 'admin' && (
              <button
                onClick={onEditBook}
                id="btn-edit-book-meta"
                className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg bg-[#0F1115] border border-[#2D3139] text-[#E2E8F0] hover:bg-[#2D3139] transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#CBB26A]" />
                <span>Editar Informações</span>
              </button>
            )}
          </div>

          <div className="flex-1 w-full text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#CBB26A] bg-[#CBB26A]/10 px-2.5 py-1 rounded">
                {book.genre || 'Poesia'}
              </span>
              {chapters.length > 0 && (
                <span className="text-xs text-[#A0AEC0] bg-[#0F1115] border border-[#2D3139] px-2 py-1 rounded">
                  {chapters.length} cap.
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl md:text-4.5xl font-bold text-[#E2E8F0] tracking-tight leading-tight">
              {book.title}
            </h1>

            <div className="flex items-center justify-center md:justify-start gap-1 text-[11px] text-[#A0AEC0] mt-2 mb-4">
              <Calendar className="w-3 h-3 text-[#CBB26A]" />
              <span>Criado em: {formatDate(book.createdAt)}</span>
            </div>

            <div className="border-t border-[#2D3139]/60 pt-4 mt-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#CBB26A]/90 mb-2 font-sans">
                Sinopse / Descrição
              </h2>
              <p className="text-sm md:text-base text-[#E2E8F0]/90 italic font-serif leading-relaxed whitespace-pre-wrap">
                {book.description || 'Nenhuma sinopse fornecida para esta obra.'}
              </p>
            </div>

            {chapters.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-[#2D3139]/40 text-xs text-[#A0AEC0]">
                <div>
                  <span className="font-semibold text-[#E2E8F0]">Total de Palavras:</span> {totalWords.toLocaleString('pt-BR')}
                </div>
                <div className="hidden sm:block text-[#2D3139]">|</div>
                <div>
                  <span className="font-semibold text-[#E2E8F0]">Tempo Estimado de Leitura:</span> {estReadingTime} min
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between border-b border-[#2D3139] pb-4 mb-6">
          <h2 className="font-serif text-xl font-bold text-[#E2E8F0]">
            Sumário de Capítulos
          </h2>
          {userRole === 'admin' && (
            <button
              id="btn-add-chapter-detail"
              onClick={onAddChapter}
              className="flex items-center gap-1.5 text-xs font-bold bg-[#CBB26A] hover:bg-[#b89e5a] text-[#0A0B0D] py-2 px-3.5 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Novo Capítulo</span>
            </button>
          )}
        </div>

        {chapters.length > 0 ? (
          <div className="flex flex-col gap-3.5" id="chapters-detail-list">
            {chapters.map((c, idx) => (
              <div
                key={idx}
                className="group flex items-center justify-between p-4 bg-[#1A1D23] border border-[#2D3139] hover:border-[#CBB26A] rounded-xl shadow-xs transition-all hover:translate-x-1"
                id={`chapter-row-detail-${idx}`}
              >
                <div 
                  onClick={() => onReadChapter(idx)}
                  className="flex-1 cursor-pointer"
                >
                  <p className="font-serif text-base font-semibold text-[#E2E8F0] group-hover:text-[#CBB26A] transition-colors">
                    Capítulo {idx + 1}: {c.title}
                  </p>
                  <div className="flex items-center gap-3.5 text-xs text-[#A0AEC0] mt-1.5 font-sans">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 opacity-60 text-[#CBB26A]" />
                      {c.wordCount || 0} palavras
                    </span>
                    <span className="text-[#CBB26A]/70">•</span>
                    <span>Leitura de ~{Math.ceil((c.wordCount || 0) / 200)} min</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 select-none">
                  {userRole === 'admin' ? (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                      <button
                        onClick={() => onReadChapter(idx)}
                        title="Ler este capítulo"
                        className="p-1.5 hover:bg-[#0F1115] text-[#CBB26A] rounded-md transition-all cursor-pointer"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEditChapter(idx)}
                        title="Editar capítulo"
                        className="p-1.5 hover:bg-[#0F1115] text-[#CBB26A] rounded-md transition-all cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteChapter(idx)}
                        title="Excluir capítulo"
                        className="p-1.5 hover:bg-red-950/40 text-red-400 rounded-md transition-all cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => onReadChapter(idx)}
                      className="flex items-center gap-1.5 py-1.5 px-3 rounded bg-[#CBB26A]/10 border border-[#CBB26A]/30 text-[#CBB26A] hover:bg-[#CBB26A] hover:text-[#0A0B0D] transition-all cursor-pointer font-bold text-xs"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Ler</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 px-4 border border-dashed border-[#2D3139] rounded-xl bg-[#1A1D23]/60">
            <p className="text-sm text-[#A0AEC0] italic">
              Este livro ainda não contém capítulos escritos.
            </p>
            {userRole === 'admin' ? (
              <button
                onClick={onAddChapter}
                className="mt-4 flex items-center gap-1.5 bg-[#0F1115] hover:bg-[#2D3139] border border-[#2D3139] text-sm text-[#E2E8F0] font-medium py-2 px-4 rounded-lg mx-auto transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#CBB26A]" />
                <span>Escrever Capítulo Um</span>
              </button>
            ) : (
              <p className="text-xs text-[#A0AEC0]/60 mt-2 font-mono">
                Aguarde o autor publicar os primeiros capítulos desta história.
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
