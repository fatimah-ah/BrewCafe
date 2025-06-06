import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../constants/colors';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const categories = ['All', 'Hot', 'Cold', 'Desserts'];

const MenuScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    const productWithSize = { ...product, selectedSize: 'medium' };
    addToCart(productWithSize);
    Alert.alert('Success', `${product.name} added to cart!`);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory =
      selectedCategory === 'All' ||
      product.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderHeader = () => (
    <View style={{ paddingHorizontal: 16 }}>
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color={COLORS.secondary} style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search Products..."
          placeholderTextColor={COLORS.secondary}
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.categoryContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', { productId: item.id })}
      style={styles.card}
    >
      <Image source={item.image} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.cardBottom}>
          <Text style={styles.price}>${item.price.medium.toFixed(2)}</Text>
          <TouchableOpacity
            onPress={() => handleAddToCart(item)}
            style={styles.addToCartButton}
          >
            <Text style={styles.addToCartText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle-outline" size={30} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Menu</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart-outline" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  navTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 16,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  categoryButton: {
    backgroundColor: '#eee',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedCategoryButton: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    color: '#333',
    fontSize: 14,
  },
  selectedCategoryText: {
    color: '#fff',
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#f5f1e9',
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: '#555',
    marginVertical: 6,
  },
  price: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  addToCartButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
