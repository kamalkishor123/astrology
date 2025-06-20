import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Heart, User, Calendar, MapPin, Star, Sparkles } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';

const zodiacSigns = [
  { name: 'Aries', symbol: '♈', color: '#FF6B6B' },
  { name: 'Taurus', symbol: '♉', color: '#4ECDC4' },
  { name: 'Gemini', symbol: '♊', color: '#45B7D1' },
  { name: 'Cancer', symbol: '♋', color: '#96CEB4' },
  { name: 'Leo', symbol: '♌', color: '#FFEAA7' },
  { name: 'Virgo', symbol: '♍', color: '#DDA0DD' },
  { name: 'Libra', symbol: '♎', color: '#F8C8DC' },
  { name: 'Scorpio', symbol: '♏', color: '#FF8C94' },
  { name: 'Sagittarius', symbol: '♐', color: '#A8E6CF' },
  { name: 'Capricorn', symbol: '♑', color: '#FFD3A5' },
  { name: 'Aquarius', symbol: '♒', color: '#B4A7D6' },
  { name: 'Pisces', symbol: '♓', color: '#C7CEDB' },
];

const compatibilityAspects = [
  { name: 'Emotional', score: 85, color: '#EF4444' },
  { name: 'Mental', score: 92, color: '#8B5CF6' },
  { name: 'Physical', score: 78, color: '#F59E0B' },
  { name: 'Spiritual', score: 88, color: '#10B981' },
];

