import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Star, ArrowRight } from 'lucide-react-native';
import { router } from 'expo-router';

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1E3A8A', '#3B82F6']}
        style={styles.background}>
        
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2' }}
              style={styles.heroImage}
            />
            <View style={styles.starOverlay}>
              <Star color="#F59E0B" size={32} fill="#F59E0B" />
            </View>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>Welcome to Vedic Astro</Text>
            <Text style={styles.subtitle}>
              Discover your cosmic destiny with personalized Vedic astrology insights, 
              expert consultations, and ancient wisdom for modern life.
            </Text>
          </View>

          <View style={styles.featuresContainer}>
            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <Star color="#F59E0B" size={20} fill="#F59E0B" />
              </View>
              <Text style={styles.featureText}>Personalized Daily Horoscopes</Text>
            </View>
            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <Star color="#F59E0B" size={20} fill="#F59E0B" />
              </View>
              <Text style={styles.featureText}>Expert Astrologer Consultations</Text>
            </View>
            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <Star color="#F59E0B" size={20} fill="#F59E0B" />
              </View>
              <Text style={styles.featureText}>Detailed Birth Chart Analysis</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => router.push('/onboarding/birth-details')}>
            <LinearGradient
              colors={['#F97316', '#FB923C']}
              style={styles.buttonGradient}>
              <Text style={styles.buttonText}>Get Started</Text>
              <ArrowRight color="#FFFFFF" size={20} />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => router.replace('/(tabs)')}>
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 40,
  },
  heroImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  starOverlay: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#CBD5E1',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    alignItems: 'flex-start',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 8,
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  bottomContainer: {
    paddingBottom: 40,
  },
  getStartedButton: {
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginRight: 8,
  },
  skipButton: {
    alignSelf: 'center',
  },
  skipText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#CBD5E1',
  },
});