import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, TextInput, Button, Alert } from "react-native";
import { Audio } from "expo-av";

const armExercises = {
    beginner: [
        { name: "Bicep Curls", description: "Curl dumbbells to work biceps.", gif: require("../../assets/bicepcurls.gif") },
        { name: "Tricep Dips on Chair", description: "Use a chair to lower your body with triceps.", gif: require("../../assets/tricepdiponchairs.gif") },
        { name: "Resistance Band Curls", description: "Use a band for controlled bicep curls.", gif: require("../../assets/resistancebandcurls.gif") },
        { name: "Diamond Push-ups", description: "Push-ups with hands close together.", gif: require("../../assets/diamondpushups.gif") },
        { name: "Overhead Tricep Extensions", description: "Extend a dumbbell overhead.", gif: require("../../assets/overheadtricepextensions.gif") },
      ],
      intermediate: [
        { name: "Dumbbell Hammer Curls", description: "Curl dumbbells with neutral grip.", gif: require("../../assets/dumbbellhammercurls.gif") },
        { name: "Cable Tricep Pushdowns", description: "Push down using a cable machine.", gif: require("../../assets/cabltriceppushdown.gif") },
        { name: "Preacher Curls", description: "Use a preacher bench for biceps.", gif: require("../../assets/preachercurls.gif") },
        { name: "Concentration Curls", description: "Isolate biceps with single-arm curls.", gif: require("../../assets/concentrationcurls.gif") },
        { name: "Skull Crushers", description: "Lower weights towards forehead." , gif: require("../../assets/skullcrushers.gif")},
      ],
      advanced: [
        { name: "Weighted Dips", description: "Perform tricep dips with added weight.", gif: require("../../assets/weighteddips.gif") },
        { name: "Barbell Curls", description: "Use a barbell for heavy bicep curls." , gif: require("../../assets/barbellcurls.gif")},
        { name: "Reverse Curls", description: "Curl with palms facing downward.", gif: require("../../assets/reversecurls.gif") },
        { name: "Zottman Curls", description: "Combine regular and reverse curls." , gif: require("../../assets/zottmancurls.gif")},
        { name: "Close-grip Bench Press", description: "Bench press with a narrow grip.", gif: require("../../assets/closegrip.gif") },
      ],
};

const ArmsWorkoutScreen = () => {
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
            data={armExercises[level]}
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

export default ArmsWorkoutScreen;
