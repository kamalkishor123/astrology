import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Star, MessageCircle, Phone, Video, Send, Clock, IndianRupee } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { supabase, Astrologer } from '@/lib/supabase';

export default function ConsultationDetailScreen() {
  const { id } = useLocalSearchParams();
  const [astrologer, setAstrologer] = useState<Astrologer | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAstrologer();
  }, [id]);

  const fetchAstrologer = async () => {
    try {
      const { data, error } = await supabase
        .from('astrologers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching astrologer:', error);
      } else {
        setAstrologer(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartConsultation = (type: 'chat' | 'call' | 'video') => {
    // In a real app, this would start the consultation
    console.log(`Starting ${type} consultation with ${astrologer?.name}`);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!astrologer) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Astrologer not found</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backText}>Go Back</Text>
          </TouchableOpacity>
        </View>
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
          <Text style={styles.headerTitle}>Consultation</Text>
          <View style={styles.placeholder} />
        </LinearGradient>

        {/* Astrologer Profile */}
        <View style={styles.section}>
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: astrologer.image_url || 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg' }}
                  style={styles.profileImage}
                />
                <View style={[
                  styles.statusDot,
                  astrologer.is_online ? styles.onlineStatus : styles.offlineStatus
                ]} />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{astrologer.name}</Text>
                <Text style={styles.profileSpecialty}>
                  {astrologer.specialties.join(', ')}
                </Text>
                <Text style={styles.profileExperience}>
                  {astrologer.experience_years}+ years experience
                </Text>
                <View style={styles.ratingContainer}>
                  <Star color="#F59E0B" size={16} fill="#F59E0B" />
                  <Text style={styles.rating}>
                    {astrologer.rating} ({astrologer.total_reviews} reviews)
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.languagesContainer}>
              <Text style={styles.languagesLabel}>Languages:</Text>
              <View style={styles.languagesList}>
                {astrologer.languages.map((lang, index) => (
                  <Text key={index} style={styles.languageTag}>
                    {lang}
                  </Text>
                ))}
              </View>
            </View>

            {astrologer.bio && (
              <View style={styles.bioContainer}>
                <Text style={styles.bioLabel}>About:</Text>
                <Text style={styles.bioText}>{astrologer.bio}</Text>
              </View>
            )}

            {astrologer.qualifications && astrologer.qualifications.length > 0 && (
              <View style={styles.qualificationsContainer}>
                <Text style={styles.qualificationsLabel}>Qualifications:</Text>
                {astrologer.qualifications.map((qual, index) => (
                  <Text key={index} style={styles.qualificationItem}>
                    • {qual}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Consultation Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Consultation Type</Text>
          
          <TouchableOpacity
            style={styles.consultationOption}
            onPress={() => handleStartConsultation('chat')}>
            <View style={styles.optionIcon}>
              <MessageCircle color="#F97316" size={24} />
            </View>
            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>Chat Consultation</Text>
              <Text style={styles.optionDescription}>
                Text-based consultation with instant responses
              </Text>
            </View>
            <View style={styles.optionPrice}>
              <IndianRupee color="#10B981" size={16} />
              <Text style={styles.priceText}>{astrologer.rate_per_minute}/min</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.consultationOption}
            onPress={() => handleStartConsultation('call')}>
            <View style={styles.optionIcon}>
              <Phone color="#10B981" size={24} />
            </View>
            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>Voice Call</Text>
              <Text style={styles.optionDescription}>
                Direct voice consultation for detailed guidance
              </Text>
            </View>
            <View style={styles.optionPrice}>
              <IndianRupee color="#10B981" size={16} />
              <Text style={styles.priceText}>{astrologer.rate_per_minute}/min</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.consultationOption}
            onPress={() => handleStartConsultation('video')}>
            <View style={styles.optionIcon}>
              <Video color="#8B5CF6" size={24} />
            </View>
            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>Video Call</Text>
              <Text style={styles.optionDescription}>
                Face-to-face consultation with visual guidance
              </Text>
            </View>
            <View style={styles.optionPrice}>
              <IndianRupee color="#10B981" size={16} />
              <Text style={styles.priceText}>{Math.round(astrologer.rate_per_minute * 1.2)}/min</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Message */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Send a Quick Message</Text>
          <View style={styles.messageContainer}>
            <TextInput
              style={styles.messageInput}
              placeholder="Ask a quick question or share your concern..."
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
            />
            <TouchableOpacity style={styles.sendButton}>
              <Send color="#FFFFFF" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Availability */}
        <View style={styles.section}>
          <View style={styles.availabilityCard}>
            <Clock color="#6B7280" size={24} />
            <View style={styles.availabilityInfo}>
              <Text style={styles.availabilityTitle}>
                {astrologer.is_online ? 'Available Now' : 'Currently Offline'}
              </Text>
              <Text style={styles.availabilityText}>
                {astrologer.is_online 
                  ? 'Ready to help you with your questions'
                  : 'Will be back online soon. You can still send a message.'
                }
              </Text>
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
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  statusDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  onlineStatus: {
    backgroundColor: '#10B981',
  },
  offlineStatus: {
    backgroundColor: '#6B7280',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  profileSpecialty: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  profileExperience: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 4,
  },
  languagesContainer: {
    marginBottom: 16,
  },
  languagesLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 8,
  },
  languagesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  languageTag: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#1E3A8A',
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  bioContainer: {
    marginBottom: 16,
  },
  bioLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 8,
  },
  bioText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  qualificationsContainer: {
    marginBottom: 16,
  },
  qualificationsLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 8,
  },
  qualificationItem: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
  },
  consultationOption: {
    flexDirection: 'row',
    alignItems: 'center',
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
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionInfo: {
    flex: 1,
    marginLeft: 16,
  },
  optionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  optionDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  optionPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#10B981',
    marginLeft: 2,
  },
  messageContainer: {
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
  messageInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    textAlignVertical: 'top',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F97316',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  availabilityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  availabilityInfo: {
    flex: 1,
    marginLeft: 16,
  },
  availabilityTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  availabilityText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#EF4444',
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#F97316',
  },
});