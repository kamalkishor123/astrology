import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Filter, Star, Clock, Sparkles, Shield } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';

const remedyCategories = [
  { name: 'All', active: true },
  { name: 'Gemstones', value: 'gemstone' },
  { name: 'Mantras', value: 'mantra' },
  { name: 'Yantras', value: 'yantra' },
  { name: 'Puja', value: 'puja' },
  { name: 'Vastu', value: 'vastu' },
];

const featuredRemedies = [
  {
    id: '1',
    title: 'Ruby Gemstone',
    category: 'Gemstone',
    description: 'Enhance Sun energy and boost confidence with this powerful gemstone remedy',
    image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    difficulty: 'Medium',
    duration: '365 days',
    forPlanets: ['Sun'],
    benefits: ['Confidence', 'Leadership', 'Success']
  },
  {
    id: '2',
    title: 'Ganesha Mantra',
    category: 'Mantra',
    description: 'Remove obstacles and bring success in new ventures with this sacred chant',
    image: 'https://images.pexels.com/photos/8978562/pexels-photo-8978562.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    difficulty: 'Easy',
    duration: '40 days',
    forPlanets: ['Jupiter'],
    benefits: ['Obstacle Removal', 'Success', 'Wisdom']
  },
  {
    id: '3',
    title: 'Shree Yantra',
    category: 'Yantra',
    description: 'Attract wealth, prosperity, and spiritual growth with this sacred geometry',
    image: 'https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    difficulty: 'Medium',
    duration: '90 days',
    forPlanets: ['Venus'],
    benefits: ['Wealth', 'Prosperity', 'Spiritual Growth']
  },
  {
    id: '4',
    title: 'Hanuman Chalisa',
    category: 'Mantra',
    description: 'Provides protection and removes negative energies from your life',
    image: 'https://images.pexels.com/photos/8978562/pexels-photo-8978562.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    difficulty: 'Easy',
    duration: '40 days',
    forPlanets: ['Mars', 'Saturn'],
    benefits: ['Protection', 'Strength', 'Courage']
  }
];

const quickRemedies = [
  {
    title: 'Daily Water Offering',
    description: 'Offer water to Sun every morning',
    duration: '21 days',
    difficulty: 'Easy'
  },
  {
    title: 'Tulsi Plant Care',
    description: 'Water and care for Tulsi plant daily',
    duration: 'Ongoing',
    difficulty: 'Easy'
  },
  {
    title: 'Charity on Saturdays',
    description: 'Donate to the needy every Saturday',
    duration: '7 weeks',
    difficulty: 'Easy'
  }
];

