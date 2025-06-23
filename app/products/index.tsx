import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Filter, Star, ShoppingCart, IndianRupee } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';

interface Product {
  id: string;
  name: string;
  category: string;
  description?: string;
  price: number;
  discount_price?: number;
  images: string[];
  rating: number;
  total_reviews: number;
  is_available: boolean;
}

const categories = [
  { name: 'All', active: true },
  { name: 'Gemstones', value: 'gemstone' },
  { name: 'Yantras', value: 'yantra' },
  { name: 'Rudraksha', value: 'rudraksha' },
  { name: 'Puja Items', value: 'puja_items' },
  { name: 'Books', value: 'books' },
];

export default function ProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, searchQuery]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        setProducts(getFallbackProducts());
      } else {
        setProducts(data || getFallbackProducts());
      }
    } catch (error) {
      console.error('Error:', error);
      setProducts(getFallbackProducts());
    } finally {
      setLoading(false);
    }
  };

  const getFallbackProducts = (): Product[] => [
    {
      id: '1',
      name: 'Natural Ruby Ring',
      category: 'gemstone',
      description: 'Certified natural ruby set in 18k gold ring. Enhances Sun energy and brings leadership qualities.',
      price: 25000,
      discount_price: 22500,
      images: ['https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'],
      rating: 4.8,
      total_reviews: 156,
      is_available: true
    },
    {
      id: '2',
      name: 'Shree Yantra - Copper',
      category: 'yantra',
      description: 'Handcrafted copper Shree Yantra for wealth and prosperity. Energized by Vedic mantras.',
      price: 2500,
      images: ['https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'],
      rating: 4.6,
      total_reviews: 89,
      is_available: true
    },
    {
      id: '3',
      name: '5 Mukhi Rudraksha Mala',
      category: 'rudraksha',
      description: 'Authentic 5-mukhi rudraksha mala with 108 beads. Perfect for meditation and spiritual practices.',
      price: 1500,
      images: ['https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'],
      rating: 4.7,
      total_reviews: 234,
      is_available: true
    },
    {
      id: '4',
      name: 'Puja Thali Set',
      category: 'puja_items',
      description: 'Complete brass puja thali set with all essential items for daily worship.',
      price: 3500,
      images: ['https://images.pexels.com/photos/8978562/pexels-photo-8978562.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'],
      rating: 4.5,
      total_reviews: 67,
      is_available: true
    },
    {
      id: '5',
      name: 'Vedic Astrology Book',
      category: 'books',
      description: 'Comprehensive guide to Vedic astrology by renowned astrologer. Perfect for beginners and advanced learners.',
      price: 800,
      images: ['https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'],
      rating: 4.9,
      total_reviews: 445,
      is_available: true
    },
    {
      id: '6',
      name: 'Blue Sapphire Ring',
      category: 'gemstone',
      description: 'Premium blue sapphire ring for Saturn energy enhancement. Brings discipline and success.',
      price: 35000,
      discount_price: 31500,
      images: ['https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'],
      rating: 4.9,
      total_reviews: 78,
      is_available: true
    },
    {
      id: '7',
      name: 'Ganesh Yantra',
      category: 'yantra',
      description: 'Sacred Ganesh Yantra for removing obstacles and bringing success in new ventures.',
      price: 1200,
      images: ['https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'],
      rating: 4.4,
      total_reviews: 123,
      is_available: true
    },
    {
      id: '8',
      name: 'Crystal Mala',
      category: 'rudraksha',
      description: 'Pure crystal mala for meditation and spiritual healing. Enhances clarity and focus.',
      price: 2200,
      images: ['https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'],
      rating: 4.6,
      total_reviews: 189,
      is_available: true
    }
  ];

  const filterProducts = () => {
    let filtered = products;

    if (selectedCategory !== 'All') {
      const categoryValue = categories.find(cat => cat.name === selectedCategory)?.value;
      filtered = filtered.filter(product => product.category === categoryValue);
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const renderProduct = (product: Product) => (
    <TouchableOpacity
      key={product.id}
      style={styles.productCard}
      onPress={() => router.push(`/products/${product.id}`)}>
      <Image
        source={{ uri: product.images[0] }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.productCategory}>{product.category.replace('_', ' ')}</Text>
        <View style={styles.ratingContainer}>
          <Star color="#F59E0B" size={14} fill="#F59E0B" />
          <Text style={styles.rating}>{product.rating}</Text>
          <Text style={styles.reviews}>({product.total_reviews})</Text>
        </View>
        <View style={styles.priceContainer}>
          {product.discount_price && (
            <Text style={styles.originalPrice}>₹{product.price}</Text>
          )}
          <View style={styles.currentPrice}>
            <IndianRupee color="#10B981" size={16} />
            <Text style={styles.priceText}>
              {product.discount_price || product.price}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#1E3A8A', '#3B82F6']}
        style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <ArrowLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Astro Store</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => router.push('/products/cart')}>
          <ShoppingCart color="#FFFFFF" size={24} />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search and Filter */}
        <View style={styles.section}>
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Search color="#6B7280" size={20} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search products..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Filter color="#1E3A8A" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoriesContainer}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryChip,
                    selectedCategory === category.name && styles.activeCategoryChip
                  ]}
                  onPress={() => setSelectedCategory(category.name)}>
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === category.name && styles.activeCategoryText
                    ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Featured Banner */}
        <View style={styles.section}>
          <LinearGradient
            colors={['#F97316', '#FB923C']}
            style={styles.featuredBanner}>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>Special Offer</Text>
              <Text style={styles.bannerSubtitle}>
                Get 20% off on all gemstones this week
              </Text>
              <TouchableOpacity style={styles.bannerButton}>
                <Text style={styles.bannerButtonText}>Shop Now</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' }}
              style={styles.bannerImage}
            />
          </LinearGradient>
        </View>

        {/* Products Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All' ? 'All Products' : selectedCategory}
            {filteredProducts.length > 0 && ` (${filteredProducts.length})`}
          </Text>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading products...</Text>
            </View>
          ) : filteredProducts.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No products found</Text>
            </View>
          ) : (
            <View style={styles.productsGrid}>
              {filteredProducts.map(renderProduct)}
            </View>
          )}
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
    justifyContent: 'space-between',
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
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 20,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeCategoryChip: {
    backgroundColor: '#F97316',
    borderColor: '#F97316',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  featuredBanner: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  bannerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    marginTop: 4,
    opacity: 0.9,
  },
  bannerButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#F97316',
  },
  bannerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 16,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textTransform: 'capitalize',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 4,
  },
  reviews: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginLeft: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  originalPrice: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
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
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});