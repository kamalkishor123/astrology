import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Briefcase, TrendingUp, Star, Target, Calendar, Clock, User } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';

const careerAspects = [
  {
    title: 'Current Phase',
    icon: Clock,
    color: '#3B82F6',
    rating: 4,
    description: 'You are in a growth phase with excellent opportunities for advancement.'
  },
  {
    title: 'Leadership',
    icon: Target,
    color: '#F59E0B',
    rating: 5,
    description: 'Strong leadership qualities are emerging. Perfect time to take initiative.'
  },
  {
    title: 'Financial Growth',
    icon: TrendingUp,
    color: '#10B981',
    rating: 3,
    description: 'Steady financial progress expected. Focus on long-term investments.'
  },
  {
    title: 'Job Satisfaction',
    icon: Star,
    color: '#8B5CF6',
    rating: 4,
    description: 'High satisfaction in current role with potential for creative projects.'
  }
];

const careerSuggestions = [
  {
    field: 'Technology',
    compatibility: 92,
    description: 'Your analytical mind and problem-solving skills make you perfect for tech roles.',
    roles: ['Software Engineer', 'Data Scientist', 'Product Manager']
  },
  {
    field: 'Finance',
    compatibility: 88,
    description: 'Strong numerical abilities and strategic thinking suit financial careers.',
    roles: ['Financial Analyst', 'Investment Banker', 'Portfolio Manager']
  },
  {
    field: 'Healthcare',
    compatibility: 85,
    description: 'Your caring nature and attention to detail align with healthcare professions.',
    roles: ['Doctor', 'Nurse', 'Healthcare Administrator']
  },
  {
    field: 'Education',
    compatibility: 82,
    description: 'Natural teaching abilities and patience make education a great fit.',
    roles: ['Teacher', 'Professor', 'Educational Consultant']
  }
];

const upcomingOpportunities = [
  {
    period: 'Next 3 Months',
    opportunity: 'Promotion Opportunity',
    description: 'Jupiter\'s favorable position indicates potential for career advancement.',
    probability: 'High',
    color: '#10B981'
  },
  {
    period: 'Next 6 Months',
    opportunity: 'New Venture',
    description: 'Excellent time to start a new business or side project.',
    probability: 'Medium',
    color: '#F59E0B'
  },
  {
    period: 'Next Year',
    opportunity: 'Career Change',
    description: 'Planetary alignment suggests successful career transition.',
    probability: 'High',
    color: '#8B5CF6'
  }
];

