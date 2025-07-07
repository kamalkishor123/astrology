import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Only create Supabase client if environment variables are properly configured
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database types
export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  date_of_birth: string;
  time_of_birth: string;
  place_of_birth: string;
  latitude?: number;
  longitude?: number;
  zodiac_sign?: string;
  avatar_url?: string;
  wallet_balance: number;
  is_premium: boolean;
  premium_expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Astrologer {
  id: string;
  user_id?: string;
  name: string;
  image_url?: string;
  specialties: string[];
  experience_years: number;
  languages: string[];
  rating: number;
  total_reviews: number;
  rate_per_minute: number;
  is_online: boolean;
  is_verified: boolean;
  bio?: string;
  qualifications?: string[];
  created_at: string;
  updated_at: string;
}

export interface Consultation {
  id: string;
  user_id: string;
  astrologer_id: string;
  consultation_type: 'chat' | 'call' | 'video';
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  duration_minutes: number;
  total_cost: number;
  scheduled_at?: string;
  started_at?: string;
  ended_at?: string;
  rating?: number;
  review_text?: string;
  chat_transcript: any[];
  created_at: string;
  updated_at: string;
}

export interface Horoscope {
  id: string;
  zodiac_sign: string;
  horoscope_type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  date: string;
  content: string;
  love_rating?: number;
  career_rating?: number;
  health_rating?: number;
  finance_rating?: number;
  lucky_numbers?: number[];
  lucky_colors?: string[];
  lucky_time?: string;
  lucky_direction?: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'gemstone' | 'yantra' | 'rudraksha' | 'puja_items' | 'books' | 'accessories';
  description?: string;
  price: number;
  discount_price?: number;
  images: string[];
  specifications: any;
  is_available: boolean;
  stock_quantity: number;
  rating: number;
  total_reviews: number;
  created_at: string;
  updated_at: string;
}

export interface Remedy {
  id: string;
  title: string;
  category: 'gemstone' | 'mantra' | 'yantra' | 'puja' | 'vastu' | 'donation';
  description: string;
  instructions?: string;
  for_doshas?: string[];
  for_planets?: string[];
  difficulty_level?: 'easy' | 'medium' | 'hard';
  duration_days?: number;
  image_url?: string;
  created_at: string;
}