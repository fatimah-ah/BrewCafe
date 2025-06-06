import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


// ✅ Set your backend server URL (same as your Node server)
const baseUrl = 'http://192.168.0.41:3000';

const AuthScreen = ({ navigation }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^[0-9]{10,15}$/.test(phone);

  const handleSubmit = async () => {
    const { fullName, email, phone, password, confirmPassword } = formData;

    if (isSignup) {
      // ✅ Signup flow
      if (!fullName || !email || !phone || !password || !confirmPassword) {
        Alert.alert('Error', 'Please fill all fields');
        return;
      }
      if (!validateEmail(email)) {
        Alert.alert('Error', 'Invalid email format');
        return;
      }
      if (!validatePhone(phone)) {
        Alert.alert('Error', 'Phone must be 10-15 digits');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }

      try {
        const res = await axios.post(`${baseUrl}/signup`, {
          fullName,
          email,
          phone,
          password,
        });
        if (res.status === 201 || res.status === 200) {
          await AsyncStorage.setItem('userEmail', email);
          Alert.alert('Success', 'Account created successfully');
          navigation.replace('MainApp');
        }
      } catch (err) {
        console.log(err.response?.data || err.message);
        Alert.alert('Signup Failed', err.response?.data?.message || 'Server error');
      }
    } else {
      // ✅ Login flow
      if (!email || !password) {
        Alert.alert('Error', 'Please enter email and password');
        return;
      }
      if (!validateEmail(email)) {
        Alert.alert('Error', 'Invalid email');
        return;
      }

      try {
        const res = await axios.post(`${baseUrl}/login`, { email, password });

        if (res.status === 200) {
          await AsyncStorage.setItem('userEmail', res.data.email);
          navigation.replace('MainApp');
        }
      } catch (err) {
        console.log(err.response?.data || err.message);
        Alert.alert('Login Failed', err.response?.data?.message || 'Server error');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>{isSignup ? 'Create Account' : 'Login'}</Text>

        {isSignup && (
          <>
            <TextInput
              placeholder="Full Name"
              style={styles.input}
              value={formData.fullName}
              onChangeText={(text) => handleChange('fullName', text)}
            />
            <TextInput
              placeholder="Phone"
              keyboardType="phone-pad"
              style={styles.input}
              value={formData.phone}
              onChangeText={(text) => handleChange('phone', text)}
            />
          </>
        )}

        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={formData.password}
          onChangeText={(text) => handleChange('password', text)}
        />

        {isSignup && (
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            style={styles.input}
            value={formData.confirmPassword}
            onChangeText={(text) => handleChange('confirmPassword', text)}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{isSignup ? 'Sign Up' : 'Login'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsSignup(!isSignup)} style={styles.toggle}>
          <Text style={styles.toggleText}>
            {isSignup ? 'Already have an account? Login' : 'New here? Create an account'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fffaf2',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6f4e37',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#dab49d',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#3e2723',
    fontWeight: 'bold',
    fontSize: 16,
  },
  toggle: {
    marginTop: 20,
    alignItems: 'center',
  },
  toggleText: {
    color: '#6f4e37',
    textDecorationLine: 'underline',
  },
});

export default AuthScreen;