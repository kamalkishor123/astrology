import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Star, MapPin, Clock, Calendar, User, Download, Share2, Heart } from 'lucide-react-native';
import { useState } from 'react';

const planetaryPositions = [
  { planet: 'Sun', sign: 'Leo', degree: '15°32\'', house: '1st', strength: 'Strong' },
  { planet: 'Moon', sign: 'Taurus', degree: '8°45\'', house: '10th', strength: 'Good' },
  { planet: 'Mars', sign: 'Gemini', degree: '22°18\'', house: '11th', strength: 'Average' },
  { planet: 'Mercury', sign: 'Virgo', degree: '3°55\'', house: '2nd', strength: 'Excellent' },
  { planet: 'Jupiter', sign: 'Sagittarius', degree: '12°28\'', house: '5th', strength: 'Very Good' },
  { planet: 'Venus', sign: 'Cancer', degree: '19°42\'', house: '12th', strength: 'Good' },
  { planet: 'Saturn', sign: 'Capricorn', degree: '25°15\'', house: '6th', strength: 'Strong' },
];

const doshas = [
  { name: 'Mangal Dosha', status: 'Present', severity: 'Mild', color: '#F59E0B' },
  { name: 'Sade Sati', status: 'Not Present', severity: 'None', color: '#10B981' },
  { name: 'Kaal Sarp Dosha', status: 'Not Present', severity: 'None', color: '#10B981' },
  { name: 'Pitra Dosha', status: 'Present', severity: 'Moderate', color: '#EF4444' },
];

export default function KundliScreen() {
  const [activeTab, setActiveTab] = useState('chart');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#1E3A8A', '#3B82F6']}
          style={styles.header}>
          <Text style={styles.headerTitle}>Birth Chart (Kundli)</Text>
          <Text style={styles.headerSubtitle}>Complete Vedic Analysis</Text>
        </LinearGradient>

        {/* Birth Details Card */}
        <View style={styles.section}>
          <View style={styles.birthDetailsCard}>
            <View style={styles.birthHeader}>
              <User color="#1E3A8A" size={24} />
              <Text style={styles.birthTitle}>Arjun Kumar Sharma</Text>
            </View>
            <View style={styles.birthInfo}>
              <View style={styles.birthRow}>
                <Calendar color="#6B7280" size={16} />
                <Text style={styles.birthLabel}>Date of Birth:</Text>
                <Text style={styles.birthValue}>15 Aug 1995</Text>
              </View>
              <View style={styles.birthRow}>
                <Clock color="#6B7280" size={16} />
                <Text style={styles.birthLabel}>Time of Birth:</Text>
                <Text style={styles.birthValue}>10:30 AM</Text>
              </View>
              <View style={styles.birthRow}>
                <MapPin color="#6B7280" size={16} />
                <Text style={styles.birthLabel}>Place of Birth:</Text>
                <Text style={styles.birthValue}>Mumbai, Maharashtra</Text>
              </View>
            </View>
          </View>
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
                {/* Simplified 12-house grid */}
                {Array.from({ length: 12 }, (_, i) => (
                  <View key={i} style={styles.houseBox}>
                    <Text style={styles.houseNumber}>{i + 1}</Text>
                    <Text style={styles.housePlanet}>
                      {i === 0 ? 'Su' : i === 9 ? 'Mo' : i === 10 ? 'Ma' : i === 1 ? 'Me' : ''}
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
                      color: planet.strength === 'Excellent' ? '#10B981' : 
                            planet.strength === 'Very Good' || planet.strength === 'Strong' ? '#059669' :
                            planet.strength === 'Good' ? '#F59E0B' : '#6B7280'
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

        {/* Compatibility Check */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Marriage Compatibility</Text>
          <LinearGradient
            colors={['#EF4444', '#F87171']}
            style={styles.compatibilityCard}>
            <Heart color="#FFFFFF" size={32} />
            <View style={styles.compatibilityContent}>
              <Text style={styles.compatibilityTitle}>Kundli Matching</Text>
              <Text style={styles.compatibilitySubtitle}>
                Check compatibility with your partner based on Guna Milan
              </Text>
              <TouchableOpacity style={styles.compatibilityButton}>
                <Text style={styles.compatibilityButtonText}>Check Match</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Detailed Report */}
        <View style={styles.section}>
          <LinearGradient
            colors={['#8B5CF6', '#A78BFA']}
            style={styles.reportCard}>
            <Star color="#FFFFFF" size={32} />
            <View style={styles.reportContent}>
              <Text style={styles.reportTitle}>Detailed Report</Text>
              <Text style={styles.reportSubtitle}>
                Get comprehensive analysis with predictions, remedies, and life guidance
              </Text>
              <TouchableOpacity style={styles.reportButton}>
                <Text style={styles.reportButtonText}>Get Full Report</Text>
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
  birthDetailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  birthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  birthTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginLeft: 12,
  },
  birthInfo: {
    gap: 12,
  },
  birthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  birthLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    minWidth: 100,
  },
  birthValue: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
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
  compatibilityCard: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  compatibilityContent: {
    flex: 1,
    marginLeft: 16,
  },
  compatibilityTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  compatibilitySubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    marginTop: 4,
    opacity: 0.9,
  },
  compatibilityButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  compatibilityButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#EF4444',
  },
  reportCard: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportContent: {
    flex: 1,
    marginLeft: 16,
  },
  reportTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  reportSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    marginTop: 4,
    opacity: 0.9,
  },
  reportButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  reportButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#8B5CF6',
  },
});