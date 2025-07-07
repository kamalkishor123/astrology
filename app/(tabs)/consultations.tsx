import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, Phone, Video, Star, Search, Filter, Clock, IndianRupee } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';

interface Astrologer {
  id: string;
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
}

export default function ConsultationsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [astrologers, setAstrologers] = useState<Astrologer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAstrologers();
  }, []);

  const fetchAstrologers = async () => {
    try {
      setLoading(true);
      
      // Check if Supabase client is available and properly configured
      if (!supabase) {
        console.warn('Supabase environment variables not configured, using fallback data');
        setAstrologers(getFallbackAstrologers());
        return;
      }

      const { data, error } = await supabase
        .from('astrologers')
        .select('*')
        .order('rating', { ascending: false });

      if (error) {
        console.warn('Supabase error, using fallback data:', error.message);
        setAstrologers(getFallbackAstrologers());
      } else if (data && data.length > 0) {
        setAstrologers(data);
      } else {
        console.info('No astrologers found in database, using fallback data');
        setAstrologers(getFallbackAstrologers());
      }
    } catch (error) {
      console.warn('Network error, using fallback data:', error);
      setAstrologers(getFallbackAstrologers());
    } finally {
      setLoading(false);
    }
  };

  const getFallbackAstrologers = (): Astrologer[] => [
    {
      id: '1',
      name: 'Pandit Rajesh Sharma',
      image_url: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      specialties: ['Vedic Astrology', 'Kundli Analysis'],
      experience_years: 15,
      rating: 4.8,
      total_reviews: 2340,
      languages: ['Hindi', 'English'],
      rate_per_minute: 35,
      is_online: true,
      is_verified: true,
      bio: 'Expert in Vedic astrology with over 15 years of experience.'
    },
    {
      id: '2',
      name: 'Dr. Priya Gupta',
      image_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      specialties: ['Numerology', 'Tarot Reading'],
      experience_years: 12,
      rating: 4.9,
      total_reviews: 1890,
      languages: ['Hindi', 'English', 'Marathi'],
      rate_per_minute: 42,
      is_online: true,
      is_verified: true,
      bio: 'Renowned numerologist and tarot reader.'
    },
    {
      id: '3',
      name: 'Acharya Vikram Singh',
      image_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      specialties: ['Palmistry', 'Face Reading'],
      experience_years: 20,
      rating: 4.7,
      total_reviews: 3250,
      languages: ['Hindi', 'English', 'Punjabi'],
      rate_per_minute: 28,
      is_online: false,
      is_verified: true,
      bio: 'Master palmist with expertise in face reading.'
    }
  ];

  const handleStartConsultation = (astrologer: Astrologer, type: 'chat' | 'call' | 'video') => {
    Alert.alert(
      'Start Consultation',
      `Would you like to start a ${type} consultation with ${astrologer.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Start', onPress: () => console.log(`Starting ${type} with ${astrologer.name}`) }
      ]
    );
  };

  const filteredAstrologers = astrologers.filter(astrologer => {
    if (searchQuery) {
      return astrologer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             astrologer.specialties.some(specialty => 
               specialty.toLowerCase().includes(searchQuery.toLowerCase())
             );
    }
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#1E3A8A', '#3B82F6']}
          style={styles.header}>
          <Text style={styles.headerTitle}>Astrologer Consultations</Text>
          <Text style={styles.headerSubtitle}>Connect with Expert Astrologers</Text>
        </LinearGradient>

        {/* Search */}
        <View style={styles.section}>
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Search color="#6B7280" size={20} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search astrologers..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Filter color="#1E3A8A" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Astrologers List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Your Astrologer ({filteredAstrologers.length})</Text>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading astrologers...</Text>
            </View>
          ) : filteredAstrologers.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No astrologers found</Text>
            </View>
          ) : (
            <View style={styles.astrologersList}>
              {filteredAstrologers.map((astrologer) => (
                <View key={astrologer.id} style={styles.astrologerCard}>
                  <View style={styles.astrologerHeader}>
                    <View style={styles.astrologerImageContainer}>
                      <Image
                        source={{ uri: astrologer.image_url }}
                        style={styles.astrologerImage}
                      />
                      <View style={[
                        styles.statusDot,
                        astrologer.is_online ? styles.onlineStatus : styles.busyStatus
                      ]} />
                    </View>
                    <View style={styles.astrologerInfo}>
                      <Text style={styles.astrologerName}>{astrologer.name}</Text>
                      <Text style={styles.astrologerSpecialty}>
                        {astrologer.specialties.join(', ')}
                      </Text>
                      <Text style={styles.astrologerExperience}>
                        {astrologer.experience_years}+ years experience
                      </Text>
                      <View style={styles.ratingContainer}>
                        <Star color="#F59E0B" size={14} fill="#F59E0B" />
                        <Text style={styles.rating}>
                          {astrologer.rating} ({astrologer.total_reviews})
                        </Text>
                      </View>
                      <View style={styles.languagesContainer}>
                        {astrologer.languages.map((lang, index) => (
                          <Text key={index} style={styles.languageTag}>
                            {lang}
                          </Text>
                        ))}
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.astrologerActions}>
                    <View style={styles.rateContainer}>
                      <IndianRupee color="#10B981" size={16} />
                      <Text style={styles.rateText}>{astrologer.rate_per_minute}/min</Text>
                    </View>
                    <View style={styles.actionButtons}>
                      <TouchableOpacity 
                        style={[styles.actionButton, styles.chatButton]}
                        onPress={() => handleStartConsultation(astrologer, 'chat')}>
                        <MessageCircle color="#FFFFFF" size={18} />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[styles.actionButton, styles.callButton]}
                        onPress={() => handleStartConsultation(astrologer, 'call')}>
                        <Phone color="#FFFFFF" size={18} />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[styles.actionButton, styles.videoButton]}
                        onPress={() => handleStartConsultation(astrologer, 'video')}>
                        <Video color="#FFFFFF" size={18} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
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
  astrologersList: {
    gap: 16,
  },
  astrologerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  astrologerHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  astrologerImageContainer: {
    position: 'relative',
  },
  astrologerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  statusDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  onlineStatus: {
    backgroundColor: '#10B981',
  },
  busyStatus: {
    backgroundColor: '#F59E0B',
  },
  astrologerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  astrologerName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  astrologerSpecialty: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  astrologerExperience: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 4,
  },
  languagesContainer: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 6,
  },
  languageTag: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#1E3A8A',
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  astrologerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#10B981',
    marginLeft: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatButton: {
    backgroundColor: '#F97316',
  },
  callButton: {
    backgroundColor: '#10B981',
  },
  videoButton: {
    backgroundColor: '#8B5CF6',
  },
});