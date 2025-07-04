import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, User, Calendar, Clock, MapPin, Star, Download, Share2 } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';

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

const planetaryPositions = [
  { planet: 'Sun', sign: 'Virgo', degree: '12°45\'', house: '3rd', strength: 'Good' },
  { planet: 'Moon', sign: 'Pisces', degree: '28°15\'', house: '9th', strength: 'Excellent' },
  { planet: 'Mars', sign: 'Scorpio', degree: '5°32\'', house: '5th', strength: 'Very Strong' },
  { planet: 'Mercury', sign: 'Libra', degree: '18°48\'', house: '4th', strength: 'Average' },
  { planet: 'Jupiter', sign: 'Cancer', degree: '22°10\'', house: '1st', strength: 'Strong' },
  { planet: 'Venus', sign: 'Leo', degree: '14°25\'', house: '2nd', strength: 'Good' },
  { planet: 'Saturn', sign: 'Aquarius', degree: '9°55\'', house: '8th', strength: 'Strong' },
];

const doshas = [
  { name: 'Mangal Dosha', status: 'Not Present', severity: 'None', color: '#10B981' },
  { name: 'Sade Sati', status: 'Present', severity: 'Mild', color: '#F59E0B' },
  { name: 'Kaal Sarp Dosha', status: 'Not Present', severity: 'None', color: '#10B981' },
  { name: 'Pitra Dosha', status: 'Not Present', severity: 'None', color: '#10B981' },
];

