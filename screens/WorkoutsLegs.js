import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, TextInput, Button, Alert } from "react-native";
import { Audio } from "expo-av";

const legExercises = {
    beginner: [
        { name: "Bodyweight Squats", description: "Basic squats to strengthen legs.", gif: require("../../assets/squats.gif") },
        { name: "Step-ups", description: "Step onto a bench or platform.", gif: require("../../assets/su.gif") },
        { name: "Lunges", description: "Forward lunges to work quads and glutes.", gif: require("../../assets/lunges.gif") },
        { name: "Wall Sit", description: "Hold a squat against a wall.", gif: require("../../assets/ws.gif") },
        { name: "Calf Raises", description: "Rise on toes to strengthen calves.", gif: require("../../assets/cr.gif") },
      ],
      intermediate: [
        { name: "Jump Squats", description: "Explosive squat jumps for power.", gif: require("../../assets/js.gif") },
        { name: "Bulgarian Split Squats", description: "Single-leg squats with rear foot elevated.", gif: require("../../assets/bss.gif") },
        { name: "Deadlifts", description: "Lift a barbell while maintaining a straight back.", gif: require("../../assets/dl.gif") },
        { name: "Leg Press", description: "Use a machine to press weights with legs.", gif: require("../../assets/lp.gif") },
        { name: "Goblet Squats", description: "Hold a dumbbell at chest level while squatting.", gif: require("../../assets/gs.gif") },
      ],
      advanced: [
        { name: "Pistol Squats", description: "Single-leg squats for strength and balance.", gif: require("../../assets/ps.gif") },
        { name: "Weighted Jump Squats", description: "Perform jump squats while holding weights.", gif: require("../../assets/js.gif") },
        { name: "Front Squats", description: "Use a barbell in front of shoulders while squatting.", gif: require("../../assets/fs.gif") },
        { name: "Hack Squats", description: "Use a hack squat machine for deep squats.", gif: require("../../assets/hs.gif") },
        { name: "Barbell Back Squats", description: "Classic barbell squats for leg power.", gif: require("../../assets/bbs.gif") },
      ],
};

const LegsWorkoutScreen = () => {
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
            data={legExercises[level]}
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

export default LegsWorkoutScreen;
