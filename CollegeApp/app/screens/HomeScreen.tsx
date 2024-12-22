import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Button } from 'react-native';
import Courses from '../components/Courses';
import Teachers from '../components/Teachers';
import Books from '../components/Books';
import PlacedStudents from '../components/PlacesStudents';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1462536943532-57a629f6cc60?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} // Replace with actual college logo
          style={styles.logo}
        />
        <Text style={styles.collegeName}>EduSphere</Text>
      </View>

      {/* Courses Section */}
      <Courses/>

      {/* Techers Section*/}
      <Teachers/>

      <Books/>

      <PlacedStudents/>

      {/* Upcoming Events Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <View style={styles.eventCard}>
          <Text style={styles.eventTitle}>Tech Conference 2024</Text>
          <Text style={styles.eventDate}>March 15, 2024 - Online</Text>
          <Text style={styles.eventDescription}>
            Join us for an exciting online conference on emerging technologies. Hear from industry experts and get hands-on workshops!
          </Text>
          <Button title="Learn More" onPress={() => {}} color="#002147" />
        </View>
        <View style={styles.eventCard}>
          <Text style={styles.eventTitle}>Sports Day</Text>
          <Text style={styles.eventDate}>April 20, 2024 - College Grounds</Text>
          <Text style={styles.eventDescription}>
            Our annual Sports Day will include a variety of competitions. Come participate or cheer for your friends!
          </Text>
          <Button title="Learn More" onPress={() => {}} color="#002147" />
        </View>
        <View style={styles.eventCard}>
          <Text style={styles.eventTitle}>Student Talent Show</Text>
          <Text style={styles.eventDate}>May 10, 2024 - College Auditorium</Text>
          <Text style={styles.eventDescription}>
            Showcase your talents! Singing, dancing, and more. Don’t miss this exciting event!
          </Text>
          <Button title="Learn More" onPress={() => {}} color="#002147" />
        </View>
      </View>

      {/* Notices Section (Updated Design) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notices</Text>
        <View style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>New Academic Year Registration</Text>
          <Text style={styles.noticeText}>Registration for the 2024-2025 academic year opens on May 1st. Don’t miss out!</Text>
          <Button title="Read More" onPress={() => {}} color="#005f73" />
        </View>

        <View style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>Student ID Card Collection</Text>
          <Text style={styles.noticeText}>Collect your new ID cards from the Admin Office before June 15th.</Text>
          <Button title="Read More" onPress={() => {}} color="#005f73" />
        </View>
      </View>

      {/* News Section (Updated Design) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latest News</Text>
        <View style={styles.newsCard}>
          <Image source={{ uri: 'https://tse2.mm.bing.net/th?id=OIP.DiiGceceDTu-RyCcJV9qqQHaFj&pid=Api&P=0&h=180' }} style={styles.newsImage} />
          <View style={styles.newsContent}>
            <Text style={styles.newsTitle}>XYZ College Wins Tech Award</Text>
            <Text style={styles.newsText}>Our college won the national tech innovation award for 2024. We’re proud of our students!</Text>
            <Button title="Read More" onPress={() => {}} color="#002147" />
          </View>
        </View>

        <View style={styles.newsCard}>
          <Image source={{ uri: 'https://tse3.mm.bing.net/th?id=OIP.zAIw_c0xNEGBfcak4u9SKgHaE7&pid=Api&P=0&h=180' }} style={styles.newsImage} />
          <View style={styles.newsContent}>
            <Text style={styles.newsTitle}>Student Innovation Fair</Text>
            <Text style={styles.newsText}>Our Student Innovation Fair is set to showcase student projects on May 5th. Don’t miss it!</Text>
            <Button title="Read More" onPress={() => {}} color="#002147" />
          </View>
        </View>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Contact us at: info@eduSphere.com</Text>
        <Text style={styles.footerText}>Follow us: Facebook | Twitter | Instagram</Text>
        <Text style={styles.footerText}>Develope : Techwizlalit</Text>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    backgroundColor: '#003366',
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  collegeName: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    letterSpacing: 1.5,
  },
  section: {
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#003366',
    marginBottom: 20,
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 180,
    height: 250,
    marginRight: 15,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  courseImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 15,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#003366',
    marginBottom: 10,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
  },
  eventDate: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  noticeCard: {
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#005f73',
  },
  noticeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 5,
  },
  noticeText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  newsCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  newsImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  newsContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#002147',
    marginBottom: 5,
  },
  newsText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    lineHeight: 20,
  },
  
  footer: {
    backgroundColor: '#003366',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default HomeScreen;
