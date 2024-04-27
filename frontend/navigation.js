import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for custom icons
import HomeScreen from './Pages/HomeScreen';
import Exercises from './Pages/Exercise';
import React from 'react';
import Login from './Pages/Login';
import SetLog from './Pages/SetLog';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const token = "patxJisjLrPXSayT6.8b931c7c05bc4cdad24ef9507dcc09377c43209e5b52dbf83658b5d659fe6664";

function TabNavigator({ navigation, route }) {
  const currentUser = route.params;
  // console.log(currentUser);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#1C1C1C',
        },
        tabBarActiveTintColor: '#39FF14', // Change color of active tab icon
        tabBarInactiveTintColor: '#ffffff', // Change color of inactive tab icon
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} /> // Use Ionicons for custom icons
          ),
        }}
        initialParams={currentUser}
      />
      <Tab.Screen
        name="Exercises"
        component={Exercises}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="barbell-outline" size={size} color={color} /> // Use Ionicons for custom icons
          ),
        }}
        initialParams={currentUser}
      />
      <Tab.Screen
        name="Log Your Workouts"
        component={SetLog}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="clipboard-outline" size={size} color={color} /> // Use Ionicons for custom icons
          ),
        }}
        initialParams={currentUser}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
