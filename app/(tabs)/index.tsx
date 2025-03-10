import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from '../../screens/ThemeContext';
import Welcome from '../../screens/welcome';
import Login from '../../screens/Login';
import Signup from '../../screens/Signup';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="welcome">
          <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="Log In" component={Login} />
          <Stack.Screen name="Sign Up" component={Signup} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
