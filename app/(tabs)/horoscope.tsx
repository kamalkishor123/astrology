import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Star, Calendar, TrendingUp, Heart, Briefcase, Shield, Clock } from 'lucide-react-native';

const zodiacSigns = [
  { name: 'Aries', symbol: '♈', color: '#FF6B6B', date: 'Mar 21 - Apr 19' },
  { name: 'Taurus', symbol: '♉', color: '#4ECDC4', date: 'Apr 20 - May 20' },
  { name: 'Gemini', symbol: '♊', color: '#45B7D1', date: 'May 21 - Jun 20' },
  { name: 'Cancer', symbol: '♋', color: '#96CEB4', date: 'Jun 21 - Jul 22' },
  { name: 'Leo', symbol: '♌', color: '#FFEAA7', date: 'Jul 23 - Aug 22' },
  { name: 'Virgo', symbol: '♍', color: '#DDA0DD', date: 'Aug 23 - Sep 22' },
  { name: 'Libra', symbol: '♎', color: '#F8C8DC', date: 'Sep 23 - Oct 22' },
  { name: 'Scorpio', symbol: '♏', color: '#FF8C94', date: 'Oct 23 - Nov 21' },
  { name: 'Sagittarius', symbol: '♐', color: '#A8E6CF', date: 'Nov 22 - Dec 21' },
  { name: 'Capricorn', symbol: '♑', color: '#FFD3A5', date: 'Dec 22 - Jan 19' },
  { name: 'Aquarius', symbol: '♒', color: '#B4A7D6', date: 'Jan 20 - Feb 18' },
  { name: 'Pisces', symbol: '♓', color: '#C7CEDB', date: 'Feb 19 - Mar 20' },
];

const horoscopeCategories = [
  { icon: Heart, title: 'Love', color: '#EF4444' },
  { icon: Briefcase, title: 'Career', color: '#10B981' },
  { icon: Shield, title: 'Health', color: '#8B5CF6' },
  { icon: TrendingUp, title: 'Finance', color: '#F59E0B' },
];

export default function HoroscopeScreen() {
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#1E3A8A', '#3B82F6']}
          style={styles.header}>
          <Text style={styles.headerTitle}>Daily Horoscope</Text>
          <Text style={styles.headerSubtitle}>{today}</Text>
        </LinearGradient>

        {/* Selected Sign Highlight */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Sign Today</Text>
          <LinearGradient
            colors={['#F97316', '#FB923C']}
            style={styles.selectedSignCard}>
            <View style={styles.selectedSignHeader}>
              <Text style={styles.selectedSignSymbol}>♌</Text>
              <View style={styles.selectedSignInfo}>
                <Text style={styles.selectedSignName}>Leo</Text>
                <Text style={styles.selectedSignDate}>Jul 23 - Aug 22</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Star color="#FFFFFF" size={16} fill="#FFFFFF" />
                <Star color="#FFFFFF" size={16} fill="#FFFFFF" />
                <Star color="#FFFFFF" size={16} fill="#FFFFFF" />
                <Star color="#FFFFFF" size={16} fill="#FFFFFF" />
                <Star color="#FFFFFF" size={16} />
              </View>
            </View>
            <Text style={styles.selectedSignPrediction}>
              Today is a powerful day for creativity and self-expression. The Sun's energy 
              illuminates your natural leadership qualities. Focus on personal projects 
              that showcase your talents.
            </Text>
          </LinearGradient>
        </View>

        {/* Category Predictions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detailed Predictions</Text>
          <View style={styles.categoriesGrid}>
            {horoscopeCategories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryCard}>
                <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                  <category.icon color={category.color} size={24} />
                </View>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryRating}>★★★★☆</Text>
              </TouchableOpacity>
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

        {/* All Zodiac Signs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Zodiac Signs</Text>
          <View style={styles.zodiacGrid}>
            {zodiacSigns.map((sign, index) => (
              <TouchableOpacity key={index} style={styles.zodiacCard}>
                <Text style={[styles.zodiacSymbol, { color: sign.color }]}>
                  {sign.symbol}
                </Text>
                <Text style={styles.zodiacName}>{sign.name}</Text>
                <Text style={styles.zodiacDate}>{sign.date}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Planetary Positions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Planetary Positions</Text>
          <View style={styles.planetaryCard}>
            <View style={styles.planetRow}>
              <Text style={styles.planetName}>Sun</Text>
              <Text style={styles.planetPosition}>Leo 15°</Text>
              <Text style={styles.planetEffect}>Strong</Text>
            </View>
            <View style={styles.planetRow}>
              <Text style={styles.planetName}>Moon</Text>
              <Text style={styles.planetPosition}>Taurus 8°</Text>
              <Text style={styles.planetEffect}>Favorable</Text>
            </View>
            <View style={styles.planetRow}>
              <Text style={styles.planetName}>Mars</Text>
              <Text style={styles.planetPosition}>Gemini 22°</Text>
              <Text style={styles.planetEffect}>Neutral</Text>
            </View>
            <View style={styles.planetRow}>
              <Text style={styles.planetName}>Mercury</Text>
              <Text style={styles.planetPosition}>Virgo 3°</Text>
              <Text style={styles.planetEffect}>Excellent</Text>
            </View>
          </View>
        </View>

        {/* Weekly Overview */}
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
              <TouchableOpacity style={styles.weeklyButton}>
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
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#CBD5E1',
    marginTop: 4,
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
  selectedSignCard: {
    borderRadius: 16,
    padding: 20,
  },
  selectedSignHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  selectedSignSymbol: {
    fontSize: 48,
    color: '#FFFFFF',
  },
  selectedSignInfo: {
    flex: 1,
    marginLeft: 16,
  },
  selectedSignName: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  selectedSignDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    opacity: 0.8,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  selectedSignPrediction: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    lineHeight: 24,
    opacity: 0.95,
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
    marginBottom: 4,
  },
  categoryRating: {
    fontSize: 14,
    color: '#F59E0B',
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
  zodiacGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  zodiacCard: {
    width: '30%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  zodiacSymbol: {
    fontSize: 24,
    marginBottom: 4,
  },
  zodiacName: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  zodiacDate: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 2,
  },
  planetaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  planetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  planetName: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    flex: 1,
  },
  planetPosition: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    flex: 1,
    textAlign: 'center',
  },
  planetEffect: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
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