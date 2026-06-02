import { useState, useEffect } from 'react';
import { dummyBooks } from './utils/dummyData';
import { Book, Chapter } from './types';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import AdminView from './components/AdminView';
import BookDetailView from './components/BookDetailView';
import ChapterReadView from './components/ChapterReadView';
import BookModal from './components/BookModal';
import ChapterModal from './components/ChapterModal';
import { 
  syncGetBooks, 
  syncSaveBooks 
} from './utils/cloudflareSync';

const STORAGE_KEY = 'readerbook_books';

export default function App() {
  const [isCloudflareSyncActive, setIsCloudflareSyncActive] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [selectedChapterIdx, setSelectedChapterIdx] = useState<number | null>(null);

  const [userRole, setUserRole] = useState<'admin' | 'leitor'>(() => {
    return (localStorage.getItem('readerbook_user_role') as 'admin' | 'leitor') || 'leitor';
  });

  const handleToggleRole = (role: 'admin' | 'leitor') => {
    if (role === 'admin') {
      const pin = window.prompt("Digite a senha de acesso:");
      if (pin === null) return;
      if (pin.trim() === 'Alexandre1') {
        setUserRole('admin');
        localStorage.setItem('readerbook_user_role', 'admin');
        alert("Acesso administrativo liberado com sucesso!");
      } else {
        alert("Senha incorreta!");
      }
    } else {
      setUserRole('leitor');
      localStorage.setItem('readerbook_user_role', 'leitor');
      if (currentView === 'admin') {
        setCurrentView('home');
      }
    }
  };

  const [books, setBooks] = useState<Book[]>([]);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isChapterModalOpen, setIsChapterModalOpen] = useState(false);
  const [editingChapterIdx, setEditingChapterIdx] = useState<number | null>(null);
  const [targetBookId, setTargetBookId] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      const cloudflareBooks = await syncGetBooks();
      let activeSync = false;
      if (cloudflareBooks !== null) {
        activeSync = true;
        setIsCloudflareSyncActive(true);
        if (cloudflareBooks.length > 0) {
          setBooks(cloudflareBooks);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudflareBooks));
          return;
        }
      }

      const rawData = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('minhaestante_books');
      if (rawData) {
        try {
          const parsed = JSON.parse(rawData);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setBooks(parsed);
            if (activeSync) {
              await syncSaveBooks(parsed);
            }
            return;
          }
        } catch (err) {
          console.error(err);
        }
      }
      setBooks(dummyBooks);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyBooks));
      if (activeSync) {
        await syncSaveBooks(dummyBooks);
      }
    };

    loadBooks();
  }, [isCloudflareSyncActive]);

  const saveBooks = (updatedBooks: Book[]) => {
    setBooks(updatedBooks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks));
    if (isCloudflareSyncActive) {
      syncSaveBooks(updatedBooks);
    }
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    if (view === 'home' || view === 'admin') {
      setSelectedBookId(null);
      setSelectedChapterIdx(null);
    }
  };

  const handleSelectBook = (id: string) => {
    setSelectedBookId(id);
    setCurrentView('book');
  };

  const currentBook = books.find(b => b.id === selectedBookId);

  const handleOpenNewBookModal = () => {
    setEditingBook(null);
    setIsBookModalOpen(true);
  };

  const handleOpenEditBookModal = (bookToEdit: Book) => {
    setEditingBook(bookToEdit);
    setIsBookModalOpen(true);
  };

  const handleSaveBook = (bookData: { title: string; genre: string; description: string; cover: string | null }) => {
    const timeNow = new Date().toISOString();
    if (editingBook) {
      const updatedBook = {
        ...editingBook,
        title: bookData.title,
        genre: bookData.genre,
        description: bookData.description,
        cover: bookData.cover,
        updatedAt: timeNow,
      };
      
      const updated = books.map((b) => {
        if (b.id === editingBook.id) {
          return updatedBook;
        }
        return b;
      });
      saveBooks(updated);
    } else {
      const newBook: Book = {
        id: 'book_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        title: bookData.title,
        genre: bookData.genre,
        description: bookData.description,
        cover: bookData.cover,
        chapters: [],
        createdAt: timeNow,
        updatedAt: timeNow,
      };
      saveBooks([newBook, ...books]);
    }
    setIsBookModalOpen(false);
    setEditingBook(null);
  };

  const handleDeleteBook = (id: string) => {
    const matchBook = books.find(b => b.id === id);
    const confirmed = window.confirm(`Deseja mesmo excluir o livro "${matchBook?.title}"?`);
    if (confirmed) {
      const filtered = books.filter((b) => b.id !== id);
      saveBooks(filtered);
      if (selectedBookId === id) {
        handleNavigate('home');
      }
    }
  };

  const handleOpenNewChapterModal = (bookId: string) => {
    setTargetBookId(bookId);
    setEditingChapterIdx(null);
    setIsChapterModalOpen(true);
  };

  const handleOpenEditChapterModal = (bookId: string, idx: number) => {
    setTargetBookId(bookId);
    setEditingChapterIdx(idx);
    setIsChapterModalOpen(true);
  };

  const handleSaveChapter = (chapterData: { title: string; content: string; wordCount: number }) => {
    if (!targetBookId) return;

    let targetBook: Book | undefined;
    const updated = books.map((b) => {
      if (b.id === targetBookId) {
        const chaps = [...(b.chapters || [])];
        const newChapter: Chapter = {
          title: chapterData.title,
          content: chapterData.content,
          wordCount: chapterData.wordCount,
        };

        if (editingChapterIdx !== null) {
          chaps[editingChapterIdx] = newChapter;
        } else {
          chaps.push(newChapter);
        }

        const updatedBook = {
          ...b,
          chapters: chaps,
          updatedAt: new Date().toISOString(),
        };
        targetBook = updatedBook;
        return updatedBook;
      }
      return b;
    });

    saveBooks(updated);
    setIsChapterModalOpen(false);
    setTargetBookId(null);
    setEditingChapterIdx(null);
  };

  const handleDeleteChapter = (bookId: string, idx: number) => {
    const matchBook = books.find(b => b.id === bookId);
    const matchChap = matchBook?.chapters[idx];
    const confirmed = window.confirm(`Confirmar a exclusão do capítulo "${matchChap?.title || idx + 1}"?`);
    if (confirmed) {
      const updated = books.map((b) => {
        if (b.id === bookId) {
          const chaps = [...(b.chapters || [])];
          chaps.splice(idx, 1);
          const updatedBook = {
            ...b,
            chapters: chaps,
            updatedAt: new Date().toISOString(),
          };
          return updatedBook;
        }
        return b;
      });
      saveBooks(updated);
    }
  };

  const handleExportBackup = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(books, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `readerBook_backup_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (e) {
      alert('Erro ao tentar exportar o arquivo de backup.');
    }
  };

  const handleImportBackup = () => {
    const fileSelector = document.createElement('input');
    fileSelector.type = 'file';
    fileSelector.accept = '.json';
    fileSelector.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) return;

      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          if (Array.isArray(data)) {
            if (data.length > 0) {
              const first = data[0];
              if (!first.title || !first.id) {
                alert('O arquivo selecionado não parece possuir um formato de backup válido.');
                return;
              }
            }
            const overwrite = window.confirm(`Deseja importar as ${data.length} obras substituindo sua estante atual?`);
            if (overwrite) {
              saveBooks(data);
              alert('Backup restaurado com sucesso!');
              handleNavigate('home');
            }
          } else {
            alert('Arquivo inválido.');
          }
        } catch (err) {
          alert('Erro ao processar as informações do JSON.');
        }
      };
      fileReader.readAsText(file);
    };
    fileSelector.click();
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] flex flex-col text-[#E2E8F0]">
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onExport={handleExportBackup}
        onImport={handleImportBackup}
        userRole={userRole}
        onToggleRole={handleToggleRole}
      />

      <main className="flex-1 pb-16">
        {currentView === 'home' && (
          <HomeView
            books={books}
            onSelectBook={handleSelectBook}
            onNavigate={handleNavigate}
            userRole={userRole}
          />
        )}

        {currentView === 'admin' && userRole === 'admin' && (
          <AdminView
            books={books}
            onSelectBook={handleSelectBook}
            onAddBook={handleOpenNewBookModal}
            onEditBook={handleOpenEditBookModal}
            onDeleteBook={handleDeleteBook}
            onAddChapter={handleOpenNewChapterModal}
            onExport={handleExportBackup}
            onImport={handleImportBackup}
            isCloudflareSyncActive={isCloudflareSyncActive}
          />
        )}

        {currentView === 'book' && currentBook && (
          <BookDetailView
            book={currentBook}
            onBack={() => handleNavigate('home')}
            onReadChapter={(idx) => {
              setSelectedChapterIdx(idx);
              setCurrentView('chapter');
            }}
            onAddChapter={() => handleOpenNewChapterModal(currentBook.id)}
            onEditChapter={(idx) => handleOpenEditChapterModal(currentBook.id, idx)}
            onDeleteChapter={(idx) => handleDeleteChapter(currentBook.id, idx)}
            onEditBook={() => handleOpenEditBookModal(currentBook)}
            userRole={userRole}
          />
        )}

        {currentView === 'chapter' && currentBook && selectedChapterIdx !== null && (
          <ChapterReadView
            book={currentBook}
            chapterIdx={selectedChapterIdx}
            onBack={() => {
              setSelectedChapterIdx(null);
              setCurrentView('book');
            }}
            onNavigateChapter={(idx) => setSelectedChapterIdx(idx)}
          />
        )}
      </main>

      {isBookModalOpen && (
        <BookModal
          book={editingBook}
          onClose={() => {
            setIsBookModalOpen(false);
            setEditingBook(null);
          }}
          onSave={handleSaveBook}
        />
      )}

      {isChapterModalOpen && (
        <ChapterModal
          chapter={
            targetBookId && editingChapterIdx !== null
              ? books.find((b) => b.id === targetBookId)?.chapters[editingChapterIdx] || null
              : null
          }
          onClose={() => {
            setIsChapterModalOpen(false);
            setTargetBookId(null);
            setEditingChapterIdx(null);
          }}
          onSave={handleSaveChapter}
        />
      )}
    </div>
  );
}
