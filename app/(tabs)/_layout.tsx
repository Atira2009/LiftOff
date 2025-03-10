import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import Home from '../../screens/Home';
import Progress from '../../screens/Progress';
import Settings from '../../screens/Settings';
import {Ionicons} from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

export default function DrawerLayout() {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        }}>
          <Drawer.Screen 
            name="Home"
            component={Home}
            options={{
              drawerIcon: ({color,size}) =>(
                <Ionicons name="home" size={size} color={color} />
              ),
            }}
          />

          <Drawer.Screen 
            name="Progress"
            component={Progress}
            options={{
              drawerIcon: ({color,size}) =>(
                <Ionicons name="bar-chart" size={size} color={color} />
              ),
            }}
          />

          <Drawer.Screen 
            name="Settings"
            component={Settings}
            options={{
              drawerIcon: ({color,size}) =>(
                <Ionicons name="settings" size={size} color={color} />
              ),
            }}
          />
        </Drawer.Navigator>
    </NavigationContainer>
  );
}