export default function KundliCheckScreen() {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
  });
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState('chart');
  const [selectedZodiac, setSelectedZodiac] = useState(zodiacSigns[5]); // Virgo as example

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateKundli = () => {
    if (!formData.name || !formData.dateOfBirth || !formData.timeOfBirth || !formData.placeOfBirth) {
      Alert.alert('Missing Information', 'Please fill in all birth details to generate the kundli.');
      return;
    }
    setShowResults(true);
  };

  const handleNewKundli = () => {
    setShowResults(false);
    setFormData({
      name: '',
      dateOfBirth: '',
      timeOfBirth: '',
      placeOfBirth: '',
    });
    setActiveTab('chart');
  };

  if (showResults) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <LinearGradient
            colors={['#1E3A8A', '#3B82F6']}
            style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleNewKundli}>
              <ArrowLeft color="#FFFFFF" size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Kundli Analysis</Text>
            <TouchableOpacity style={styles.shareButton}>
              <Share2 color="#FFFFFF" size={24} />
            </TouchableOpacity>
          </LinearGradient>

          {/* Person Details */}
          <View style={styles.section}>
            <View style={styles.personDetailsCard}>
              <View style={styles.personHeader}>
                <User color="#1E3A8A" size={24} />
                <Text style={styles.personTitle}>{formData.name}</Text>
              </View>
              <View style={styles.personInfo}>
                <View style={styles.personRow}>
                  <Calendar color="#6B7280" size={16} />
                  <Text style={styles.personLabel}>Date of Birth:</Text>
                  <Text style={styles.personValue}>{formData.dateOfBirth}</Text>
                </View>
                <View style={styles.personRow}>
                  <Clock color="#6B7280" size={16} />
                  <Text style={styles.personLabel}>Time of Birth:</Text>
                  <Text style={styles.personValue}>{formData.timeOfBirth}</Text>
                </View>
                <View style={styles.personRow}>
                  <MapPin color="#6B7280" size={16} />
                  <Text style={styles.personLabel}>Place of Birth:</Text>
                  <Text style={styles.personValue}>{formData.placeOfBirth}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Zodiac Sign Highlight */}
          <View style={styles.section}>
            <LinearGradient
              colors={[selectedZodiac.color + '40', selectedZodiac.color + '60']}
              style={styles.zodiacCard}>
              <View style={styles.zodiacHeader}>
                <Text style={[styles.zodiacSymbol, { color: selectedZodiac.color }]}>
                  {selectedZodiac.symbol}
                </Text>
                <View style={styles.zodiacInfo}>
                  <Text style={styles.zodiacName}>{selectedZodiac.name}</Text>
                  <Text style={styles.zodiacDate}>{selectedZodiac.date}</Text>
                </View>
                <View style={styles.zodiacRating}>
                  <Star color="#F59E0B" size={16} fill="#F59E0B" />
                  <Star color="#F59E0B" size={16} fill="#F59E0B" />
                  <Star color="#F59E0B" size={16} fill="#F59E0B" />
                  <Star color="#F59E0B" size={16} fill="#F59E0B" />
                  <Star color="#F59E0B" size={16} />
                </View>
              </View>
              <Text style={styles.zodiacPrediction}>
                This person has a practical and analytical nature with strong attention to detail. 
                They are methodical in their approach and have excellent organizational skills.
              </Text>
            </LinearGradient>
          </View>

          {/* Tab Navigation */}
          <View style={styles.section}>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'chart' && styles.activeTab]}
                onPress={() => setActiveTab('chart')}>
                <Text style={[styles.tabText, activeTab === 'chart' && styles.activeTabText]}>
                  Birth Chart
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'planets' && styles.activeTab]}
                onPress={() => setActiveTab('planets')}>
                <Text style={[styles.tabText, activeTab === 'planets' && styles.activeTabText]}>
                  Planets
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'doshas' && styles.activeTab]}
                onPress={() => setActiveTab('doshas')}>
                <Text style={[styles.tabText, activeTab === 'doshas' && styles.activeTabText]}>
                  Doshas
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Chart View */}
          {activeTab === 'chart' && (
            <View style={styles.section}>
              <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Vedic Birth Chart</Text>
                <View style={styles.chartGrid}>
                  {Array.from({ length: 12 }, (_, i) => (
                    <View key={i} style={styles.houseBox}>
                      <Text style={styles.houseNumber}>{i + 1}</Text>
                      <Text style={styles.housePlanet}>
                        {i === 0 ? 'Ju' : i === 2 ? 'Su' : i === 3 ? 'Me' : i === 4 ? 'Ma' : i === 7 ? 'Sa' : i === 8 ? 'Mo' : ''}
                      </Text>
                    </View>
                  ))}
                </View>
                <View style={styles.chartActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Download color="#1E3A8A" size={20} />
                    <Text style={styles.actionText}>Download</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Share2 color="#1E3A8A" size={20} />
                    <Text style={styles.actionText}>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {/* Planets View */}
          {activeTab === 'planets' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Planetary Positions</Text>
              <View style={styles.planetsContainer}>
                {planetaryPositions.map((planet, index) => (
                  <View key={index} style={styles.planetCard}>
                    <View style={styles.planetHeader}>
                      <Text style={styles.planetName}>{planet.planet}</Text>
                      <Text style={[styles.planetStrength, { 
                        color: planet.strength === 'Excellent' || planet.strength === 'Very Strong' ? '#10B981' : 
                              planet.strength === 'Strong' || planet.strength === 'Good' ? '#059669' :
                              planet.strength === 'Average' ? '#F59E0B' : '#6B7280'
                      }]}>
                        {planet.strength}
                      </Text>
                    </View>
                    <View style={styles.planetDetails}>
                      <Text style={styles.planetInfo}>Sign: {planet.sign}</Text>
                      <Text style={styles.planetInfo}>Degree: {planet.degree}</Text>
                      <Text style={styles.planetInfo}>House: {planet.house}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Doshas View */}
          {activeTab === 'doshas' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Dosha Analysis</Text>
              <View style={styles.doshasContainer}>
                {doshas.map((dosha, index) => (
                  <View key={index} style={styles.doshaCard}>
                    <View style={styles.doshaHeader}>
                      <Text style={styles.doshaName}>{dosha.name}</Text>
                      <View style={[styles.doshaStatus, { backgroundColor: dosha.color + '20' }]}>
                        <Text style={[styles.doshaStatusText, { color: dosha.color }]}>
                          {dosha.status}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.doshaSeverity}>Severity: {dosha.severity}</Text>
                    {dosha.status === 'Present' && (
                      <TouchableOpacity style={styles.remedyButton}>
                        <Text style={styles.remedyButtonText}>View Remedies</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.consultButton}
              onPress={() => router.push('/(tabs)/consultations')}>
              <LinearGradient
                colors={['#8B5CF6', '#A78BFA']}
                style={styles.consultGradient}>
                <Text style={styles.consultButtonText}>Get Expert Analysis</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.newKundliButton}
              onPress={handleNewKundli}>
              <Text style={styles.newKundliButtonText}>Check Another Kundli</Text>
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
          colors={['#1E3A8A', '#3B82F6']}
          style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}>
            <ArrowLeft color="#FFFFFF" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Check Kundli</Text>
          <View style={styles.placeholder} />
        </LinearGradient>

        {/* Introduction */}
        <View style={styles.section}>
          <View style={styles.introCard}>
            <Star color="#F59E0B" size={32} />
            <View style={styles.introContent}>
              <Text style={styles.introTitle}>Generate Birth Chart</Text>
              <Text style={styles.introText}>
                Enter birth details to generate a comprehensive Vedic birth chart analysis 
                with planetary positions, doshas, and personalized predictions.
              </Text>
            </View>
          </View>
        </View>

        {/* Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Birth Details</Text>
          
          <View style={styles.inputContainer}>
            <User color="#6B7280" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={formData.name}
              onChangeText={(value) => updateFormData('name', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Calendar color="#6B7280" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Date of Birth (DD/MM/YYYY)"
              value={formData.dateOfBirth}
              onChangeText={(value) => updateFormData('dateOfBirth', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Clock color="#6B7280" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Time of Birth (HH:MM AM/PM)"
              value={formData.timeOfBirth}
              onChangeText={(value) => updateFormData('timeOfBirth', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <MapPin color="#6B7280" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Place of Birth (City, State)"
              value={formData.placeOfBirth}
              onChangeText={(value) => updateFormData('placeOfBirth', value)}
            />
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Why these details?</Text>
            <Text style={styles.infoText}>
              • Exact birth time determines planetary positions{'\n'}
              • Birth place calculates accurate house positions{'\n'}
              • Precision ensures reliable astrological analysis
            </Text>
          </View>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What You'll Get</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Star color="#F59E0B" size={20} fill="#F59E0B" />
              <Text style={styles.featureText}>Complete Vedic birth chart</Text>
            </View>
            <View style={styles.featureItem}>
              <Star color="#F59E0B" size={20} fill="#F59E0B" />
              <Text style={styles.featureText}>Detailed planetary analysis</Text>
            </View>
            <View style={styles.featureItem}>
              <Star color="#F59E0B" size={20} fill="#F59E0B" />
              <Text style={styles.featureText}>Dosha identification & remedies</Text>
            </View>
            <View style={styles.featureItem}>
              <Star color="#F59E0B" size={20} fill="#F59E0B" />
              <Text style={styles.featureText}>Personalized predictions</Text>
            </View>
          </View>
        </View>

        {/* Generate Button */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.generateButton}
            onPress={handleGenerateKundli}>
            <LinearGradient
              colors={['#F97316', '#FB923C']}
              style={styles.generateGradient}>
              <Star color="#FFFFFF" size={20} />
              <Text style={styles.generateButtonText}>Generate Kundli</Text>
            </LinearGradient>
          </TouchableOpacity>
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
    justifyContent: 'space-between',
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
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
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
  infoCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#92400E',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#92400E',
    lineHeight: 20,
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
  generateButton: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  generateGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  generateButtonText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  // Results screen styles
  personDetailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  personHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  personTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginLeft: 12,
  },
  personInfo: {
    gap: 12,
  },
  personRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  personLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    minWidth: 100,
  },
  personValue: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  zodiacCard: {
    borderRadius: 16,
    padding: 20,
  },
  zodiacHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  zodiacSymbol: {
    fontSize: 48,
  },
  zodiacInfo: {
    flex: 1,
    marginLeft: 16,
  },
  zodiacName: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
  },
  zodiacDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  zodiacRating: {
    flexDirection: 'row',
  },
  zodiacPrediction: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    lineHeight: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#F97316',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 20,
  },
  chartGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  houseBox: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  houseNumber: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  housePlanet: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E3A8A',
  },
  chartActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1E3A8A',
  },
  planetsContainer: {
    gap: 12,
  },
  planetCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  planetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  planetName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  planetStrength: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  planetDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  planetInfo: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  doshasContainer: {
    gap: 12,
  },
  doshaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  doshaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  doshaName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  doshaStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  doshaStatusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  doshaSeverity: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 8,
  },
  remedyButton: {
    backgroundColor: '#F97316',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  remedyButtonText: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
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
  newKundliButton: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: '#F97316',
    borderRadius: 12,
  },
  newKundliButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#F97316',
  },
});