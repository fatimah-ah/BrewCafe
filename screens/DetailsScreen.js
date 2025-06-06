import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,           // <-- Import ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../constants/colors';
import { useRoute, useNavigation } from '@react-navigation/native';
import { products } from '../data/products'; 

const DetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { productId } = route.params;

  const product = products?.find(p => p.id === productId);

  const [size, setSize] = useState('medium');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const getPrice = () => (product?.price?.[size] * quantity).toFixed(2);

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Details</Text>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {/* Product Image - bigger, no padding/margin */}
        <Image source={product.image} style={styles.imageBigger} />

        {/* Name & Description */}
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>

        {/* Size Selector */}
        <View style={styles.sizeContainer}>
          {['small', 'medium', 'large'].map(option => (
            <TouchableOpacity
              key={option}
              onPress={() => setSize(option)}
              style={[
                styles.sizeButton,
                size === option && styles.selectedSize,
              ]}
            >
              <Text
                style={[
                  styles.sizeText,
                  size === option && styles.selectedSizeText,
                ]}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quantity Selector */}
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => quantity > 1 && setQuantity(quantity - 1)}
            style={styles.qtyButton}
          >
            <Text style={styles.qtyText}>–</Text>
          </TouchableOpacity>
          <Text style={styles.qtyNumber}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => setQuantity(quantity + 1)}
            style={styles.qtyButton}
          >
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Price Display */}
        <Text style={styles.priceText}>${getPrice()}</Text>

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  topTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginVertical: 20,
  },

  imageBigger: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginVertical: 10,
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  selectedSize: {
    backgroundColor: COLORS.primary,
  },
  sizeText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  selectedSizeText: {
    color: '#fff',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  qtyButton: {
    backgroundColor: '#f5f1e9',
    padding: 10,
    borderRadius: 8,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  qtyNumber: {
    fontSize: 18,
    marginHorizontal: 20,
    color: COLORS.primary,
    fontWeight: '600',
  },
  priceText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: COLORS.primary,
  },
  cartButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  cartButtonText: {
    color: '#fffbe6',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default DetailsScreen;
