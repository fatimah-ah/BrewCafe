import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets, SafeAreaProvider } from 'react-native-safe-area-context';

import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import DetailsScreen from './screens/DetailsScreen';
import CartScreen from './screens/CartScreen';
import OrdersScreen from './screens/OrdersScreen';
import ProfileScreen from './screens/ProfileScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CartProvider } from './context/CartContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const MenuStack = createNativeStackNavigator();

function MenuStackNavigator() {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen
        name="Menu"
        component={MenuScreen}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ headerShown: false }}
      />
    </MenuStack.Navigator>
  );
}

function TabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fffbe6',
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 10,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          elevation: 5,
        },
        tabBarActiveTintColor: '#6e4f3a',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MenuStack"
        component={MenuStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cafe-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MainApp"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Details"
              component={DetailsScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </SafeAreaProvider>
  );
}
