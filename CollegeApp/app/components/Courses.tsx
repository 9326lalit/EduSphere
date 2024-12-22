import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import axios from 'axios';

interface Course {
  _id: string;
  name: string;
  duration: string;
  fee: number;
  eligibility: string;
  syllabus: string;
  description: string;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [contactPageVisible, setContactPageVisible] = useState<boolean>(false);

  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (key: string, value: string) => {
    setContactData((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleSubmitContact = async () => {
    const apiUrl = 'http://192.168.183.177:8000/api/contact/save'; // Replace with your API endpoint for contact form
  
    try {
      const response = await axios.post(apiUrl, contactData);
      if (response.status === 200) {
        Alert.alert(
          'Thank You!',
          'Thank you for filling out the form. Our team will contact you soon.',
          [{ text: 'OK', onPress: () => setContactPageVisible(false) }]
        );
        setContactData({ name: '', email: '', message: '' }); // Clear the form fields
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      Alert.alert('Error', 'Failed to send your message. Please try again later.');
    }
  };
  

  useEffect(() => {
    const fetchUrl = 'http://192.168.183.177:8000/api/courses/';
    setLoading(true);
    setError(null);

    axios
      .get(fetchUrl)
      .then((response) => {
        if (response.data && Array.isArray(response.data.coursesList)) {
          const formattedCourses = response.data.coursesList.map((course: any) => ({
            _id: course._id,
            name: course.name,
            duration: course.duration,
            fee: course.fee,
            eligibility: course.eligibility,
            syllabus: course.syllabus,
            description: course.description,
          }));
          setCourses(formattedCourses);
        } else {
          console.error('Unexpected data format:', response.data);
          setError('Unexpected data format. Unable to load courses.');
        }
      })
      .catch((error) => {
        console.error('Error fetching courses:', error.response ? error.response.data : error.message);
        setError('Failed to load courses. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course);
    setModalVisible(true);
  };

  const handleContactPage = () => {
    setModalVisible(false);
    setContactPageVisible(true);
  };

  const handleCloseContactPage = () => {
    setContactPageVisible(false);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Available Courses</Text>
      <FlatList
        data={courses}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
      <Image
        source={{
          uri: 'https://tse1.mm.bing.net/th?id=OIP.OZDWoC8NUTcFPOr4LzQM_QHaFj&pid=Api&P=0&h=180',
        }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.courseName}>{item.name}</Text>
        <Text style={styles.courseDuration}>Duration: {item.duration}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleViewCourse(item)}
        activeOpacity={0.8} // To give a "hover-like" effect when clicked
      >
        <Text style={styles.buttonText}>Read More</Text>
      </TouchableOpacity>
    </View>
        )}
      />

      {/* Modal for course details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.modalScrollView}>
              {selectedCourse && (
                <>
                  <Text style={styles.modalTitle}>{selectedCourse.name}</Text>
                  <Text style={styles.modalText}>Duration: {selectedCourse.duration}</Text>
                  <Text style={styles.modalText}>Fee: {selectedCourse.fee}</Text>
                  <Text style={styles.modalText}>Eligibility: {selectedCourse.eligibility}</Text>
                  <Text style={styles.modalText}>Syllabus: {selectedCourse.syllabus}</Text>
                  <Text style={styles.modalText}>Description: {selectedCourse.description}</Text>
                </>
              )}
            </ScrollView>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.contactButton} onPress={handleContactPage}>
                <Text style={styles.contactButtonText}>Contact</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Contact Page with Form */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={contactPageVisible}
        onRequestClose={handleCloseContactPage}
      >
        <SafeAreaView style={styles.contactContainer}>
          <Text style={styles.contactTitle}>Contact Us</Text>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={contactData.name}
            onChangeText={(value) => handleInputChange('name', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Your Email"
            keyboardType="email-address"
            value={contactData.email}
            onChangeText={(value) => handleInputChange('email', value)}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Your Message"
            multiline
            value={contactData.message}
            onChangeText={(value) => handleInputChange('message', value)}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitContact}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeContactButton}
            onPress={handleCloseContactPage}
          >
            <Text style={styles.closeButtonText}>Go Back</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f5',
    padding: 10,
    paddingTop: 0,
    justifyContent: 'space-between',
  },
  
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 0,
    textAlign: 'center',
    color: '#2e3d49',
  },
  courseCard: {
    width: '48%',
    padding: 16,
    marginBottom: 12,
    marginRight: '2%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },

  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 20,
    padding:20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  textContainer: {
    padding: 20,
    alignItems: 'center',
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  courseDuration: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  courseImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
  },
 
  viewButton: {
    backgroundColor: '#6c5ce7',
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 10,
    width: '75%',
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
    paddingTop: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  closeContactButtonText: {
    color: '#ff6347',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    width: '85%',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#4a4e69',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333', // Darker text color for better contrast
    lineHeight: 24,
    fontWeight: '600', // Apply bold to make text stand out
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  contactButton: {
    backgroundColor: '#00cec9',
    paddingVertical: 14,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  contactButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#d63031',
    paddingVertical: 14,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },
  contactContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#f9f9f9',
  },
  contactForm: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  contactTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4a4e69',
    textAlign: 'center',
  },
  contactTextInput: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 18,
    color: '#333333',
  },
  contactSubmitButton: {
    backgroundColor: '#6c5ce7',
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 15,
  },
  contactSubmitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  closeContactButton: {
    backgroundColor: '#d63031',
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
});





export default Courses;
