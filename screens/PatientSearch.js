import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity, Pressable, TextInput, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { userInfo } from '../App';

const screenWidth = Dimensions.get("window").width;

//Searches for an existing patient in the doctor network
export default function PatientSearch() {
  const navigation = useNavigation();
  const [uID, setUID] = useState('');


  async function getValues() {
    if (uID == ''){ //If field is empty
      Alert.alert('Field should not be empty', "Enter a valid ID");
    }
    else{
      var patientUid = await userInfo.patients.some((patient) => {
        if(patient.uid == uID){ 
          return patient.uid
      }})

      if(patientUid == true){
        navigation.navigate("PatientResultSessions", { patientUid: uID })
      }
      else{ 
        Alert.alert("You do not have a patient with the ID:", uID);
      }

    }
  }
  

  return (
    <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}> 
          <Text style={{fontSize: 30}}>Search for a Patient</Text>
          <Text style={{fontSize: 18, marginTop: 10}}>Enter credentials below</Text>
        </View> 

        <View style={{flex: 2}}>
            {/* Input Form */}
            <Text>Patient ID</Text>
            <TextInput style={styles.textInput}
            autoCapitalize = 'none'
            value={uID} 
                onChangeText={uID => setUID (uID)}
            />

            {/* Submit button */}
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity style={styles.submitButton} onPress={() => getValues()}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
        </View>

        {/* Bottom Nav Bar */}
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
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  textInput: {
    backgroundColor: 'white',
    padding: 5,
    marginTop: 5,
    marginBottom: 15,
    borderRadius: 10, 
    borderWidth: 1,
    width: 200,
    height: 35
  },
  header: {
    flex: 0.5,
    paddingTop: 60,
    alignItems: 'center'
  },
  submitButton: {
    backgroundColor: '#fc3636',
    borderRadius: 10,
    width: 90,
    height: 40,
    padding: 10,
    marginTop: 15
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15
  },
  navButtonText: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  navButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
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
    bottom: 0,
    width: screenWidth
  }
});