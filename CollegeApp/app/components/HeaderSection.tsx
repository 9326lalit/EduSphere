import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// Your component code
const HeaderSection: React.FC = () => {
  return (
    <View style={styles.headerContainer}>
      {/* Background Gradient */}
      <View style={styles.headerBackground}>
        <Text style={styles.headerTitle}>Welcome to EduSphere</Text>
      </View>

      {/* College Logo and Name */}
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1462536943532-57a629f6cc60?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }} // Replace with actual college logo
          style={styles.logo}
        />
        <Text style={styles.collegeName}>EduSphere</Text>
      </View>

      {/* Tagline or Call to Action */}
      <Text style={styles.tagline}>Your Future Begins Here!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 20,
    paddingTop: 40,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  headerBackground: {
    backgroundColor: '#1e3d58', // Dark blue background for header
    paddingVertical: 20,
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginBottom: 20,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#ffffff',
    marginRight: 10,
  },
  collegeName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  tagline: {
    textAlign: 'center',
    fontSize: 18,
    color: '#4A90E2',
    fontStyle: 'italic',
    marginTop: 10,
  },
});

export default HeaderSection;
