import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// Define navigation stack parameter types
type RootStackParamList = {
  Profile: undefined;
  Login: undefined;
};

const ProfileScreen: React.FC = () => {
  // Navigation hook
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // State for user data and edit mode
  const [user, setUser] = useState({
    name: 'Lalit Khairnar',
    age: 23,
    email: 'lalit93@gmail.com',
    phone: '+91 9326780773',
    address: 'Malegaon',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  // Save edited user data
  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  // Navigate to the Login screen
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Picture Section */}
      <View style={styles.profileSection}>
        <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
        {isEditing ? (
          <TextInput
            style={styles.editInput}
            value={editedUser.name}
            onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
          />
        ) : (
          <Text style={styles.profileName}>{user.name}</Text>
        )}
        {isEditing ? (
          <TextInput
            style={styles.editInput}
            keyboardType="numeric"
            value={editedUser.age.toString()}
            onChangeText={(text) => setEditedUser({ ...editedUser, age: parseInt(text, 10) || 0 })}
          />
        ) : (
          <Text style={styles.profileAge}>{user.age} years old</Text>
        )}
      </View>

      {/* User Information Section */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>User Information</Text>
        <View style={styles.infoRow}>
          <Ionicons name="mail" size={20} color="#003366" />
          {isEditing ? (
            <TextInput
              style={styles.editInput}
              value={editedUser.email}
              onChangeText={(text) => setEditedUser({ ...editedUser, email: text })}
            />
          ) : (
            <Text style={styles.infoText}>{user.email}</Text>
          )}
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="call" size={20} color="#003366" />
          {isEditing ? (
            <TextInput
              style={styles.editInput}
              value={editedUser.phone}
              onChangeText={(text) => setEditedUser({ ...editedUser, phone: text })}
            />
          ) : (
            <Text style={styles.infoText}>{user.phone}</Text>
          )}
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="location" size={20} color="#003366" />
          {isEditing ? (
            <TextInput
              style={styles.editInput}
              value={editedUser.address}
              onChangeText={(text) => setEditedUser({ ...editedUser, address: text })}
            />
          ) : (
            <Text style={styles.infoText}>{user.address}</Text>
          )}
        </View>
      </View>

      {/* Edit / Save Buttons */}
      <View style={styles.buttonContainer}>
        {isEditing ? (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.editProfileButton} onPress={() => setIsEditing(true)}>
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    elevation: 3,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 5,
  },
  profileAge: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  infoSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  editInput: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  editProfileButton: {
    backgroundColor: '#003366',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  editProfileButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  saveButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 5,
  },
  logoutButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
