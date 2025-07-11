import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, Sparkles, Star, Heart, Briefcase, Shield } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const quickServices = [
  { 
    icon: Star, 
    title: 'Daily Horoscope', 
    subtitle: 'Your daily guidance', 
    color: '#F59E0B',
  },
  { 
    icon: Heart, 
    title: 'Love Match', 
    subtitle: 'Find compatibility', 
    color: '#EF4444',
  },
  { 
    icon: Briefcase, 
    title: 'Career Guide', 
    subtitle: 'Professional insights', 
    color: '#10B981',
  },
  { 
    icon: Shield, 
    title: 'Remedies', 
    subtitle: 'Spiritual solutions', 
    color: '#8B5CF6',
  },
];

export default function HomeScreen() {
  const currentDate = new Date().toLocaleDateString('en-IN', {
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
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Namaste 🙏</Text>
              <Text style={styles.userName}>Welcome back</Text>
              <Text style={styles.date}>{currentDate}</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Bell color="#FFFFFF" size={24} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Today's Highlight */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Cosmic Energy</Text>
          <LinearGradient
            colors={['#F97316', '#FB923C']}
            style={styles.highlightCard}>
            <View style={styles.highlightContent}>
              <Sparkles color="#FFFFFF" size={32} />
              <View style={styles.highlightText}>
                <Text style={styles.highlightTitle}>Auspicious Day</Text>
                <Text style={styles.highlightSubtitle}>
                  Venus in favorable position brings opportunities in love and finances
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Quick Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Services</Text>
          <View style={styles.servicesGrid}>
            {quickServices.map((service, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.serviceCard}>
                <View style={[styles.serviceIcon, { backgroundColor: service.color + '20' }]}>
                  <service.icon color={service.color} size={24} />
                </View>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceSubtitle}>{service.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Astrologer Spotlight */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Astrologer</Text>
          <TouchableOpacity 
            style={styles.astrologerCard}
            onPress={() => router.push('/(tabs)/consultations')}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2' }}
              style={styles.astrologerImage}
            />
            <View style={styles.astrologerInfo}>
              <Text style={styles.astrologerName}>Pandit Rajesh Sharma</Text>
              <Text style={styles.astrologerSpecialty}>Vedic Astrology Expert</Text>
              <Text style={styles.astrologerExperience}>15+ years experience</Text>
              <View style={styles.ratingContainer}>
                <Star color="#F59E0B" size={16} fill="#F59E0B" />
                <Text style={styles.rating}>4.8 (2.3k reviews)</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.consultButton}
              onPress={() => router.push('/(tabs)/consultations')}>
              <Text style={styles.consultButtonText}>Consult</Text>
            </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#E2E8F0',
    fontFamily: 'Inter-Regular',
  },
  userName: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
    marginTop: 4,
  },
  date: {
    fontSize: 14,
    color: '#CBD5E1',
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
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
  highlightCard: {
    borderRadius: 16,
    padding: 20,
  },
  highlightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlightText: {
    marginLeft: 16,
    flex: 1,
  },
  highlightTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  highlightSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    marginTop: 4,
    opacity: 0.9,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
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
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    textAlign: 'center',
  },
  serviceSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 2,
  },
  astrologerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  astrologerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
  consultButton: {
    backgroundColor: '#F97316',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  consultButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
});