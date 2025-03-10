import { View, Text, TextInput, Button, Image, TouchableOpacity, Alert } from 'react-native';
import React, {useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState('');
  const [age,setAge] = useState('11');
  const [email, setEmail] =useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });

    if (!result.canceled){
      setProfilePic(result.asset[0].uri);
    };
  };

    const saveProfile = () => {
      if (password !== confirmPassword){
        Alert.alert('Error', 'Passwords do not match!');
        return;
      }
      Alert.alert('Success', 'Profile updated successfully!');
    };

    return (
      <View style={{
        padding:20,
        alignItems: 'center'
      }}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={profilePic ?{uri: profilePic} : { uri: 'file:///New%20folder/LiftOff/assets/images/react-logo.png'}}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              marginBottom: 20,
            }}
          />
            <Text style={{
              color: 'green'
            }}>Edit Profile Picture</Text>
        </TouchableOpacity>
        <TextInput placeholder="Enter Name" value={name} onChangeText={setName} styles={styles.input}/>
        <TextInput placeholder ="Enter Age (11-18)" keyboardType ="numeric" value={age} onChangeText={(value)=> {
          if (parseInt(value) = 11 && parseInt(value) <= 18) setAge(value);
        }}
        styles={styles.input}/>
        <TextInput placeholder="Enter Email" value={email} onChangeText={setEmail} style={styles.input}/>
        <TextInput placeholder="New Password" secureTextEntry value={password} onChangeText={setPassword} styles={styles.input}/>
        <TextInput placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} styles={styles.input}/>
        <Button title="Save Profile" onPress={saveProfile}/>
        <Text style={{
          fontSize: 18,
          marginVertical: 20
        }}> Your Rewards</Text>
        <View style={styles.rewardsBox}>
          <Text>No rewards yet.</Text>
        </View>
        <Button title="Log Out" color="red" onPress={() => navigation.replace('welcome')}/>
      </View>
  );
};

const styles ={
  input:{
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
    borderRadius: 5,
  },
  rewardsBox:{
    width:'100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
  },
};

export default ProfileScreen;