import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker'; // For image picking
import Requests from './Requests';
import Admincomp from './Admincomp';

// Define the navigation prop type for AdminDashboard
type AdminDashboardNavigationProp = StackNavigationProp<RootStackParamList, 'AdminDashboard'>;

type Course = {
  _id: string;
  name: string;
  description: string;
  duration: string;
  fee: number;
  eligibility: string;
  syllabus: string[];
  reviews: Array<{
    user: string;
    rating: number;
    comment: string;
  }>;
  imageUrl?: string; // Added image URL for course image
};

const AdminDashboard = () => {
  const navigation = useNavigation<AdminDashboardNavigationProp>();
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [courseFees, setCourseFees] = useState('');
  const [courseSyllabus, setCourseSyllabus] = useState('');
  const [courseEligibility, setCourseEligibility] = useState('');
  const [courseReview, setCourseReview] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://192.168.183.177:8000/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostCourse = () => {
    if (
      courseName === '' ||
      courseDescription === '' ||
      courseDuration === '' ||
      courseFees === '' ||
      courseSyllabus === '' ||
      courseEligibility === '' ||
      courseReview === ''
    ) {
      Alert.alert('Please fill in all fields for the course.');
    } else {
      const courseData = {
        name: courseName,
        description: courseDescription,
        duration: courseDuration,
        fee: parseFloat(courseFees),
        eligibility: courseEligibility,
        syllabus: courseSyllabus.split(',').map(item => item.trim()),
        reviews: [{
          user: "Admin",
          rating: 5,
          comment: courseReview
        }],
        imageUrl: image, // Added imageUrl for course
      };

      fetch('http://192.168.183.177:8000/api/courses/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      })
      .then(response => response.json())
      .then(() => {
        Alert.alert('Course posted successfully');
        fetchCourses();
        resetForm();
      })
      .catch(() => Alert.alert('Failed to post course'));
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await fetch(`http://192.168.183.177:8000/api/courses/${courseId}`, { method: 'DELETE' });
      Alert.alert('Course deleted successfully');
      fetchCourses();
    } catch (error) {
      console.error(error);
      Alert.alert('Failed to delete course');
    }
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled === false) {
      setImage(result.assets[0].uri); // Set selected image
    }
  };

  const resetForm = () => {
    setCourseName('');
    setCourseDescription('');
    setCourseDuration('');
    setCourseFees('');
    setCourseSyllabus('');
    setCourseEligibility('');
    setCourseReview('');
    setImage(null); // Reset image after posting
  };

  const renderCourseItem = ({ item }: { item: Course }) => (
    <View style={styles.courseCard}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.courseImage} />
      ) : null}
      <Text style={styles.courseTitle}>{item.name}</Text>
      <Text style={styles.courseDescription}>{item.description}</Text>
      <View style={styles.courseActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('UpdateCourse', { courseId: item._id })}
        >
          <Text style={styles.actionButtonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#e74c3c' }]}
          onPress={() => handleDeleteCourse(item._id)}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('CourseDetails', { courseId: item._id })}
        >
          <Text style={styles.actionButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryHeading}>Dashboard Summary</Text>
        <Text style={styles.summaryText}>Total Courses: {courses.length}</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.heading}>Post a New Course</Text>
        <TextInput
          style={styles.input}
          placeholder="Course Name"
          value={courseName}
          onChangeText={setCourseName}
        />
        <TextInput
          style={styles.input}
          placeholder="Course Description"
          value={courseDescription}
          onChangeText={setCourseDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Course Duration"
          value={courseDuration}
          onChangeText={setCourseDuration}
        />
        <TextInput
          style={styles.input}
          placeholder="Course Fees"
          keyboardType="numeric"
          value={courseFees}
          onChangeText={setCourseFees}
        />
        <TextInput
          style={styles.input}
          placeholder="Course Syllabus (comma separated)"
          value={courseSyllabus}
          onChangeText={setCourseSyllabus}
        />
        <TextInput
          style={styles.input}
          placeholder="Course Eligibility"
          value={courseEligibility}
          onChangeText={setCourseEligibility}
        />
        <TextInput
          style={styles.input}
          placeholder="Course Review"
          value={courseReview}
          onChangeText={setCourseReview}
        />
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Text style={styles.imageButtonText}>Pick an Image</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
        <TouchableOpacity style={styles.submitButton} onPress={handlePostCourse}>
          <Text style={styles.submitButtonText}>Post Course</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.courseListContainer}>
        <Text style={styles.heading}>All Courses</Text>
        <FlatList
          data={courses}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item._id}
          style={styles.courseList}
        />
      </View> */}

<Requests/>

      <Admincomp/>

      

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  summaryContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
  },
  summaryHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 14,
    color: '#333',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginBottom: 15,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  courseListContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
  },
  courseList: {
    marginTop: 10,
  },
  courseCard: {
    backgroundColor: '#fff',
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
  },
  courseImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  courseDescription: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  courseActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#3498db',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});



export default AdminDashboard;
