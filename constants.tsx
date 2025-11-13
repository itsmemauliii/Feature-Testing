
import React from 'react';
import { Category, MockReel } from './types';
import {
  PhonkIcon,
  RecipeIcon,
  SadIcon,
  ComedyIcon,
  DIYIcon,
  GamingIcon,
  TechIcon,
  TravelIcon,
  FashionIcon,
  SportsIcon,
  MusicIcon,
  ArtIcon,
} from './components/icons';

export const ALL_CATEGORIES: Category[] = [
  { id: 'phonk', name: 'Phonk', icon: PhonkIcon },
  { id: 'recipes', name: 'Recipes', icon: RecipeIcon },
  { id: 'sad', name: 'Sad', icon: SadIcon },
  { id: 'comedy', name: 'Comedy', icon: ComedyIcon },
  { id: 'diy', name: 'DIY', icon: DIYIcon },
  { id: 'gaming', name: 'Gaming', icon: GamingIcon },
  { id: 'tech', name: 'Tech', icon: TechIcon },
  { id: 'travel', name: 'Travel', icon: TravelIcon },
  { id: 'fashion', name: 'Fashion', icon: FashionIcon },
  { id: 'sports', name: 'Sports', icon: SportsIcon },
  { id: 'music', name: 'Music', icon: MusicIcon },
  { id: 'art', name: 'Art', icon: ArtIcon },
];

export const FEATURED_CATEGORIES: Category[] = ALL_CATEGORIES.slice(0, 7);

const authors = ['@creative_cat', '@dance_dynamo', '@foodie_fusion', '@wanderlust_will', '@tech_titan', '@diy_devotee', '@funny_fails'];

const generatedReels: MockReel[] = [];
ALL_CATEGORIES.forEach(category => {
  for (let i = 1; i <= 5; i++) { // 5 reels per category
    const reelId = generatedReels.length;
    generatedReels.push({
      id: reelId,
      categoryId: category.id,
      categoryName: category.name,
      imageUrl: `https://picsum.photos/400/700?random=${reelId}`,
      author: authors[reelId % authors.length],
    });
  }
});

export const MOCK_REELS: MockReel[] = generatedReels;

// Shuffle the reels to make the feed look more natural if multiple categories are selected.
export const SHUFFLED_MOCK_REELS = [...MOCK_REELS].sort(() => Math.random() - 0.5);
