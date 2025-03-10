import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";

const abExercises = {
  beginner: [
    { name: "Crunches", description: "Basic crunches to activate abs.", gif: require("../../assets/crunches.gif") },
    { name: "Leg Raises", description: "Raise legs while lying down.", gif: require("../../assets/legraises.gif")  },
    { name: "Plank", description: "Hold a plank position to engage core.", gif: require("../../assets/plank.gif")  },
    { name: "Bicycle Crunches", description: "Alternate knee and elbow for rotation.", gif: require("../../assets/bicyclecrunch.gif")  },
    { name: "Seated Knee Tucks", description: "Tuck knees towards chest while seated.", gif: require("../../assets/seatedkneetucks.gif")  },
  ],
  intermediate: [
    { name: "Hanging Leg Raises", description: "Raise legs while hanging from a bar.", gif: require("../../assets/hanginglegraises.gif")  },
    { name: "Russian Twists", description: "Twist torso while holding a weight.", gif: require("../../assets/russiantwists.gif")  },
    { name: "Ab Rollouts", description: "Use an ab wheel to roll forward.", gif: require("../../assets/abrollouts.gif")  },
    { name: "Flutter Kicks", description: "Kick legs alternately while lying down.", gif: require("../../assets/flutterkicks.gif")  },
    { name: "Weighted Sit-ups", description: "Perform sit-ups while holding a weight.", gif: require("../../assets/weightedsitups.gif")  },
  ],
  advanced: [
    { name: "Dragon Flags", description: "Raise body while holding onto a bar.", gif: require("../../assets/dragonflags.gif")  },
    { name: "Windshield Wipers", description: "Rotate legs side to side while hanging.", gif: require("../../assets/windshieldwipers.gif")  },
    { name: "V-ups", description: "Simultaneously lift legs and upper body.", gif: "https://example.com/v_ups.gif" },
    { name: "Plank to Push-up", description: "Transition from plank to push-up repeatedly.", gif: require("../../assets/planktopushups.gif")  },
    { name: "Cable Woodchoppers", description: "Use cables to simulate chopping motion.", gif: require("../../assets/cablewoodchoppers.gif") },
  ],
};

const AbsWorkoutScreen = () => {
  const [level, setLevel] = useState("beginner");
  const [selectedExercise, setSelectedExercise] = useState(null);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {!selectedExercise ? (
        <>
          <Image source={{ uri: "https://example.com/abs_header.jpg" }} style={{ width: "100%", height: 200 }} />
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
            <Button title="Beginner" onPress={() => setLevel("beginner")} />
            <Button title="Intermediate" onPress={() => setLevel("intermediate")} />
            <Button title="Advanced" onPress={() => setLevel("advanced")} />
          </View>
          <FlatList
            data={abExercises[level]}
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
    const { sound } = await Audio.Sound.createAsync(require("../../assets/alarm.mp3"));
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

export default AbsWorkoutScreen;
