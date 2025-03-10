import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, TextInput, Button, Alert } from "react-native";
import { Audio } from "expo-av";

const fullBodyExercises = {
    beginner: [
        { name: "Bodyweight Squats", description: "Perform squats using only body weight.", gif: require("../../assets/squats.gif") },
        { name: "Push-ups", description: "Standard push-ups to work chest and arms.", gif: require("../../assets/pushup.gif") },
        { name: "Lunges", description: "Step forward and lower into a lunge.", gif: require("../../assets/lunges.gif") },
        { name: "Plank", description: "Hold a plank to engage full body.", gif: require("../../assets/plank.gif") },
        { name: "Glute Bridges", description: "Raise hips to activate glutes and core.", gif: require("../../assets/gb.gif") },
      ],
    intermediate: [
        { name: "Burpees", description: "Jump, squat, and push-up in one motion.", gif: require("../../assets/burpee.gif") },
        { name: "Jump Squats", description: "Explosive squat jumps for power.", gif: require("../../assets/js.gif") },
        { name: "Dumbbell Thrusters", description: "Squat and press dumbbells overhead.", gif: require("../../assets/dt.gif") },
        { name: "Kettlebell Swings", description: "Swing a kettlebell for full-body activation.", gif: require("../../assets/ks.gif") },
        { name: "Mountain Climbers", description: "Run knees towards chest in plank position.", gif: require("../../assets/mc.gif") },
      ],
    advanced: [
        { name: "Muscle-ups", description: "Transition from pull-up to dip on a bar.", gif: require("../../assets/mu.gif") },
        { name: "Snatch", description: "Lift barbell overhead in a single motion.", gif: require("../../assets/snatch.gif") },
        { name: "Clean and Jerk", description: "Lift a barbell from floor to overhead.", gif: require("../../assets/caj.gif") },
        { name: "Box Jumps", description: "Jump onto a high platform.", gif: require("../../assets/bj.gif") },
        { name: "Pistol Squats", description: "Perform single-leg squats for balance.", gif: require("../../assets/ps.gif") },
      ],
};

const FullBodyWorkoutScreen = () => {
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
            data={fullBodyExercises[level]}
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

export default FullBodyWorkoutScreen;
