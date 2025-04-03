// navigation/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import FlightScreen from '../screens/FlightScreen';
import HotelScreen from '../screens/HotelScreen';
import ActivityScreen from '../screens/ActivityScreen';
import ChatScreen from '../screens/ChatScreen';
import ExploreScreen from '../screens/ExploreScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import MenuScreen from '../screens/MenuScreen';
import AiScreen from '../screens/AiScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Explore') iconName = 'compass-outline';


          else if (route.name === 'Chat') iconName = 'chatbubble-ellipses-outline';
          else if (route.name === 'Home') iconName = 'home-outline';

          else if (route.name === 'Favorites') iconName = 'heart-outline';
          else if (route.name === 'Menu') iconName = 'menu-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
      
    </Tab.Navigator>
  );
}