import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, {Component} from 'react'
import { db } from "../firebase"; //DO NOT IMPORT FROM 'firebase/firestore/lite'
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import { userInfo } from '../App';

//Edits doctor profile page
const getData = async (collection, formInputs, uid) => {

  const docRef = doc(db, collection, uid);
  const docSnap = await getDoc(docRef);

  if (Object.keys(formInputs).length === 0) {
    Alert.alert('No changes to your info were detected. Please type your changes.')
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
              updateDoc(docRef, formInputs);
              Alert.alert('Submitted', 'Please refresh the application to see your changes reflected on this page.');
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

 class DoctorEditInfo extends Component {
  //skipping button 3 was intentional - due to an old input being removed
  state = {
    formInputs: {},
    button1: false,
    button2: false,
    button4: false,
    button5: false,
    button6: false,
    button7: false,
    button8: false,
  }

  render() {
    //Conditionally change the style of the input form if it selected to be modified
    function selectedFormStyle(selected) {
      return {
        borderWidth: 1, 
        borderRadius: 5,
        paddingStart: 15,
        marginBottom: 10,
        marginLeft: 30,
        marginTop: 5,
        borderColor: 'black',
        padding: 8,
        width: '70%',
        backgroundColor: '#',
      }
    }

      return (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.container}>

                  {/* Header */}
                  <View style={styles.header}> 
                    <Text style={{fontSize: 30}}>Personal Information</Text>
                    <Text style={{fontSize: 18, marginTop: 10, marginBottom: 20}}>Edit your personal information below</Text>
                  </View> 

                  {/* Input Form */}
                  <View style={{flex: 2}}>

                      {/* First Name */}
                      <View style={styles.inputGroup}>
                          <Text style={styles.label}>First Name</Text>
                          <View style={styles.inputRow}>
                            <TextInput style = {selectedFormStyle(this.state.button1)} defaultValue={userInfo.firstName} onChangeText={(text) => this.setState({ formInputs: { ...this.state.formInputs, firstName: text} })}/>
                          </View>
                      </View>

                      {/* Last Name */}
                      <View style={styles.inputGroup}>
                          <Text style={styles.label}>Last Name</Text>
                          <View style={styles.inputRow}>
                            <TextInput style = {selectedFormStyle(this.state.button2)} defaultValue={userInfo.lastName} onChangeText={(text) => this.setState({ formInputs: { ...this.state.formInputs, lastName: text} })}/>
                          </View>
                      </View>

                      {/* Affiliation */}
                      <View style={styles.inputGroup}>
                          <Text style={styles.label}>Affiliation</Text>
                          <View style={styles.inputRow}>
                            <TextInput style = {selectedFormStyle(this.state.button4)} defaultValue={userInfo.affiliation} onChangeText={(text) => this.setState({ formInputs: { ...this.state.formInputs, affiliation: text} })}/>
                          </View>
                      </View>

                      {/* Designation */}
                      <View style={styles.inputGroup}>
                          <Text style={styles.label}>Designation</Text>
                          <View style={styles.inputRow}>
                            <TextInput style = {selectedFormStyle(this.state.button5)} defaultValue={userInfo.designation} onChangeText={(text) => this.setState({ formInputs: { ...this.state.formInputs, designation: text} })}/>
                          </View>
                      </View>

                      {/* Phone Number */}
                      <View style={styles.inputGroup}>
                          <Text style={styles.label}>Phone Number</Text>
                          <View style={styles.inputRow}>
                            <TextInput style = {selectedFormStyle(this.state.button6)} defaultValue={userInfo.phoneNum} keyboardType={'numeric'} onChangeText={(text) => this.setState({ formInputs: { ...this.state.formInputs, phoneNum: text} })}/>
                          </View>
                      </View>

                  <View style={{marginTop: 30}}>
                      <Text style={{textAlign: 'center', fontStyle: 'italic'}}>Please review your changes before submitting</Text>
                      {/* Submit button */}
                      <View style={{alignItems: 'center'}}>
                        <TouchableOpacity style={styles.button} onPress={() => getData('Doctors', this.state.formInputs, userInfo.uid.toString())}>
                          <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                      </View>
                  </View>

                  </View>
                  <StatusBar style="auto" />
            </View>
          </ScrollView>
        </SafeAreaView>
      );
  }
}

export default function DoctorEditInfoScreen() {
    const navigation = useNavigation();
    return (
      <DoctorEditInfo/>
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
    marginBottom: 10,
    borderColor: 'black',
    padding: 8,
    width: '55%',
  },
  header: {
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
    marginLeft: 8,
    marginTop: 5
  },
  inputGroup: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#fc3636',
    borderRadius: 10,
    width: 90,
    height: 40,
    padding: 10,
    marginTop: 15
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15
  },
  label: {
    marginLeft: 20
  }
});