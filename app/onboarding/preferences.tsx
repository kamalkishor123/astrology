import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Star, Heart, Briefcase, Shield, TrendingUp, ArrowRight, ArrowLeft, Bell } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';

const interests = [
  { id: 'love', icon: Heart, title: 'Love & Relationships', color: '#EF4444' },
  { id: 'career', icon: Briefcase, title: 'Career & Finance', color: '#10B981' },
  { id: 'health', icon: Shield, title: 'Health & Wellness', color: '#8B5CF6' },
  { id: 'spiritual', icon: Star, title: 'Spiritual Growth', color: '#F59E0B' },
  { id: 'success', icon: TrendingUp, title: 'Success & Goals', color: '#3B82F6' },
];

const notificationTypes = [
  { id: 'daily', title: 'Daily Horoscope', description: 'Get your daily cosmic guidance' },
  { id: 'weekly', title: 'Weekly Predictions', description: 'Detailed weekly insights' },
  { id: 'remedies', title: 'Remedy Reminders', description: 'Timely spiritual practice alerts' },
  { id: 'consultations', title: 'Consultation Updates', description: 'Astrologer availability notifications' },
];

export default function PreferencesScreen() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(['daily']);

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const toggleNotification = (id: string) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleComplete = () => {
    // Save preferences and navigate to main app
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1E3A8A', '#3B82F6']}
        style={styles.background}>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}>
              <ArrowLeft color="#FFFFFF" size={24} />
            </TouchableOpacity>
            <Text style={styles.title}>Preferences</Text>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '100%' }]} />
            </View>
            <Text style={styles.progressText}>Step 3 of 3</Text>
          </View>

          <Text style={styles.subtitle}>
            Customize your experience to receive personalized insights that matter most to you.
          </Text>

          {/* Interests Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What interests you most?</Text>
            <Text style={styles.sectionSubtitle}>Select all that apply</Text>
            
            <View style={styles.interestsGrid}>
              {interests.map((interest) => (
                <TouchableOpacity
                  key={interest.id}
                  style={[
                    styles.interestCard,
                    selectedInterests.includes(interest.id) && styles.selectedInterestCard
                  ]}
                  onPress={() => toggleInterest(interest.id)}>
                  <View style={[styles.interestIcon, { backgroundColor: interest.color + '20' }]}>
                    <interest.icon 
                      color={selectedInterests.includes(interest.id) ? '#FFFFFF' : interest.color} 
                      size={24} 
                    />
                  </View>
                  <Text style={[
                    styles.interestTitle,
                    selectedInterests.includes(interest.id) && styles.selectedInterestTitle
                  ]}>
                    {interest.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Notifications Section */}
          <View style={styles.section}>
            <View style={styles.notificationHeader}>
              <Bell color="#FFFFFF" size={24} />
              <Text style={styles.sectionTitle}>Notification Preferences</Text>
            </View>
            <Text style={styles.sectionSubtitle}>Choose what you'd like to be notified about</Text>
            
            <View style={styles.notificationsList}>
              {notificationTypes.map((notification) => (
                <TouchableOpacity
                  key={notification.id}
                  style={[
                    styles.notificationCard,
                    selectedNotifications.includes(notification.id) && styles.selectedNotificationCard
                  ]}
                  onPress={() => toggleNotification(notification.id)}>
                  <View style={styles.notificationContent}>
                    <Text style={[
                      styles.notificationTitle,
                      selectedNotifications.includes(notification.id) && styles.selectedNotificationTitle
                    ]}>
                      {notification.title}
                    </Text>
                    <Text style={[
                      styles.notificationDescription,
                      selectedNotifications.includes(notification.id) && styles.selectedNotificationDescription
                    ]}>
                      {notification.description}
                    </Text>
                  </View>
                  <View style={[
                    styles.checkbox,
                    selectedNotifications.includes(notification.id) && styles.checkedBox
                  ]}>
                    {selectedNotifications.includes(notification.id) && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleComplete}>
            <LinearGradient
              colors={['#F97316', '#FB923C']}
              style={styles.buttonGradient}>
              <Text style={styles.buttonText}>Complete Setup</Text>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    marginBottom: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 40,
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F97316',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#CBD5E1',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#CBD5E1',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#CBD5E1',
    marginBottom: 20,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  interestCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedInterestCard: {
    backgroundColor: 'rgba(249, 115, 22, 0.3)',
    borderColor: '#F97316',
  },
  interestIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  interestTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#CBD5E1',
    textAlign: 'center',
  },
  selectedInterestTitle: {
    color: '#FFFFFF',
  },
  notificationsList: {
    gap: 12,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedNotificationCard: {
    backgroundColor: 'rgba(249, 115, 22, 0.3)',
    borderColor: '#F97316',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#CBD5E1',
    marginBottom: 4,
  },
  selectedNotificationTitle: {
    color: '#FFFFFF',
  },
  notificationDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#94A3B8',
  },
  selectedNotificationDescription: {
    color: '#CBD5E1',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#F97316',
    borderColor: '#F97316',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-Bold',
  },
  bottomContainer: {
    paddingBottom: 40,
    paddingTop: 20,
  },
  completeButton: {
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