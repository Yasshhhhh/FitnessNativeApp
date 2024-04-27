import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TextInput, Button, Alert, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SetLog = ({navigation,route}) => {
  const currentUser = route.params;
  const [exerciseName, setExerciseName] = useState('');
  const [numSets, setNumSets] = useState('');
  const [setsData, setSetsData] = useState([]);
  const [submitVisible, setSubmitVisible] = useState(false); 

  const handleAddSet = () => {
    if (!exerciseName.trim() || !numSets.trim()) {
      return;
    }
    const numSetsInt = parseInt(numSets);
    if (isNaN(numSetsInt) || numSetsInt <= 0) {
      return;
    }
    setSetsData(Array.from({ length: numSetsInt }, () => ({ weight: '', reps: '' })));
    setSubmitVisible(true);
  };

  const handleInputChange = (index, key, value) => {
    const newSetsData = [...setsData];
    newSetsData[index][key] = value;
    setSetsData(newSetsData);
  };

  const handleSubmit = async () => {
    // Prepare data object
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    const data = {
      name: exerciseName,
      workout: { date: formattedDate, sets: setsData, email: currentUser.email },
    };
    try {
      const response = await fetch('http://192.168.1.6:8000/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Alert.alert('Success', 'Exercise log submitted successfully');
      } else {
        Alert.alert('Error', 'Failed to submit exercise log');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to submit exercise log');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Text style={styles.titleText}>Exercise Name:</Text>
          <TextInput
            style={styles.searchInput}
            value={exerciseName}
            onChangeText={setExerciseName}
            placeholder="Enter exercise name"
          />

          <Text style={styles.titleText}>Number of Sets:</Text>
          <TextInput
            style={styles.searchInput}
            value={numSets}
            onChangeText={setNumSets}
            placeholder="Enter number of sets"
            keyboardType="numeric"
          />

          <Button title="Add Sets" onPress={handleAddSet} />

          {setsData.map((set, index) => (
            <View key={index}>
              <Text style={styles.titleText}>Set {index + 1}:</Text>
              <TextInput
                style={styles.searchInput}
                value={set.weight}
                onChangeText={(value) => handleInputChange(index, 'weight', value)}
                placeholder="Enter weight"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.searchInput}
                value={set.reps}
                onChangeText={(value) => handleInputChange(index, 'reps', value)}
                placeholder="Enter reps"
                keyboardType="numeric"
              />
            </View>
          ))}

          {submitVisible && <Button title="Submit" onPress={handleSubmit} />} 
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#39FF14',
    paddingTop: 15,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default SetLog;
