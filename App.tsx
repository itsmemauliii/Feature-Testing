import React, { useState, useCallback, useEffect } from 'react';
import { Screen } from './types';
import { Screen1Preferences } from './components/Screen1Preferences';
import { Screen2Feed } from './components/Screen2Feed';
import { Screen3Selector } from './components/Screen3Selector';
import { ALL_CATEGORIES } from './constants';

const IphoneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[780px] w-[380px] shadow-2xl">
    <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
    <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
    <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
    <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
    <div className="rounded-[2rem] overflow-hidden w-full h-full bg-[#F5F5F5] dark:bg-[#121212] relative transition-colors duration-300">
      {children}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-300 dark:bg-gray-700 rounded-full transition-colors duration-300"></div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Preferences);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [animationClass, setAnimationClass] = useState('animate-fade-in');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const toggleCategory = useCallback((id: string) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(catId => catId !== id) : [...prev, id]
    );
  }, []);

  const navigate = useCallback((newScreen: Screen) => {
    if (currentScreen === Screen.Preferences && newScreen === Screen.Feed) {
      setAnimationClass('animate-slide-up-fade-in');
    } else {
      setAnimationClass('animate-fade-in');
    }
    setCurrentScreen(newScreen);
  }, [currentScreen]);

  const handleStartWatching = useCallback(() => {
    if (selectedCategories.length > 0) {
      navigate(Screen.Feed);
    }
  }, [selectedCategories.length, navigate]);

  const handleChangePreferences = useCallback(() => {
    navigate(Screen.Selector);
  }, [navigate]);

  const handleDone = useCallback(() => {
    navigate(Screen.Feed);
  }, [navigate]);

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.Preferences:
        return (
          <Screen1Preferences
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            onStart={handleStartWatching}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        );
      case Screen.Feed:
        return (
          <Screen2Feed
            selectedCategories={selectedCategories}
            onChangePreferences={handleChangePreferences}
          />
        );
      case Screen.Selector:
        return (
          <Screen3Selector
            allCategories={ALL_CATEGORIES}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            onDone={handleDone}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        );
      default:
        return null;
    }
  };

  return (
      <IphoneFrame>
        <div key={currentScreen} className={animationClass}>
          {renderScreen()}
        </div>
      </IphoneFrame>
  );
};

export default App;