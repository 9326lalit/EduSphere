

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

// Import screens
import LoginScreen from './screens/LoginScreen';  // Login screen
import RegistrationScreen from './screens/RegistrationScreen';  // Registration screen
import HomeScreen from './screens/HomeScreen';  // Home screen
import ProfileScreen from './screens/ProfileScreen';  // Profile screen
import AdminDashboard from './components/AdminDashboard';  // Admin Dashboard screen

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login state
  const [isAdmin, setIsAdmin] = useState(false);  // Track if the logged-in user is admin

  // Bottom Tab Navigator
  const BottomTabNavigator = () => (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );

  // Admin Dashboard Screen
  const AdminScreen = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Admin Dashboard</Text>
      </View>
    );
  };

  const handleLogin = (username: string, password: string) => {
    if (username === 'admin' && password === '123') {
      setIsLoggedIn(true);
      setIsAdmin(true);  // Admin logged in
    } else {
      Alert.alert('Invalid credentials');
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'HomeTabs' : 'Login'}>
        {/* Stack Screens */}
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
        >
          {props => <LoginScreen {...props} onLogin={handleLogin} />}
        </Stack.Screen>

        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />

        {/* Home with Bottom Tab Navigator */}
        <Stack.Screen
          name="HomeTabs"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />

        {/* Admin Dashboard Screen */}
        {isAdmin && (
          
          <Stack.Screen
            name="AdminDashboard"
            component={AdminDashboard}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
