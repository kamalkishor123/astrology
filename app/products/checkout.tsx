import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, CreditCard, Wallet, IndianRupee, CheckCircle } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';

interface PaymentMethod {
  id: string;
  name: string;
  icon: any;
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'wallet',
    name: 'Wallet',
    icon: Wallet,
    description: 'Pay using your wallet balance'
  },
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: CreditCard,
    description: 'Secure payment with your card'
  }
];

export default function CheckoutScreen() {
  const [selectedPayment, setSelectedPayment] = useState('wallet');
  const [shippingAddress, setShippingAddress] = useState({
    fullName: 'Arjun Kumar Sharma',
    phone: '+91 98765 43210',
    address: '123 Main Street, Apartment 4B',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001'
  });

  const orderSummary = {
    subtotal: 27500,
    shipping: 0,
    total: 27500
  };

  const handlePlaceOrder = () => {
    Alert.alert(
      'Order Placed Successfully!',
      'Your order has been placed and will be delivered within 3-5 business days.',
      [
        {
          text: 'Track Order',
          onPress: () => router.replace('/(tabs)/profile')
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <ArrowLeft color="#1F2937" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Shipping Address */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin color="#F97316" size={20} />
            <Text style={styles.sectionTitle}>Shipping Address</Text>
          </View>
          
          <View style={styles.addressCard}>
            <Text style={styles.addressName}>{shippingAddress.fullName}</Text>
            <Text style={styles.addressPhone}>{shippingAddress.phone}</Text>
            <Text style={styles.addressText}>
              {shippingAddress.address}{'\n'}
              {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}
            </Text>
            <TouchableOpacity style={styles.changeButton}>
              <Text style={styles.changeButtonText}>Change Address</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <CreditCard color="#F97316" size={20} />
            <Text style={styles.sectionTitle}>Payment Method</Text>
          </View>
          
          <View style={styles.paymentMethods}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentMethod,
                  selectedPayment === method.id && styles.selectedPaymentMethod
                ]}
                onPress={() => setSelectedPayment(method.id)}>
                <View style={styles.paymentMethodContent}>
                  <method.icon 
                    color={selectedPayment === method.id ? '#F97316' : '#6B7280'} 
                    size={24} 
                  />
                  <View style={styles.paymentMethodInfo}>
                    <Text style={[
                      styles.paymentMethodName,
                      selectedPayment === method.id && styles.selectedPaymentMethodName
                    ]}>
                      {method.name}
                    </Text>
                    <Text style={styles.paymentMethodDescription}>
                      {method.description}
                    </Text>
                  </View>
                </View>
                <View style={[
                  styles.radioButton,
                  selectedPayment === method.id && styles.selectedRadioButton
                ]}>
                  {selectedPayment === method.id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {selectedPayment === 'wallet' && (
            <View style={styles.walletInfo}>
              <Text style={styles.walletBalance}>Wallet Balance: ₹2,450</Text>
              <Text style={styles.walletNote}>
                Insufficient balance. Please add ₹{orderSummary.total - 2450} to your wallet.
              </Text>
              <TouchableOpacity style={styles.addMoneyButton}>
                <Text style={styles.addMoneyButtonText}>Add Money to Wallet</Text>
              </TouchableOpacity>
            </View>
          )}

          {selectedPayment === 'card' && (
            <View style={styles.cardForm}>
              <TextInput
                style={styles.cardInput}
                placeholder="Card Number"
                keyboardType="numeric"
              />
              <View style={styles.cardRow}>
                <TextInput
                  style={[styles.cardInput, styles.cardInputHalf]}
                  placeholder="MM/YY"
                />
                <TextInput
                  style={[styles.cardInput, styles.cardInputHalf]}
                  placeholder="CVV"
                  keyboardType="numeric"
                />
              </View>
              <TextInput
                style={styles.cardInput}
                placeholder="Cardholder Name"
              />
            </View>
          )}
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal (3 items)</Text>
              <View style={styles.summaryPrice}>
                <IndianRupee color="#6B7280" size={16} />
                <Text style={styles.summaryValue}>{orderSummary.subtotal}</Text>
              </View>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.freeShipping}>FREE</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount</Text>
              <View style={styles.summaryPrice}>
                <Text style={styles.discountValue}>-₹2,500</Text>
              </View>
            </View>

            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <View style={styles.summaryPrice}>
                <IndianRupee color="#1F2937" size={20} />
                <Text style={styles.totalValue}>{orderSummary.total}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Order Protection */}
        <View style={styles.protectionCard}>
          <CheckCircle color="#10B981" size={24} />
          <View style={styles.protectionContent}>
            <Text style={styles.protectionTitle}>Order Protection</Text>
            <Text style={styles.protectionText}>
              Your order is protected with our 7-day return policy and authenticity guarantee.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}>
          <LinearGradient
            colors={['#F97316', '#FB923C']}
            style={styles.placeOrderGradient}>
            <Text style={styles.placeOrderText}>
              Place Order • ₹{orderSummary.total}
            </Text>
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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginLeft: 12,
  },
  addressCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 16,
  },
  addressName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  addressPhone: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  changeButton: {
    alignSelf: 'flex-start',
  },
  changeButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#F97316',
  },
  paymentMethods: {
    gap: 12,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  selectedPaymentMethod: {
    borderColor: '#F97316',
    backgroundColor: '#FFF7ED',
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentMethodInfo: {
    marginLeft: 12,
  },
  paymentMethodName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  selectedPaymentMethodName: {
    color: '#F97316',
  },
  paymentMethodDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadioButton: {
    borderColor: '#F97316',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F97316',
  },
  walletInfo: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
  },
  walletBalance: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#92400E',
    marginBottom: 4,
  },
  walletNote: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#92400E',
    marginBottom: 12,
  },
  addMoneyButton: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  addMoneyButtonText: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  cardForm: {
    marginTop: 16,
    gap: 12,
  },
  cardInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cardInputHalf: {
    flex: 1,
  },
  summaryCard: {
    gap: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  summaryPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
    marginLeft: 2,
  },
  freeShipping: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
  },
  discountValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
    marginTop: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  totalValue: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
    marginLeft: 2,
  },
  protectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  protectionContent: {
    flex: 1,
    marginLeft: 12,
  },
  protectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  protectionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  placeOrderButton: {
    borderRadius: 12,
  },
  placeOrderGradient: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  placeOrderText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
});