import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, MapPin, ArrowRight, ArrowLeft } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function BirthDetailsScreen() {
  const [formData, setFormData] = useState({
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    if (!formData.dateOfBirth || !formData.timeOfBirth || !formData.placeOfBirth) {
      Alert.alert('Missing Information', 'Please fill in all birth details for accurate predictions.');
      return;
    }
    router.push('/onboarding/preferences');
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
            <Text style={styles.title}>Birth Details</Text>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '66%' }]} />
            </View>
            <Text style={styles.progressText}>Step 2 of 3</Text>
          </View>

          <Text style={styles.subtitle}>
            Your birth details help us create accurate astrological predictions and personalized insights.
          </Text>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Calendar color="#F97316" size={20} />
              <TextInput
                style={styles.input}
                placeholder="Date of Birth (DD/MM/YYYY)"
                placeholderTextColor="#CBD5E1"
                value={formData.dateOfBirth}
                onChangeText={(value) => updateFormData('dateOfBirth', value)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Clock color="#F97316" size={20} />
              <TextInput
                style={styles.input}
                placeholder="Time of Birth (HH:MM AM/PM)"
                placeholderTextColor="#CBD5E1"
                value={formData.timeOfBirth}
                onChangeText={(value) => updateFormData('timeOfBirth', value)}
              />
            </View>

            <View style={styles.inputContainer}>
              <MapPin color="#F97316" size={20} />
              <TextInput
                style={styles.input}
                placeholder="Place of Birth (City, State)"
                placeholderTextColor="#CBD5E1"
                value={formData.placeOfBirth}
                onChangeText={(value) => updateFormData('placeOfBirth', value)}
              />
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Why do we need this?</Text>
              <Text style={styles.infoText}>
                • Date & Time: Determines planetary positions at birth{'\n'}
                • Place: Calculates accurate house positions{'\n'}
                • Precision: Ensures personalized predictions
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}>
            <LinearGradient
              colors={['#F97316', '#FB923C']}
              style={styles.buttonGradient}>
              <Text style={styles.buttonText}>Continue</Text>
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
  formContainer: {
    gap: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#CBD5E1',
    lineHeight: 20,
  },
  bottomContainer: {
    paddingBottom: 40,
    paddingTop: 20,
  },
  continueButton: {
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