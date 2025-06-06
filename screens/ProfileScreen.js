import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../constants/colors';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';


const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = 1; // or from login context/session

  useEffect(() => {
    axios.get(`http://<your-server-ip>:<port>/api/user/${userId}`)
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>

    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back-outline" size={28} color={COLORS.primary} onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <Ionicons name="person-circle" size={100} color={COLORS.primary} />
        <Text style={styles.name}>{user?.name || 'User Name'}</Text>
        <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
      </View>

      <View style={styles.options}>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="settings-outline" size={22} color={COLORS.primary} />
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Auth')}>
          <Ionicons name="log-out-outline" size={22} color={COLORS.danger} />
          <Text style={[styles.optionText, { color: COLORS.danger }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
</SafeAreaView>

  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: COLORS.gray,
    marginTop: 4,
  },
  options: {
    marginTop: 40,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.lightGray,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: COLORS.dark,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const ProfileScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Profile Screen</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
//   text: { fontSize: 20 },
// });


// export default ProfileScreen;
