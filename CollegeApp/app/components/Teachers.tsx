import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

// Dummy teacher data
const teachers = [
  {
    id: 1,
    name: 'John Doe',
    subject: 'Mathematics',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    subject: 'AI/ML',
    profileImage: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    subject: 'Java',
    profileImage: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  {
    id: 4,
    name: 'Michael Brown',
    subject: 'Business Analyst',
    profileImage: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
  // Add more teachers as needed
];

const Teachers: React.FC = () => {
  return (
    <View><Text style={styles.headline}>Our Teachers</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
        
      {teachers.map((teacher) => (
        <View key={teacher.id} style={styles.teacherCard}>
          <Image source={{ uri: teacher.profileImage }} style={styles.profileImage} />
          <Text style={styles.teacherName}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      ))}
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  headline:
  {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004343',
    padding:10

  },
  teacherCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 15,
    width: 200,
    alignItems: 'center',
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  teacherName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 5,
  },
  subject: {
    fontSize: 16,
    color: '#666',
  },
});

export default Teachers;
