import React, { useState, useMemo } from 'react';
import { Category } from '../types';
import { CategoryCard } from './CategoryCard';

interface DarkModeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

const SunIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-6.364-.386 1.591-1.591M3 12h2.25m.386-6.364 1.591 1.591M12 12a2.25 2.25 0 0 0-2.25 2.25 2.25 2.25 0 0 0 2.25 2.25 2.25 2.25 0 0 0 2.25-2.25A2.25 2.25 0 0 0 12 12Z" />
    </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
    </svg>
);

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ isDarkMode, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1DB954] dark:focus:ring-offset-gray-800"
      aria-label={isDarkMode ? 'Activate light mode' : 'Activate dark mode'}
    >
      {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
    </button>
  );
};


interface Screen3Props {
  allCategories: Category[];
  selectedCategories: string[];
  toggleCategory: (id: string) => void;
  onDone: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
);


export const Screen3Selector: React.FC<Screen3Props> = ({ allCategories, selectedCategories, toggleCategory, onDone, isDarkMode, toggleDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = useMemo(() => {
    return allCategories.filter(cat =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allCategories, searchTerm]);

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] dark:bg-[#121212] transition-colors duration-300">
      <div className="p-6 sticky top-0 bg-[#F5F5F5] dark:bg-[#121212] z-10 transition-colors duration-300">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Select Interests</h2>
            <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
        </div>
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1DB954] transition-all duration-300 shadow-sm"
          />
        </div>
      </div>

      <div className="flex-grow overflow-y-auto px-6 pb-28">
        <div className="grid grid-cols-2 gap-4">
          {filteredCategories.map(cat => (
            <CategoryCard
              key={cat.id}
              category={cat}
              isSelected={selectedCategories.includes(cat.id)}
              onClick={toggleCategory}
            />
          ))}
        </div>
         {filteredCategories.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 font-semibold">No categories found</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Try a different search term.</p>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#F5F5F5] via-[#F5F5F5] dark:from-[#121212] dark:via-[#121212] to-transparent pointer-events-none">
         <div className="h-20 pointer-events-none"></div>
        <button
          onClick={onDone}
          className="w-full h-16 text-lg font-bold text-white rounded-2xl shadow-lg bg-gradient-to-r from-[#1DB954] to-[#59e488] transition-all duration-300 ease-in-out transform active:scale-95 active:animate-pulse-once pointer-events-auto"
        >
          Done
        </button>
      </div>
    </div>
  );
};