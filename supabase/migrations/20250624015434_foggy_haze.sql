/*
  # Add Comprehensive Mock Data to All Tables

  1. Mock Data Added
    - Users with realistic birth details
    - Astrologers with specialties and ratings
    - Consultations with various statuses
    - Horoscopes for all zodiac signs
    - Kundli reports with detailed analysis
    - Compatibility reports
    - Remedies for different categories
    - Products across all categories
    - Orders with different statuses
    - Wallet transactions
    - Notifications
    - Articles and blog content
    - User favorites

  2. Data Features
    - Realistic names and details
    - Proper relationships between tables
    - Varied ratings and reviews
    - Different price ranges
    - Multiple categories covered
    - Comprehensive content
*/

-- Insert sample users
INSERT INTO users (id, email, full_name, phone, date_of_birth, time_of_birth, place_of_birth, latitude, longitude, zodiac_sign, avatar_url, wallet_balance, is_premium, premium_expires_at) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'arjun.sharma@gmail.com', 'Arjun Kumar Sharma', '+91 98765 43210', '1995-08-15', '10:30:00', 'Mumbai, Maharashtra', 19.0760, 72.8777, 'Leo', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', 2450.00, false, null),
('550e8400-e29b-41d4-a716-446655440002', 'priya.gupta@gmail.com', 'Priya Gupta', '+91 87654 32109', '1992-03-22', '14:15:00', 'Delhi, Delhi', 28.7041, 77.1025, 'Aries', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', 5200.00, true, '2025-12-31 23:59:59+00'),
('550e8400-e29b-41d4-a716-446655440003', 'vikram.singh@gmail.com', 'Vikram Singh', '+91 76543 21098', '1988-11-10', '08:45:00', 'Jaipur, Rajasthan', 26.9124, 75.7873, 'Scorpio', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg', 1800.00, false, null),
('550e8400-e29b-41d4-a716-446655440004', 'meera.devi@gmail.com', 'Meera Devi', '+91 65432 10987', '1985-06-05', '06:20:00', 'Kolkata, West Bengal', 22.5726, 88.3639, 'Gemini', 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg', 3750.00, true, '2025-06-30 23:59:59+00'),
('550e8400-e29b-41d4-a716-446655440005', 'rahul.verma@gmail.com', 'Rahul Verma', '+91 54321 09876', '1990-12-25', '16:30:00', 'Bangalore, Karnataka', 12.9716, 77.5946, 'Capricorn', 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg', 950.00, false, null);

-- Insert astrologers (some linked to users)
INSERT INTO astrologers (id, user_id, name, image_url, specialties, experience_years, languages, rating, total_reviews, rate_per_minute, is_online, is_verified, bio, qualifications) VALUES
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'Pandit Rajesh Sharma', 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg', ARRAY['Vedic Astrology', 'Kundli Analysis', 'Remedies'], 15, ARRAY['Hindi', 'English'], 4.8, 2340, 35.00, true, true, 'Expert in Vedic astrology with over 15 years of experience. Specializes in career guidance and relationship counseling.', ARRAY['Jyotish Acharya', 'PhD in Astrology']),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440004', 'Dr. Priya Gupta', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', ARRAY['Numerology', 'Tarot Reading', 'Palmistry'], 12, ARRAY['Hindi', 'English', 'Marathi'], 4.9, 1890, 42.00, true, true, 'Renowned numerologist and tarot reader. Helps clients find clarity in love and career matters.', ARRAY['PhD in Numerology', 'Certified Tarot Reader']),
('660e8400-e29b-41d4-a716-446655440003', null, 'Acharya Vikram Singh', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg', ARRAY['Palmistry', 'Face Reading', 'Vastu'], 20, ARRAY['Hindi', 'English', 'Punjabi'], 4.7, 3250, 28.00, false, true, 'Master palmist with expertise in face reading and Vastu Shastra. Provides practical solutions for life challenges.', ARRAY['Hasta Rekha Acharya', 'Vastu Expert']),
('660e8400-e29b-41d4-a716-446655440004', null, 'Guru Meera Devi', 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg', ARRAY['Relationship Counseling', 'Career Guidance', 'Spiritual Healing'], 18, ARRAY['Hindi', 'English', 'Bengali'], 4.6, 2156, 38.00, true, true, 'Spiritual healer and relationship counselor. Combines ancient wisdom with modern psychology for holistic guidance.', ARRAY['Spiritual Counselor', 'Reiki Master']),
('660e8400-e29b-41d4-a716-446655440005', null, 'Pandit Suresh Kumar', 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg', ARRAY['Vedic Astrology', 'Gemstone Consultation', 'Muhurat'], 25, ARRAY['Hindi', 'English', 'Sanskrit'], 4.9, 4500, 45.00, true, true, 'Senior Vedic astrologer with expertise in gemstone recommendations and auspicious timing.', ARRAY['Jyotish Ratna', 'Gemstone Expert']),
('660e8400-e29b-41d4-a716-446655440006', null, 'Astrologer Kavita Sharma', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', ARRAY['Love & Marriage', 'Family Problems', 'Child Astrology'], 10, ARRAY['Hindi', 'English'], 4.5, 1200, 30.00, true, true, 'Specializes in relationship and family matters. Expert in child astrology and naming ceremonies.', ARRAY['Relationship Counselor', 'Child Astrology Expert']);

-- Insert consultations
INSERT INTO consultations (id, user_id, astrologer_id, consultation_type, status, duration_minutes, total_cost, scheduled_at, started_at, ended_at, rating, review_text, chat_transcript) VALUES
('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 'chat', 'completed', 45, 1575.00, '2024-01-15 10:00:00+00', '2024-01-15 10:05:00+00', '2024-01-15 10:50:00+00', 5, 'Excellent guidance on career matters. Very insightful and practical advice.', '[{"sender": "user", "message": "Hello, I need guidance about my career", "timestamp": "2024-01-15T10:05:00Z"}, {"sender": "astrologer", "message": "Hello! I''d be happy to help you with career guidance. Can you share your birth details?", "timestamp": "2024-01-15T10:06:00Z"}]'),
('770e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440002', 'call', 'completed', 30, 1260.00, '2024-01-20 14:00:00+00', '2024-01-20 14:02:00+00', '2024-01-20 14:32:00+00', 4, 'Good session, got clarity on relationship issues.', '[]'),
('770e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440004', 'video', 'active', 15, 570.00, '2024-01-25 16:00:00+00', '2024-01-25 16:00:00+00', null, null, null, '[{"sender": "astrologer", "message": "Welcome to our video consultation. How can I help you today?", "timestamp": "2024-01-25T16:00:00Z"}]'),
('770e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440005', 'chat', 'pending', 0, 0.00, '2024-01-30 18:00:00+00', null, null, null, null, '[]');

-- Insert more horoscopes for different dates and types
INSERT INTO horoscopes (zodiac_sign, horoscope_type, date, content, love_rating, career_rating, health_rating, finance_rating, lucky_numbers, lucky_colors, lucky_time, lucky_direction) VALUES
-- Weekly horoscopes
('Aries', 'weekly', CURRENT_DATE, 'This week brings dynamic energy and new opportunities. Your leadership skills will be in high demand.', 4, 5, 3, 4, ARRAY[7, 14, 21], ARRAY['Red', 'Orange'], '10:00 AM - 12:00 PM', 'East'),
('Taurus', 'weekly', CURRENT_DATE, 'A week of steady progress and material gains. Focus on building long-term security.', 3, 4, 4, 5, ARRAY[2, 6, 15], ARRAY['Green', 'Pink'], '2:00 PM - 4:00 PM', 'North'),
('Gemini', 'weekly', CURRENT_DATE, 'Communication and learning take center stage. New connections will prove beneficial.', 4, 4, 3, 3, ARRAY[3, 12, 18], ARRAY['Yellow', 'Silver'], '11:00 AM - 1:00 PM', 'West'),

-- Monthly horoscopes
('Leo', 'monthly', CURRENT_DATE, 'A powerful month for self-expression and creativity. Your natural charisma attracts success.', 4, 5, 4, 4, ARRAY[1, 8, 19], ARRAY['Gold', 'Orange'], '12:00 PM - 2:00 PM', 'East'),
('Virgo', 'monthly', CURRENT_DATE, 'Attention to detail and methodical planning bring excellent results this month.', 3, 5, 5, 4, ARRAY[6, 13, 20], ARRAY['Navy Blue', 'Grey'], '9:00 AM - 11:00 AM', 'South'),
('Libra', 'monthly', CURRENT_DATE, 'Balance and harmony guide your decisions. Relationships flourish under Venus influence.', 5, 3, 3, 4, ARRAY[7, 11, 22], ARRAY['Pink', 'Light Blue'], '3:00 PM - 5:00 PM', 'West');

-- Insert kundli reports
INSERT INTO kundli_reports (id, user_id, report_type, planetary_positions, house_positions, doshas, dasha_periods, predictions, remedies, is_paid) VALUES
('880e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'detailed', 
'{"Sun": {"sign": "Leo", "degree": "15.32", "house": "1st"}, "Moon": {"sign": "Taurus", "degree": "8.45", "house": "10th"}, "Mars": {"sign": "Gemini", "degree": "22.18", "house": "11th"}}',
'{"1st": ["Sun"], "10th": ["Moon"], "11th": ["Mars"], "2nd": ["Mercury"], "5th": ["Jupiter"], "12th": ["Venus"], "6th": ["Saturn"]}',
'{"Mangal_Dosha": {"present": true, "severity": "mild"}, "Sade_Sati": {"present": false}, "Kaal_Sarp": {"present": false}}',
'{"current_dasha": "Sun", "remaining_years": 3.5, "next_dasha": "Moon"}',
'You are entering a highly favorable period for career advancement. Your leadership qualities will be recognized and rewarded. The next 2 years are excellent for starting new ventures.',
ARRAY['Wear Ruby gemstone', 'Chant Gayatri Mantra daily', 'Donate to charity on Sundays'],
true),
('880e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', 'basic',
'{"Sun": {"sign": "Scorpio", "degree": "10.15", "house": "8th"}, "Moon": {"sign": "Cancer", "degree": "25.30", "house": "4th"}}',
'{"8th": ["Sun"], "4th": ["Moon"], "7th": ["Venus"], "10th": ["Saturn"]}',
'{"Mangal_Dosha": {"present": false}, "Sade_Sati": {"present": true, "phase": "rising"}}',
'{"current_dasha": "Saturn", "remaining_years": 12.2, "next_dasha": "Mercury"}',
'A transformative period ahead with deep spiritual growth. Focus on inner development and healing.',
ARRAY['Perform Shani puja', 'Wear Blue Sapphire', 'Help the underprivileged'],
false);

-- Insert compatibility reports
INSERT INTO compatibility_reports (id, user_id, partner_name, partner_birth_date, partner_birth_time, partner_birth_place, compatibility_score, guna_milan_details, analysis_text, recommendations, is_paid) VALUES
('990e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Anjali Sharma', '1996-02-14', '12:30:00', 'Pune, Maharashtra', 28, 
'{"varna": 4, "vashya": 2, "tara": 3, "yoni": 4, "graha_maitri": 5, "gana": 6, "bhakoot": 0, "nadi": 4}',
'This is a very good match with strong compatibility in most areas. The couple shares similar values and life goals. There is natural harmony and understanding between the partners.',
'Perform a small puja before marriage for removing minor doshas. The wedding should be planned during an auspicious muhurat.',
true),
('990e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440005', 'Kavya Reddy', '1991-09-18', '09:15:00', 'Hyderabad, Telangana', 22,
'{"varna": 3, "vashya": 1, "tara": 2, "yoni": 3, "graha_maitri": 4, "gana": 4, "bhakoot": 2, "nadi": 3}',
'A moderate compatibility with some challenges that can be overcome with understanding and effort. Both partners need to work on communication.',
'Regular prayers and wearing compatible gemstones will help strengthen the relationship.',
false);

-- Insert more remedies
INSERT INTO remedies (title, category, description, instructions, for_doshas, for_planets, difficulty_level, duration_days, image_url) VALUES
('Blue Sapphire (Neelam)', 'gemstone', 'Blue Sapphire enhances Saturn energy, brings discipline, success, and removes obstacles in career.', 'Wear a natural blue sapphire of at least 4 carats in silver ring on Saturday morning after proper purification.', ARRAY['Shani Dosha', 'Career Obstacles'], ARRAY['Saturn'], 'hard', 365, 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg'),
('Mahamrityunjaya Mantra', 'mantra', 'Powerful mantra for health, longevity, and protection from negative energies and diseases.', 'Chant "Om Tryambakam Yajamahe..." 108 times daily, preferably during Brahma Muhurat (4-6 AM).', ARRAY['Health Issues', 'Negative Energy'], ARRAY['Moon', 'Jupiter'], 'medium', 40, 'https://images.pexels.com/photos/8978562/pexels-photo-8978562.jpeg'),
('Kuber Yantra', 'yantra', 'Sacred yantra for attracting wealth, prosperity, and abundance in business and career.', 'Place in cash box or office. Worship with yellow flowers and offer sweets on Thursdays.', ARRAY['Financial Problems'], ARRAY['Jupiter', 'Mercury'], 'easy', 90, 'https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg'),
('Lakshmi Puja', 'puja', 'Weekly puja to Goddess Lakshmi for wealth, prosperity, and family harmony.', 'Perform every Friday evening with lotus flowers, sweets, and ghee lamps. Chant Lakshmi mantras.', ARRAY['Financial Stress', 'Family Discord'], ARRAY['Venus'], 'easy', 21, 'https://images.pexels.com/photos/8978562/pexels-photo-8978562.jpeg'),
('Vastu Correction for Home', 'vastu', 'Simple Vastu corrections to improve energy flow and harmony in your living space.', 'Place a mirror in the north wall, keep the northeast corner clean, and use specific colors in different rooms.', ARRAY['Home Negativity', 'Family Problems'], ARRAY['Mars'], 'medium', 30, 'https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg'),
('Feeding Cows', 'donation', 'Sacred act of feeding cows to remove sins and attract divine blessings.', 'Feed cows with green grass, jaggery, or chapati every Tuesday and Saturday morning.', ARRAY['Pitra Dosha', 'General Negativity'], ARRAY['Moon', 'Jupiter'], 'easy', 40, 'https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg'),
('Pearl (Moti)', 'gemstone', 'Pearl enhances Moon energy, brings emotional stability, and improves relationships.', 'Wear a natural pearl of at least 3 carats in silver ring on Monday morning.', ARRAY['Emotional Instability', 'Relationship Issues'], ARRAY['Moon'], 'medium', 365, 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg'),
('Durga Chalisa', 'mantra', 'Powerful prayer to Goddess Durga for protection, strength, and victory over enemies.', 'Recite Durga Chalisa daily, especially on Tuesdays and Fridays. Light a ghee lamp while chanting.', ARRAY['Enemy Problems', 'Lack of Confidence'], ARRAY['Mars'], 'easy', 40, 'https://images.pexels.com/photos/8978562/pexels-photo-8978562.jpeg');

-- Insert more products
INSERT INTO products (name, category, description, price, discount_price, images, specifications, stock_quantity, rating, total_reviews) VALUES
('Emerald Ring (Panna)', 'gemstone', 'Natural emerald ring for Mercury enhancement. Improves communication, intelligence, and business success.', 18000.00, 16200.00, ARRAY['https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg'], '{"weight": "4 carats", "metal": "Gold", "certification": "Certified"}', 8, 4.7, 89),
('Yellow Sapphire (Pukhraj)', 'gemstone', 'Premium yellow sapphire for Jupiter enhancement. Brings wisdom, wealth, and spiritual growth.', 32000.00, 28800.00, ARRAY['https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg'], '{"weight": "5 carats", "metal": "Gold", "origin": "Ceylon"}', 3, 4.9, 156),
('Ganesh Yantra - Silver', 'yantra', 'Pure silver Ganesh Yantra for removing obstacles and bringing success in new ventures.', 3500.00, null, ARRAY['https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg'], '{"material": "Pure Silver", "size": "4 inches", "weight": "200g"}', 15, 4.6, 234),
('Mahamrityunjaya Yantra', 'yantra', 'Sacred yantra for health, protection, and longevity. Energized with powerful mantras.', 2800.00, 2520.00, ARRAY['https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg'], '{"material": "Copper", "size": "6 inches", "energized": "Yes"}', 12, 4.8, 167),
('14 Mukhi Rudraksha', 'rudraksha', 'Rare 14-mukhi rudraksha for intuition, spiritual insight, and protection from negative energies.', 8500.00, null, ARRAY['https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg'], '{"mukhi": "14", "size": "18mm", "origin": "Nepal", "certification": "Lab Certified"}', 5, 4.9, 78),
('Sphatik Mala (Crystal)', 'rudraksha', 'Pure crystal mala for meditation, mental clarity, and spiritual purification.', 2200.00, 1980.00, ARRAY['https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg'], '{"beads": "108", "size": "8mm", "material": "Natural Crystal"}', 25, 4.5, 345),
('Complete Puja Kit', 'puja_items', 'Comprehensive puja kit with all essential items for daily worship and special occasions.', 4500.00, 4050.00, ARRAY['https://images.pexels.com/photos/8978562/pexels-photo-8978562.jpeg'], '{"items": "25 pieces", "material": "Brass & Copper", "includes": "Thali, Kalash, Diya, etc."}', 18, 4.7, 289),
('Hanuman Idol - Brass', 'puja_items', 'Beautiful brass Hanuman idol for strength, courage, and protection from negative forces.', 1800.00, null, ARRAY['https://images.pexels.com/photos/8978562/pexels-photo-8978562.jpeg'], '{"height": "6 inches", "material": "Pure Brass", "weight": "800g"}', 30, 4.6, 198),
('Lal Kitab Remedies Book', 'books', 'Comprehensive guide to Lal Kitab astrology with practical remedies and solutions.', 650.00, 585.00, ARRAY['https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg'], '{"pages": "320", "language": "Hindi & English", "author": "Pt. Roop Chand Joshi"}', 40, 4.8, 567),
('Numerology Mastery', 'books', 'Complete course on numerology with practical applications and case studies.', 750.00, null, ARRAY['https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg'], '{"pages": "280", "language": "English", "author": "Dr. Sheelaa M Bajaj"}', 35, 4.7, 234),
('Feng Shui Compass', 'accessories', 'Professional Feng Shui compass for Vastu and directional analysis of homes and offices.', 1200.00, 1080.00, ARRAY['https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg'], '{"type": "Professional", "material": "Brass", "accuracy": "High Precision"}', 20, 4.5, 123),
('Meditation Cushion Set', 'accessories', 'Comfortable meditation cushion set for daily practice and spiritual sessions.', 2500.00, null, ARRAY['https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg'], '{"material": "Organic Cotton", "filling": "Buckwheat Hull", "color": "Maroon"}', 15, 4.6, 89);

-- Insert orders
INSERT INTO orders (id, user_id, order_number, status, total_amount, shipping_address, payment_method, payment_status, items, tracking_number, delivered_at) VALUES
('aa0e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'ORD-2024-001', 'delivered', 22500.00, 
'{"name": "Arjun Kumar Sharma", "address": "123 Main Street, Apartment 4B", "city": "Mumbai", "state": "Maharashtra", "pincode": "400001", "phone": "+91 98765 43210"}',
'card', 'completed', 
'[{"product_id": "1", "name": "Natural Ruby Ring", "quantity": 1, "price": 22500.00}]',
'TRK123456789', '2024-01-20 14:30:00+00'),
('aa0e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', 'ORD-2024-002', 'shipped', 5000.00,
'{"name": "Vikram Singh", "address": "456 Park Avenue", "city": "Jaipur", "state": "Rajasthan", "pincode": "302001", "phone": "+91 76543 21098"}',
'wallet', 'completed',
'[{"product_id": "2", "name": "Shree Yantra - Copper", "quantity": 2, "price": 2500.00}]',
'TRK987654321', null),
('aa0e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440005', 'ORD-2024-003', 'pending', 3300.00,
'{"name": "Rahul Verma", "address": "789 Tech Park", "city": "Bangalore", "state": "Karnataka", "pincode": "560001", "phone": "+91 54321 09876"}',
'card', 'pending',
'[{"product_id": "3", "name": "5 Mukhi Rudraksha Mala", "quantity": 1, "price": 1500.00}, {"product_id": "4", "name": "Puja Thali Set", "quantity": 1, "price": 1800.00}]',
null, null);

-- Insert wallet transactions
INSERT INTO wallet_transactions (id, user_id, transaction_type, amount, description, reference_id, reference_type, status) VALUES
('bb0e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'credit', 5000.00, 'Wallet recharge via UPI', null, 'recharge', 'completed'),
('bb0e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'debit', 1575.00, 'Payment for astrology consultation', '770e8400-e29b-41d4-a716-446655440001', 'consultation', 'completed'),
('bb0e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'credit', 3000.00, 'Wallet recharge via Credit Card', null, 'recharge', 'completed'),
('bb0e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440003', 'debit', 1200.00, 'Payment for product order', 'aa0e8400-e29b-41d4-a716-446655440002', 'order', 'completed'),
('bb0e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440005', 'credit', 1500.00, 'Referral bonus', null, 'recharge', 'completed'),
('bb0e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440002', 'credit', 10000.00, 'Premium membership purchase', null, 'recharge', 'completed');

-- Insert notifications
INSERT INTO notifications (id, user_id, title, message, type, is_read, action_url, scheduled_for, sent_at) VALUES
('cc0e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Daily Horoscope Ready', 'Your personalized daily horoscope for Leo is now available. Check what the stars have in store for you today!', 'horoscope', false, '/daily-horoscope', null, '2024-01-25 06:00:00+00'),
('cc0e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Consultation Completed', 'Thank you for your consultation with Pandit Rajesh Sharma. Please rate your experience.', 'consultation', true, '/consultations/770e8400-e29b-41d4-a716-446655440001', null, '2024-01-15 10:55:00+00'),
('cc0e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'Order Shipped', 'Your order ORD-2024-002 has been shipped and is on its way. Track your package for updates.', 'order', false, '/orders/aa0e8400-e29b-41d4-a716-446655440002', null, '2024-01-22 16:30:00+00'),
('cc0e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440005', 'Special Offer', 'Get 20% off on all gemstones this week! Limited time offer for premium members.', 'promotion', false, '/products?category=gemstone', null, '2024-01-24 10:00:00+00'),
('cc0e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', 'Remedy Reminder', 'Time for your daily Ganesha mantra practice. Consistency brings the best results!', 'reminder', true, '/remedies', '2024-01-25 07:00:00+00', '2024-01-25 07:00:00+00'),
('cc0e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440001', 'Astrologer Available', 'Dr. Priya Gupta is now online and available for consultation. Book your session now!', 'consultation', false, '/consultations', null, '2024-01-25 14:00:00+00');

-- Insert articles
INSERT INTO articles (id, title, slug, content, excerpt, category, tags, featured_image, author_name, is_published, published_at, reading_time, views_count) VALUES
('dd0e8400-e29b-41d4-a716-446655440001', 'Understanding Your Birth Chart: A Beginner''s Guide', 'understanding-birth-chart-beginners-guide', 
'A birth chart, also known as a natal chart or horoscope, is a map of the sky at the exact moment and location of your birth. It shows the positions of the planets, sun, and moon in the twelve zodiac signs and houses...

The birth chart is divided into twelve sections called houses, each representing different areas of life such as career, relationships, health, and spirituality. The planets in these houses influence various aspects of your personality and life experiences...

To read your birth chart effectively, start by identifying your sun sign (your core identity), moon sign (your emotional nature), and rising sign (how others perceive you). These three form the foundation of your astrological profile...',
'Learn how to read and understand your birth chart with this comprehensive beginner''s guide to Vedic astrology.',
'vedic', ARRAY['birth chart', 'astrology basics', 'vedic astrology', 'horoscope'], 
'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg', 'Pandit Rajesh Sharma', true, '2024-01-20 10:00:00+00', 8, 1250),

('dd0e8400-e29b-41d4-a716-446655440002', 'The Power of Gemstones in Vedic Astrology', 'power-of-gemstones-vedic-astrology',
'Gemstones have been used in Vedic astrology for thousands of years to enhance planetary energies and bring positive changes in life. Each gemstone is associated with a specific planet and can help strengthen its beneficial effects...

Ruby represents the Sun and enhances leadership qualities, confidence, and success. It should be worn by those with weak Sun in their birth chart or during Sun''s major period (Mahadasha)...

Blue Sapphire is the gemstone of Saturn and is known for its powerful effects. It can bring rapid success and wealth but should only be worn after careful consideration and expert consultation...',
'Discover how gemstones can transform your life according to Vedic astrology principles and planetary influences.',
'vedic', ARRAY['gemstones', 'planetary remedies', 'vedic astrology', 'healing stones'],
'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg', 'Dr. Priya Gupta', true, '2024-01-18 14:30:00+00', 6, 890),

('dd0e8400-e29b-41d4-a716-446655440003', 'Vastu Shastra: Creating Harmony in Your Home', 'vastu-shastra-creating-harmony-home',
'Vastu Shastra is the ancient Indian science of architecture and design that creates harmony between humans and their living spaces. By following Vastu principles, you can enhance positive energy flow in your home...

The entrance of your home should ideally face east or north to welcome positive energy. Avoid having the main door directly aligned with the back door as this creates energy drainage...

The kitchen should be located in the southeast corner of the house, representing the fire element. This placement ensures good health and prosperity for the family...',
'Learn the fundamental principles of Vastu Shastra to create a harmonious and prosperous living environment.',
'vastu', ARRAY['vastu shastra', 'home harmony', 'positive energy', 'architecture'],
'https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg', 'Acharya Vikram Singh', true, '2024-01-15 09:00:00+00', 10, 1456),

('dd0e8400-e29b-41d4-a716-446655440004', 'Numerology: The Science of Numbers', 'numerology-science-of-numbers',
'Numerology is the study of the mystical relationship between numbers and life events. Your birth date and name contain powerful numerical vibrations that influence your personality and destiny...

Your Life Path Number, calculated from your birth date, reveals your life''s purpose and the lessons you''re here to learn. Each number from 1 to 9 has specific characteristics and challenges...

Name numerology analyzes the numerical value of letters in your name to understand your personality traits and potential. Changing the spelling of your name can actually alter your life''s direction...',
'Explore the fascinating world of numerology and discover how numbers influence your life path and personality.',
'numerology', ARRAY['numerology', 'life path number', 'name analysis', 'numbers'],
'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg', 'Dr. Priya Gupta', true, '2024-01-12 16:45:00+00', 7, 723),

('dd0e8400-e29b-41d4-a716-446655440005', 'Palmistry: Reading the Lines of Destiny', 'palmistry-reading-lines-destiny',
'Palmistry, or chiromancy, is the art of reading palms to understand personality traits and predict future events. The lines, mounts, and shapes of your hands reveal fascinating insights about your life...

The heart line represents your emotional nature and relationships. A deep, clear heart line indicates strong emotional connections, while a broken or chained line may suggest relationship challenges...

The head line reveals your intellectual capacity and thinking patterns. A straight head line indicates practical thinking, while a curved line suggests creativity and imagination...',
'Discover the ancient art of palmistry and learn to read the secrets hidden in your hands.',
'palmistry', ARRAY['palmistry', 'hand reading', 'destiny lines', 'fortune telling'],
'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg', 'Acharya Vikram Singh', true, '2024-01-10 11:20:00+00', 9, 1089);

-- Insert user favorites
INSERT INTO user_favorites (id, user_id, item_type, item_id) VALUES
('ee0e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'astrologer', '660e8400-e29b-41d4-a716-446655440001'),
('ee0e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'product', '880e8400-e29b-41d4-a716-446655440001'),
('ee0e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'article', 'dd0e8400-e29b-41d4-a716-446655440001'),
('ee0e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440003', 'astrologer', '660e8400-e29b-41d4-a716-446655440002'),
('ee0e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440003', 'remedy', '880e8400-e29b-41d4-a716-446655440001'),
('ee0e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440005', 'product', '880e8400-e29b-41d4-a716-446655440002'),
('ee0e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440002', 'article', 'dd0e8400-e29b-41d4-a716-446655440003'),
('ee0e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440004', 'astrologer', '660e8400-e29b-41d4-a716-446655440004');

-- Update existing products with proper IDs to match the inserted data
UPDATE products SET id = '880e8400-e29b-41d4-a716-446655440001' WHERE name = 'Natural Ruby Ring';
UPDATE products SET id = '880e8400-e29b-41d4-a716-446655440002' WHERE name = 'Shree Yantra - Copper';
UPDATE products SET id = '880e8400-e29b-41d4-a716-446655440003' WHERE name = '5 Mukhi Rudraksha Mala';
UPDATE products SET id = '880e8400-e29b-41d4-a716-446655440004' WHERE name = 'Puja Thali Set';
UPDATE products SET id = '880e8400-e29b-41d4-a716-446655440005' WHERE name = 'Vedic Astrology Book';

-- Update existing remedies with proper IDs
UPDATE remedies SET id = '880e8400-e29b-41d4-a716-446655440001' WHERE title = 'Ruby Gemstone';
UPDATE remedies SET id = '880e8400-e29b-41d4-a716-446655440002' WHERE title = 'Ganesha Mantra';
UPDATE remedies SET id = '880e8400-e29b-41d4-a716-446655440003' WHERE title = 'Shree Yantra';
UPDATE remedies SET id = '880e8400-e29b-41d4-a716-446655440004' WHERE title = 'Hanuman Chalisa';
UPDATE remedies SET id = '880e8400-e29b-41d4-a716-446655440005' WHERE title = 'Rudraksha Mala';