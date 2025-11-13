import React, { useState, useEffect } from 'react';
import { ALL_CATEGORIES, SHUFFLED_MOCK_REELS } from '../constants';
import { MockReel as MockReelType } from '../types';
import { HeartIcon, CommentIcon, ShareIcon } from './icons';

interface Screen2Props {
  selectedCategories: string[];
  onChangePreferences: () => void;
}

const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
    </svg>
);


const Reel: React.FC<{ reel: MockReelType }> = ({ reel }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(() => Math.floor(Math.random() * 5000) + 100);
    const commentCount = Math.floor(Math.random() * 500) + 10;

    const handleLike = () => {
        setIsLiked(prev => {
            const newIsLiked = !prev;
            setLikeCount(prevCount => newIsLiked ? prevCount + 1 : prevCount - 1);
            return newIsLiked;
        });
    };

    return (
        <div className="h-full w-full snap-start flex-shrink-0 relative bg-gray-800">
            <img 
              src={reel.imageUrl}
              alt={`Reel by ${reel.author} about ${reel.categoryName}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex justify-between items-end p-4 bg-gradient-to-t from-black/60 to-transparent">
                {/* Left side: Author info */}
                <div className="text-white max-w-[calc(100%-6rem)]">
                    <p className="font-bold truncate">{reel.author}</p>
                    <p className="text-sm mt-1">A cool video about #{reel.categoryName}!</p>
                </div>
                
                {/* Right side: Action buttons */}
                <div className="flex flex-col items-center space-y-6 text-white">
                    <button onClick={handleLike} className="flex flex-col items-center group focus:outline-none" aria-label="Like">
                        <HeartIcon className={`w-8 h-8 transition-all duration-200 group-active:scale-125 ${isLiked ? 'text-red-500' : 'text-white'}`} isFilled={isLiked} />
                        <span className="text-xs font-semibold mt-1">{likeCount.toLocaleString()}</span>
                    </button>
                    <button className="flex flex-col items-center group focus:outline-none" aria-label="Comment">
                        <CommentIcon className="w-8 h-8 group-active:scale-125 transition-transform" />
                        <span className="text-xs font-semibold mt-1">{commentCount.toLocaleString()}</span>
                    </button>
                    <button className="flex flex-col items-center group focus:outline-none" aria-label="Share">
                        <ShareIcon className="w-8 h-8 group-active:scale-125 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}

const LoadingSpinner: React.FC = () => (
    <div className="h-full w-full flex flex-col items-center justify-center text-center p-8 text-white">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-gray-300">Finding your vibe...</p>
    </div>
);

export const Screen2Feed: React.FC<Screen2Props> = ({ selectedCategories, onChangePreferences }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredReels, setFilteredReels] = useState<MockReelType[]>([]);
  
  const categoryNames = selectedCategories
    .map(id => ALL_CATEGORIES.find(cat => cat.id === id)?.name)
    .filter(Boolean);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let reels;
      if (selectedCategories.length === 0) {
        // Fallback, though the UI flow should prevent this. Show a subset of all reels.
        reels = SHUFFLED_MOCK_REELS.slice(0, 10);
      } else {
        reels = SHUFFLED_MOCK_REELS.filter(reel => selectedCategories.includes(reel.categoryId));
      }
      setFilteredReels(reels);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [selectedCategories]);

  return (
    <div className="relative h-full w-full bg-black">
        <div className="h-full w-full overflow-y-auto snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
           {isLoading ? (
             <LoadingSpinner />
           ) : filteredReels.length > 0 ? (
             filteredReels.map((reel) => <Reel key={reel.id} reel={reel} />)
           ) : (
             <div className="h-full w-full flex flex-col items-center justify-center text-center p-8 text-white">
               <h3 className="text-2xl font-bold mb-2">No Reels For You</h3>
               <p className="text-gray-300">
                 Try selecting different categories to see more content.
               </p>
               <button
                 onClick={onChangePreferences}
                 className="mt-6 px-6 py-3 bg-gradient-to-br from-[#FF4C61] to-[#f78f9c] text-white rounded-full shadow-lg transition-transform transform active:scale-95"
               >
                 Change Preferences
               </button>
             </div>
           )}
        </div>

        {!isLoading && filteredReels.length > 0 && (
          <>
            <div className="absolute top-6 left-4 flex items-center space-x-2 bg-black/60 backdrop-blur-md p-2 rounded-full text-white text-xs font-semibold shadow-lg animate-bounce-in">
                <span>Filters:</span>
                {categoryNames.slice(0, 2).map(name => (
                    <span key={name} className="bg-[#1DB954]/80 px-2 py-1 rounded-full">{name}</span>
                ))}
                {categoryNames.length > 2 && (
                    <span className="bg-gray-500/80 px-2 py-1 rounded-full">+{categoryNames.length - 2}</span>
                )}
            </div>

            <button
                onClick={onChangePreferences}
                className="absolute bottom-8 right-6 w-16 h-16 flex items-center justify-center bg-gradient-to-br from-[#FF4C61] to-[#f78f9c] text-white rounded-full shadow-xl transition-transform transform active:scale-90"
            >
                <SettingsIcon className="w-8 h-8" />
            </button>
          </>
        )}
    </div>
  );
};