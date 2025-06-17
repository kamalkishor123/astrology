/*
  # Complete Astrology App Database Schema

  1. New Tables
    - `users` - User profiles with birth details
    - `astrologers` - Verified astrologer profiles
    - `consultations` - Consultation sessions and history
    - `horoscopes` - Daily/weekly/monthly horoscope content
    - `kundli_reports` - Generated birth charts and analysis
    - `compatibility_reports` - Relationship compatibility analysis
    - `remedies` - Astrological remedies and solutions
    - `products` - E-commerce products (gemstones, yantras, etc.)
    - `orders` - Product orders and transactions
    - `wallet_transactions` - User wallet and payment history
    - `notifications` - Push notifications and alerts
    - `articles` - Educational content and blogs
    - `user_favorites` - Saved content and preferences

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure sensitive data access

  3. Features
    - Complete user profile management
    - Astrologer consultation system
    - E-commerce integration
    - Wallet and payment tracking
    - Content management system
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table with detailed birth information
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text,
  date_of_birth date NOT NULL,
  time_of_birth time NOT NULL,
  place_of_birth text NOT NULL,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  zodiac_sign text,
  avatar_url text,
  wallet_balance decimal(10, 2) DEFAULT 0.00,
  is_premium boolean DEFAULT false,
  premium_expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Astrologers table
CREATE TABLE IF NOT EXISTS astrologers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  image_url text,
  specialties text[] DEFAULT '{}',
  experience_years integer DEFAULT 0,
  languages text[] DEFAULT '{}',
  rating decimal(3, 2) DEFAULT 0.00,
  total_reviews integer DEFAULT 0,
  rate_per_minute decimal(6, 2) NOT NULL,
  is_online boolean DEFAULT false,
  is_verified boolean DEFAULT false,
  bio text,
  qualifications text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Consultations table
CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  astrologer_id uuid REFERENCES astrologers(id) ON DELETE CASCADE,
  consultation_type text NOT NULL CHECK (consultation_type IN ('chat', 'call', 'video')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
  duration_minutes integer DEFAULT 0,
  total_cost decimal(8, 2) DEFAULT 0.00,
  scheduled_at timestamptz,
  started_at timestamptz,
  ended_at timestamptz,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  review_text text,
  chat_transcript jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Horoscopes table
CREATE TABLE IF NOT EXISTS horoscopes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  zodiac_sign text NOT NULL,
  horoscope_type text NOT NULL CHECK (horoscope_type IN ('daily', 'weekly', 'monthly', 'yearly')),
  date date NOT NULL,
  content text NOT NULL,
  love_rating integer CHECK (love_rating >= 1 AND love_rating <= 5),
  career_rating integer CHECK (career_rating >= 1 AND career_rating <= 5),
  health_rating integer CHECK (health_rating >= 1 AND health_rating <= 5),
  finance_rating integer CHECK (finance_rating >= 1 AND finance_rating <= 5),
  lucky_numbers integer[],
  lucky_colors text[],
  lucky_time text,
  lucky_direction text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(zodiac_sign, horoscope_type, date)
);

-- Kundli reports table
CREATE TABLE IF NOT EXISTS kundli_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  report_type text NOT NULL CHECK (report_type IN ('basic', 'detailed', 'premium')),
  planetary_positions jsonb NOT NULL DEFAULT '{}',
  house_positions jsonb NOT NULL DEFAULT '{}',
  doshas jsonb NOT NULL DEFAULT '{}',
  dasha_periods jsonb NOT NULL DEFAULT '{}',
  predictions text,
  remedies text[],
  generated_at timestamptz DEFAULT now(),
  is_paid boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Compatibility reports table
CREATE TABLE IF NOT EXISTS compatibility_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  partner_name text NOT NULL,
  partner_birth_date date NOT NULL,
  partner_birth_time time NOT NULL,
  partner_birth_place text NOT NULL,
  compatibility_score integer CHECK (compatibility_score >= 0 AND compatibility_score <= 36),
  guna_milan_details jsonb DEFAULT '{}',
  analysis_text text,
  recommendations text,
  is_paid boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Remedies table
CREATE TABLE IF NOT EXISTS remedies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL CHECK (category IN ('gemstone', 'mantra', 'yantra', 'puja', 'vastu', 'donation')),
  description text NOT NULL,
  instructions text,
  for_doshas text[],
  for_planets text[],
  difficulty_level text CHECK (difficulty_level IN ('easy', 'medium', 'hard')),
  duration_days integer,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Products table for e-commerce
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('gemstone', 'yantra', 'rudraksha', 'puja_items', 'books', 'accessories')),
  description text,
  price decimal(8, 2) NOT NULL,
  discount_price decimal(8, 2),
  images text[] DEFAULT '{}',
  specifications jsonb DEFAULT '{}',
  is_available boolean DEFAULT true,
  stock_quantity integer DEFAULT 0,
  rating decimal(3, 2) DEFAULT 0.00,
  total_reviews integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  order_number text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  total_amount decimal(10, 2) NOT NULL,
  shipping_address jsonb NOT NULL,
  payment_method text,
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  items jsonb NOT NULL DEFAULT '[]',
  tracking_number text,
  delivered_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Wallet transactions table
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  transaction_type text NOT NULL CHECK (transaction_type IN ('credit', 'debit')),
  amount decimal(10, 2) NOT NULL,
  description text NOT NULL,
  reference_id uuid,
  reference_type text CHECK (reference_type IN ('consultation', 'order', 'refund', 'recharge')),
  status text DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at timestamptz DEFAULT now()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL CHECK (type IN ('horoscope', 'consultation', 'order', 'promotion', 'reminder')),
  is_read boolean DEFAULT false,
  action_url text,
  scheduled_for timestamptz,
  sent_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  category text NOT NULL CHECK (category IN ('vedic', 'western', 'numerology', 'tarot', 'palmistry', 'vastu', 'remedies')),
  tags text[] DEFAULT '{}',
  featured_image text,
  author_name text,
  is_published boolean DEFAULT false,
  published_at timestamptz,
  reading_time integer,
  views_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User favorites table
CREATE TABLE IF NOT EXISTS user_favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  item_type text NOT NULL CHECK (item_type IN ('article', 'astrologer', 'product', 'remedy')),
  item_id uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, item_type, item_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE astrologers ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE horoscopes ENABLE ROW LEVEL SECURITY;
ALTER TABLE kundli_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE compatibility_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE remedies ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- RLS Policies for astrologers
CREATE POLICY "Anyone can read astrologer profiles" ON astrologers
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Astrologers can update own profile" ON astrologers
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for consultations
CREATE POLICY "Users can read own consultations" ON consultations
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR astrologer_id IN (
    SELECT id FROM astrologers WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can create consultations" ON consultations
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own consultations" ON consultations
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid() OR astrologer_id IN (
    SELECT id FROM astrologers WHERE user_id = auth.uid()
  ));

-- RLS Policies for horoscopes
CREATE POLICY "Anyone can read horoscopes" ON horoscopes
  FOR SELECT TO authenticated
  USING (true);

-- RLS Policies for kundli_reports
CREATE POLICY "Users can read own kundli reports" ON kundli_reports
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create kundli reports" ON kundli_reports
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- RLS Policies for compatibility_reports
CREATE POLICY "Users can read own compatibility reports" ON compatibility_reports
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create compatibility reports" ON compatibility_reports
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- RLS Policies for remedies
CREATE POLICY "Anyone can read remedies" ON remedies
  FOR SELECT TO authenticated
  USING (true);

-- RLS Policies for products
CREATE POLICY "Anyone can read products" ON products
  FOR SELECT TO authenticated
  USING (true);

-- RLS Policies for orders
CREATE POLICY "Users can read own orders" ON orders
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create orders" ON orders
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own orders" ON orders
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for wallet_transactions
CREATE POLICY "Users can read own wallet transactions" ON wallet_transactions
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create wallet transactions" ON wallet_transactions
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- RLS Policies for notifications
CREATE POLICY "Users can read own notifications" ON notifications
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for articles
CREATE POLICY "Anyone can read published articles" ON articles
  FOR SELECT TO authenticated
  USING (is_published = true);

-- RLS Policies for user_favorites
CREATE POLICY "Users can manage own favorites" ON user_favorites
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_astrologers_user_id ON astrologers(user_id);
CREATE INDEX IF NOT EXISTS idx_astrologers_is_online ON astrologers(is_online);
CREATE INDEX IF NOT EXISTS idx_consultations_user_id ON consultations(user_id);
CREATE INDEX IF NOT EXISTS idx_consultations_astrologer_id ON consultations(astrologer_id);
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);
CREATE INDEX IF NOT EXISTS idx_horoscopes_zodiac_date ON horoscopes(zodiac_sign, date);
CREATE INDEX IF NOT EXISTS idx_kundli_reports_user_id ON kundli_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_user_id ON wallet_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(is_published, published_at);
CREATE INDEX IF NOT EXISTS idx_user_favorites_user_item ON user_favorites(user_id, item_type);

-- Insert sample data for horoscopes
INSERT INTO horoscopes (zodiac_sign, horoscope_type, date, content, love_rating, career_rating, health_rating, finance_rating, lucky_numbers, lucky_colors, lucky_time, lucky_direction) VALUES
('Aries', 'daily', CURRENT_DATE, 'Today brings new opportunities for growth and self-expression. Your natural leadership qualities will shine through in professional settings.', 4, 5, 3, 4, ARRAY[7, 14, 21], ARRAY['Red', 'Orange'], '10:00 AM - 12:00 PM', 'East'),
('Taurus', 'daily', CURRENT_DATE, 'A day of stability and practical achievements. Focus on building solid foundations for your future endeavors.', 3, 4, 4, 5, ARRAY[2, 6, 15], ARRAY['Green', 'Pink'], '2:00 PM - 4:00 PM', 'North'),
('Gemini', 'daily', CURRENT_DATE, 'Communication and networking will be key to your success today. New connections may lead to exciting opportunities.', 4, 4, 3, 3, ARRAY[3, 12, 18], ARRAY['Yellow', 'Silver'], '11:00 AM - 1:00 PM', 'West'),
('Cancer', 'daily', CURRENT_DATE, 'Emotional intelligence and intuition guide you toward the right decisions. Trust your instincts in personal matters.', 5, 3, 4, 3, ARRAY[4, 9, 16], ARRAY['White', 'Blue'], '6:00 PM - 8:00 PM', 'South'),
('Leo', 'daily', CURRENT_DATE, 'Today is a powerful day for creativity and self-expression. The Sun''s energy illuminates your natural leadership qualities.', 4, 5, 4, 4, ARRAY[1, 8, 19], ARRAY['Gold', 'Orange'], '12:00 PM - 2:00 PM', 'East'),
('Virgo', 'daily', CURRENT_DATE, 'Attention to detail and methodical approach will bring success in your endeavors. Perfect day for organizing and planning.', 3, 5, 5, 4, ARRAY[6, 13, 20], ARRAY['Navy Blue', 'Grey'], '9:00 AM - 11:00 AM', 'South'),
('Libra', 'daily', CURRENT_DATE, 'Balance and harmony are your strengths today. Diplomatic solutions will resolve any conflicts that arise.', 5, 3, 3, 4, ARRAY[7, 11, 22], ARRAY['Pink', 'Light Blue'], '3:00 PM - 5:00 PM', 'West'),
('Scorpio', 'daily', CURRENT_DATE, 'Intense focus and determination drive you toward your goals. Trust your instincts in making important decisions.', 4, 4, 3, 5, ARRAY[5, 10, 17], ARRAY['Maroon', 'Black'], '8:00 PM - 10:00 PM', 'North'),
('Sagittarius', 'daily', CURRENT_DATE, 'Adventure and exploration call to you today. New experiences will broaden your perspective and bring joy.', 3, 4, 4, 3, ARRAY[9, 14, 23], ARRAY['Purple', 'Turquoise'], '1:00 PM - 3:00 PM', 'East'),
('Capricorn', 'daily', CURRENT_DATE, 'Discipline and hard work pay off today. Your practical approach to challenges will yield excellent results.', 3, 5, 4, 5, ARRAY[8, 15, 24], ARRAY['Brown', 'Dark Green'], '7:00 AM - 9:00 AM', 'South'),
('Aquarius', 'daily', CURRENT_DATE, 'Innovation and unique thinking set you apart today. Your humanitarian nature attracts like-minded individuals.', 4, 4, 3, 3, ARRAY[11, 16, 25], ARRAY['Electric Blue', 'Silver'], '4:00 PM - 6:00 PM', 'West'),
('Pisces', 'daily', CURRENT_DATE, 'Intuition and creativity flow freely today. Artistic pursuits and spiritual practices bring deep satisfaction.', 5, 3, 4, 3, ARRAY[12, 18, 26], ARRAY['Sea Green', 'Lavender'], '5:00 PM - 7:00 PM', 'North');

-- Insert sample remedies
INSERT INTO remedies (title, category, description, instructions, for_doshas, for_planets, difficulty_level, duration_days, image_url) VALUES
('Ruby Gemstone', 'gemstone', 'Ruby enhances the power of Sun and brings confidence, leadership qualities, and success.', 'Wear a natural ruby of at least 3 carats in gold ring on Sunday morning after proper purification and mantra chanting.', ARRAY['Surya Dosha'], ARRAY['Sun'], 'medium', 365, 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg'),
('Ganesha Mantra', 'mantra', 'Chanting Ganesha mantra removes obstacles and brings success in new ventures.', 'Chant "Om Gam Ganapataye Namaha" 108 times daily in the morning after bath.', ARRAY['Vighna Dosha'], ARRAY['Jupiter'], 'easy', 40, 'https://images.pexels.com/photos/8978562/pexels-photo-8978562.jpeg'),
('Shree Yantra', 'yantra', 'Shree Yantra attracts wealth, prosperity, and spiritual growth.', 'Place the yantra in your puja room or office. Worship daily with flowers and incense.', ARRAY['Lakshmi Dosha'], ARRAY['Venus'], 'medium', 90, 'https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg'),
('Hanuman Chalisa', 'mantra', 'Reciting Hanuman Chalisa provides protection and removes negative energies.', 'Recite Hanuman Chalisa daily, preferably on Tuesday and Saturday mornings.', ARRAY['Mangal Dosha', 'Shani Dosha'], ARRAY['Mars', 'Saturn'], 'easy', 40, 'https://images.pexels.com/photos/8978562/pexels-photo-8978562.jpeg'),
('Rudraksha Mala', 'gemstone', 'Rudraksha beads provide spiritual protection and enhance meditation.', 'Wear a 5-mukhi rudraksha mala around your neck after proper purification.', ARRAY['Graha Dosha'], ARRAY['Jupiter'], 'easy', 365, 'https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg');

-- Insert sample products
INSERT INTO products (name, category, description, price, images, specifications, stock_quantity, rating) VALUES
('Natural Ruby Ring', 'gemstone', 'Certified natural ruby set in 18k gold ring. Enhances Sun energy and brings leadership qualities.', 25000.00, ARRAY['https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg'], '{"weight": "3.5 carats", "metal": "18k Gold", "certification": "GIA Certified"}', 5, 4.8),
('Shree Yantra - Copper', 'yantra', 'Handcrafted copper Shree Yantra for wealth and prosperity. Energized by Vedic mantras.', 2500.00, ARRAY['https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg'], '{"material": "Pure Copper", "size": "6 inches", "energized": "Yes"}', 20, 4.6),
('5 Mukhi Rudraksha Mala', 'rudraksha', 'Authentic 5-mukhi rudraksha mala with 108 beads. Perfect for meditation and spiritual practices.', 1500.00, ARRAY['https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg'], '{"beads": "108", "size": "8mm", "origin": "Nepal"}', 15, 4.7),
('Puja Thali Set', 'puja_items', 'Complete brass puja thali set with all essential items for daily worship.', 3500.00, ARRAY['https://images.pexels.com/photos/8978562/pexels-photo-8978562.jpeg'], '{"material": "Brass", "items": "12 pieces", "weight": "2.5 kg"}', 10, 4.5),
('Vedic Astrology Book', 'books', 'Comprehensive guide to Vedic astrology by renowned astrologer. Perfect for beginners and advanced learners.', 800.00, ARRAY['https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg'], '{"pages": "450", "language": "English", "author": "Pandit Rajesh Sharma"}', 50, 4.9);

-- Insert sample astrologers
INSERT INTO astrologers (name, image_url, specialties, experience_years, languages, rating, total_reviews, rate_per_minute, is_online, is_verified, bio, qualifications) VALUES
('Pandit Rajesh Sharma', 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg', ARRAY['Vedic Astrology', 'Kundli Analysis', 'Remedies'], 15, ARRAY['Hindi', 'English'], 4.8, 2340, 35.00, true, true, 'Expert in Vedic astrology with over 15 years of experience. Specializes in career guidance and relationship counseling.', ARRAY['Jyotish Acharya', 'PhD in Astrology']),
('Dr. Priya Gupta', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', ARRAY['Numerology', 'Tarot Reading', 'Palmistry'], 12, ARRAY['Hindi', 'English', 'Marathi'], 4.9, 1890, 42.00, true, true, 'Renowned numerologist and tarot reader. Helps clients find clarity in love and career matters.', ARRAY['PhD in Numerology', 'Certified Tarot Reader']),
('Acharya Vikram Singh', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg', ARRAY['Palmistry', 'Face Reading', 'Vastu'], 20, ARRAY['Hindi', 'English', 'Punjabi'], 4.7, 3250, 28.00, false, true, 'Master palmist with expertise in face reading and Vastu Shastra. Provides practical solutions for life challenges.', ARRAY['Hasta Rekha Acharya', 'Vastu Expert']),
('Guru Meera Devi', 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg', ARRAY['Relationship Counseling', 'Career Guidance', 'Spiritual Healing'], 18, ARRAY['Hindi', 'English', 'Bengali'], 4.6, 2156, 38.00, true, true, 'Spiritual healer and relationship counselor. Combines ancient wisdom with modern psychology for holistic guidance.', ARRAY['Spiritual Counselor', 'Reiki Master']);