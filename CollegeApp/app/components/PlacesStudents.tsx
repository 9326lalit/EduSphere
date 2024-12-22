import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const places = [
  {
    id: '1',
    name: 'Ravi Kumar',
    description: 'Placed in TCS as a Software Engineer. Salary: ₹15,00,000 per annum. Role: Full-stack Developer.',
    image: 'https://tse1.mm.bing.net/th?id=OIP.K3IDhdrFEJtxC9atj9rOkQHaEK&pid=Api&P=0&h=180',
  },
  {
    id: '2',
    name: 'Neha Sharma',
    description: 'Placed in Accenture as a Business Analyst. Salary: ₹12,00,000 per annum. Role: Business Strategy Consultant.',
    image: 'https://tse3.mm.bing.net/th?id=OIP.NnE2xV30_INq4nu35u16zQHaES&pid=Api&P=0&h=180',
  },
  {
    id: '3',
    name: 'Amit Soni',
    description: 'Placed in SpaceX as a Senior Engineer. Salary: ₹30,00,000 per annum. Role: Aerospace Engineer.',
    image: 'https://tse4.mm.bing.net/th?id=OIP.qpfMrWa0QjjbtqQ9g-XZwAHaEK&pid=Api&P=0&h=180',
  },
  {
    id: '4',
    name: 'Lalit Khairnar',
    description: 'Passionate about tech entrepreneurship and building innovative solutions in the field of software development.',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQGEGVxT5sFtnQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1730524569670?e=1740009600&v=beta&t=IrnezuLq6jjszMtsGvEA3DKElxZdoRgrGrPLoNUEk7c', // You can replace this with an image URL of yourself
  }
  
];

const PlacedStudents: React.FC = () => {
  const renderPlaceCard = ({ item }: { item: typeof places[0] }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Top Placed Students in Leading MNCs</Text>
      <FlatList
        data={places}
        renderItem={renderPlaceCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f7fe',
    padding: 15,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4B6587',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Arial',
    backgroundColor: '#eaf2f8',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  grid: {
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 8,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  image: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cardContent: {
    padding: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Arial',
  },
  description: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'Arial',
  },
});

export default PlacedStudents;
