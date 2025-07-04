import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, MessageCircle, Star } from 'lucide-react-native';
import { useState, useEffect, useRef } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function CallScreen() {
  const { id, name, rate, type } = useLocalSearchParams();
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [callStatus, setCallStatus] = useState<'connecting' | 'connected' | 'ended'>('connecting');
  const [totalCost, setTotalCost] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  const ratePerMinute = parseFloat(rate as string) || 35;
  const astrologerName = name as string || 'Astrologer';

  useEffect(() => {
    // Simulate call connection
    const connectTimer = setTimeout(() => {
      setCallStatus('connected');
      startCallTimer();
    }, 3000);

    return () => {
      clearTimeout(connectTimer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startCallTimer = () => {
    intervalRef.current = setInterval(() => {
      setCallDuration(prev => {
        const newDuration = prev + 1;
        setTotalCost((newDuration / 60) * ratePerMinute);
        return newDuration;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const endCall = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setCallStatus('ended');
    
    Alert.alert(
      'Call Ended',
      `Call duration: ${formatTime(callDuration)}\nTotal cost: ₹${totalCost.toFixed(2)}`,
      [
        {
          text: 'Rate Experience',
          onPress: () => showRatingDialog()
        },
        {
          text: 'Done',
          onPress: () => router.back()
        }
      ]
    );
  };

  const showRatingDialog = () => {
    Alert.alert(
      'Rate Your Experience',
      'How was your consultation?',
      [
        { text: '⭐⭐⭐⭐⭐ Excellent', onPress: () => router.back() },
        { text: '⭐⭐⭐⭐ Good', onPress: () => router.back() },
        { text: '⭐⭐⭐ Average', onPress: () => router.back() },
        { text: 'Skip', onPress: () => router.back() }
      ]
    );
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
  };

  const openChat = () => {
    router.push(`/chat/${id}?type=chat&name=${encodeURIComponent(astrologerName)}&rate=${rate}`);
  };

  if (callStatus === 'ended') {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#1F2937', '#374151']}
          style={styles.endedContainer}>
          <Text style={styles.endedTitle}>Call Ended</Text>
          <Text style={styles.endedDuration}>Duration: {formatTime(callDuration)}</Text>
          <Text style={styles.endedCost}>Total Cost: ₹{totalCost.toFixed(2)}</Text>
          <TouchableOpacity style={styles.doneButton} onPress={() => router.back()}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1F2937', '#374151']}
        style={styles.background}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.callInfo}>
            <Text style={styles.callStatus}>
              {callStatus === 'connecting' ? 'Connecting...' : 'Voice Call'}
            </Text>
            <Text style={styles.duration}>{formatTime(callDuration)}</Text>
            <Text style={styles.cost}>₹{totalCost.toFixed(2)}</Text>
          </View>
        </View>

        {/* Astrologer Profile */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ 
                uri: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2' 
              }}
              style={styles.profileImage}
            />
            <View style={styles.onlineIndicator} />
          </View>
          
          <Text style={styles.astrologerName}>{astrologerName}</Text>
          <Text style={styles.astrologerTitle}>Vedic Astrology Expert</Text>
          
          <View style={styles.ratingContainer}>
            <Star color="#F59E0B" size={16} fill="#F59E0B" />
            <Text style={styles.rating}>4.8 (2.3k reviews)</Text>
          </View>

          {callStatus === 'connecting' && (
            <View style={styles.connectingAnimation}>
              <View style={[styles.pulse, styles.pulse1]} />
              <View style={[styles.pulse, styles.pulse2]} />
              <View style={[styles.pulse, styles.pulse3]} />
            </View>
          )}
        </View>

        {/* Audio Visualizer */}
        {callStatus === 'connected' && (
          <View style={styles.audioVisualizer}>
            <View style={styles.waveContainer}>
              {Array.from({ length: 20 }, (_, i) => (
                <View
                  key={i}
                  style={[
                    styles.waveBar,
                    {
                      height: Math.random() * 40 + 10,
                      animationDelay: `${i * 0.1}s`
                    }
                  ]}
                />
              ))}
            </View>
            <Text style={styles.audioStatus}>
              {isMuted ? 'Microphone muted' : 'Speaking...'}
            </Text>
          </View>
        )}

        {/* Call Controls */}
        <View style={styles.controlsContainer}>
          <View style={styles.topControls}>
            <TouchableOpacity
              style={[styles.controlButton, isMuted && styles.activeControl]}
              onPress={toggleMute}>
              {isMuted ? (
                <MicOff color="#FFFFFF" size={24} />
              ) : (
                <Mic color="#FFFFFF" size={24} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, isSpeakerOn && styles.activeControl]}
              onPress={toggleSpeaker}>
              {isSpeakerOn ? (
                <Volume2 color="#FFFFFF" size={24} />
              ) : (
                <VolumeX color="#FFFFFF" size={24} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={openChat}>
              <MessageCircle color="#FFFFFF" size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.bottomControls}>
            <TouchableOpacity
              style={styles.endCallButton}
              onPress={endCall}>
              <PhoneOff color="#FFFFFF" size={32} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Call Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsText}>
            💡 Tip: Speak clearly and ask specific questions for better guidance
          </Text>
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
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  callInfo: {
    alignItems: 'center',
  },
  callStatus: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    opacity: 0.8,
  },
  duration: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  cost: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#10B981',
    marginTop: 4,
  },
  profileSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  astrologerName: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  astrologerTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginLeft: 6,
    opacity: 0.8,
  },
  connectingAnimation: {
    position: 'absolute',
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulse: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    opacity: 0.6,
  },
  pulse1: {
    transform: [{ scale: 1 }],
  },
  pulse2: {
    transform: [{ scale: 1.2 }],
    opacity: 0.4,
  },
  pulse3: {
    transform: [{ scale: 1.4 }],
    opacity: 0.2,
  },
  audioVisualizer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  waveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    marginBottom: 16,
  },
  waveBar: {
    width: 3,
    backgroundColor: '#10B981',
    marginHorizontal: 1,
    borderRadius: 2,
  },
  audioStatus: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    opacity: 0.7,
  },
  controlsContainer: {
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeControl: {
    backgroundColor: '#F97316',
  },
  bottomControls: {
    alignItems: 'center',
  },
  endCallButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  tipsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  tipsText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    opacity: 0.6,
    textAlign: 'center',
  },
  endedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  endedTitle: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  endedDuration: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  endedCost: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#10B981',
    marginBottom: 40,
  },
  doneButton: {
    backgroundColor: '#F97316',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
  },
  doneButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
});