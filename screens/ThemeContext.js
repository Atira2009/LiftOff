import { useColorScheme } from 'react-native';
import React, { createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();
const themes= {
    blue: { primary: '#E3F2FD', secondary: '#64B5F6', tertiary: '#1976D2' },
    green: { primary: '#E8F5E9', secondary: '#81C784', tertiary: '#388E3C' },
    red: { primary: '#FFEBEE', secondary: '#E57373', tertiary: '#D32F2F' },
    purple: { primary: '#F3E5F5', secondary: '#BA68C8', tertiary: '#7B1FA2' },
    yellow: { primary: '#FFFDE7', secondary: '#FFF176', tertiary: '#FBC02D' },
    orange: { primary: '#FFF3E0', secondary: '#FFB74D', tertiary: '#E65100' },
};

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('system');
    const deviceTheme = useColorScheme();

    useEffect (()=>{
        loadTheme();
    }, []);

    const loadTheme = async () =>{
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme){
            setTheme(savedTheme);
        }
    };

    const getTheme = () => {
        if (theme == 'system'){
            return deviceTheme === 'dark'
                ? { primary: '#121212', secondary: '#BBBBBB', tertiary: '#6200EE' }
                : { primary: '#FFFFFF', secondary: '#222222', tertiary: '#6200EE' };
        }
        return themes[theme];
    };

    return (
        <ThemeContext.Provider value={{ theme: getTheme(), setTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext