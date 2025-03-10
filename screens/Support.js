import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

export default function SupportScreen() {
  const [message, setMessage] = useState('');
  const supportEmail = 'atira.harimohan@huschennai.in';

  const sendSupportEmail = async () => {
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter a message before sending.');
      return;
    }

    const isAvailable = await MailComposer.isAvailableAsync();
    if (!isAvailable) {
      Alert.alert('Error', 'Email service is not available on this device.');
      return;
    }

    MailComposer.composeAsync({
      recipients: [supportEmail],
      subject: 'Support Request',
      body: message,
    });

    setMessage('');
    Alert.alert('Success', 'Your message has been sent to support!');
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f9f9f9' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Support & Help</Text>
      <Text style={{ fontSize: 16, marginBottom: 20 }}>
        Welcome to the support section! This app helps you track and improve your workouts
        with structured training plans, progress tracking, and rewards.
      </Text>
      
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>Features:</Text>
      <Text>- Personalized workout routines</Text>
      <Text>- Progress tracking</Text>
      <Text>- Save and revisit workouts</Text>
      <Text>- Reward system for achievements</Text>
      <Text>- Custom themes and settings</Text>
      
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>Need Help?</Text>
      <Text style={{ marginBottom: 10 }}>Send us a message below:</Text>

      <TextInput
        style={{ height: 100, borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 8, marginBottom: 10 }}
        placeholder='Enter your message here...'
        multiline
        value={message}
        onChangeText={setMessage}
      />

      <TouchableOpacity onPress={sendSupportEmail} style={{ backgroundColor: '#007AFF', padding: 15, borderRadius: 10 }}>
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Send Message</Text>
      </TouchableOpacity>
    </View>
  );
}
