import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const SavedWorkouts = () => {
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const navigation = useNavigation();

  // Load saved workouts from AsyncStorage
  useEffect(() => {
    loadSavedWorkouts();
  }, []);

  const loadSavedWorkouts = async () => {
    try {
      const workouts = await AsyncStorage.getItem('savedWorkouts');
      if (workouts) {
        setSavedWorkouts(JSON.parse(workouts));
      }
    } catch (error) {
      console.error('Error loading saved workouts:', error);
    }
  };

  // Remove a workout from saved list
  const removeWorkout = async (workoutName) => {
    const updatedWorkouts = savedWorkouts.filter((workout) => workout.name !== workoutName);
    setSavedWorkouts(updatedWorkouts);
    await AsyncStorage.setItem('savedWorkouts', JSON.stringify(updatedWorkouts));
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold text-center mb-4">Saved Workouts</Text>

      {savedWorkouts.length === 0 ? (
        <Text className="text-center text-gray-500">No saved workouts yet!</Text>
      ) : (
        <FlatList
          data={savedWorkouts}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View className="flex-row items-center justify-between p-3 mb-2 border rounded-lg bg-gray-100">
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => navigation.navigate('WorkoutDetail', { workout: item })}
              >
                <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 10 }} />
                <Text className="ml-4 text-lg font-semibold">{item.name}</Text>
              </TouchableOpacity>

              {/* Remove Button */}
              <TouchableOpacity onPress={() => removeWorkout(item.name)}>
                <Icon name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default SavedWorkouts;
