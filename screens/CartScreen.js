import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,

  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CheckBox from '@react-native-community/checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../constants/colors';
import { products } from '../data/products'; 
import { useNavigation } from '@react-navigation/native';


const CartScreen = () => {
  const navigation = useNavigation();

  const initialCart = products.map(product => ({
    ...product,
    size: 'medium',
    quantity: 1,
    selected: true,
  }));

  const [cartItems, setCartItems] = useState(initialCart);

  const updateQuantity = (id, delta) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
            }
          : item
      )
    );
  };

  const toggleSelect = id => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const deleteItem = id => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((acc, item) => {
    if (item.selected) {
      return acc + item.price[item.size] * item.quantity;
    }
    return acc;
  }, 0);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>

    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Cart</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>



      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {cartItems.map(item => (
          <View key={item.id} style={styles.card}>
            <CheckBox
              value={item.selected}
              onValueChange={() => toggleSelect(item.id)}
            />
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price[item.size].toFixed(2)}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.qtyButton}>
                  <Text style={styles.qtyText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyNumber}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.qtyButton}>
                  <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Pressable onPress={() => deleteItem(item.id)}>
              <Ionicons name="close-circle" size={22} color={COLORS.primary} />
            </Pressable>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
</SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f5f1e9',
    borderRadius: 12,
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 10,
    alignItems: 'center',
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  details: { flex: 1 },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  price: {
    fontSize: 14,
    color: COLORS.primary,
    marginVertical: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  qtyButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  qtyText: {
    color: '#fffbe6',
    fontWeight: 'bold',
    fontSize: 16,
  },
  qtyNumber: {
    marginHorizontal: 10,
    fontSize: 16,
    color: COLORS.primary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
  },
  checkoutBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fffbe6',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default CartScreen;
