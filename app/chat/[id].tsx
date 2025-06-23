import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Send, Phone, Video, MoveVertical as MoreVertical, Clock, Star } from 'lucide-react-native';
import { useState, useEffect, useRef } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'astrologer';
  timestamp: Date;
  type?: 'text' | 'system';
}

export default function ChatScreen() {
  const { id, type, name } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Initialize chat with welcome message
    const welcomeMessage: Message = {
      id: '1',
      text: `Hello! I'm ${name || 'your astrologer'}. Welcome to our consultation session. How can I help you today?`,
      sender: 'astrologer',
      timestamp: new Date(),
      type: 'text'
    };

    const systemMessage: Message = {
      id: '0',
      text: `${type === 'chat' ? 'Chat' : type === 'call' ? 'Voice Call' : 'Video Call'} session started`,
      sender: 'user',
      timestamp: new Date(),
      type: 'system'
    };

    setMessages([systemMessage, welcomeMessage]);
    setIsActive(true);

    // Start session timer
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [id, type, name]);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate astrologer response
    setTimeout(() => {
      const responses = [
        "Thank you for sharing that with me. Based on your birth details, I can see some interesting planetary influences.",
        "That's a very insightful question. Let me analyze your chart and provide you with guidance.",
        "I understand your concern. The current planetary transit suggests some changes ahead.",
        "Your question relates to an important aspect of your life. Let me explain what the stars reveal.",
        "This is a common concern I see in many charts. Here's what I recommend based on your planetary positions."
      ];

      const astrologerMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'astrologer',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, astrologerMessage]);
      setIsTyping(false);
    }, 2000);

    // Auto-scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const endSession = () => {
    router.back();
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
               'Video Call Active'} • ₹35/min
            </Text>
          </View>
          <TouchableOpacity style={styles.endSessionButton} onPress={endSession}>
            <Text style={styles.endSessionText}>End Session</Text>
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
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
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
              onPress={sendMessage}
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
  },
  sessionStatusText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#92400E',
    marginLeft: 8,
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
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9CA3AF',
    marginHorizontal: 2,
  },
  typingDot1: {
    // Animation would be added here in a real implementation
  },
  typingDot2: {
    // Animation would be added here in a real implementation
  },
  typingDot3: {
    // Animation would be added here in a real implementation
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
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonActive: {
    backgroundColor: '#F97316',
  },
});