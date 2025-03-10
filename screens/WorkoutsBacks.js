import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, TextInput, Button, Alert } from "react-native";
import { Audio } from "expo-av";

const legExercises = {
    beginner: [
        { name: "Superman Hold", description: "Lie on your stomach and lift arms and legs.", gif: require("../../assets/superman.gif") },
        { name: "Bent-over Towel Rows", description: "Use a towel to mimic row motion.", gif: require("../../assets/bor.gif") },
        { name: "Reverse Snow Angels", description: "Lift arms and legs in a snow angel motion.", gif: require("../../assets/rsa.gif") },
        { name: "Wall Pulls", description: "Pull against a sturdy wall for resistance.", gif: require("../../assets/wp.gif") },
        { name: "Bridge Hip Raises", description: "Lift hips off the floor, engaging the lower back.", gif: require("../../assets/bhr.gif") },
      ],
      intermediate: [
        { name: "Dumbbell Bent-over Rows", description: "Row dumbbells while bending at the waist.", gif: require("../../assets/bor.gif") },
        { name: "Lat Pulldown", description: "Use a machine to pull down a bar.", gif: require("../../assets/lpd.gif") },
        { name: "Seated Cable Rows", description: "Row using a cable machine." , gif: require("../../assets/scr.gif")},
        { name: "Pull-ups", description: "Lift your body using a pull-up bar." , gif: require("../../assets/pu.gif")},
        { name: "Deadlifts", description: "Lift a barbell from the ground using back strength.", gif: require("../../assets/dl.gif") },
      ],
      advanced: [
        { name: "Weighted Pull-ups", description: "Perform pull-ups with added weight.", gif: require("../../assets/wpu.gif") },
        { name: "Barbell Rows", description: "Row a barbell towards your torso.", gif: require("../../assets/barbellcurls.gif") },
        { name: "T-Bar Rows", description: "Use a T-bar machine for heavy rows.", gif: require("../../assets/tbr.gif") },
        { name: "Rack Pulls", description: "Deadlifts starting from knee height.", gif: require("../../assets/rp.gif") },
        { name: "Muscle-ups", description: "Explosive pull-ups transitioning into a dip.", gif: require("../../assets/mu.gif") },
      ],
};

const BacksWorkoutScreen = () => {
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
            data={backExercises[level]}
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

export default BacksWorkoutScreen;
