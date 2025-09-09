import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './src/screens/ProfileScreen';
import { View, Text } from 'react-native';
import * as Linking from 'expo-linking';

const prefix = Linking.createURL('/');

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="About" component={() => (
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <Text>About</Text>
        </View>
      )} />
    </Tab.Navigator>
  );
}

export default function App() {
  const linking = {
    prefixes: [prefix, 'mykprofile://'],
    config: {
      screens: {
        Profile: 'profile',
        About: 'about'
      }
    }
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
