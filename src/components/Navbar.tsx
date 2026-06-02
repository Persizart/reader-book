import { BookOpen, PenTool, Download, Upload } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onExport: () => void;
  onImport: () => void;
  userRole: 'admin' | 'leitor';
  onToggleRole: (role: 'admin' | 'leitor') => void;
}

export default function Navbar({ 
  currentView, 
  onNavigate, 
  onExport, 
  onImport,
  userRole,
  onToggleRole
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#0F1115] text-[#E2E8F0] py-3.5 px-6 flex flex-wrap gap-4 items-center justify-between border-b border-[#2D3139] shadow-lg">
      <div 
        onClick={() => onNavigate('home')} 
        onDoubleClick={() => onToggleRole(userRole === 'admin' ? 'leitor' : 'admin')}
        className="flex items-center gap-2 cursor-pointer select-none group"
        id="nav-brand-container"
        title="Reader Book"
      >
        <div className="bg-gradient-to-br from-[#CBB26A] to-[#1A1D23] text-white p-1.5 rounded-lg shadow-md group-hover:scale-105 transition-all">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <span className="font-serif text-xl tracking-wide font-bold text-white">
          Reader<span className="text-[#CBB26A] italic font-normal font-serif">Book</span>
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
        <button
          id="btn-nav-home"
          onClick={() => onNavigate('home')}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
            currentView === 'home' || currentView === 'book' || currentView === 'chapter'
              ? 'bg-[#CBB26A]/20 text-[#CBB26A] border border-[#CBB26A]/30'
              : 'text-gray-300 hover:bg-[#CBB26A]/10 hover:text-white border border-transparent'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Biblioteca</span>
        </button>

        {userRole === 'admin' && (
          <>
            <button
              id="btn-nav-admin"
              onClick={() => onNavigate('admin')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                currentView === 'admin'
                  ? 'bg-[#CBB26A]/20 text-[#CBB26A] border border-[#CBB26A]/30'
                  : 'text-gray-300 hover:bg-[#CBB26A]/10 hover:text-white border border-transparent'
              }`}
            >
              <PenTool className="w-4 h-4" />
              <span>Escrever</span>
            </button>

            <div className="items-center gap-1.5 hidden md:flex">
              <div className="h-5 w-[1px] bg-[#2D3139] mx-1"></div>
              <button
                id="btn-export-backup"
                onClick={onExport}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-300 hover:text-[#CBB26A] transition-colors bg-white/5 hover:bg-white/10 rounded border border-[#2D3139] cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar</span>
              </button>
              <button
                id="btn-import-backup"
                onClick={onImport}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-300 hover:text-[#CBB26A] transition-colors bg-white/5 hover:bg-white/10 rounded border border-[#2D3139] cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Importar</span>
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