export default function CareerGuideScreen() {
  const [currentRole, setCurrentRole] = useState('');
  const [experience, setExperience] = useState('');

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        color="#F59E0B"
        fill={i < rating ? "#F59E0B" : "none"}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#10B981', '#059669']}
          style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}>
            <ArrowLeft color="#FFFFFF" size={24} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Career Guide</Text>
            <Text style={styles.headerSubtitle}>Professional Insights & Guidance</Text>
          </View>
          <View style={styles.placeholder} />
        </LinearGradient>

        {/* Personal Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Professional Profile</Text>
          <View style={styles.inputContainer}>
            <User color="#6B7280" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Current Role/Position"
              value={currentRole}
              onChangeText={setCurrentRole}
            />
          </View>
          <View style={styles.inputContainer}>
            <Briefcase color="#6B7280" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Years of Experience"
              value={experience}
              onChangeText={setExperience}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Current Career Analysis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Career Analysis</Text>
          <View style={styles.aspectsGrid}>
            {careerAspects.map((aspect, index) => (
              <View key={index} style={styles.aspectCard}>
                <View style={[styles.aspectIcon, { backgroundColor: aspect.color + '20' }]}>
                  <aspect.icon color={aspect.color} size={24} />
                </View>
                <Text style={styles.aspectTitle}>{aspect.title}</Text>
                <View style={styles.aspectRating}>
                  {renderStars(aspect.rating)}
                </View>
                <Text style={styles.aspectDescription}>{aspect.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Career Compatibility */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Career Field Compatibility</Text>
          <View style={styles.compatibilityList}>
            {careerSuggestions.map((suggestion, index) => (
              <View key={index} style={styles.compatibilityCard}>
                <View style={styles.compatibilityHeader}>
                  <Text style={styles.fieldName}>{suggestion.field}</Text>
                  <View style={styles.compatibilityScore}>
                    <Text style={styles.scoreText}>{suggestion.compatibility}%</Text>
                  </View>
                </View>
                <Text style={styles.fieldDescription}>{suggestion.description}</Text>
                <View style={styles.rolesContainer}>
                  <Text style={styles.rolesLabel}>Suggested Roles:</Text>
                  <View style={styles.rolesList}>
                    {suggestion.roles.map((role, roleIndex) => (
                      <Text key={roleIndex} style={styles.roleTag}>
                        {role}
                      </Text>
                    ))}
                  </View>
                </View>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${suggestion.compatibility}%` }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Upcoming Opportunities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Opportunities</Text>
          <View style={styles.opportunitiesList}>
            {upcomingOpportunities.map((opportunity, index) => (
              <View key={index} style={styles.opportunityCard}>
                <View style={styles.opportunityHeader}>
                  <Calendar color={opportunity.color} size={20} />
                  <Text style={styles.opportunityPeriod}>{opportunity.period}</Text>
                  <View style={[styles.probabilityBadge, { backgroundColor: opportunity.color + '20' }]}>
                    <Text style={[styles.probabilityText, { color: opportunity.color }]}>
                      {opportunity.probability}
                    </Text>
                  </View>
                </View>
                <Text style={styles.opportunityTitle}>{opportunity.opportunity}</Text>
                <Text style={styles.opportunityDescription}>{opportunity.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personalized Recommendations</Text>
          <View style={styles.recommendationsCard}>
            <View style={styles.recommendationItem}>
              <TrendingUp color="#10B981" size={20} />
              <View style={styles.recommendationContent}>
                <Text style={styles.recommendationTitle}>Skill Development</Text>
                <Text style={styles.recommendationText}>
                  Focus on developing leadership and communication skills. Consider taking courses in project management.
                </Text>
              </View>
            </View>
            
            <View style={styles.recommendationItem}>
              <Target color="#F59E0B" size={20} />
              <View style={styles.recommendationContent}>
                <Text style={styles.recommendationTitle}>Networking</Text>
                <Text style={styles.recommendationText}>
                  Expand your professional network. Attend industry events and connect with mentors in your field.
                </Text>
              </View>
            </View>
            
            <View style={styles.recommendationItem}>
              <Star color="#8B5CF6" size={20} />
              <View style={styles.recommendationContent}>
                <Text style={styles.recommendationTitle}>Timing</Text>
                <Text style={styles.recommendationText}>
                  The next 6 months are ideal for making career moves. Plan your strategy accordingly.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.consultButton}
            onPress={() => router.push('/(tabs)/consultations')}>
            <LinearGradient
              colors={['#8B5CF6', '#A78BFA']}
              style={styles.consultGradient}>
              <Briefcase color="#FFFFFF" size={20} />
              <Text style={styles.consultButtonText}>Get Detailed Career Reading</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.remediesButton}
            onPress={() => router.push('/remedies')}>
            <Text style={styles.remediesButtonText}>View Career Remedies</Text>
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
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  aspectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  aspectCard: {
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
  aspectIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  aspectTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  aspectRating: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  aspectDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  compatibilityList: {
    gap: 16,
  },
  compatibilityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  compatibilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  fieldName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  compatibilityScore: {
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  scoreText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  fieldDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  rolesContainer: {
    marginBottom: 12,
  },
  rolesLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 8,
  },
  rolesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  roleTag: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#1E3A8A',
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  opportunitiesList: {
    gap: 12,
  },
  opportunityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  opportunityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  opportunityPeriod: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 8,
    flex: 1,
  },
  probabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  probabilityText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
  opportunityTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  opportunityDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  recommendationsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  recommendationContent: {
    flex: 1,
    marginLeft: 12,
  },
  recommendationTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  recommendationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  consultButton: {
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  consultGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  consultButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  remediesButton: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: '#10B981',
    borderRadius: 12,
  },
  remediesButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#10B981',
  },
});