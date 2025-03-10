import React, { useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({ navigation }) => {
  const navigateToEditProfile = useCallback(() => navigation.navigate('Edit Profile'), [navigation]);
  const navigateToNotifications = useCallback(() => navigation.navigate('Notifications'), [navigation]);
  const navigateToSupport = useCallback(() => navigation.navigate('Support'), [navigation]);
  const navigateToLanguage = useCallback(() => navigation.navigate('Languages'), [navigation]);
  const navigateToColorPalettes = useCallback(() => navigation.navigate('Themes'), [navigation]);
  
  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  const accountItems = [
    { icon: 'person-outline', text: 'Edit Profile', action: navigateToEditProfile },
    { icon: 'notifications-none', text: 'Notifications', action: navigateToNotifications },
  ];

  const supportItems = [
    { icon: 'help-outline', text: 'Help & Support', action: navigateToSupport },
    { icon: 'language', text: 'Language', action: navigateToLanguage }
  ];

  const actionItems = [
    { icon: 'logout', text: 'Log Out', action: logout },
    { icon: 'palette', text: 'Color Palettes', action: navigateToColorPalettes }
  ];

  const renderSettingsItem = ({ icon, text, action }) => (
    <TouchableOpacity
      onPress={action}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingLeft: 16,
        backgroundColor: Colors.light.background,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.light.icon,
      }}
    >
      <MaterialIcons name={icon} size={24} color="black" />
      <Text style={{ marginLeft: 20, fontSize: 16, fontWeight: '600' }}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
      <View style={{ marginHorizontal: 12, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 0 }}>
          <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>Settings</Text>
      </View>

      <ScrollView style={{ marginHorizontal: 12 }}>
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', marginVertical: 10 }}>Account</Text>
          <FlatList
            data={accountItems}
            renderItem={({ item }) => renderSettingsItem(item)}
            keyExtractor={(item) => item.text} // Use a unique key
          />
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', marginVertical: 10 }}>Support and About</Text>
          <FlatList
            data={supportItems}
            renderItem={({ item }) => renderSettingsItem(item)}
            keyExtractor={(item) => item.text}
          />
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', marginVertical: 10 }}>Actions</Text>
          <FlatList
            data={actionItems}
            renderItem={({ item }) => renderSettingsItem(item)}
            keyExtractor={(item) => item.text}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;