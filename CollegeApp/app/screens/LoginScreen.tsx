import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const LoginScreen = ({ navigation, onLogin }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (username === '' || password === '') {
      Alert.alert('Please enter both username and password');
      return;
    }

    // Call the onLogin function passed from App.js (optional)
    onLogin(username, password);

    try {
      // Make an API call to the backend to check user credentials
      const response = await fetch('http://192.168.183.177:8000/api/auth/login',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });
  

      const data = await response.json();

      if (response.ok) {
        // Check user role in the response (assuming it's returned in the data)
        if (data.isAdmin) {
          Alert.alert('Admin login successful');
          // Navigate to Admin Dashboard if user is admin
          navigation.replace('AdminDashboard');
        } else {
          Alert.alert('Login successful');
          // Navigate to HomeTabs if user is a regular user
          navigation.replace('HomeTabs');
        }
      } else {
        // Handle login failure based on the backend error response
        Alert.alert('Invalid credentials, please try again');
      }
    } catch (error) {
      // Handle network or server errors
      Alert.alert('An error occurred, please try again later');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
        <Text style={styles.signupLink}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#003366',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  signupLink: {
    textAlign: 'center',
    fontSize: 14,
    color: '#003366',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
