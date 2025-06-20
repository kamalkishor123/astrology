import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Star, Heart, Briefcase, Shield, TrendingUp, Calendar, Clock } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';

const zodiacSigns = [
  { name: 'Aries', symbol: '♈', color: '#FF6B6B', date: 'Mar 21 - Apr 19', image: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
  { name: 'Taurus', symbol: '♉', color: '#4ECDC4', date: 'Apr 20 - May 20', image: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
  { name: 'Gemini', symbol: '♊', color: '#45B7D1', date: 'May 21 - Jun 20', image: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
  { name: 'Cancer', symbol: '♋', color: '#96CEB4', date: 'Jun 21 - Jul 22', image: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
  { name: 'Leo', symbol: '♌', color: '#FFEAA7', date: 'Jul 23 - Aug 22', image: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
  { name: 'Virgo', symbol: '♍', color: '#DDA0DD', date: 'Aug 23 - Sep 22', image: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
  { name: 'Libra', symbol: '♎', color: '#F8C8DC', date: 'Sep 23 - Oct 22', image: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
  { name: 'Scorpio', symbol: '♏', color: '#FF8C94', date: 'Oct 23 - Nov 21', image: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
  { name: 'Sagittarius', symbol: '♐', color: '#A8E6CF', date: 'Nov 22 - Dec 21', image: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
  { name: 'Capricorn', symbol: '♑', color: '#FFD3A5', date: 'Dec 22 - Jan 19', image: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
  { name: 'Aquarius', symbol: '♒', color: '#B4A7D6', date: 'Jan 20 - Feb 18', image: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
  { name: 'Pisces', symbol: '♓', color: '#C7CEDB', date: 'Feb 19 - Mar 20', image: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
];

const horoscopeCategories = [
  { icon: Heart, title: 'Love', color: '#EF4444', rating: 4 },
  { icon: Briefcase, title: 'Career', color: '#10B981', rating: 5 },
  { icon: Shield, title: 'Health', color: '#8B5CF6', rating: 3 },
  { icon: TrendingUp, title: 'Finance', color: '#F59E0B', rating: 4 },
];

export default function DailyHoroscopeScreen() {
  const [selectedSign, setSelectedSign] = useState(zodiacSigns[4]); // Leo as default
  
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        color="#F59E0B"
        fill={i < rating ? "#F59E0B" : "none"}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#1E3A8A', '#3B82F6']}
          style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}>
            <ArrowLeft color="#FFFFFF" size={24} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Daily Horoscope</Text>
            <Text style={styles.headerSubtitle}>{today}</Text>
          </View>
          <View style={styles.placeholder} />
        </LinearGradient>

        {/* Zodiac Sign Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Your Zodiac Sign</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.zodiacContainer}>
              {zodiacSigns.map((sign, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.zodiacCard,
                    selectedSign.name === sign.name && styles.selectedZodiacCard
                  ]}
                  onPress={() => setSelectedSign(sign)}>
                  <Text style={[styles.zodiacSymbol, { color: sign.color }]}>
                    {sign.symbol}
                  </Text>
                  <Text style={styles.zodiacName}>{sign.name}</Text>
                  <Text style={styles.zodiacDate}>{sign.date}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Selected Sign Horoscope */}
        <View style={styles.section}>
          <LinearGradient
            colors={[selectedSign.color + '20', selectedSign.color + '40']}
            style={styles.selectedSignCard}>
            <View style={styles.selectedSignHeader}>
              <Image
                source={{ uri: selectedSign.image }}
                style={styles.selectedSignImage}
              />
              <View style={styles.selectedSignInfo}>
                <Text style={styles.selectedSignName}>{selectedSign.name}</Text>
                <Text style={styles.selectedSignDate}>{selectedSign.date}</Text>
                <View style={styles.overallRating}>
                  <Text style={styles.ratingLabel}>Overall Rating:</Text>
                  <View style={styles.starsContainer}>
                    {renderStars(4)}
                  </View>
                </View>
              </View>
            </View>
            <Text style={styles.selectedSignPrediction}>
              Today is a powerful day for creativity and self-expression. The cosmic energies 
              align to bring opportunities for growth and positive transformation. Trust your 
              intuition and embrace new possibilities that come your way.
            </Text>
          </LinearGradient>
        </View>

        {/* Category Predictions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detailed Predictions</Text>
          <View style={styles.categoriesGrid}>
            {horoscopeCategories.map((category, index) => (
              <View key={index} style={styles.categoryCard}>
                <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                  <category.icon color={category.color} size={24} />
                </View>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <View style={styles.categoryRating}>
                  {renderStars(category.rating)}
                </View>
                <Text style={styles.categoryDescription}>
                  {category.title === 'Love' && 'Romance is in the air. Express your feelings openly.'}
                  {category.title === 'Career' && 'Excellent day for professional growth and recognition.'}
                  {category.title === 'Health' && 'Take care of your physical and mental well-being.'}
                  {category.title === 'Finance' && 'Good opportunities for financial investments.'}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Lucky Elements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lucky Elements</Text>
          <View style={styles.luckyCard}>
            <View style={styles.luckyRow}>
              <Text style={styles.luckyLabel}>Lucky Number:</Text>
              <Text style={styles.luckyValue}>7, 14, 21</Text>
            </View>
            <View style={styles.luckyRow}>
              <Text style={styles.luckyLabel}>Lucky Color:</Text>
              <Text style={styles.luckyValue}>Golden Yellow</Text>
            </View>
            <View style={styles.luckyRow}>
              <Text style={styles.luckyLabel}>Lucky Time:</Text>
              <Text style={styles.luckyValue}>2:00 PM - 4:00 PM</Text>
            </View>
            <View style={styles.luckyRow}>
              <Text style={styles.luckyLabel}>Lucky Direction:</Text>
              <Text style={styles.luckyValue}>East</Text>
            </View>
          </View>
        </View>

        {/* Weekly Preview */}
        <View style={styles.section}>
          <LinearGradient
            colors={['#8B5CF6', '#A78BFA']}
            style={styles.weeklyCard}>
            <Calendar color="#FFFFFF" size={32} />
            <View style={styles.weeklyContent}>
              <Text style={styles.weeklyTitle}>Weekly Overview</Text>
              <Text style={styles.weeklySubtitle}>
                Get detailed predictions for the entire week ahead
              </Text>
              <TouchableOpacity 
                style={styles.weeklyButton}
                onPress={() => router.push('/(tabs)/horoscope')}>
                <Text style={styles.weeklyButtonText}>View Weekly</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#CBD5E1',
    marginTop: 4,
  },
  placeholder: {
    width: 40,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  zodiacContainer: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  zodiacCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedZodiacCard: {
    borderColor: '#F97316',
    backgroundColor: '#FFF7ED',
  },
  zodiacSymbol: {
    fontSize: 32,
    marginBottom: 8,
  },
  zodiacName: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#374151',
    marginBottom: 4,
  },
  zodiacDate: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  selectedSignCard: {
    borderRadius: 16,
    padding: 20,
  },
  selectedSignHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  selectedSignImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  selectedSignInfo: {
    flex: 1,
    marginLeft: 16,
  },
  selectedSignName: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
  },
  selectedSignDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 8,
  },
  overallRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginRight: 8,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  selectedSignPrediction: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    lineHeight: 24,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 8,
  },
  categoryRating: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  categoryDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  luckyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  luckyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  luckyLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  luckyValue: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  weeklyCard: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  weeklyContent: {
    flex: 1,
    marginLeft: 16,
  },
  weeklyTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  weeklySubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    marginTop: 4,
    opacity: 0.9,
  },
  weeklyButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  weeklyButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#8B5CF6',
  },
});