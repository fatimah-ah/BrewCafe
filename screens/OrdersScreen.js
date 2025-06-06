// screens/OrderScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../constants/colors';

const orders = [
  {
    id: 'ORD123',
    date: '2025-06-01',
    total: 25.5,
    status: 'Delivered',
  },
  {
    id: 'ORD124',
    date: '2025-06-02',
    total: 13.0,
    status: 'In Progress',
  },
];

const OrderScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>

    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Orders</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {orders.map(order => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderInfo}>
              <Text style={styles.orderId}>Order #{order.id}</Text>
              <Text style={styles.orderDate}>{order.date}</Text>
            </View>
            <Text style={styles.orderTotal}>${order.total.toFixed(2)}</Text>
            <Text style={styles.orderStatus}>{order.status}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
</SafeAreaView>

  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  orderCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: COLORS.lightGrey,
    marginBottom: 15,
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  orderDate: {
    fontSize: 14,
    color: '#555',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
  orderStatus: {
    marginTop: 2,
    color: COLORS.success,
    fontWeight: '600',
  },
});

// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const OrdersScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Orders Screen</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
//   text: { fontSize: 20 },
// });

// export default OrdersScreen;
