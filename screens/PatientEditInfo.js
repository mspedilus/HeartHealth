import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, {Component} from 'react'
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { db } from "../firebase"; //DO NOT IMPORT FROM 'firebase/firestore/lite'
import { doc, updateDoc, getDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import { userInfo } from '../App'; //require cycle warning


//Edits profile page for patients
const updateDoctorPatients = async (formInputs, newUser) => {
  const oldDoc = doc(db, 'Doctors', userInfo.doctorId);
  const oldDocSnap = await getDoc(oldDoc);
  const newDoc = doc(db, 'Doctors', formInputs.doctorId);
  const newDocSnap = await getDoc(newDoc);
  if (!newDocSnap.exists()) {
      Alert.alert(`No doctor with ID ${formInputs.doctorId}`, 
      "Please double check your new doctor's HeartHealth app ID and try again")
  }
  else {
    if (oldDocSnap.exists()) {
      //Remove patient from old doctor patient field array
      updateDoc(oldDoc, {patients: arrayRemove(userInfo.uid)});
      updateDoc(newDoc, {patients: arrayUnion(userInfo.uid)});
      updateDoc(newUser, formInputs);
      Alert.alert('Submitted', 'Please refresh the application to see your changes reflected on this page');
    }
    else {
      Alert.alert('Error', 'Your current doctor no longer exists in the database');
    }
  }
}


const getData = async (collection, formInputs, uid) => {
  /*
    REFERENCES:
      Reading doc info: https://firebase.google.com/docs/firestore/query-data/get-data
      ^^ Get a Document section
      Updating doc fields: https://firebase.google.com/docs/firestore/manage-data/add-data
      ^^ Update a document section
  */
  const docRef = doc(db, collection, uid);
  const docSnap = await getDoc(docRef);
  if (Object.keys(formInputs).length === 0) {
    Alert.alert('No changes to your info were detected', 'Please type your changes')
  }
  else {
    if (docSnap.exists()) {
      Alert.alert(
        "Confirm changes",
        `Would you like to proceed with updating your information?`,
        [
          {
            text: "Yes",
            onPress: () => {
              if ('doctorId' in formInputs) {
                Alert.alert(
                  "Doctor change", 
                  `Are you sure you would like to change your doctor to ID ${formInputs.doctorId}? This will remove doctor ${userInfo.doctorId}'s access to your data`,
                  [
                    {
                      text: "Yes",
                      onPress: () => {
                        updateDoctorPatients(formInputs, docRef);
                      },
                    },
                    {
                      text: "No",
                    },
                  ]
                );
              }
              else {
                updateDoc(docRef, formInputs);
                Alert.alert('Submitted', 'Please refresh the application to see your changes reflected on this page.');
              }
            },
          },
          {
            text: "No",
          },
        ]
      );
  } 
  else {
      Alert.alert('Error updating info.', 'Please check your email input and try again.');
    }
  }
}

 class PatientEditInfo extends Component {
  state = {
    formInputs: {},
    button1: false,
    button2: false,
    button3: false, 
    button4: false,
    button5: false,
    button6: false,
    button7: false,
    button8: false,
  }
  render() {
    //For dropdown options
    const gender = ["Male", "Female", "Other"];

    //Conditionally change the style of the input form if it selected to be modified
    function selectedFormStyle(selected) {
      return {
        borderWidth: 1, 
        borderRadius: 5,
        paddingStart: 10,
        marginLeft: 30,
        borderColor: 'black',
        padding: 8,
        width: '70%',
        height:'90%',
        backgroundColor: selected === true ? 'gainsboro' : 'white',
      }
    }

    //Conditionally change the style of the gender input form if it selected to be modified
    function selectedGenderFormStyle(selected) {
      return {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: selected === true ? 'gainsboro' : 'white',
        width: '70%',
        height: '160%',
        borderRadius: 5,
        marginRight: 30
      }
    }

      return (
        <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>

        <SafeAreaView style={styles.container}>
            <View >
                  {/* Header */}
                  <View style={styles.heading}> 
                    <Text style={styles.header}>Profile</Text>
                    <Text style={styles.subheader}>Edit your personal information below</Text>
                  </View> 

                  {/* Input Form */}
                  <View style={{flex: 2}}>

                      {/* First Name */}
                      <View style={styles.inputGroup}>
                          <Text style={styles.label}>First Name</Text>

                          <View style={styles.inputRow}>
                            <TextInput style = {selectedFormStyle(this.state.button1)} defaultValue={String(userInfo.firstName)} onChangeText={(text) => this.setState({ formInputs: { ...this.state.formInputs, firstName: text} })}/>
                          </View>
                      </View>

                      {/* Last Name */}
                      <View style={styles.inputGroup}>
                          <Text style={styles.label}>Last Name</Text>
                          <View style={styles.inputRow}>
                            <TextInput style = {selectedFormStyle(this.state.button2)} defaultValue={userInfo.lastName} onChangeText={(text) => this.setState({ formInputs: { ...this.state.formInputs, lastName: text} })}/>
                          </View>
                      </View>

                      {/* Doctor ID */}
                      <View style={styles.inputGroup}>
                          <Text style={styles.label}>Doctor ID</Text>
                          <View style={styles.inputRow}>
                            <TextInput style = {selectedFormStyle(this.state.button3)} defaultValue={userInfo.doctorId} onChangeText={(text) => this.setState({ formInputs: { ...this.state.formInputs, doctorId: text} })}/>
                          </View>
                      </View>

                      {/* Birthday */}
                      <View style={styles.inputGroup}>
                          <Text style={styles.label}>Birthday (MM/DD/YYYY)</Text>
                          <View style={styles.inputRow}>
                            <TextInput style = {selectedFormStyle(this.state.button4)} defaultValue={userInfo.dob} onChangeText={(text) => this.setState({ formInputs: { ...this.state.formInputs, dob: text} })}/>
                          </View>
                      </View>

                      {/* Gender  */}
                      <View style={styles.inputGroup}>
                          <Text style={styles.label}>Gender</Text>
                          <View style={{flexDirection: 'row',    marginBottom: 25}}>
                            <SelectDropdown
                                data={gender}
                                onSelect={(selectedItem) => {
                                  this.setState({ formInputs: { ...this.state.formInputs, gender: selectedItem} })
                                }}
                                defaultButtonText={userInfo.gender}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                  return selectedItem;
                                }}
                                rowTextForSelection={(item, index) => {
                                  return item;
                                }}
                                buttonStyle={selectedGenderFormStyle(this.state.button5)}
                                buttonTextStyle={styles.dropdownText}
                                renderDropdownIcon={(isOpened) => {
                                  return (
                                    <FontAwesome
                                    style={{fontSize: 16}}
                                      name={isOpened ? "chevron-up" : "chevron-down"}
                                      color={"#444"}
                                      // size={16}
                                    />
                                  );
                                }}
                                dropdownIconPosition={"right"}
                                rowStyle={styles.dropdownRow}
                                rowTextStyle={styles.dropdownRowText}
                              />
                          </View>
                      </View>

                      {/* Phone Number */}
                      <View style={styles.inputGroup}>
                          <Text style={styles.label}>Phone Number</Text>
                          <View style={styles.inputRow}>
                            <TextInput style = {selectedFormStyle(this.state.button6)} defaultValue={userInfo.phoneNum} keyboardType={'numeric'} onChangeText={(text) => this.setState({ formInputs: { ...this.state.formInputs, phoneNum: text} })}/>
                          </View>
                      </View>

                      {/* Height */}
                      <View style={styles.inputGroup}>
                          <Text style={styles.label}>Height (cm)</Text>
                          <View style={styles.inputRow}>
                              <TextInput style = {selectedFormStyle(this.state.button7)} defaultValue={userInfo.height} onChangeText={(text) => this.setState({ formInputs: { ...this.state.formInputs, height: text} })}/>
                          </View>
                      </View>

                      {/* Weight */}
                      <View style={styles.inputGroup}>
                          <Text style={styles.label}>Weight (lbs)</Text>
                          <View style={styles.inputRow}>
                              <TextInput style = {selectedFormStyle(this.state.button8)} defaultValue={userInfo.weight} onChangeText={(text) => this.setState({ formInputs: { ...this.state.formInputs, weight: text} })}/>
                          </View>
                      </View>

                    <Text style={{textAlign: 'center', fontStyle: 'italic'}}>Please review your changes before submitting</Text>
                    {/* Submit button */}
                    <View style={{alignItems: 'center'}}>
                      <TouchableOpacity style={styles.button} onPress={() => getData('Patients', this.state.formInputs, userInfo.uid.toString())}>
                        <Text style={styles.buttonText}>Save</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <StatusBar style="auto" />
            </View>
        </SafeAreaView>
        </ScrollView>
        </View>
      );
  }
}


export default function PatientEditInfoScreen() {
    const navigation = useNavigation();
    return (
      <PatientEditInfo/>
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
    borderWidth: 1, 
    borderRadius: 5,
    paddingStart: 15,
    borderColor: 'black',
    padding: 8,
    width: '65%',
    color: 'black'
    
  },
  heading: {
    paddingTop: 20,
    marginBottom: 20,
    alignItems: 'center'
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 10
  },
  dropdownText: {
    fontSize: 15
  },
  dropdownRowText: {
    fontSize: 15
  },
  icon: {
    fontSize: 30,
    marginLeft: 8,
    marginTop: 5
  },
  inputGroup: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 20
  },
  button: {
    backgroundColor: '#fc3636',
    borderRadius: 10,
    width: 90,
    height: 40,
    padding: 10,
    marginVertical: 15

  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15
  
  },
  header: {
    fontSize: 30
  },
  subheader: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20
  },
  label: {
    marginLeft: 20
  }
});