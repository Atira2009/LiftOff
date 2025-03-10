import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you install react-native-vector-icons
import Home from '../screens/Home.js';
import Progress from '../screens/Progress.js';
import Settings from '../screens/Settings.js';

  // Sample Data (Replace with actual data)
  const bodyParts = [
    { name: 'Arms', image: { uri: 'file:///New%20folder/LiftOff/assets/images/Arms.png'}, screen: 'WorkoutsArms' },
    { name: 'Legs', image: { uri: 'file:///New%20folder/LiftOff/assets/images/Legs.png'}, screen: 'WorkoutsLegs' },
    { name: 'Glutes', image: { uri: 'file:///New%20folder/LiftOff/assets/images/Glutes.png'}, screen: 'WorkoutsGlutes' },
    { name: 'Chest', image: { uri: 'file:///New%20folder/LiftOff/assets/images/Chest.png'}, screen: 'WorkoutsChest' },
    { name: 'Back', image: { uri: 'file:///New%20folder/LiftOff/assets/images/Back.png'}, screen: 'WorkoutsBacks' },
    { name: 'Abs', image: { uri: 'file:///New%20folder/LiftOff/assets/images/Abs.png'}, screen: 'WorkoutsAbs' },
    { name: 'Full Body', image:  { uri: 'file:///New%20folder/LiftOff/assets/images/FullBody.png'}, screen: 'WorkoutsFullBody' },
  ];
  
  const BodyParts = () => {
    const navigation = useNavigation();
  
    return (
      <View className="mx-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text style={{ fontSize: 20 }} className="font-semibold text-neutral-700">
            Workout Exercises
          </Text>
  
          {/* Saved Workouts Icon */}
          <TouchableOpacity onPress={() => navigation.navigate('SavedWorkouts')}>
            <Icon name="bookmark" size={28} color="#0163d2" />
          </TouchableOpacity>
        </View>
  
        <FlatList
          data={bodyParts}
          numColumns={2}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50, paddingTop: 20 }}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          renderItem={({ item }) => <BodyPartCard navigation={navigation} item={item} />}
        />
      </View>
    );
  };
  
  const BodyPartCard = ({ item, navigation }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)} // Navigate to the correct page
          style={{ width: 100, height: 120 }}
          className="flex justify-end p-4 mb-4"
        >
          <Image
            source={item.image}
            resizeMode="cover"
            style={{ width: 100, height: 120, borderRadius: 35 }}
            className="absolute"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.9)']}
            style={{
              width: 100,
              height: 30,
              position: 'absolute',
              bottom: 0,
              borderBottomLeftRadius: 35,
              borderBottomRightRadius: 35,
            }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
          <Text style={{ fontSize: 14 }} className="text-white font-semibold text-center tracking-wide">
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  // Drawer Navigation
  const Drawer = createDrawerNavigator();
  
  const App = () => {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            statusBarColor: '#0163d2',
            headerStyle: {
              backgroundColor: '#0163d2',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerLeft: ({ navigation }) => {
              return (
                <Icon
                  name="menu"
                  onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                  size={30}
                  color="#fff"
                />
              );
            },
          }}
        >
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Progress" component={Progress} />
          <Drawer.Screen name="Settings" component={Settings} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  };
  
  export default App;