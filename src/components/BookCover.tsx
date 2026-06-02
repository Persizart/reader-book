import { Book } from '../types';

interface BookCoverProps {
  book: Book;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function BookCover({ book, className = '', size = 'md' }: BookCoverProps) {
  const dimensions = {
    sm: 'w-14 h-20 text-[8px]',
    md: 'w-44 h-64 text-xs shadow-lg',
    lg: 'w-48 h-72 text-sm shadow-xl',
  };

  const bgThemes = [
    'from-[#5c2514] to-[#140804] border-[#e2b055]/30 text-[#f6ebd4]',
    'from-[#122b10] to-[#040e03] border-[#a5d6a7]/30 text-[#e8f5e9]',
    'from-[#152e4b] to-[#05111e] border-[#90caf9]/30 text-[#e3f2fd]',
    'from-[#372648] to-[#110918] border-[#ce93d8]/30 text-[#f3e5f5]',
    'from-[#242424] to-[#0d0d0d] border-amber-500/20 text-stone-200',
  ];

  const index = book.id.charCodeAt(book.id.length - 1 || 0) % bgThemes.length;
  const themeClass = bgThemes[index];

  if (book.cover) {
    return (
      <img
        src={book.cover}
        alt={book.title}
        referrerPolicy="no-referrer"
        className={`object-cover rounded-md shadow-md hover:brightness-105 transition-all select-none ${dimensions[size]} ${className}`}
      />
    );
  }

  return (
    <div
      className={`relative select-none rounded-md bg-gradient-to-b border border-solid flex flex-col justify-between p-4 font-serif text-center overflow-hidden transition-all duration-300 group-hover:scale-[1.03] ${dimensions[size]} ${themeClass} ${className}`}
    >
      <div className="absolute inset-2 border border-current opacity-10 rounded"></div>
      
      <div className="flex flex-col items-center">
        <span className="uppercase tracking-[0.2em] font-sans text-[9px] font-semibold opacity-80 mb-1">
          {book.genre || 'Literatura'}
        </span>
        <div className="w-6 h-[1px] bg-current opacity-30 my-0.5"></div>
      </div>

      <div className="my-auto z-10 px-1 flex flex-col items-center">
        <p className="font-serif font-bold text-center leading-tight tracking-wide line-clamp-3 
          size-sm:text-[9px] 
          size-md:text-[18px] 
          size-lg:text-[21px]"
        >
          {book.title}
        </p>
        <div className="w-10 h-[2px] bg-[#CBB26A] mt-2 group-hover:w-14 transition-all duration-300"></div>
      </div>

      <div className="flex flex-col items-center opacity-80">
        <span className="italic text-[9px] font-serif size-sm:text-[6px]">
          Edição Exclusiva
        </span>
        <div className="text-[10px] mt-0.5 opacity-60">⚜</div>
      </div>
    </div>
  );
}
