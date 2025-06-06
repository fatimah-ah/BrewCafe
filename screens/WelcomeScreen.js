import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ImageBackground
        source={require('../assets/coffee-bg.jpg')} // coffee image
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome to Brew Café</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Auth')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000', // fallback in case image doesn't cover
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fffbe6',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#DAB49D',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    color: '#3e2723',
    fontWeight: 'bold',
  },
});
