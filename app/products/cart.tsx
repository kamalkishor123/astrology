import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, IndianRupee } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';

interface CartItem {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  quantity: number;
  category: string;
}

const mockCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Natural Ruby Ring',
    price: 25000,
    discountPrice: 22500,
    image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg',
    quantity: 1,
    category: 'gemstone'
  },
  {
    id: '2',
    name: 'Shree Yantra - Copper',
    price: 2500,
    image: 'https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg',
    quantity: 2,
    category: 'yantra'
  },
  {
    id: '3',
    name: '5 Mukhi Rudraksha Mala',
    price: 1500,
    image: 'https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg',
    quantity: 1,
    category: 'rudraksha'
  }
];

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            setCartItems(prev => prev.filter(item => item.id !== id));
          }
        }
      ]
    );
  };

  const getItemTotal = (item: CartItem) => {
    const price = item.discountPrice || item.price;
    return price * item.quantity;
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + getItemTotal(item), 0);
  };

  const getShipping = () => {
    return getSubtotal() > 5000 ? 0 : 200;
  };

  const getTotal = () => {
    return getSubtotal() + getShipping();
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to your cart before checkout.');
      return;
    }
    router.push('/products/checkout');
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
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <View style={styles.placeholder} />
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <ShoppingBag color="#9CA3AF" size={64} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Add some spiritual items to get started</Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => router.push('/products')}>
            <LinearGradient
              colors={['#F97316', '#FB923C']}
              style={styles.shopButtonGradient}>
              <Text style={styles.shopButtonText}>Start Shopping</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Cart Items */}
            <View style={styles.itemsContainer}>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                  
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                    <Text style={styles.itemCategory}>{item.category.replace('_', ' ')}</Text>
                    
                    <View style={styles.priceContainer}>
                      {item.discountPrice && (
                        <Text style={styles.originalPrice}>₹{item.price}</Text>
                      )}
                      <View style={styles.currentPrice}>
                        <IndianRupee color="#10B981" size={16} />
                        <Text style={styles.priceText}>
                          {item.discountPrice || item.price}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.itemActions}>
                      <View style={styles.quantityContainer}>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus color="#6B7280" size={16} />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus color="#6B7280" size={16} />
                        </TouchableOpacity>
                      </View>

                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => removeItem(item.id)}>
                        <Trash2 color="#EF4444" size={20} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.itemTotal}>
                    <IndianRupee color="#1F2937" size={16} />
                    <Text style={styles.itemTotalText}>{getItemTotal(item)}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Order Summary */}
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal ({cartItems.length} items)</Text>
                <View style={styles.summaryPrice}>
                  <IndianRupee color="#6B7280" size={16} />
                  <Text style={styles.summaryValue}>{getSubtotal()}</Text>
                </View>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping</Text>
                <View style={styles.summaryPrice}>
                  {getShipping() === 0 ? (
                    <Text style={styles.freeShipping}>FREE</Text>
                  ) : (
                    <>
                      <IndianRupee color="#6B7280" size={16} />
                      <Text style={styles.summaryValue}>{getShipping()}</Text>
                    </>
                  )}
                </View>
              </View>

              {getShipping() === 0 && (
                <Text style={styles.freeShippingNote}>
                  🎉 You've qualified for free shipping!
                </Text>
              )}

              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <View style={styles.summaryPrice}>
                  <IndianRupee color="#1F2937" size={20} />
                  <Text style={styles.totalValue}>{getTotal()}</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Checkout Button */}
          <View style={styles.checkoutContainer}>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}>
              <LinearGradient
                colors={['#F97316', '#FB923C']}
                style={styles.checkoutGradient}>
                <Text style={styles.checkoutText}>
                  Proceed to Checkout • ₹{getTotal()}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </>
      )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginTop: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  shopButton: {
    borderRadius: 12,
  },
  shopButtonGradient: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  shopButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  itemsContainer: {
    padding: 20,
    gap: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textTransform: 'capitalize',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  originalPrice: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  currentPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#10B981',
    marginLeft: 2,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    paddingHorizontal: 12,
  },
  removeButton: {
    padding: 8,
  },
  itemTotal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  itemTotalText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginLeft: 2,
  },
  summaryContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
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
  freeShippingNote: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
    textAlign: 'center',
    marginVertical: 8,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
    marginTop: 8,
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
  checkoutContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  checkoutButton: {
    borderRadius: 12,
  },
  checkoutGradient: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
});