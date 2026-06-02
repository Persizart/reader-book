import { Plus, BookOpen, Trash2, Edit, Eye, FolderOpen, HelpCircle, FileDown, FileUp } from 'lucide-react';
import { Book } from '../types';
import BookCover from './BookCover';

interface AdminViewProps {
  books: Book[];
  onSelectBook: (id: string) => void;
  onAddBook: () => void;
  onEditBook: (book: Book) => void;
  onDeleteBook: (id: string) => void;
  onAddChapter: (bookId: string) => void;
  onExport: () => void;
  onImport: () => void;
  isCloudflareSyncActive: boolean;
}

export default function AdminView({
  books,
  onSelectBook,
  onAddBook,
  onEditBook,
  onDeleteBook,
  onAddChapter,
  onExport,
  onImport,
  isCloudflareSyncActive,
}: AdminViewProps) {
  const bookCount = books.length;
  const chapterCount = books.reduce((sum, b) => sum + (b.chapters?.length || 0), 0);
  const totalWords = books.reduce((sum, b) => {
    return sum + (b.chapters || []).reduce((cSum, c) => cSum + (c.wordCount || 0), 0);
  }, 0);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 animate-fade-in text-[#E2E8F0]" id="admin-dashboard-container">
      <h2 className="font-serif text-3xl font-semibold text-[#E2E8F0] tracking-tight mb-2">
        Painel de Escrita e Editoração
      </h2>
      <p className="text-sm text-[#A0AEC0] max-w-xl leading-relaxed mb-6">
        Gere novos livros do zero, organize e formate capítulos ricos sem limites. Seus livros são salvos de forma protegida para leitura imediata.
      </p>

      {/* Indicador de Sincronização Cloudflare */}
      <div className={`mb-8 p-4 rounded-xl border flex flex-col md:flex-row md:items-center md:justify-between gap-5 text-sm ${
        isCloudflareSyncActive 
          ? 'bg-[#122b10]/25 border-green-500/30 text-green-200' 
          : 'bg-[#5c2514]/15 border-[#e2b055]/30 text-stone-300'
      }`}>
        <div className="flex items-start gap-3">
          <div className={`h-2.5 w-2.5 rounded-full shrink-0 mt-1.5 ${isCloudflareSyncActive ? 'bg-green-500 animate-pulse' : 'bg-amber-400'}`} />
          <div>
            <p className="font-semibold text-white">
              {isCloudflareSyncActive ? '✨ Sincronização Cloudflare Ativa (KV Database)' : '⚠️ Modo Local (Dispositivo Único)'}
            </p>
            <p className="text-xs text-[#A0AEC0] mt-1 leading-normal max-w-2xl">
              {isCloudflareSyncActive 
                ? 'Seus livros foram carregados da nuvem Cloudflare KV. Suas obras estão 100% salvas na nuvem e aparecem imediatamente em qualquer outro celular ou computador!' 
                : 'Seus dados estão sendo salvos apenas neste navegador (Modo Local). Para salvar e sincronizar os livros em múltiplos celulares e no seu link definitivo do Cloudflare, siga o procedimento simples de vinculação de banco de dados do Cloudflare Pages.'
              }
            </p>
          </div>
        </div>
        {!isCloudflareSyncActive && (
          <div className="text-[11px] bg-[#1A1D23] border border-[#2D3139] p-3 rounded-lg text-stone-300 leading-normal max-w-md sm:self-center font-sans">
            <strong className="text-[#CBB26A] block mb-1">Como ativar no Cloudflare:</strong>
            <ol className="list-decimal pl-4 space-y-1 text-xs text-[#A0AEC0]">
              <li>No painel do Cloudflare, acesse <strong className="text-white">Pages</strong> &gt; <em className="text-white">seu-projeto</em> &gt; <strong className="text-white">Settings</strong> &gt; <strong className="text-white">Functions</strong>.</li>
              <li>Procure por <strong className="text-white">KV namespace bindings</strong> e clique em <strong className="text-white">Add Binding</strong>.</li>
              <li>Defina a variável (Variable Name) como <code className="bg-[#0F1115] px-1 py-0.5 rounded text-amber-400 font-mono">READERBOOK_KV</code> e selecione um KV namespace da sua conta.</li>
              <li>Pronto! Ao salvar novas alterações, seus livros e capítulos sincronizam na nuvem para qualquer tela.</li>
            </ol>
          </div>
        )}
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10" id="admin-stats-bento">
        <div className="bg-[#1A1D23] border border-[#2D3139] p-6 rounded-xl flex items-center justify-between shadow-md">
          <div>
            <span className="text-[10px] tracking-wider uppercase font-bold text-[#A0AEC0] block mb-1">
              Obras Iniciadas
            </span>
            <span className="font-serif text-3.5xl font-extrabold text-[#CBB26A] leading-tight">
              {bookCount}
            </span>
          </div>
          <div className="h-12 w-12 bg-[#0F1115] rounded-xl flex items-center justify-center text-[#CBB26A]">
            <FolderOpen className="w-5 h-5 bg-transparent" />
          </div>
        </div>

        <div className="bg-[#1A1D23] border border-[#2D3139] p-6 rounded-xl flex items-center justify-between shadow-md">
          <div>
            <span className="text-[10px] tracking-wider uppercase font-bold text-[#A0AEC0] block mb-1">
              Capítulos Publicados
            </span>
            <span className="font-serif text-3.5xl font-extrabold text-[#CBB26A] leading-tight">
              {chapterCount}
            </span>
          </div>
          <div className="h-12 w-12 bg-[#0F1115] rounded-xl flex items-center justify-center text-[#CBB26A]">
            <BookOpen className="w-5 h-5 bg-transparent" />
          </div>
        </div>

        <div className="bg-[#1A1D23] border border-[#2D3139] p-6 rounded-xl flex items-center justify-between shadow-md">
          <div>
            <span className="text-[10px] tracking-wider uppercase font-bold text-[#A0AEC0] block mb-1">
              Palavras Escritas
            </span>
            <span className="font-serif text-3.5xl font-extrabold text-[#CBB26A] leading-tight">
              {totalWords.toLocaleString('pt-BR')}
            </span>
          </div>
          <div className="h-12 w-12 bg-[#0F1115] rounded-xl flex items-center justify-center text-[#CBB26A]">
            <HelpCircle className="w-5 h-5 bg-transparent" />
          </div>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#2D3139] pb-4 mb-6">
        <h3 className="font-serif text-xl font-bold text-[#E2E8F0]">
          Meus Livros Editados
        </h3>
        <button
          onClick={onAddBook}
          id="btn-add-book-admin"
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#CBB26A] hover:bg-[#b89e5a] text-[#0A0B0D] font-bold text-sm py-2 px-5 rounded-lg shadow-md transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Livro</span>
        </button>
      </div>

      {books.length > 0 ? (
        <div className="flex flex-col gap-4" id="admin-books-collection-rows">
          {books.map((b) => (
            <div
              key={b.id}
              className="bg-[#1A1D23] border border-[#2D3139] p-4 rounded-xl flex flex-col md:flex-row gap-5 items-center justify-between hover:shadow-lg hover:border-[#CBB26A]/30 transition-all"
              id={`book-row-config-${b.id}`}
            >
              <div 
                onClick={() => onSelectBook(b.id)}
                className="flex items-center gap-4 w-full md:w-auto cursor-pointer"
              >
                <div className="shrink-0">
                  <BookCover book={b} size="sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif font-bold text-base text-[#E2E8F0] truncate">
                    {b.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#A0AEC0] mt-1.5 font-sans capitalize">
                    <span className="font-semibold text-[#CBB26A]">{b.genre || 'Poesia'}</span>
                    <span>•</span>
                    <span>{b.chapters?.length || 0} capítulos</span>
                  </div>
                  {b.description && (
                    <p className="text-xs text-[#A0AEC0]/90 mt-2 line-clamp-2 max-w-xl italic">
                      {b.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t border-[#2D3139]/40 pt-4 md:border-none md:pt-0 shrink-0 select-none">
                <button
                  onClick={() => onSelectBook(b.id)}
                  className="flex items-center gap-1.5 py-1.5 px-3 rounded text-xs font-semibold border border-[#2D3139] hover:bg-[#0F1115] text-[#E2E8F0] transition-all cursor-pointer"
                  title="Ver Sumário / Página do Livro"
                >
                  <Eye className="w-3.5 h-3.5 text-[#CBB26A]" />
                  <span>Ler</span>
                </button>
                <button
                  onClick={() => onAddChapter(b.id)}
                  className="flex items-center gap-1.5 py-1.5 px-3 rounded text-xs font-semibold bg-[#CBB26A]/90 hover:bg-[#CBB26A] text-[#0A0B0D] transition-all cursor-pointer font-bold"
                  title="Escrever novo capítulo para esta obra"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Capítulo</span>
                </button>
                <button
                  onClick={() => onEditBook(b)}
                  className="p-2 border border-[#2D3139] hover:bg-[#0F1115] text-[#CBB26A] rounded transition cursor-pointer"
                  title="Editar metadados ou capa"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDeleteBook(b.id)}
                  className="p-2 border border-[#2D3139] hover:bg-red-950/45 text-red-400 rounded transition cursor-pointer"
                  title="Excluir obra permanentemente"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-[#2D3139] rounded-xl bg-[#1A1D23]">
          <FolderOpen className="w-12 h-12 text-[#CBB26A] opacity-50 mx-auto mb-3" />
          <p className="text-[#A0AEC0]">Você ainda não editou nenhuma obra literária.</p>
          <button
            onClick={onAddBook}
            className="mt-4 inline-flex items-center gap-2 bg-[#CBB26A] hover:bg-[#b89e5a] text-[#0A0B0D] py-2 px-4 rounded-lg text-sm font-bold transition cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Criar Livro Agora</span>
          </button>
        </div>
      )}

      <section className="mt-14 p-6 border border-[#2D3139] rounded-2xl bg-[#0F1115]/50 md:flex items-center justify-between gap-6" id="backup-instructions-module">
        <div className="mb-4 md:mb-0 max-w-xl">
          <h4 className="font-serif font-bold text-[#E2E8F0] text-base">
            Salvaguarda de Livros e Capítulos
          </h4>
          <p className="text-xs text-[#A0AEC0] mt-1.5 leading-relaxed font-sans">
            Seus livros permanecem guardados de forma segura e imediata no seu navegador local. No entanto, para garantir que nunca perca o seu trabalho ao formatar o computador ou mudar de celular, utilize as ferramentas de exportação de dados para salvar um arquivo de backup.
          </p>
        </div>
        <div className="flex gap-2 shrink-0 justify-start select-none">
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 py-2 px-3.5 rounded-lg border border-[#CBB26A] hover:bg-[#CBB26A]/10 text-[#CBB26A] font-bold text-xs transition cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            <span>Salvar Backup (.json)</span>
          </button>
          <button
            onClick={onImport}
            className="flex items-center gap-1.5 py-2 px-3.5 rounded-lg border border-[#2D3139] hover:bg-[#2D3139] text-[#A0AEC0] font-bold text-xs transition cursor-pointer"
          >
            <FileUp className="w-4 h-4" />
            <span>Restaurar Backup</span>
          </button>
        </div>
      </section>
    </div>
  );
}
