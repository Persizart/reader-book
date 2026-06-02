import { useState, useRef, useEffect } from 'react';
import { X, Save, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered, Eraser, Maximize2, Minimize2 } from 'lucide-react';
import { Chapter } from '../types';

interface ChapterModalProps {
  chapter: Chapter | null;
  onClose: () => void;
  onSave: (chapterData: { title: string; content: string; wordCount: number }) => void;
}

export default function ChapterModal({ chapter, onClose, onSave }: ChapterModalProps) {
  const [title, setTitle] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isFocusMode, setIsFocusMode] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chapter) {
      setTitle(chapter.title);
      setWordCount(chapter.wordCount || 0);
    } else {
      setTitle('');
      setWordCount(0);
    }
  }, [chapter]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = chapter ? chapter.content : '';
      updateWordCount();
    }
  }, [chapter, editorRef]);

  const updateWordCount = () => {
    if (!editorRef.current) return;
    const text = editorRef.current.innerText || '';
    const words = text
      .trim()
      .split(/\s+/)
      .filter(w => w.length > 0);
    setWordCount(words.length);
  };

  const handleCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateWordCount();
  };

  const insertHrOrnament = () => {
    const dividerHtml = `<div align="center" style="margin: 2rem 0; color: #CBB26A; font-size: 1.1rem; user-select: none;">✦ &nbsp; &nbsp; ⚜ &nbsp; &nbsp; ✦</div>`;
    document.execCommand('insertHTML', false, dividerHtml);
    editorRef.current?.focus();
    updateWordCount();
  };

  const handleEditorInput = () => {
    updateWordCount();
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('Por favor, informe o título do capítulo.');
      return;
    }
    const htmlContent = editorRef.current?.innerHTML || '';
    onSave({
      title: title.trim(),
      content: htmlContent,
      wordCount: wordCount,
    });
  };

  return (
    <div className={`fixed inset-0 bg-[#0A0B0D]/95 backdrop-blur-md flex items-center justify-center z-50 p-0 sm:p-4 transition-all ${
      isFocusMode ? 'bg-[#0A0B0D]' : ''
    }`}>
      <div 
        className={`bg-[#1A1D23] border border-[#2D3139] w-full max-w-4xl rounded-none sm:rounded-2xl shadow-2xl relative overflow-hidden flex flex-col transition-all h-full ${
          isFocusMode ? 'sm:rounded-none max-w-full h-screen border-none bg-[#0A0B0D]' : 'max-h-[95vh]'
        }`}
        id="chapter-editor-modal-frame"
      >
        {!isFocusMode && (
          <header className="flex items-center justify-between p-5 border-b border-[#2D3139] bg-[#0F1115]">
            <h2 className="font-serif text-lg font-bold text-[#E2E8F0]">
              {chapter ? 'Editar Capítulo' : 'Escrever Novo Capítulo'}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFocusMode(true)}
                title="Modo Foco Total (Sem Distrações)"
                className="p-1.5 text-[#A0AEC0] hover:text-[#CBB26A] hover:bg-[#2D3139] rounded-lg transition-all cursor-pointer flex items-center gap-1 text-xs"
              >
                <Maximize2 className="w-4 h-4" />
                <span className="hidden sm:inline">Modo Foco</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-[#A0AEC0] hover:text-[#E2E8F0] hover:bg-[#2D3139] rounded-lg transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </header>
        )}

        {isFocusMode && (
          <button
            onClick={() => setIsFocusMode(false)}
            className="fixed top-4 right-4 z-50 p-2 bg-[#1A1D23] border border-[#2D3139] hover:bg-[#2D3139] text-[#CBB26A] hover:text-[#E2E8F0] rounded-full transition-all cursor-pointer flex items-center gap-1"
            title="Sair do modo foco"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        )}

        <div className={`px-6 pt-5 pb-3 ${isFocusMode ? 'max-w-2xl mx-auto w-full pt-16' : ''}`}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título do Capítulo (Ex: Capítulo I: O Despertar)"
            className="w-full bg-transparent font-serif text-2xl md:text-3.5xl font-extrabold text-[#E2E8F0] focus:outline-none border-b border-[#2D3139] focus:border-[#CBB26A] pb-2 placeholder-gray-600 italic"
          />
        </div>

        {!isFocusMode ? (
          <div className="px-6 py-2 border-y border-[#2D3139] bg-[#0F1115] flex flex-wrap items-center gap-1 select-none text-xs">
            <button
              type="button"
              onClick={() => handleCommand('bold')}
              className="p-1.5 hover:bg-[#2D3139] text-[#E2E8F0] rounded transition cursor-pointer font-bold"
              title="Negrito"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleCommand('italic')}
              className="p-1.5 hover:bg-[#2D3139] text-[#E2E8F0] rounded transition cursor-pointer italic"
              title="Itálico"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleCommand('underline')}
              className="p-1.5 hover:bg-[#2D3139] text-[#E2E8F0] rounded transition cursor-pointer underline"
              title="Sublinhado"
            >
              <Underline className="w-4 h-4" />
            </button>

            <div className="h-4 w-[1px] bg-[#2D3139] mx-1.5"></div>

            <button
              type="button"
              onClick={() => handleCommand('justifyLeft')}
              className="p-1.5 hover:bg-[#2D3139] text-[#E2E8F0] rounded transition cursor-pointer"
              title="Alinhar à Esquerda"
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleCommand('justifyCenter')}
              className="p-1.5 hover:bg-[#2D3139] text-[#E2E8F0] rounded transition cursor-pointer"
              title="Centralizar"
            >
              <AlignCenter className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleCommand('justifyRight')}
              className="p-1.5 hover:bg-[#2D3139] text-[#E2E8F0] rounded transition cursor-pointer"
              title="Alinhar à Direita"
            >
              <AlignRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleCommand('justifyFull')}
              className="p-1.5 hover:bg-[#2D3139] text-[#E2E8F0] rounded transition cursor-pointer"
              title="Justificar"
            >
              <AlignJustify className="w-4 h-4" />
            </button>

            <div className="h-4 w-[1px] bg-[#2D3139] mx-1.5"></div>

            <button
              type="button"
              onClick={() => handleCommand('insertUnorderedList')}
              className="p-1.5 hover:bg-[#2D3139] text-[#E2E8F0] rounded transition cursor-pointer"
              title="Lista de Marcadores"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleCommand('insertOrderedList')}
              className="p-1.5 hover:bg-[#2D3139] text-[#E2E8F0] rounded transition cursor-pointer"
              title="Lista Numerada"
            >
              <ListOrdered className="w-4 h-4" />
            </button>

            <div className="h-4 w-[1px] bg-[#2D3139] mx-1.5"></div>

            <button
              type="button"
              onClick={insertHrOrnament}
              className="px-2 py-1 text-[11px] font-sans font-medium text-[#CBB26A] hover:bg-[#CBB26A]/10 hover:text-[#CBB26A] rounded transition border border-[#CBB26A]/20 cursor-pointer"
              title="Inserir Divisor de Epígrafe ⚜"
            >
              Insert. ⚜ Divisor
            </button>

            <button
              type="button"
              onClick={() => handleCommand('removeFormat')}
              className="p-1.5 hover:bg-[#2D3139] text-[#E2E8F0] rounded transition ml-auto cursor-pointer"
              title="Limpar formatação"
            >
              <Eraser className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        ) : null}

        <div className="flex-1 overflow-y-auto px-6 py-6 bg-[#0A0B0D]" id="editor-scroller">
          <div 
            ref={editorRef}
            contentEditable
            onInput={handleEditorInput}
            placeholder="Comece a digitar os contornos de sua narrativa..."
            className={`editor-area min-h-full font-serif text-[#E2E8F0] leading-[1.85] text-base md:text-lg focus:outline-none bg-[#0F1115] border border-[#2D3139] rounded-xl p-6 shadow-sm ${
              isFocusMode ? 'max-w-2xl mx-auto shadow-none border-none bg-transparent py-2.5 px-0' : ''
            }`}
            style={{ minHeight: '320px' }}
          />
        </div>

        <footer className="p-4 border-t border-[#2D3139] bg-[#0F1115] flex items-center justify-between gap-4 font-sans text-xs">
          <div className="flex items-center gap-1.5 text-[#A0AEC0]">
            <span className="font-semibold text-[#E2E8F0]">{wordCount}</span>
            <span>palavras</span>
            <span className="text-[#CBB26A]">•</span>
            <span>Leitura aprox:</span>
            <span className="font-semibold text-[#E2E8F0]">{Math.ceil(wordCount / 200)} min</span>
          </div>

          <div className="flex items-center gap-2">
            {!isFocusMode && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-[#2D3139] rounded-lg text-[#A0AEC0] hover:bg-[#2D3139] hover:text-[#E2E8F0] transition-all cursor-pointer font-medium"
              >
                Descartar
              </button>
            )}
            <button
              type="button"
              onClick={handleSave}
              id="btn-save-chapter-editor"
              className="flex items-center gap-2 bg-[#CBB26A] hover:bg-[#b89e5a] text-[#0A0B0D] font-bold py-2 px-5 rounded-lg shadow-md transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Capítulo</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
