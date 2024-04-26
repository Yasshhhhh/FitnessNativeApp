import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView, TextInput, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation, route }) => {
  const currentUser = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.airtable.com/v0/appidD0yFo5gGZ3jt/tbltilUz7Nqmr817k", {
          headers: {
            Authorization: "Bearer patxJisjLrPXSayT6.8b931c7c05bc4cdad24ef9507dcc09377c43209e5b52dbf83658b5d659fe6664",
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const responseData = await response.json();
        setData(responseData.records);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter(exercise => 
    exercise.fields.Notes &&
    exercise.fields.Example &&
    exercise.fields.Example[0].url &&
    ((exercise.fields.Exercise.toLowerCase().includes(searchQuery.toLowerCase()) || 
    exercise.fields.Equipment.some(equipment => equipment.toLowerCase().includes(searchQuery.toLowerCase()))) ||
    exercise.fields['Major Muscle'].some(muscle => muscle.toLowerCase().includes(searchQuery.toLowerCase())))
  );
  
  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />

      <KeyboardAvoidingView style={{ flex: 1 }} >
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.userContainer}>
            <Text style={styles.titleText}>Welcome {currentUser.name}</Text>
            <Image
              style={styles.profileImage}
              source={{ uri: 'http://picsum.photos/200/300' }}
            />
          </View>
          
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for muscle group,exercises or equipment"
              onChangeText={(text) => setSearchQuery(text)}
              value={searchQuery}
            />
          </View>

          <View style={styles.exerciseContainer}>
            {filteredData.map((exercise, index) => (
              <View key={index} style={styles.exerciseItem}>
                <Text style={styles.exerciseName}>{exercise.fields.Exercise}</Text>
                <Text style={styles.exerciseNotes}>Major Muscle: {exercise.fields['Major Muscle']}</Text>
                <Text style={styles.exerciseNotes}>Notes: {exercise.fields.Notes}</Text>
                <View style={styles.equipmentContainer}>
                  {exercise.fields.Equipment.map((equipment, equipmentIndex) => (
                    <Text key={equipmentIndex} style={styles.equipmentText}>{equipment}</Text>
                  ))}
                </View>
                <View style={styles.equipmentContainer}>
                  {exercise.fields['Major Muscle'].map((equipment, equipmentIndex) => (
                    <Text key={equipmentIndex} style={styles.muscleText}>{equipment}</Text>
                  ))}
                </View>
                <Image
                  style={styles.circularImage}
                  source={{ uri: exercise.fields.Example[0].url }}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  userContainer: {
    padding: 20,
    paddingTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#C8E6CB',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 20,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#101010',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  exerciseContainer: {
    padding: 10,
  },
  exerciseItem: {
    backgroundColor: '#1C1C1C',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C8E6CB',
  },
  exerciseNotes: {
    color: '#C8E6CB',
  },
  equipmentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  equipmentText: {
    backgroundColor: '#4CAF50',
    color: '#ffffff',
    padding: 5,
    margin: 2,
    borderRadius: 5,
  },
  muscleText:
  {
    backgroundColor: 'purple',
    color: '#ffffff',
    padding: 5,
    margin: 2,
    borderRadius: 5,
  },
  circularImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    padding:10,
    marginBottom:15,
    marginTop:10,
    alignSelf: 'center',
  },
});

export default HomeScreen;
