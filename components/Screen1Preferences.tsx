import React from 'react';
import { CategoryCard } from './CategoryCard';
import { FEATURED_CATEGORIES } from '../constants';

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

interface Screen1Props {
  selectedCategories: string[];
  toggleCategory: (id: string) => void;
  onStart: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
);

export const Screen1Preferences: React.FC<Screen1Props> = ({ selectedCategories, toggleCategory, onStart, isDarkMode, toggleDarkMode }) => {
  const isButtonActive = selectedCategories.length > 0;
  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] dark:bg-[#121212] p-6 justify-between transition-colors duration-300">
      <div>
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Customize Feed</h1>
           <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
        </div>
        <p className="text-gray-500 dark:text-gray-400 mt-2 mb-8">Select a few topics to get started.</p>
        
        <div className="relative">
          <div className="flex space-x-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {FEATURED_CATEGORIES.map(cat => (
              <div key={cat.id} className="flex-shrink-0 snap-center">
                <CategoryCard
                  category={cat}
                  isSelected={selectedCategories.includes(cat.id)}
                  onClick={toggleCategory}
                  isCompact={true}
                />
              </div>
            ))}
            <div className="flex-shrink-0 w-8"></div>
          </div>
          <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-[#F5F5F5] dark:from-[#121212] pointer-events-none"></div>
        </div>
      </div>

      <div className="py-4">
        <button
          onClick={onStart}
          disabled={!isButtonActive}
          className={`
            group w-full h-16 flex items-center justify-center text-lg font-bold text-white rounded-2xl shadow-lg 
            transition-all duration-300 ease-in-out transform
            active:scale-95
            disabled:cursor-not-allowed disabled:shadow-none disabled:active:scale-100
            ${isButtonActive 
              ? 'bg-gradient-to-r from-[#FF4C61] to-[#1DB954] active:animate-pulse-once' 
              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
            }
          `}
        >
          Start Watching
          <ArrowRightIcon className="w-6 h-6 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
        <p className="text-center text-gray-400 dark:text-gray-500 text-xs mt-3">You can change these preferences later.</p>
      </div>
    </div>
  );
};