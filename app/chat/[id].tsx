import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Send, Phone, Video, MoveVertical as MoreVertical, Clock, Star, IndianRupee, Smile } from 'lucide-react-native';
import { useState, useEffect, useRef } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'astrologer';
  timestamp: Date;
  type?: 'text' | 'system';
}

const quickQuestions = [
  "What does my future hold?",
  "When will I find love?",
  "Career guidance needed",
  "Health concerns",
  "Financial advice",
  "Family problems"
];

export default function ChatScreen() {
  const { id, type, name, rate } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const [totalCost, setTotalCost] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const ratePerMinute = parseFloat(rate as string) || 35;

  useEffect(() => {
    // Initialize chat with welcome message
    const systemMessage: Message = {
      id: '0',
      text: `${type === 'chat' ? 'Chat' : type === 'call' ? 'Voice Call' : 'Video Call'} session started`,
      sender: 'user',
      timestamp: new Date(),
      type: 'system'
    };

    const welcomeMessage: Message = {
      id: '1',
      text: `🙏 Namaste! I'm ${name || 'your astrologer'}. Welcome to our consultation session. I'm here to guide you with ancient wisdom and cosmic insights. How can I help you today?`,
      sender: 'astrologer',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages([systemMessage, welcomeMessage]);
    setIsActive(true);

    // Start session timer
    const timer = setInterval(() => {
      setSessionTime(prev => {
        const newTime = prev + 1;
        setTotalCost((newTime / 60) * ratePerMinute);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [id, type, name, ratePerMinute]);

  const sendMessage = (messageText?: string) => {
    const textToSend = messageText || inputText.trim();
    if (!textToSend) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    setShowQuickQuestions(false);

    // Simulate astrologer response
    setTimeout(() => {
      const responses = getContextualResponse(textToSend);
      const astrologerMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses,
        sender: 'astrologer',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, astrologerMessage]);
      setIsTyping(false);
    }, 2000 + Math.random() * 2000);

    // Auto-scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const getContextualResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('love') || lowerMessage.includes('relationship') || lowerMessage.includes('marriage')) {
      return "💕 I can see Venus is strongly positioned in your chart. Your love life is about to take a beautiful turn. The cosmic energies suggest that someone special will enter your life within the next 3-6 months. Focus on self-love first, and the universe will bring the right person to you.";
    }
    
    if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('work')) {
      return "🌟 Your career sector shows tremendous potential! Jupiter's influence indicates a promotion or new opportunity coming your way. The period between next month and 3 months ahead is particularly auspicious for career growth. Stay confident and take calculated risks.";
    }
    
    if (lowerMessage.includes('health') || lowerMessage.includes('illness') || lowerMessage.includes('disease')) {
      return "🌿 Your health chart shows some minor concerns that can be easily addressed. I recommend wearing a moonstone and chanting the Mahamrityunjaya mantra daily. Avoid spicy foods for the next 21 days and drink more water. Your vitality will improve significantly.";
    }
    
    if (lowerMessage.includes('money') || lowerMessage.includes('financial') || lowerMessage.includes('wealth')) {
      return "💰 The financial sector of your chart is quite promising! I see multiple income sources opening up. Invest in property or gold during the next auspicious period. Avoid lending money to friends for the next 2 months. Lakshmi's blessings are upon you.";
    }
    
    if (lowerMessage.includes('family') || lowerMessage.includes('parents') || lowerMessage.includes('children')) {
      return "👨‍👩‍👧‍👦 Family harmony is indicated in your chart, though there might be some temporary misunderstandings. Perform a small puja at home and donate food to the needy. The family bonds will strengthen, and any disputes will resolve naturally within 40 days.";
    }
    
    if (lowerMessage.includes('future') || lowerMessage.includes('destiny') || lowerMessage.includes('fate')) {
      return "🔮 Your destiny is written in the stars, and it's quite remarkable! The next 2 years will be transformative. You're entering a period of spiritual growth and material success. Trust your intuition, as your inner wisdom is particularly strong right now.";
    }
    
    // Default responses
    const defaultResponses = [
      "🌟 Based on your planetary positions, I can see that you're going through a significant phase of transformation. The cosmic energies are aligning to bring positive changes in your life.",
      "✨ Your birth chart reveals some interesting patterns. The current planetary transit suggests that this is an auspicious time for new beginnings and important decisions.",
      "🔮 I sense strong spiritual energy around you. The universe is trying to communicate something important. Let me analyze your chart deeper to provide more specific guidance.",
      "🌙 The Moon's position in your chart indicates emotional sensitivity and intuitive powers. You have a natural ability to understand others' feelings and should trust your instincts more.",
      "☀️ The Sun's influence in your chart shows leadership qualities and a bright future ahead. However, you need to be patient as good things take time to manifest."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const endSession = () => {
    Alert.alert(
      'End Session',
      `Your consultation lasted ${formatTime(sessionTime)} and cost ₹${totalCost.toFixed(2)}. Are you sure you want to end the session?`,
      [
        { text: 'Continue', style: 'cancel' },
        { 
          text: 'End Session', 
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Session Ended',
              'Thank you for your consultation! Please rate your experience.',
              [{ text: 'OK', onPress: () => router.back() }]
            );
          }
        }
      ]
    );
  };

  const renderMessage = (message: Message) => {
    if (message.type === 'system') {
      return (
        <View key={message.id} style={styles.systemMessage}>
          <Text style={styles.systemMessageText}>{message.text}</Text>
        </View>
      );
    }

    const isUser = message.sender === 'user';
    return (
      <View key={message.id} style={[styles.messageContainer, isUser ? styles.userMessage : styles.astrologerMessage]}>
        <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.astrologerBubble]}>
          <Text style={[styles.messageText, isUser ? styles.userMessageText : styles.astrologerMessageText]}>
            {message.text}
          </Text>
          <Text style={[styles.messageTime, isUser ? styles.userMessageTime : styles.astrologerMessageTime]}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        
        {/* Header */}
        <LinearGradient
          colors={['#1E3A8A', '#3B82F6']}
          style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}>
            <ArrowLeft color="#FFFFFF" size={24} />
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <Text style={styles.astrologerName}>{name || 'Astrologer'}</Text>
            <View style={styles.sessionInfo}>
              <View style={styles.statusIndicator}>
                <View style={styles.onlineDot} />
                <Text style={styles.statusText}>Online</Text>
              </View>
              <Text style={styles.sessionTime}>
                <Clock color="#CBD5E1" size={14} />
                {' '}{formatTime(sessionTime)}
              </Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            {type !== 'chat' && (
              <>
                <TouchableOpacity style={styles.headerButton}>
                  <Phone color="#FFFFFF" size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerButton}>
                  <Video color="#FFFFFF" size={20} />
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity style={styles.headerButton}>
              <MoreVertical color="#FFFFFF" size={20} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Session Status */}
        <View style={styles.sessionStatus}>
          <View style={styles.sessionStatusContent}>
            <Star color="#F59E0B" size={16} fill="#F59E0B" />
            <Text style={styles.sessionStatusText}>
              {type === 'chat' ? 'Chat Session Active' : 
               type === 'call' ? 'Voice Call Active' : 
               'Video Call Active'} • ₹{ratePerMinute}/min
            </Text>
          </View>
          <View style={styles.costContainer}>
            <IndianRupee color="#10B981" size={14} />
            <Text style={styles.costText}>₹{totalCost.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.endSessionButton} onPress={endSession}>
            <Text style={styles.endSessionText}>End</Text>
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}>
          {messages.map(renderMessage)}
          
          {isTyping && (
            <View style={styles.typingIndicator}>
              <View style={styles.typingBubble}>
                <View style={styles.typingDots}>
                  <View style={[styles.typingDot, styles.typingDot1]} />
                  <View style={[styles.typingDot, styles.typingDot2]} />
                  <View style={[styles.typingDot, styles.typingDot3]} />
                </View>
                <Text style={styles.typingText}>Astrologer is typing...</Text>
              </View>
            </View>
          )}

          {/* Quick Questions */}
          {showQuickQuestions && messages.length <= 2 && (
            <View style={styles.quickQuestionsContainer}>
              <Text style={styles.quickQuestionsTitle}>Quick Questions:</Text>
              <View style={styles.quickQuestionsList}>
                {quickQuestions.map((question, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.quickQuestionButton}
                    onPress={() => sendMessage(question)}>
                    <Text style={styles.quickQuestionText}>{question}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TouchableOpacity style={styles.emojiButton}>
              <Smile color="#9CA3AF" size={20} />
            </TouchableOpacity>
            <TextInput
              style={styles.textInput}
              placeholder="Type your message..."
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
            />
            <TouchableOpacity 
              style={[styles.sendButton, inputText.trim() ? styles.sendButtonActive : null]}
              onPress={() => sendMessage()}
              disabled={!inputText.trim()}>
              <Send color={inputText.trim() ? "#FFFFFF" : "#9CA3AF"} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  headerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  astrologerName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  sessionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#CBD5E1',
  },
  sessionTime: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#CBD5E1',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sessionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFBEB',
    borderBottomWidth: 1,
    borderBottomColor: '#FEF3C7',
  },
  sessionStatusContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sessionStatusText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#92400E',
    marginLeft: 8,
  },
  costContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  costText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#10B981',
    marginLeft: 2,
  },
  endSessionButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  endSessionText: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
    paddingBottom: 10,
  },
  systemMessage: {
    alignItems: 'center',
    marginVertical: 16,
  },
  systemMessageText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  astrologerMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: '#F97316',
    borderBottomRightRadius: 6,
  },
  astrologerBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  astrologerMessageText: {
    color: '#1F2937',
  },
  messageTime: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  userMessageTime: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'right',
  },
  astrologerMessageTime: {
    color: '#9CA3AF',
  },
  typingIndicator: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  typingBubble: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9CA3AF',
    marginHorizontal: 2,
  },
  typingDot1: {},
  typingDot2: {},
  typingDot3: {},
  typingText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    fontStyle: 'italic',
  },
  quickQuestionsContainer: {
    marginTop: 20,
    marginBottom: 16,
  },
  quickQuestionsTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 12,
  },
  quickQuestionsList: {
    gap: 8,
  },
  quickQuestionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  quickQuestionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  emojiButton: {
    padding: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    maxHeight: 100,
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#F97316',
  },
});