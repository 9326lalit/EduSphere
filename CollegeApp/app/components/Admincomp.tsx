import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, ActivityIndicator, Alert, StyleSheet } from "react-native";
import axios from "axios";

type User = {
  _id: string;
  username: string;
  email: string;
  phone: string;
  isAdmin: boolean;
};

const Admincomp: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://192.168.183.177:8000/api/user/");
      setUsers(response.data.getAllUser);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (userId: string) => {
    Alert.alert("Edit User", `Edit user with ID: ${userId}`);
  };

  const handleDelete = async (userId: string) => {
    Alert.alert("Delete User", "Are you sure you want to delete this user?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          try {
            const response = await axios.delete(`http://192.168.183.177:8000/api/user/${userId}`);
            if (response.status === 200) {
              Alert.alert("Success", "User deleted successfully");
              setUsers(users.filter((item) => item._id !== userId));
            } else {
              throw new Error("Failed to delete user");
            }
          } catch (err) {
            Alert.alert("Error", err.message || "An unknown error occurred.");
          }
        },
      },
    ]);
  };

  if (loading) return <ActivityIndicator style={styles.loader} size="large" color="#4CAF50" />;
  if (error) return <Text style={styles.error}>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Users Info</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.userRow}>
            <Text style={styles.userText}>ID: {item._id}</Text>
            <Text style={styles.userText}>Username: {item.username}</Text>
            <Text style={styles.userText}>Email: {item.email}</Text>
            <Text style={styles.userText}>Phone: {item.phone}</Text>
            <Text style={styles.userText}>Admin: {item.isAdmin ? "Yes" : "No"}</Text>
            <View style={styles.actions}>
              <Button title="Edit" onPress={() => handleEdit(item._id)} color="#3b5998" />
              <Button title="Delete" onPress={() => handleDelete(item._id)} color="#e74c3c" />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f9",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2c3e50",
    textAlign: "center",
  },
  userRow: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: 5,
  },
  userText: {
    fontSize: 16,
    color: "#34495e",
    marginBottom: 8,
    fontFamily: "Arial",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "#e74c3c",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default Admincomp;
