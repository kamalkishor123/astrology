import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Clock, Star, Calendar, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { supabase, Remedy } from '@/lib/supabase';

const difficultyColors = {
  easy: '#10B981',
  medium: '#F59E0B',
  hard: '#EF4444',
};

export default function RemedyDetailScreen() {
  const { id } = useLocalSearchParams();
  const [remedy, setRemedy] = useState<Remedy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRemedy();
  }, [id]);

  const fetchRemedy = async () => {
    try {
      const { data, error } = await supabase
        .from('remedies')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching remedy:', error);
      } else {
        setRemedy(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading remedy...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!remedy) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Remedy not found</Text>
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
          <Text style={styles.headerTitle}>Remedy Details</Text>
          <View style={styles.placeholder} />
        </LinearGradient>

        {/* Hero Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: remedy.image_url || 'https://images.pexels.com/photos/8978562/pexels-photo-8978562.jpeg' }}
            style={styles.heroImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.imageOverlay}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{remedy.category}</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title and Basic Info */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>{remedy.title}</Text>
            
            <View style={styles.metaInfo}>
              {remedy.difficulty_level && (
                <View style={[
                  styles.difficultyBadge,
                  { backgroundColor: difficultyColors[remedy.difficulty_level] + '20' }
                ]}>
                  <Text style={[
                    styles.difficultyText,
                    { color: difficultyColors[remedy.difficulty_level] }
                  ]}>
                    {remedy.difficulty_level} Level
                  </Text>
                </View>
              )}
              
              {remedy.duration_days && (
                <View style={styles.durationContainer}>
                  <Clock color="#6B7280" size={16} />
                  <Text style={styles.durationText}>{remedy.duration_days} days</Text>
                </View>
              )}
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About This Remedy</Text>
            <Text style={styles.description}>{remedy.description}</Text>
          </View>

          {/* For Planets */}
          {remedy.for_planets && remedy.for_planets.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Beneficial For Planets</Text>
              <View style={styles.planetsContainer}>
                {remedy.for_planets.map((planet, index) => (
                  <View key={index} style={styles.planetTag}>
                    <Star color="#F59E0B" size={16} />
                    <Text style={styles.planetText}>{planet}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* For Doshas */}
          {remedy.for_doshas && remedy.for_doshas.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Helps With Doshas</Text>
              <View style={styles.doshasContainer}>
                {remedy.for_doshas.map((dosha, index) => (
                  <View key={index} style={styles.doshaTag}>
                    <AlertCircle color="#EF4444" size={16} />
                    <Text style={styles.doshaText}>{dosha}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Instructions */}
          {remedy.instructions && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>How to Perform</Text>
              <View style={styles.instructionsCard}>
                <Text style={styles.instructions}>{remedy.instructions}</Text>
              </View>
            </View>
          )}

          {/* Benefits */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Expected Benefits</Text>
            <View style={styles.benefitsList}>
              <View style={styles.benefitItem}>
                <CheckCircle color="#10B981" size={20} />
                <Text style={styles.benefitText}>Spiritual purification and protection</Text>
              </View>
              <View style={styles.benefitItem}>
                <CheckCircle color="#10B981" size={20} />
                <Text style={styles.benefitText}>Enhanced positive energy flow</Text>
              </View>
              <View style={styles.benefitItem}>
                <CheckCircle color="#10B981" size={20} />
                <Text style={styles.benefitText}>Reduced negative planetary influences</Text>
              </View>
              <View style={styles.benefitItem}>
                <CheckCircle color="#10B981" size={20} />
                <Text style={styles.benefitText}>Improved overall well-being</Text>
              </View>
            </View>
          </View>

          {/* Important Notes */}
          <View style={styles.notesCard}>
            <AlertCircle color="#F59E0B" size={24} />
            <View style={styles.notesContent}>
              <Text style={styles.notesTitle}>Important Notes</Text>
              <Text style={styles.notesText}>
                • Perform this remedy with faith and devotion{'\n'}
                • Maintain cleanliness and purity during the practice{'\n'}
                • Consult with an astrologer for personalized guidance{'\n'}
                • Results may vary based on individual circumstances
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.consultButton}>
          <Text style={styles.consultButtonText}>Consult Astrologer</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.startButton}>
          <LinearGradient
            colors={['#F97316', '#FB923C']}
            style={styles.startButtonGradient}>
            <Calendar color="#FFFFFF" size={20} />
            <Text style={styles.startButtonText}>Start Remedy</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
  imageContainer: {
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  categoryBadge: {
    backgroundColor: 'rgba(249, 115, 22, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  content: {
    padding: 20,
  },
  titleSection: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    textTransform: 'capitalize',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 6,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 24,
  },
  planetsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  planetTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  planetText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#92400E',
    marginLeft: 6,
  },
  doshasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  doshaTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  doshaText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#991B1B',
    marginLeft: 6,
  },
  instructionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructions: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    lineHeight: 24,
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 12,
    flex: 1,
  },
  notesCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
    marginBottom: 20,
  },
  notesContent: {
    flex: 1,
    marginLeft: 12,
  },
  notesTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#92400E',
    marginBottom: 8,
  },
  notesText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#92400E',
    lineHeight: 20,
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  consultButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#F97316',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  consultButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#F97316',
  },
  startButton: {
    flex: 1,
    borderRadius: 12,
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  startButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
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