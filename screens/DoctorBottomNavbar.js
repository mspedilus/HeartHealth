import React from 'react'
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

export default function DoctorBottomNavbar() {
    const navigation = useNavigation();

  return (
    <View style={styles.bottomNavView}>
        <View style={styles.buttonRow}>
            <Pressable onPress={() => navigation.navigate("DoctorHome")} style={({pressed}) => pressed ? styles.mainButtonsPressed : styles.mainButtons }>
                <Text style={styles.buttonText}>Home</Text>
                <Ionicons name={'home'} size={25} color={'white'} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("PatientSearchScreen")} style={({pressed}) => pressed ? styles.mainButtonsPressed : styles.mainButtons }>
                <Text style={styles.buttonText}>Patient Search</Text>
                <Ionicons name={'search'} size={25} color={'white'} />
            </Pressable>                                
            <Pressable onPress={() => navigation.navigate("DoctorChatSearchScreen")} style={({pressed}) => pressed ? styles.mainButtonsPressed : styles.mainButtons }>
                <Text style={styles.buttonText}>Chat</Text>
                <Ionicons name={'chatbubble-ellipses'} size={25} color={'white'} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("DoctorSettings")} style={({pressed}) => pressed ? styles.mainButtonsPressed : styles.mainButtons }>
                <Text style={styles.buttonText}>Settings</Text>
                <Ionicons name={'settings'} size={25} color={'white'} />
            </Pressable>
        </View>
        <StatusBar style="auto" />
   </View>
  )
}


const styles = StyleSheet.create({
    bottomNavView: {
        position: 'absolute',
        width: screenWidth,
        bottom: 0
      },
      buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around', 
        left: 10,
        right: 5
      },  
      mainButtons: {
        width: screenWidth / 4,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 10,
        elevation: 3,
        backgroundColor: '#fc3636',
        position: 'relative',
        right:    10,
        bottom:   0,
        paddingBottom: 20,
      },
      mainButtonsPressed: {
        width: screenWidth / 4,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 10,
        elevation: 3,
        backgroundColor: '#fc3636',
        position: 'relative',
        right:    10,
        bottom:   0,
        paddingBottom: 20,
        opacity: 0.7
      },
      buttonText: {
        fontSize: 12,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      }
})
