import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Filter, Clock, Star } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { supabase, Remedy } from '@/lib/supabase';

const categories = [
  { name: 'All', active: true },
  { name: 'Gemstones', value: 'gemstone' },
  { name: 'Mantras', value: 'mantra' },
  { name: 'Yantras', value: 'yantra' },
  { name: 'Puja', value: 'puja' },
  { name: 'Vastu', value: 'vastu' },
  { name: 'Donation', value: 'donation' },
];

const difficultyColors = {
  easy: '#10B981',
  medium: '#F59E0B',
  hard: '#EF4444',
};

export default function RemediesScreen() {
  const [remedies, setRemedies] = useState<Remedy[]>([]);
  const [filteredRemedies, setFilteredRemedies] = useState<Remedy[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRemedies();
  }, []);

  useEffect(() => {
    filterRemedies();
  }, [remedies, selectedCategory, searchQuery]);

  const fetchRemedies = async () => {
    try {
      const { data, error } = await supabase
        .from('remedies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching remedies:', error);
      } else {
        setRemedies(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterRemedies = () => {
    let filtered = remedies;

    if (selectedCategory !== 'All') {
      const categoryValue = categories.find(cat => cat.name === selectedCategory)?.value;
      filtered = filtered.filter(remedy => remedy.category === categoryValue);
    }

    if (searchQuery) {
      filtered = filtered.filter(remedy =>
        remedy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        remedy.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredRemedies(filtered);
  };

  const renderRemedy = (remedy: Remedy) => (
    <TouchableOpacity
      key={remedy.id}
      style={styles.remedyCard}
      onPress={() => router.push(`/remedies/${remedy.id}`)}>
      <Image
        source={{ uri: remedy.image_url || 'https://images.pexels.com/photos/8978562/pexels-photo-8978562.jpeg' }}
        style={styles.remedyImage}
      />
      <View style={styles.remedyInfo}>
        <View style={styles.remedyHeader}>
          <Text style={styles.remedyTitle} numberOfLines={2}>{remedy.title}</Text>
          {remedy.difficulty_level && (
            <View style={[
              styles.difficultyBadge,
              { backgroundColor: difficultyColors[remedy.difficulty_level] + '20' }
            ]}>
              <Text style={[
                styles.difficultyText,
                { color: difficultyColors[remedy.difficulty_level] }
              ]}>
                {remedy.difficulty_level}
              </Text>
            </View>
          )}
        </View>
        
        <Text style={styles.remedyCategory}>{remedy.category.replace('_', ' ')}</Text>
        <Text style={styles.remedyDescription} numberOfLines={3}>
          {remedy.description}
        </Text>
        
        <View style={styles.remedyFooter}>
          {remedy.duration_days && (
            <View style={styles.durationContainer}>
              <Clock color="#6B7280" size={14} />
              <Text style={styles.durationText}>{remedy.duration_days} days</Text>
            </View>
          )}
          
          {remedy.for_planets && remedy.for_planets.length > 0 && (
            <View style={styles.planetsContainer}>
              <Star color="#F59E0B" size={14} />
              <Text style={styles.planetsText}>
                {remedy.for_planets.slice(0, 2).join(', ')}
                {remedy.for_planets.length > 2 && '...'}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#1E3A8A', '#3B82F6']}
        style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <ArrowLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Remedies & Solutions</Text>
        <View style={styles.placeholder} />
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
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
              <Filter color="#1E3A8A" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoriesContainer}>
              {categories.map((category, index) => (
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

        {/* Featured Remedy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Remedy</Text>
          <LinearGradient
            colors={['#8B5CF6', '#A78BFA']}
            style={styles.featuredCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' }}
              style={styles.featuredImage}
            />
            <View style={styles.featuredInfo}>
              <Text style={styles.featuredTitle}>Ruby Gemstone</Text>
              <Text style={styles.featuredSubtitle}>
                Enhance Sun energy and boost confidence with this powerful gemstone remedy
              </Text>
              <TouchableOpacity style={styles.featuredButton}>
                <Text style={styles.featuredButtonText}>Learn More</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Remedies List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All' ? 'All Remedies' : selectedCategory}
            {filteredRemedies.length > 0 && ` (${filteredRemedies.length})`}
          </Text>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading remedies...</Text>
            </View>
          ) : filteredRemedies.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No remedies found</Text>
            </View>
          ) : (
            <View style={styles.remediesList}>
              {filteredRemedies.map(renderRemedy)}
            </View>
          )}
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
    backgroundColor: '#F97316',
    borderColor: '#F97316',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  activeCategoryText: {
    color: '#FFFFFF',
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
    color: '#8B5CF6',
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
    height: 120,
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
  remedyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});