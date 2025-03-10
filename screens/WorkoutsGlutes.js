import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, TextInput, Button, Alert } from "react-native";
import { Audio } from "expo-av";

const gluteExercises = {
    beginner: [
        { name: "Glute Bridges", description: "Lift hips while lying down to activate glutes.", gif: require("../../assets/gb.gif") },
        { name: "Bodyweight Squats", description: "Basic squats to strengthen glutes.", gif: require("../../assets/squats.gif") },
        { name: "Step-ups", description: "Step onto a bench or platform.", gif: require("../../assets/su.gif") },
        { name: "Hip Thrusts", description: "Use bodyweight to push hips upwards.", gif: require("../../assets/ht.gif") },
        { name: "Side-lying Leg Raises", description: "Raise your leg while lying on your side.", gif: require("../../assets/slr.gif") },
      ],
    intermediate: [
        { name: "Bulgarian Split Squats", description: "Single-leg squats with rear foot elevated.", gif: require("../../assets/bss.gif") },
        { name: "Hip Thrusts with Weights", description: "Perform hip thrusts with added weight.", gif: require("../../assets/ht.gif") },
        { name: "Lunges", description: "Step forward to work glutes and legs.", gif: require("../../assets/lunges.gif") },
        { name: "Cable Kickbacks", description: "Use a cable machine to kick back leg.", gif: require("../../assets/ckb.gif") },
        { name: "Curtsy Lunges", description: "Step diagonally behind for glute activation.", gif: require("../../assets/cl.gif") },
      ],
    advanced: [
        { name: "Barbell Hip Thrusts", description: "Use a barbell for heavy hip thrusts.", gif: require("../../assets/ht.gif") },
        { name: "Deep Squats", description: "Go deep into a squat for full activation.", gif: require("../../assets/squats.gif") },
        { name: "Glute Ham Raises", description: "Use a machine for intense glute work.", gif: require("../../assets/ghr.gif") },
        { name: "Single-leg Deadlifts", description: "Balance on one leg while deadlifting.", gif: require("../../assets/dl.gif") },
        { name: "Sumo Deadlifts", description: "Deadlift with a wide stance for glutes.", gif: require("../../assets/dl.gif") },
      ],
};

const GlutesWorkoutScreen = () => {
  const [level, setLevel] = useState("beginner");
  const [selectedExercise, setSelectedExercise] = useState(null);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {!selectedExercise ? (
        <>
          <Image source={{ uri: "https://example.com/chest_header.jpg" }} style={{ width: "100%", height: 200 }} />
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
            <Button title="Beginner" onPress={() => setLevel("beginner")} />
            <Button title="Intermediate" onPress={() => setLevel("intermediate")} />
            <Button title="Advanced" onPress={() => setLevel("advanced")} />
          </View>
          <FlatList
            data={gluteExercises[level]}
            keyExtractor={(item) => item.name}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedExercise(item)} style={{ flex: 1, margin: 10 }}>
                <Image source={{ uri: item.gif }} style={{ width: "100%", height: 100 }} />
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <WorkoutDetail exercise={selectedExercise} onClose={() => setSelectedExercise(null)} />
      )}
    </View>
  );
};

const WorkoutDetail = ({ exercise, onClose }) => {
    const [time, setTime] = useState("1");
    const [sound, setSound] = useState(null);
  
    async function playSound() {
      const { sound } = await Audio.Sound.createAsync(require("./assets/alarm.mp3"));
      setSound(sound);
      await sound.playAsync();
    }
  
    const saveExercise = async () => {
      try {
        const existingExercises = await AsyncStorage.getItem("savedWorkouts");
        let savedExercises = existingExercises ? JSON.parse(existingExercises) : [];
        
        // Check if exercise is already saved
        if (savedExercises.some((ex) => ex.name === exercise.name)) {
          Alert.alert("Already Saved", "This exercise is already in your saved workouts.");
          return;
        }
  
        savedExercises.push(exercise);
        await AsyncStorage.setItem("savedWorkouts", JSON.stringify(savedExercises));
        Alert.alert("Saved!", "Exercise has been added to your saved workouts.");
      } catch (error) {
        console.error("Error saving exercise:", error);
      }
    };
  
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <TouchableOpacity onPress={onClose}>
          <Text style={{ fontSize: 20, color: "blue" }}>Back</Text>
        </TouchableOpacity>
        <Image source={{ uri: exercise.gif }} style={{ width: "100%", height: 200 }} />
        <Text style={{ fontSize: 24, fontWeight: "bold", marginVertical: 10 }}>{exercise.name}</Text>
        <Text>{exercise.description}</Text>
        
        {/* Save Exercise Button */}
        <TouchableOpacity onPress={saveExercise} style={{ backgroundColor: "#4CAF50", padding: 10, marginVertical: 10, borderRadius: 5 }}>
          <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Save Exercise</Text>
        </TouchableOpacity>
  
        <Text style={{ marginTop: 10 }}>Use the timer to set how many minutes you want to do the exercise.</Text>
        <TextInput
          style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
          keyboardType="numeric"
          value={time}
          onChangeText={setTime}
        />
        <Button title="Start Timer" onPress={() => {
          setTimeout(() => {
            Alert.alert("Time's Up!");
            playSound();
          }, parseInt(time) * 60000);
        }} />
      </View>
    );
  };

export default GlutesWorkoutScreen;
