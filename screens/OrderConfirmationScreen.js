// screens/CheckoutConfirmationScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';


const CheckoutConfirmationScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>

    <View style={styles.container}>
      <Ionicons name="checkmark-circle-outline" size={100} color={COLORS.success} />
      <Text style={styles.title}>Order Confirmed!</Text>
      <Text style={styles.subtitle}>Thank you for your purchase.</Text>
      <Text style={styles.summary}>Order #ORD125</Text>
      <Text style={styles.summary}>Total: $24.00</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
</SafeAreaView>

  );
};

export default CheckoutConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  summary: {
    fontSize: 16,
    marginTop: 8,
    color: COLORS.dark,
  },
  button: {
    marginTop: 30,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
