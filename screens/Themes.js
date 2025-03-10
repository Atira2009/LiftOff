import { View, Text, TouchableOpacity, FlatList, useColorScheme } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const themesData = {
    blue: { primary: '#E3F2FD', secondary: '#64B5F6', tertiary: '#1976D2' },
    green: { primary: '#E8F5E9', secondary: '#81C784', tertiary: '#388E3C' },
    red: { primary: '#FFEBEE', secondary: '#E57373', tertiary: '#D32F2F' },
    purple: { primary: '#F3E5F5', secondary: '#BA68C8', tertiary: '#7B1FA2' },
    yellow: { primary: '#FFFDE7', secondary: '#FFF176', tertiary: '#FBC02D' },
    orange: { primary: '#FFF3E0', secondary: '#FFB74D', tertiary: '#E65100' },
    system: null,
};

export default function Themes({ navigation }) {
    const [selectedTheme, setSelectedTheme] = useState('system');
    const deviceTheme = useColorScheme();

    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
            setSelectedTheme(savedTheme);
        }
    };

    const saveTheme = async (theme) => {
        setSelectedTheme(theme);
        await AsyncStorage.setItem('theme', theme);
    };

    const getCurrentTheme = () => {
        if (selectedTheme === 'system') {
            return deviceTheme === 'dark'
                ? { primary: '#121212', secondary: '#BBBBBB', tertiary: '#6200EE' }
                : { primary: '#FFFFFF', secondary: '#222222', tertiary: '#6200EE' };
        }
        return themesData[selectedTheme];
    };

    const currentTheme = getCurrentTheme();

    return (
        <View style={{ flex: 1, backgroundColor: currentTheme.primary, padding: 20 }}>
            <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: currentTheme.secondary,
                marginBottom: 20,
            }}>
                Choose Your Theme
            </Text>

            <FlatList
                data={Object.keys(themesData)}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => saveTheme(item)}
                        style={{
                            backgroundColor: themesData[item]?.tertiary || currentTheme.tertiary,
                            padding: 15,
                            borderRadius: 10,
                            marginBottom: 10,
                            alignItems: 'center',
                            opacity: selectedTheme === item ? 1 : 0.7,
                        }}
                    >
                        <Text style={{
                            color: '#FFF',
                            fontWeight: 'bold',
                        }}>
                            {item === 'system' ? 'System Default' : item.charAt(0).toUpperCase() + item.slice(1)}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
