import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  RotateCcw, 
  MessageCircle, 
  Star,
  Maximize2,
  Minimize2
} from 'lucide-react-native';
import { useState, useEffect, useRef } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function VideoCallScreen() {
  const { id, name, rate, type } = useLocalSearchParams();
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [callStatus, setCallStatus] = useState<'connecting' | 'connected' | 'ended'>('connecting');
  const [totalCost, setTotalCost] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout>();
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  const ratePerMinute = parseFloat(rate as string) || 42;
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
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Auto-hide controls after 5 seconds
    if (showControls && callStatus === 'connected') {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 5000);
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [showControls, callStatus]);

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
      'Video Call Ended',
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
      'How was your video consultation?',
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

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const openChat = () => {
    router.push(`/chat/${id}?type=chat&name=${encodeURIComponent(astrologerName)}&rate=${rate}`);
  };

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  if (callStatus === 'ended') {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#1F2937', '#374151']}
          style={styles.endedContainer}>
          <Text style={styles.endedTitle}>Video Call Ended</Text>
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
      <TouchableOpacity 
        style={styles.videoContainer} 
        activeOpacity={1}
        onPress={toggleControls}>
        
        {/* Astrologer Video (Main) */}
        <View style={styles.mainVideo}>
          {callStatus === 'connecting' ? (
            <LinearGradient
              colors={['#1F2937', '#374151']}
              style={styles.connectingVideo}>
              <Image
                source={{ 
                  uri: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2' 
                }}
                style={styles.connectingImage}
              />
              <Text style={styles.connectingText}>Connecting...</Text>
              <View style={styles.connectingDots}>
                <View style={[styles.dot, styles.dot1]} />
                <View style={[styles.dot, styles.dot2]} />
                <View style={[styles.dot, styles.dot3]} />
              </View>
            </LinearGradient>
          ) : (
            <View style={styles.connectedVideo}>
              <Image
                source={{ 
                  uri: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=2' 
                }}
                style={styles.astrologerVideo}
              />
              
              {/* Astrologer Info Overlay */}
              {showControls && (
                <View style={styles.astrologerInfo}>
                  <Text style={styles.astrologerName}>{astrologerName}</Text>
                  <View style={styles.ratingContainer}>
                    <Star color="#F59E0B" size={14} fill="#F59E0B" />
                    <Text style={styles.rating}>4.8</Text>
                  </View>
                </View>
              )}
            </View>
          )}
        </View>

        {/* User Video (Picture-in-Picture) */}
        <View style={[
          styles.userVideo,
          isFullscreen && styles.userVideoFullscreen
        ]}>
          {isVideoOn ? (
            <Image
              source={{ 
                uri: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2' 
              }}
              style={styles.userVideoImage}
            />
          ) : (
            <View style={styles.videoOffContainer}>
              <VideoOff color="#FFFFFF" size={24} />
              <Text style={styles.videoOffText}>Camera Off</Text>
            </View>
          )}
          
          <TouchableOpacity 
            style={styles.fullscreenToggle}
            onPress={toggleFullscreen}>
            {isFullscreen ? (
              <Minimize2 color="#FFFFFF" size={16} />
            ) : (
              <Maximize2 color="#FFFFFF" size={16} />
            )}
          </TouchableOpacity>
        </View>

        {/* Header Controls */}
        {showControls && (
          <View style={styles.headerControls}>
            <View style={styles.callInfo}>
              <Text style={styles.callStatus}>
                {callStatus === 'connecting' ? 'Connecting...' : 'Video Call'}
              </Text>
              <Text style={styles.duration}>{formatTime(callDuration)}</Text>
            </View>
            <View style={styles.costContainer}>
              <Text style={styles.cost}>₹{totalCost.toFixed(2)}</Text>
            </View>
          </View>
        )}

        {/* Bottom Controls */}
        {showControls && callStatus === 'connected' && (
          <View style={styles.bottomControls}>
            <View style={styles.controlsRow}>
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
                style={[styles.controlButton, !isVideoOn && styles.activeControl]}
                onPress={toggleVideo}>
                {isVideoOn ? (
                  <Video color="#FFFFFF" size={24} />
                ) : (
                  <VideoOff color="#FFFFFF" size={24} />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => {}}>
                <RotateCcw color="#FFFFFF" size={24} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.controlButton}
                onPress={openChat}>
                <MessageCircle color="#FFFFFF" size={24} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.endCallButton}
                onPress={endCall}>
                <PhoneOff color="#FFFFFF" size={28} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Connection Quality Indicator */}
        {callStatus === 'connected' && showControls && (
          <View style={styles.qualityIndicator}>
            <View style={styles.signalBars}>
              <View style={[styles.signalBar, styles.signalBar1]} />
              <View style={[styles.signalBar, styles.signalBar2]} />
              <View style={[styles.signalBar, styles.signalBar3]} />
              <View style={[styles.signalBar, styles.signalBar4]} />
            </View>
            <Text style={styles.qualityText}>HD</Text>
          </View>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  mainVideo: {
    flex: 1,
    backgroundColor: '#1F2937',
  },
  connectingVideo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  connectingImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginBottom: 24,
  },
  connectingText: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  connectingDots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    opacity: 0.6,
  },
  dot1: {},
  dot2: {},
  dot3: {},
  connectedVideo: {
    flex: 1,
    position: 'relative',
  },
  astrologerVideo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  astrologerInfo: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  astrologerName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  userVideo: {
    position: 'absolute',
    top: 100,
    right: 20,
    width: 120,
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: '#374151',
  },
  userVideoFullscreen: {
    width: 160,
    height: 200,
  },
  userVideoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  videoOffContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#374151',
  },
  videoOffText: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    marginTop: 4,
  },
  fullscreenToggle: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  callInfo: {
    alignItems: 'flex-start',
  },
  callStatus: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    opacity: 0.8,
  },
  duration: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginTop: 2,
  },
  costContainer: {
    alignItems: 'flex-end',
  },
  cost: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeControl: {
    backgroundColor: '#F97316',
  },
  endCallButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  qualityIndicator: {
    position: 'absolute',
    top: 80,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  signalBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: 6,
  },
  signalBar: {
    width: 3,
    backgroundColor: '#10B981',
    marginHorizontal: 1,
    borderRadius: 1,
  },
  signalBar1: {
    height: 6,
  },
  signalBar2: {
    height: 9,
  },
  signalBar3: {
    height: 12,
  },
  signalBar4: {
    height: 15,
  },
  qualityText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
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