export default function SpiritualRemediesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'hard': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#8B5CF6', '#A78BFA']}
          style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}>
            <ArrowLeft color="#FFFFFF" size={24} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Spiritual Remedies</Text>
            <Text style={styles.headerSubtitle}>Ancient Solutions for Modern Life</Text>
          </View>
          <View style={styles.placeholder} />
        </LinearGradient>

        {/* Search and Filter */}
        <View style={styles.section}>
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Search color="#6B7280" size={20} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search remedies..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Filter color="#8B5CF6" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoriesContainer}>
              {remedyCategories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryChip,
                    selectedCategory === category.name && styles.activeCategoryChip
                  ]}
                  onPress={() => setSelectedCategory(category.name)}>
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === category.name && styles.activeCategoryText
                    ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Quick Daily Remedies */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Daily Remedies</Text>
          <View style={styles.quickRemediesContainer}>
            {quickRemedies.map((remedy, index) => (
              <View key={index} style={styles.quickRemedyCard}>
                <Shield color="#8B5CF6" size={20} />
                <View style={styles.quickRemedyContent}>
                  <Text style={styles.quickRemedyTitle}>{remedy.title}</Text>
                  <Text style={styles.quickRemedyDescription}>{remedy.description}</Text>
                  <View style={styles.quickRemedyMeta}>
                    <Text style={styles.quickRemedyDuration}>{remedy.duration}</Text>
                    <View style={[
                      styles.difficultyBadge,
                      { backgroundColor: getDifficultyColor(remedy.difficulty) + '20' }
                    ]}>
                      <Text style={[
                        styles.difficultyText,
                        { color: getDifficultyColor(remedy.difficulty) }
                      ]}>
                        {remedy.difficulty}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Featured Remedy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Remedy</Text>
          <LinearGradient
            colors={['#F97316', '#FB923C']}
            style={styles.featuredCard}>
            <Image
              source={{ uri: featuredRemedies[0].image }}
              style={styles.featuredImage}
            />
            <View style={styles.featuredInfo}>
              <Text style={styles.featuredTitle}>{featuredRemedies[0].title}</Text>
              <Text style={styles.featuredSubtitle}>{featuredRemedies[0].description}</Text>
              <TouchableOpacity 
                style={styles.featuredButton}
                onPress={() => router.push(`/remedies/${featuredRemedies[0].id}`)}>
                <Text style={styles.featuredButtonText}>Learn More</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* All Remedies */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Remedies</Text>
          <View style={styles.remediesList}>
            {featuredRemedies.map((remedy) => (
              <TouchableOpacity
                key={remedy.id}
                style={styles.remedyCard}
                onPress={() => router.push(`/remedies/${remedy.id}`)}>
                <Image
                  source={{ uri: remedy.image }}
                  style={styles.remedyImage}
                />
                <View style={styles.remedyInfo}>
                  <View style={styles.remedyHeader}>
                    <Text style={styles.remedyTitle} numberOfLines={2}>{remedy.title}</Text>
                    <View style={[
                      styles.difficultyBadge,
                      { backgroundColor: getDifficultyColor(remedy.difficulty) + '20' }
                    ]}>
                      <Text style={[
                        styles.difficultyText,
                        { color: getDifficultyColor(remedy.difficulty) }
                      ]}>
                        {remedy.difficulty}
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={styles.remedyCategory}>{remedy.category}</Text>
                  <Text style={styles.remedyDescription} numberOfLines={3}>
                    {remedy.description}
                  </Text>
                  
                  <View style={styles.remedyMeta}>
                    <View style={styles.durationContainer}>
                      <Clock color="#6B7280" size={14} />
                      <Text style={styles.durationText}>{remedy.duration}</Text>
                    </View>
                    
                    <View style={styles.planetsContainer}>
                      <Star color="#F59E0B" size={14} />
                      <Text style={styles.planetsText}>
                        {remedy.forPlanets.join(', ')}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.benefitsContainer}>
                    {remedy.benefits.slice(0, 3).map((benefit, index) => (
                      <Text key={index} style={styles.benefitTag}>
                        {benefit}
                      </Text>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Personalized Recommendations */}
        <View style={styles.section}>
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.personalizedCard}>
            <Sparkles color="#FFFFFF" size={32} />
            <View style={styles.personalizedContent}>
              <Text style={styles.personalizedTitle}>Get Personalized Remedies</Text>
              <Text style={styles.personalizedSubtitle}>
                Consult with our expert astrologers for remedies tailored to your birth chart
              </Text>
              <TouchableOpacity 
                style={styles.personalizedButton}
                onPress={() => router.push('/(tabs)/consultations')}>
                <Text style={styles.personalizedButtonText}>Consult Now</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Browse All Button */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.browseAllButton}
            onPress={() => router.push('/remedies')}>
            <LinearGradient
              colors={['#8B5CF6', '#A78BFA']}
              style={styles.browseAllGradient}>
              <Text style={styles.browseAllText}>Browse All Remedies</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 20,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeCategoryChip: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  quickRemediesContainer: {
    gap: 12,
  },
  quickRemedyCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickRemedyContent: {
    flex: 1,
    marginLeft: 12,
  },
  quickRemedyTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  quickRemedyDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 8,
  },
  quickRemedyMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quickRemedyDuration: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    textTransform: 'capitalize',
  },
  featuredCard: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  featuredInfo: {
    flex: 1,
    marginLeft: 16,
  },
  featuredTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  featuredSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    marginTop: 4,
    opacity: 0.9,
  },
  featuredButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  featuredButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#F97316',
  },
  remediesList: {
    gap: 16,
  },
  remedyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  remedyImage: {
    width: 100,
    height: 140,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  remedyInfo: {
    flex: 1,
    padding: 16,
  },
  remedyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  remedyTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginRight: 8,
  },
  remedyCategory: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textTransform: 'capitalize',
    marginBottom: 8,
  },
  remedyDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  remedyMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 4,
  },
  planetsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planetsText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 4,
  },
  benefitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  benefitTag: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#8B5CF6',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  personalizedCard: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  personalizedContent: {
    flex: 1,
    marginLeft: 16,
  },
  personalizedTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  personalizedSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    marginTop: 4,
    opacity: 0.9,
  },
  personalizedButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  personalizedButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#10B981',
  },
  browseAllButton: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  browseAllGradient: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  browseAllText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
});