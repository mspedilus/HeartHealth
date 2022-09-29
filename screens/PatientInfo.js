import { SafeAreaView, StyleSheet, Text, View, Pressable, TouchableOpacity, ScrollView, Dimensions, Platform} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import {db} from "../firebase";
import {Divider} from 'react-native-elements';
//Icons
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MovementScreen from './MovementScreen';
 
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
//export default function PatientInfo({route}){

export default function PatientInfo({route}){
    console.log(route)
    route = {"key": "PatientInfo-jJ6ftx7qoUZlame8HYHPR", "name": "PatientInfo", "params": {"userID": "1663521991361"}, "path": undefined}
    const navigation = useNavigation();
    const uID = route.params.userID;
    const [values, setValues] = useState([]);
    useEffect(() => onSnapshot(doc(db, "Patients", uID), (doc) => {
        setValues(doc.data());
    }), []);
  
    return(
        <SafeAreaView style={styles.container}>
                {/* Heading Box */}
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.heading}>{values.firstName} {values.lastName}</Text>
                </View>

                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.biometricText}>Weight: </Text> 
                        <Text style={styles.biometricValue}>{values.weight} lbs</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.biometricText}>Height: </Text> 
                        <Text style={styles.biometricValue}>{values.height} in</Text>
                    </View>
                    {/* Button Row 2 */}
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.biometricText}>Gender: </Text> 
                        <Text style={styles.biometricValue}>{values.gender}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.biometricText}>DOB: </Text> 
                        <Text style={styles.biometricValue}>{values.dob}</Text>
                    </View>
                </View>
            
            <View style={{alignItems: 'center'}}>
                    <Divider style={styles.divider} width={1}/>
            </View>

            {/* Button Section */}
            <ScrollView>
              <View style={styles.buttonBox}> 
                  <Text style={{textAlign: 'center', fontSize: 20}}>Wearable Sensor Data</Text>
                  <View style={styles.buttonRow}>
                      <TouchableOpacity onPress={() => navigation.navigate("ECGScreen", {userID: uID})} style={[styles.button, {backgroundColor: '#f87c7c'}]}>
                          <Text style={styles.buttonText}>Electrocardiogram</Text>
                          <Fontisto style={styles.icon} name={'heartbeat'} size={30} color={'black'}/> 
                      </TouchableOpacity>
                  </View>
                  <View style={styles.buttonRow}>
                      <TouchableOpacity onPress={() => navigation.navigate("ThoracicImpedanceScreen", {userID: uID})} style={[styles.button, {backgroundColor: '#f85353'}]}>
                          <Text style={styles.buttonText}>Thoracic Impedance</Text>
                          <FontAwesome5 style={styles.icon} name={'lungs'} size={30} color={'black'}/> 
                      </TouchableOpacity>
                  </View>
                  <View style={styles.buttonRow}>
                      <TouchableOpacity onPress={() => navigation.navigate("MovementScreen", {userID: uID})} style={[styles.button, {backgroundColor: '#e62e2e'}]}>
                          <Text style={styles.buttonText}>Movement</Text>
                          <FontAwesome5 style={styles.icon} name={'running'} size={35} color={'black'}/> 
                      </TouchableOpacity>
                  </View>
                  <View style={styles.buttonRow}>
                      <TouchableOpacity onPress={() => navigation.navigate("HeartRateScreen", {userID: uID})} style={[styles.button, {backgroundColor: '#971313'}]}>
                          <Text style={styles.buttonText}>Heart Rate</Text>
                          <FontAwesome style={styles.icon} name={'heartbeat'} size={35} color={'black'}/> 
                      </TouchableOpacity>
                  </View>
              </View>
            </ScrollView>

            {/* Nav buttons */}
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
                  <Pressable onPress={() => navigation.navigate("DoctorChatScreen")} style={({pressed}) => pressed ? styles.mainButtonsPressed : styles.mainButtons }>
                  <Text style={styles.buttonText}>Chat</Text>
                  <Ionicons name={'chatbubble-ellipses'} size={25} color={'white'} />
                </Pressable>
              <Pressable onPress={() => navigation.navigate("DoctorSettings")} style={({pressed}) => pressed ? styles.mainButtonsPressed : styles.mainButtons }>
                  <Text style={styles.buttonText}>Settings</Text>
                  <Ionicons name={'settings'} size={25} color={'white'} />
                </Pressable>
              </View>
            </View>
        </SafeAreaView>
    );
  }


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'white'
    },
    headerBox: {
      flex: 1,
    },

    buttonBox: {
      alignItems: 'center',
      right: 10,
    },
    button: {
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'lightblue',
      flexDirection: 'row',
      padding: 20,
      margin: 10,
      borderRadius: 10,
      width: '80%',
      height: screenHeight / 10,
      shadowColor: 'black',
      shadowOffset: {height: 4},
      shadowOpacity: 0.6,
      shadowRadius: 6,
      },
    heading: {
      fontSize: 35,
      padding: 5,
      marginTop: 10
    },
    icon: {
      padding: 10,
      marginLeft: 10
    },
    buttonText: {
      color: 'white',
      textAlign: 'left',
      fontSize: 20
    },
    biometricText: {
      fontSize: 15,
      paddingTop: 2,
      paddingBottom: 2,
      fontWeight: 'bold'
    },
    biometricValue: {
      paddingTop: 2,
      paddingBottom: 2,
      fontSize: 15
    },
    divider: {
      width: '85%',
      margin: 20
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
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-around', 
      left: 10,
      right: 5
    },
    buttonText: {
      fontSize: 12,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    bottomNavView: {
      position: 'absolute',
      width: screenWidth,
      bottom: 0,
    }
  });