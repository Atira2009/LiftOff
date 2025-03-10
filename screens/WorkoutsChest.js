import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, TextInput, Button, Alert } from "react-native";
import { Audio } from "expo-av";

const chestExercises = {
    beginner: [
        { name: "Push-ups", description: "Standard push-ups to build chest strength.", gif: require("../../assets/pushup.gif") },
        { name: "Incline Push-ups", description: "Elevate hands for easier push-ups.", gif: require("../../assets/ipu.gif") },
        { name: "Knee Push-ups", description: "Push-ups on knees for beginners.", gif: require("../../assets/kpu.gif") },
        { name: "Wall Push-ups", description: "Push against a wall for reduced intensity.", gif: require("../../assets/wpushup.gif") },
        { name: "Chest Squeeze Press", description: "Press palms together while extending arms forward.", gif: require("../../assets/csp.gif") },
      ],
      intermediate: [
        { name: "Wide Push-ups", description: "Widen hand position for more chest activation.", gif: require("../../assets/widepu.gif") },
        { name: "Diamond Push-ups", description: "Narrow hand placement to target inner chest.", gif: require("../../assets/diamondpushups.gif") },
        { name: "Dumbbell Chest Press", description: "Use dumbbells on a bench to press up.", gif: require("../../assets/dcp.gif") },
        { name: "Chest Dips", description: "Use parallel bars to lower your chest.", gif: require("../../assets/cd.gif") },
        { name: "Incline Dumbbell Press", description: "Press dumbbells on an inclined bench.", gif: require("../../assets/idp.gif") },
      ],
      advanced: [
        { name: "One-arm Push-ups", description: "Push-ups using one hand for difficulty.", gif: require("../../assets/oapu.gif") },
        { name: "Clap Push-ups", description: "Explosive push-ups where you clap in mid-air.", gif: require("../../assets/cpu.gif") },
        { name: "Archer Push-ups", description: "Extend one arm while lowering.", gif: require("../../assets/apu.gif") },
        { name: "Weighted Dips", description: "Add weights to chest dips.", gif: require("../../assets/weighteddips.gif") },
        { name: "Bench Press", description: "Use a barbell to lift heavy weights.", gif: require("../../assets/bp.gif") },
      ],
};

const ChestWorkoutScreen = () => {
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
            data={chestExercises[level]}
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

export default ChestWorkoutScreen;
