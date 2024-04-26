import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SelectList } from 'react-native-dropdown-select-list';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';

export default function Exercises({ route }) {
  const currentUser = route.params;
  const exercises = currentUser.exercises.map(e => e.name);
  const [selectedExercise, setSelectedExercise] = useState('');

  const handleExerciseSelection = (exercise) => {
    setSelectedExercise(exercise);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView>
        <View>
          <SelectList
            setSelected={handleExerciseSelection}
            data={exercises}
            save="name"
            search={false}
            selectBarStyle={styles.selectBar}
            inputStyles={{ color: '#C8E6CB' }}
            boxStyles={{ backgroundColor: '#1C1C1C' }}
            dropdownTextStyles={{ color: '#C8E6CB' }}
          />
        </View>
        {selectedExercise && (
          <View style={styles.exerciseContainer}>
            <Text style={styles.exerciseName}>{selectedExercise}</Text>
            {currentUser.exercises.map((exercise, index) => {
              if (exercise.name === selectedExercise) {
                return (
                  <View key={index} style={styles.workoutContainer}>
                    <Text style={styles.dateText}>Workouts:</Text>
                    {exercise.workouts.map((workout, workoutIndex) => (
                      <View key={workoutIndex} style={styles.workout}>
                        <Text style={styles.dateText}>
                          {moment(workout.date).format('MMMM Do YYYY')}
                        </Text>
                        {workout.sets.map((set, setIndex) => (
                          <Text key={setIndex} style={styles.setText}>
                            Set {setIndex + 1}: {set.weight} kgs x {set.reps} reps
                          </Text>
                        ))}
                      </View>
                    ))}
                  </View>
                );
              }
            })}
            {currentUser.exercises.find(exercise => exercise.name === selectedExercise).workouts.length < 2 ? (
              <Text style={styles.message}>Not enough data to generate a chart.</Text>
            ) : (
              <View>
                <Text style={styles.message}>Chart:</Text>
                <IntensityIndexChart exercise={selectedExercise} workouts={currentUser.exercises.find(exercise => exercise.name === selectedExercise).workouts} />
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const IntensityIndexChart = ({ exercise, workouts }) => {
  const chartData = workouts.map(workout => {
    const intensityIndex = workout.sets.reduce((acc, set) => acc + set.reps * set.weight, 0);
    return {
      date: moment(workout.date).format('MMM D'),
      intensityIndex: intensityIndex
    };
  });

  return (
    <LineChart
      data={{
        labels: chartData.map(data => data.date),
        datasets: [{ data: chartData.map(data => data.intensityIndex) }]
      }}
      width={350}
      height={220}
      chartConfig={{
        backgroundColor: '#1C1C1C',
        backgroundGradientFrom: '#1C1C1C',
        backgroundGradientTo: '#1C1C1C',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(200, 230, 203, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(200, 230, 203, ${opacity})`,
        style: { borderRadius: 16 },
        propsForDots: { r: "6", strokeWidth: "2", stroke: "#ffa726" }
      }}
      bezier
      style={{ marginVertical: 8, borderRadius: 16 }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
  },
  selectContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 0,
    borderColor: 'white',
  },
  selectBar: {
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: 0,
  },
  exerciseContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  workoutContainer: {
    marginBottom: 20,
  },
  workout: {
    backgroundColor: '#1C1C1C',
    padding: 10,
    marginTop: 10,
    width: '80%',
    borderRadius: 10,
  },
  dateText: {
    color: '#C8E6CB',
    marginBottom: 5,
  },
  setText: {
    color: '#C8E6CB',
    marginBottom: 5,
  },
  message: {
    color: 'white',
    marginTop: 10,
  },
});
