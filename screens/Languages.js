import React, { useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const languages = [
    {code: 'en', name: 'English'},
    {code: 'zh', name: 'Mandarin Chinese'},
    {code: 'hi', name: 'Hindi'},
    {code: 'es', name: 'Spanish'},
    {code: 'fr', name: 'French'},
    {code: 'ar', name: 'Arabic'},
    {code: 'bn', name: 'Bengali'},
    {code: 'ru', name: 'Russian'},
    {code: 'pt', name: 'Portuguese'},
    {code: 'ur', name: 'Urdu'},
];

export default function LanguageSelectionScreen({navigation}) {
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    useEffect(()=>{
        loadLanguage();
    }, []);

    const loadLanguage = async () =>{
        const savedLanguage = await AsyncStorage.getItem('language');
        if(savedLanguage) {
            setSelectedLanguage(savedLanguage);
        }
    };

    const saveLanguage = async (language) =>{
        setSelectedLanguage(language);
        await AsyncStorage.setItem('language', language);
    };

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Choose Your Language</Text>
            <FlatList
                data={languages}
                keyExtractor={(item) => item.code}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={()=> saveLanguage(item.code)}
                        style={[
                            styles.languageButton,
                            selectedLanguage === item.code ? styles.selectedButton : {}
                        ]}
                    >
                        <Text style={styles.languageText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    languageButton: {
        backgroundColor: '#E0E0E0',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: '#1976D2',
    },
    languageText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    }
});