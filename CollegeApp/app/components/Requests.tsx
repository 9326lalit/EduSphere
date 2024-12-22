import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';

// Define the type for the contact request data
interface ContactRequest {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;  // Corrected to 'createdAt' based on API response
}

const Requests = () => {
  const [requests, setRequests] = useState<ContactRequest[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://192.168.183.177:8000/api/contact/all'); // Replace with your actual backend URL
        const data = await response.json();

        // Log the data to see the response structure
        console.log('API Response:', data);

        // Access 'contacts' array from the response
        if (data.contacts && Array.isArray(data.contacts)) {
          setRequests(data.contacts);
        } else {
          console.error('Data.contacts is not an array:', data);
          Alert.alert('Error', 'There was an issue fetching the contact requests.');
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
        Alert.alert('Error', 'There was an issue fetching the contact requests.');
      }
    };

    fetchRequests();
  }, []);

  // Handle Approve action
  const handleApprove = (id: string) => {
    Alert.alert('Approve Request', `Are you sure you want to approve request with ID: ${id}?`);
    // Add API call or action for approval
  };

  // Handle Delete action
  const handleDelete = (id: string) => {
    Alert.alert('Delete Request', `Are you sure you want to delete request with ID: ${id}?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          try {
            const response = await fetch(`http://192.168.183.177:8000/api/contact/${id}`, {
              method: 'DELETE',
            });
            if (response.ok) {
              setRequests((prevRequests) => prevRequests.filter((request) => request._id !== id));
              Alert.alert('Success', 'Request deleted successfully.');
            } else {
              throw new Error('Failed to delete the request');
            }
          } catch (error) {
            Alert.alert('Error', 'There was an issue deleting the request.');
          }
        },
      },
    ]);
  };

  // Render the list items with explicit typing for 'item'
  const renderItem = ({ item }: { item: ContactRequest }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemHeader}>Name: {item.name}</Text>
      <Text style={styles.itemSubHeader}>Email: {item.email}</Text>
      <Text style={styles.itemMessage}>Message: {item.message}</Text>
      <Text style={styles.itemDate}>Received on: {new Date(item.createdAt).toLocaleString()}</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.approveButton}
          onPress={() => handleApprove(item._id)}
        >
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item._id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Requests From Students</Text>

      {/* Render the contact requests using FlatList */}
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  itemHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  itemSubHeader: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  itemMessage: {
    fontSize: 14,
    color: '#444',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  itemDate: {
    fontSize: 12,
    color: '#888',
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  approveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#F44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Requests;
