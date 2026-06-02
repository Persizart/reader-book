import { useState, useMemo } from 'react';
import { Search, Filter, Plus, BookOpen } from 'lucide-react';
import { Book } from '../types';
import BookCover from './BookCover';

interface HomeViewProps {
  books: Book[];
  onSelectBook: (id: string) => void;
  onNavigate: (view: string) => void;
  userRole: 'admin' | 'leitor';
}

export default function HomeView({ books, onSelectBook, onNavigate, userRole }: HomeViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Todos');

  const totalChapters = useMemo(() => {
    return books.reduce((sum, b) => sum + (b.chapters?.length || 0), 0);
  }, [books]);

  const totalWords = useMemo(() => {
    return books.reduce((sum, b) => {
      const chaps = b.chapters || [];
      return sum + chaps.reduce((cSum, c) => cSum + (c.wordCount || 0), 0);
    }, 0);
  }, [books]);

  const genres = useMemo(() => {
    const list = new Set<string>();
    books.forEach(b => {
      if (b.genre) list.add(b.genre);
    });
    return ['Todos', ...Array.from(list)];
  }, [books]);

  const filteredBooks = useMemo(() => {
    return books.filter(b => {
      const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            b.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === 'Todos' || b.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });
  }, [books, searchQuery, selectedGenre]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12 animate-fade-in text-[#E2E8F0]">
      <section className="text-center mb-12" id="library-hero">
        <span className="text-[#CBB26A] text-xs font-bold tracking-[0.25em] uppercase mb-3 block">
          Biblioteca Pessoal de Histórias
        </span>
        <h1 className="font-serif text-3xl sm:text-5.5xl text-[#E2E8F0] font-semibold tracking-tight leading-[1.12]">
          Reader <span className="text-[#CBB26A] italic font-normal">Book</span>
        </h1>
        <p className="mt-4 text-[#A0AEC0] text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed">
          O santuário de suas palavras. Escreva originais, organize capítulos e mergulhe em seus universos literários sem barreiras de publicação.
        </p>

        {books.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 max-w-md mx-auto py-3 px-4 border border-[#2D3139] bg-[#1A1D23] rounded-xl text-xs text-[#A0AEC0] shadow-sm">
            <div className="flex items-center gap-2">
              <span className="font-serif text-[#CBB26A] text-base font-bold">{books.length}</span>
              <span>obras</span>
            </div>
            <div className="h-4 w-[1px] bg-[#2D3139]"></div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-[#CBB26A] text-base font-bold">{totalChapters}</span>
              <span>capítulos</span>
            </div>
            <div className="h-4 w-[1px] bg-[#2D3139]"></div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-[#CBB26A] text-base font-bold">
                {totalWords.toLocaleString('pt-BR')}
              </span>
              <span>palavras</span>
            </div>
          </div>
        )}
      </section>

      {books.length > 0 && (
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between bg-[#0F1115] border border-[#2D3139] p-4 rounded-xl shadow-sm" id="search-filter-panel">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AEC0]/70" />
            <input
              type="text"
              id="library-search"
              placeholder="Pesquisar títulos ou sinopses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#1A1D23] border border-[#2D3139] rounded-lg text-sm text-[#E2E8F0] placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#CBB26A] transition-all"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Filter className="w-4 h-4 text-[#A0AEC0] shrink-0" />
            <div className="flex gap-2 items-center overflow-x-auto select-none no-scrollbar w-full md:max-w-xs">
              {genres.map(genre => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-3 py-1 text-xs rounded-full font-sans transition-all shrink-0 cursor-pointer ${
                    selectedGenre === genre
                      ? 'bg-[#CBB26A] text-[#0A0B0D] font-bold shadow-sm'
                      : 'bg-[#1A1D23] text-[#A0AEC0] hover:bg-[#2D3139] border border-[#2D3139]/60'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-6">
          {filteredBooks.map(book => (
            <div
              key={book.id}
              onClick={() => onSelectBook(book.id)}
              className="group cursor-pointer flex flex-col items-center"
              id={`book-shelf-card-${book.id}`}
            >
              <div className="mb-4">
                <BookCover book={book} size="md" />
              </div>
              <div className="text-center w-full max-w-[176px]">
                <h3 className="font-serif font-bold text-sm text-[#E2E8F0] leading-snug group-hover:text-[#CBB26A] transition-colors line-clamp-2">
                  {book.title}
                </h3>
                <span className="text-[10px] tracking-wide font-medium bg-[#0F1115] text-[#CBB26A] border border-[#2D3139] px-2 py-0.5 rounded mt-1.5 inline-block capitalize">
                  {book.genre || 'Poesia'}
                </span>
                <p className="text-[11px] text-[#A0AEC0]/85 mt-1">
                  {book.chapters?.length || 0} capítulos
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-[#2D3139] bg-[#1A1D23] rounded-2xl py-16 px-6 text-center shadow-inner" id="library-empty-box">
          <div className="h-16 w-16 bg-[#0F1115] rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-[#CBB26A] opacity-80" />
          </div>
          <h2 className="font-serif text-xl font-bold text-[#E2E8F0]">
            {books.length === 0 ? 'Sua estante pessoal de livros está vazia' : 'Nenhuma história encontrada'}
          </h2>
          <p className="mt-2 text-[#A0AEC0] text-sm max-w-md mx-auto leading-relaxed">
            {books.length === 0 
              ? (userRole === 'admin' 
                  ? 'Toque abaixo ou no menu de escrita para adicionar o seu primeiro livro e começar a escrever.' 
                  : 'Esta estante literária está vazia no momento. Em breve novas obras estarão disponíveis.')
              : 'Nenhuma história corresponde aos seus termos de pesquisa. Tente buscar por outros gêneros ou limpar o campo.'}
          </p>

          <div className="mt-6 flex justify-center gap-3">
            {books.length === 0 ? (
              userRole === 'admin' ? (
                <button
                  id="btn-empty-add-book"
                  onClick={() => onNavigate('admin')}
                  className="flex items-center gap-2 bg-[#CBB26A] hover:bg-[#b89e5a] active:scale-95 text-[#0A0B0D] font-sans font-semibold text-sm py-2.5 px-6 rounded-lg shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Iniciar Primeiro Livro</span>
                </button>
              ) : (
                <div className="text-xs bg-[#0F1115] border border-[#2D3139] px-4 py-2 rounded-xl text-[#CBB26A] select-none font-medium">
                  Visite novamente mais tarde para ler novas publicações!
                </div>
              )
            ) : (
              <button
                onClick={() => { setSearchQuery(''); setSelectedGenre('Todos'); }}
                className="bg-[#0F1115] hover:bg-[#2D3139] text-[#E2E8F0] font-sans font-medium text-sm py-2 px-4 rounded-lg transition-all cursor-pointer"
              >
                Ver Todas as Histórias
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
