import React, { useState, useRef, useEffect } from 'react';
import { X, Image, Trash2, Save } from 'lucide-react';
import { Book } from '../types';

interface BookModalProps {
  book: Book | null;
  onClose: () => void;
  onSave: (bookData: { title: string; genre: string; description: string; cover: string | null }) => void;
}

const GENRES = [
  'Romance',
  'Fantasia',
  'Ficção Científica',
  'Terror',
  'Mistério',
  'Aventura',
  'Drama',
  'Poesia',
  'Conto',
  'Outro',
];

export default function BookModal({ book, onClose, onSave }: BookModalProps) {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('Romance');
  const [description, setDescription] = useState('');
  const [cover, setCover] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setGenre(book.genre || 'Romance');
      setDescription(book.description || '');
      setCover(book.cover || null);
    } else {
      setTitle('');
      setGenre('Romance');
      setDescription('');
      setCover(null);
    }
  }, [book]);

  const handleFileUpload = (file: File) => {
    if (!file) return;
    if (file.size > 1.5 * 1024 * 1024) {
      setErrorMessage('Por favor, envie uma imagem menor que 1.5 MB para otimização de salvamento.');
      return;
    }
    setErrorMessage('');
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setCover(result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMessage('O título da obra é obrigatório.');
      return;
    }
    onSave({
      title: title.trim(),
      genre,
      description: description.trim(),
      cover,
    });
  };

  return (
    <div className="fixed inset-0 bg-[#0A0B0D]/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div 
        className="bg-[#1A1D23] border border-[#2D3139] w-full max-w-2xl rounded-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] text-[#E2E8F0]"
        id="book-modal-container"
      >
        <header className="flex items-center justify-between p-5 border-b border-[#2D3139] bg-[#0F1115]">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-[#E2E8F0]">
            {book ? `Editar Obra: ${book.title}` : 'Começar Nova História'}
          </h2>
          <button
            onClick={onClose}
            id="btn-close-book-modal"
            className="p-1 text-[#A0AEC0] hover:text-[#E2E8F0] hover:bg-[#2D3139] rounded-full transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 flex flex-col items-center">
            <span className="block text-xs font-bold uppercase tracking-widest text-[#CBB26A] mb-2 font-sans self-start">
              Capa do Livro
            </span>

            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="w-40 h-56 border-2 border-dashed border-[#2D3139] hover:border-[#CBB26A] rounded-xl flex flex-col items-center justify-center p-4 text-center cursor-pointer bg-[#0F1115] group relative overflow-hidden transition-all shadow-inner"
              id="cover-dropzone-uploader"
            >
              {cover ? (
                <>
                  <img src={cover} alt="Preview" className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-[#0A0B0D]/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-white text-xs font-semibold">Alterar Capa</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 bg-[#1A1D23] rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Image className="w-5 h-5 text-[#CBB26A]" />
                  </div>
                  <span className="text-xs text-[#A0AEC0] font-semibold">Arraste a capa</span>
                  <span className="text-[10px] text-[#A0AEC0]/60 mt-1">Ou clique para buscar</span>
                </div>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {cover && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setCover(null); }}
                className="mt-3 text-xs flex items-center gap-1.5 text-red-400 hover:text-red-300 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remover Capa</span>
              </button>
            )}
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <div className="form-group">
              <label htmlFor="book-title-input" className="block text-xs font-bold uppercase tracking-widest text-[#CBB26A] mb-1.5 font-sans">
                Título *
              </label>
              <input
                type="text"
                id="book-title-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Insira o nome de sua nova criação..."
                className="w-full px-3.5 py-2 border border-[#2D3139] rounded-lg bg-[#1A1D23] text-sm text-[#E2E8F0] placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#CBB26A] transition-all font-serif italic text-base"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="book-genre-select" className="block text-xs font-bold uppercase tracking-widest text-[#CBB26A] mb-1.5 font-sans">
                Gênero Literário
              </label>
              <select
                id="book-genre-select"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-3.5 py-2 border border-[#2D3139] rounded-lg bg-[#1A1D23] text-sm text-[#E2E8F0] focus:outline-none focus:ring-1 focus:ring-[#CBB26A] transition-all cursor-pointer"
              >
                {GENRES.map(g => (
                  <option key={g} value={g} className="bg-[#1A1D23] text-[#E2E8F0]">{g}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="book-synopsis-textarea" className="block text-xs font-bold uppercase tracking-widest text-[#CBB26A] mb-1.5 font-sans">
                Sinopse / Sobre a Obra
              </label>
              <textarea
                id="book-synopsis-textarea"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Escreva uma bela introdução ou sinopse da história que prenda os seus leitores..."
                className="w-full px-3.5 py-2 border border-[#2D3139] rounded-lg bg-[#1A1D23] text-sm text-[#E2E8F0] placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#CBB26A] transition-all font-serif resize-none"
              />
            </div>

            {errorMessage && (
              <p className="text-xs text-red-400 bg-red-950/30 border border-red-900/50 p-2.5 rounded-lg font-medium leading-relaxed animate-pulse">
                {errorMessage}
              </p>
            )}
          </div>
        </form>

        <footer className="p-4 border-t border-[#2D3139] bg-[#0F1115] flex items-center justify-end gap-3.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium border border-[#2D3139] rounded-lg text-[#A0AEC0] hover:bg-[#2D3139] hover:text-[#E2E8F0] transition-all cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            id="btn-submit-book-modal"
            className="flex items-center gap-2 bg-[#CBB26A] hover:bg-[#b89e5a] text-[#0A0B0D] font-bold text-sm py-2 px-5 rounded-lg shadow-md transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{book ? 'Salvar Edição' : 'Gerar Livro'}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
