import React from 'react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  onClick: (id: string) => void;
  isCompact?: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, isSelected, onClick, isCompact = false }) => {
  const Icon = category.icon;

  return (
    <div
      onClick={() => onClick(category.id)}
      className={`
        relative cursor-pointer transition-transform duration-300 ease-in-out transform group
        active:scale-[1.02]
        ${isCompact ? "w-36 h-32" : "w-40 h-36"}
        ${isSelected ? 'scale-105' : 'hover:scale-105'}
      `}
    >
      {/* Gradient Border/Ring */}
      <div className={`
        absolute inset-0 rounded-2xl transition-all duration-300 p-0.5
        ${isSelected ? 'opacity-100 bg-gradient-to-br from-[#FF4C61] to-[#1DB954]' : 'opacity-0'}
      `}>
        <div className="bg-white dark:bg-gray-800 w-full h-full rounded-[0.875rem]"></div>
      </div>
      
      {/* Inner Card Content */}
      <div className={`
        absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-4 transition-all duration-300
        bg-white dark:bg-gray-800 shadow-md group-hover:shadow-xl group-active:shadow-lg
        ${isSelected ? 'shadow-xl' : ''}
      `}>
        <div className={`p-3 rounded-full mb-2 transition-colors duration-300 ${isSelected ? 'bg-pink-100 dark:bg-pink-900/50' : 'bg-gray-100 dark:bg-gray-700'}`}>
          <Icon className={`w-8 h-8 transition-colors duration-300 ${isSelected ? 'text-[#FF4C61]' : 'text-gray-600 dark:text-gray-300'}`} />
        </div>
        <span className="font-semibold text-gray-800 dark:text-gray-100 text-sm text-center">{category.name}</span>
      </div>
    </div>
  );
};