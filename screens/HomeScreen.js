import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import COLORS from '../constants/colors';
import { products } from '../data/products';
const HomeScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        if (!email) return;

        const response = await fetch(`http://192.168.0.41:3000/api/user?email=${email}`);
        const data = await response.json();
        if (data?.fullName) {
          setFullName(data.fullName);
        }
      } catch (err) {
        console.error('Failed to load user name:', err);
      }
    };

    fetchUserName();
  }, []);

  const categories = [
    { id: 1, name: 'Coffee', icon: 'cup' },
    { id: 2, name: 'Bakery', icon: 'bread-slice-outline' },
    { id: 3, name: 'Tea', icon: 'tea' },
    { id: 4, name: 'Snacks', icon: 'food' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Top Navbar */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle-outline" size={30} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Good to see you, {fullName || 'User'}!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart-outline" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color={COLORS.secondary} style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search drinks, bakery, tea..."
            placeholderTextColor={COLORS.secondary}
            style={styles.searchInput}
          />
        </View>

        {/* Banner */}
        <Image
          source={require('../assets/banner.jpg')}
          style={styles.banner}
          resizeMode="cover"
        />

        {/* Categories */}
        <View>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map(category => (
              <View key={category.id} style={styles.categoryCard}>
                <MaterialCommunityIcons name={category.icon} size={24} color={COLORS.primary} />
                <Text style={styles.categoryText}>{category.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Explore Menu Button */}
        <TouchableOpacity
          style={styles.exploreButton}
          onPress={() => navigation.navigate('MenuStack', { screen: 'Menu' })}
        >
          <Text style={styles.exploreButtonText}>Explore Menu</Text>
        </TouchableOpacity>

        {/* Featured Items */}
        <Text style={styles.sectionTitle}>Featured Items</Text>
        <View style={styles.productsContainer}>
          {products.map(product => (
            <TouchableOpacity
              key={product.id}
              style={styles.cardHorizontal}
              onPress={() =>
                navigation.navigate('Details', { productId: product.id })
              }
            >
              <View style={styles.cardText}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>${product.price.medium.toFixed(2)}</Text>
              </View>
              <Image source={product.image} style={styles.cardImageRight} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  navTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6e4f3a',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f1e9',
    margin: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#6e4f3a',
  },
  banner: {
    width: '90%',
    height: 150,
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6e4f3a',
    marginLeft: 15,
    marginVertical: 10,
  },
  categoryCard: {
    backgroundColor: '#f5f1e9',
    padding: 10,
    marginHorizontal: 8,
    borderRadius: 10,
    alignItems: 'center',
    width: 80,
  },
  categoryText: {
    marginTop: 5,
    color: '#6e4f3a',
    fontWeight: '600',
  },
  exploreButton: {
    backgroundColor: '#6e4f3a',
    marginHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  exploreButtonText: {
    color: '#fffbe6',
    fontWeight: 'bold',
    fontSize: 16,
  },
  productsContainer: {
    marginHorizontal: 15,
  },
  cardHorizontal: {
    flexDirection: 'row',
    backgroundColor: '#f5f1e9',
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
    padding: 10,
  },
  cardText: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6e4f3a',
  },
  price: {
    fontSize: 14,
    color: '#6e4f3a',
    marginTop: 5,
  },
  cardImageRight: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginLeft: 10,
  },
});

export default HomeScreen;
