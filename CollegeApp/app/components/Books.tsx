import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

const Books = () => {
  const categories = [
    {
      id: 1,
      title: 'Mechanical Engineering',
      description: 'Explore the world of machines and automation.',
      image: 'https://tse4.mm.bing.net/th?id=OIP.UROw4BE_OcL_4LMnHgl1iQHaLY&pid=Api&P=0&h=180',
      pdfUrl: 'https://example.com/mechanical.pdf', // Placeholder for the PDF
    },
    {
      id: 2,
      title: 'Computer Engineering',
      description: 'Dive into coding, AI, and systems design.',
      image: 'https://tse2.mm.bing.net/th?id=OIP._RXrhOTVDte-LtkT3aV0QAAAAA&pid=Api&P=0&h=180',
      pdfUrl: 'https://example.com/computer.pdf',
    },
    {
      id: 3,
      title: 'Civil Engineering',
      description: 'Learn about infrastructure and construction.',
      image: 'https://tse4.mm.bing.net/th?id=OIP.aVs-6XyI-moxgL3p0HOREQHaHa&pid=Api&P=0&h=180',
      pdfUrl: 'https://example.com/civil.pdf',
    },
    {
      id: 4,
      title: 'Electrical Engineering',
      description: 'Master circuits, power systems, and electronics.',
      image: 'https://tse3.mm.bing.net/th?id=OIP.d47kK_ws1HZp8x0U9toEeAHaJ6&pid=Api&P=0&h=180',
      pdfUrl: 'https://example.com/electrical.pdf',
    },
  ];

  const handleDownload = (pdfUrl) => {
    // Replace this alert with a real download function
    alert(`Downloading PDF from: ${pdfUrl}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.header}>Prefer Books From Our Website</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollRow}>
        {categories.map((category) => (
          <View style={styles.card} key={category.id}>
            <Image source={{ uri: category.image }} style={styles.image} />
            <Text style={styles.title}>{category.title}</Text>
            <Text style={styles.description}>{category.description}</Text>
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={() => handleDownload(category.pdfUrl)}
            >
              <Text style={styles.buttonText}>Download PDF</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#f4f4f4',
    paddingVertical: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a1a1a',
  },
  scrollRow: {
    width: '100%',
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    marginHorizontal: 10,
    width: 300,
    alignItems: 'center',
    padding: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
  },
  downloadButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Books;
