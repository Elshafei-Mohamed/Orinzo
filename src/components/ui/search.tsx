'use client';

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search products...',
  className = '',
}: SearchInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
    if (e.key === 'Escape') {
      onChange('');
      onSubmit();
    }
  };

  return (
    <input
      type="search"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      className={className}
      autoComplete="off"
      spellCheck="false"
    />
  );
}

export function SearchResultsIndicator({ 
  isSearching 
}: { 
  isSearching: boolean 
}) {
  if (!isSearching) return null;
  
  return (
    <span className="absolute right-3 top-1/2 -translate-y-1/2">
      <span className="flex h-4 w-4 items-center justify-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
      </span>
    </span>
  );
}
