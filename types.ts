
import React from 'react';

export enum Screen {
  Preferences,
  Feed,
  Selector,
}

export interface Category {
  id: string;
  name: string;
  icon: React.FC<{ className?: string }>;
}

export interface MockReel {
  id: number;
  categoryId: string;
  categoryName: string;
  imageUrl: string;
  author: string;
}