export default function LoveMatchScreen() {
  const [yourSign, setYourSign] = useState('');
  const [partnerSign, setPartnerSign] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [partnerName, setPartnerName] = useState('');

  const handleCalculateMatch = () => {
    if (!yourSign || !partnerSign) {
      Alert.alert('Missing Information', 'Please select both zodiac signs to calculate compatibility.');
      return;
    }
    setShowResult(true);
  };

  const getOverallScore = () => {
    const total = compatibilityAspects.reduce((sum, aspect) => sum + aspect.score, 0);
    return Math.round(total / compatibilityAspects.length);
  };

  const getCompatibilityText = (score: number) => {
    if (score >= 90) return { text: 'Excellent Match', color: '#10B981' };
    if (score >= 80) return { text: 'Very Good Match', color: '#059669' };
    if (score >= 70) return { text: 'Good Match', color: '#F59E0B' };
    if (score >= 60) return { text: 'Fair Match', color: '#EF4444' };
    return { text: 'Challenging Match', color: '#DC2626' };
  };

  const renderZodiacSelector = (title: string, selectedSign: string, onSelect: (sign: string) => void) => (
    <View style={styles.selectorContainer}>
      <Text style={styles.selectorTitle}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.zodiacRow}>
          {zodiacSigns.map((sign, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.zodiacOption,
                selectedSign === sign.name && styles.selectedZodiacOption
              ]}
              onPress={() => onSelect(sign.name)}>
              <Text style={[styles.zodiacSymbol, { color: sign.color }]}>
                {sign.symbol}
              </Text>
              <Text style={[
                styles.zodiacOptionName,
                selectedSign === sign.name && styles.selectedZodiacOptionName
              ]}>
                {sign.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  if (showResult) {
    const overallScore = getOverallScore();
    const compatibility = getCompatibilityText(overallScore);
    const yourZodiac = zodiacSigns.find(z => z.name === yourSign);
    const partnerZodiac = zodiacSigns.find(z => z.name === partnerSign);

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <LinearGradient
            colors={['#EF4444', '#F87171']}
            style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setShowResult(false)}>
              <ArrowLeft color="#FFFFFF" size={24} />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Love Compatibility</Text>
              <Text style={styles.headerSubtitle}>Your Match Results</Text>
            </View>
            <View style={styles.placeholder} />
          </LinearGradient>

          {/* Result Header */}
          <View style={styles.section}>
            <View style={styles.resultHeader}>
              <View style={styles.signDisplay}>
                <Text style={[styles.resultSymbol, { color: yourZodiac?.color }]}>
                  {yourZodiac?.symbol}
                </Text>
                <Text style={styles.resultSignName}>{yourSign}</Text>
              </View>
              <View style={styles.heartContainer}>
                <Heart color="#EF4444" size={32} fill="#EF4444" />
              </View>
              <View style={styles.signDisplay}>
                <Text style={[styles.resultSymbol, { color: partnerZodiac?.color }]}>
                  {partnerZodiac?.symbol}
                </Text>
                <Text style={styles.resultSignName}>{partnerSign}</Text>
              </View>
            </View>
          </View>

          {/* Overall Score */}
          <View style={styles.section}>
            <LinearGradient
              colors={[compatibility.color + '20', compatibility.color + '40']}
              style={styles.scoreCard}>
              <Text style={styles.scoreTitle}>Overall Compatibility</Text>
              <Text style={[styles.scorePercentage, { color: compatibility.color }]}>
                {overallScore}%
              </Text>
              <Text style={[styles.scoreText, { color: compatibility.color }]}>
                {compatibility.text}
              </Text>
              <View style={styles.starsContainer}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={20}
                    color="#F59E0B"
                    fill={i < Math.round(overallScore / 20) ? "#F59E0B" : "none"}
                  />
                ))}
              </View>
            </LinearGradient>
          </View>

          {/* Detailed Aspects */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Compatibility Breakdown</Text>
            <View style={styles.aspectsContainer}>
              {compatibilityAspects.map((aspect, index) => (
                <View key={index} style={styles.aspectCard}>
                  <View style={styles.aspectHeader}>
                    <Text style={styles.aspectName}>{aspect.name}</Text>
                    <Text style={[styles.aspectScore, { color: aspect.color }]}>
                      {aspect.score}%
                    </Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${aspect.score}%`, backgroundColor: aspect.color }
                      ]} 
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Insights */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Relationship Insights</Text>
            <View style={styles.insightCard}>
              <Sparkles color="#8B5CF6" size={24} />
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Strengths</Text>
                <Text style={styles.insightText}>
                  Your signs complement each other beautifully in emotional and mental compatibility. 
                  You share similar values and have great potential for deep understanding.
                </Text>
              </View>
            </View>
            
            <View style={styles.insightCard}>
              <Heart color="#EF4444" size={24} />
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Areas to Focus</Text>
                <Text style={styles.insightText}>
                  Work on physical chemistry and shared activities. Communication will be key 
                  to building a stronger connection in all aspects of your relationship.
                </Text>
              </View>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.consultButton}
              onPress={() => router.push('/(tabs)/consultations')}>
              <LinearGradient
                colors={['#8B5CF6', '#A78BFA']}
                style={styles.consultGradient}>
                <Text style={styles.consultButtonText}>Get Detailed Analysis</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.newMatchButton}
              onPress={() => setShowResult(false)}>
              <Text style={styles.newMatchButtonText}>Check Another Match</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#EF4444', '#F87171']}
          style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}>
            <ArrowLeft color="#FFFFFF" size={24} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Love Match</Text>
            <Text style={styles.headerSubtitle}>Find Your Compatibility</Text>
          </View>
          <View style={styles.placeholder} />
        </LinearGradient>

        {/* Introduction */}
        <View style={styles.section}>
          <View style={styles.introCard}>
            <Heart color="#EF4444" size={32} />
            <View style={styles.introContent}>
              <Text style={styles.introTitle}>Discover Your Love Compatibility</Text>
              <Text style={styles.introText}>
                Find out how compatible you are with your partner based on zodiac signs, 
                planetary positions, and astrological insights.
              </Text>
            </View>
          </View>
        </View>

        {/* Partner Name Input */}
        <View style={styles.section}>
          <Text style={styles.inputLabel}>Partner's Name (Optional)</Text>
          <View style={styles.inputContainer}>
            <User color="#6B7280" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Enter your partner's name"
              value={partnerName}
              onChangeText={setPartnerName}
            />
          </View>
        </View>

        {/* Zodiac Selectors */}
        <View style={styles.section}>
          {renderZodiacSelector('Your Zodiac Sign', yourSign, setYourSign)}
        </View>

        <View style={styles.section}>
          {renderZodiacSelector("Partner's Zodiac Sign", partnerSign, setPartnerSign)}
        </View>

        {/* Calculate Button */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.calculateButton}
            onPress={handleCalculateMatch}>
            <LinearGradient
              colors={['#F97316', '#FB923C']}
              style={styles.calculateGradient}>
              <Heart color="#FFFFFF" size={20} />
              <Text style={styles.calculateButtonText}>Calculate Compatibility</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What You'll Get</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Star color="#F59E0B" size={20} fill="#F59E0B" />
              <Text style={styles.featureText}>Overall compatibility percentage</Text>
            </View>
            <View style={styles.featureItem}>
              <Heart color="#EF4444" size={20} />
              <Text style={styles.featureText}>Detailed aspect analysis</Text>
            </View>
            <View style={styles.featureItem}>
              <Sparkles color="#8B5CF6" size={20} />
              <Text style={styles.featureText}>Relationship insights and tips</Text>
            </View>
          </View>
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
    color: '#FFFFFF',
    opacity: 0.9,
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
  introCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  introContent: {
    flex: 1,
    marginLeft: 16,
  },
  introTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 8,
  },
  introText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  selectorContainer: {
    marginBottom: 20,
  },
  selectorTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 12,
  },
  zodiacRow: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  zodiacOption: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedZodiacOption: {
    borderColor: '#F97316',
    backgroundColor: '#FFF7ED',
  },
  zodiacSymbol: {
    fontSize: 24,
    marginBottom: 4,
  },
  zodiacOptionName: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  selectedZodiacOptionName: {
    color: '#F97316',
    fontFamily: 'Inter-SemiBold',
  },
  calculateButton: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  calculateGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  calculateButtonText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  featuresList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 12,
  },
  // Result styles
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  signDisplay: {
    alignItems: 'center',
  },
  resultSymbol: {
    fontSize: 48,
    marginBottom: 8,
  },
  resultSignName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  heartContainer: {
    marginHorizontal: 30,
  },
  scoreCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  scoreTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 12,
  },
  scorePercentage: {
    fontSize: 48,
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  aspectsContainer: {
    gap: 12,
  },
  aspectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  aspectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  aspectName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  aspectScore: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  insightCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  insightContent: {
    flex: 1,
    marginLeft: 12,
  },
  insightTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  insightText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  consultButton: {
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  consultGradient: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  consultButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  newMatchButton: {
    alignSelf: 'center',
  },
  newMatchButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#F97316',
  },
});