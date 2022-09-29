import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import DoctorHome from './DoctorHome.js';
import PatientSearch from './PatientSearch.js';
import DoctorSettings from './DoctorSettings.js';


const Tab = createBottomTabNavigator();

function BottomNavBar() {
        return (
          <NavigationContainer independent={true}>
            <Tab.Navigator
                initialRouteName={'DoctorHome'}
                tabBarOptions={{
                activeTintColor: 'white',
                inactiveTintColor: 'lightslategrey',
                activeBackgroundColor: '#0a233b',
                inactiveBackgroundColor: '#0a233b',
            }}
                >
        
                <Tab.Screen 
                name={'DoctorHome'} 
                component={DoctorHome} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                    <Ionicons name={'home'} size={25} color={color} />
                    ),
                }}
                />
        
                <Tab.Screen 
                name={'Patient Search'} 
                component={PatientSearch} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                    <Ionicons name={'search'} size={25} color={color} />
                    ),
                }}
                />
        
                <Tab.Screen 
                name={'DoctorSettings'} 
                component={DoctorSettings} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                    <Ionicons name={'settings'} size={25} color={color} />
                    ),
                }}
                />
        
            </Tab.Navigator>
        </NavigationContainer>
      );
}

export default BottomNavBar;