import React, {useState} from 'react';
import { StyleSheet, Text, ScrollView, TextInput, Alert, SafeAreaView, Pressable, View } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { query, doc, setDoc, getDocs, getDoc, updateDoc, collection, getFirestore, arrayUnion, orderBy } from "firebase/firestore";

function RegisterScreen() {
  const auth = getAuth();
  const db = getFirestore();
  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(false)

  const [values, setValues] = useState({
      firstName: "",
      lastName: "",
      dob: "",
      role: "",
      gender: "",
      email: "",
      phoneNum: "",
      height: "",
      weight: "",
      affiliation: "",
      designation: "",
      workPhone: "",
      workFax: "",
      workAddress: "",
      doctorId: "",
      patients: [],
      ongoingConversations: [],
      pwd: "",
      pwd2: "",
  })

  function handleChange(text, eventName) {
      setValues(prev => {
          return {
              ...prev,
              [eventName]: text
          }
      })
  }

  async function getLastId(role) {
    const newIdArr = []

    const q = query(collection(db, role + "s"), orderBy("uid", "asc"));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      console.log(doc.id);
      newIdArr.push(doc.id);
    })
    return (newIdArr[newIdArr.length - 1]);
    }


  async function SignUp() { 
    const { firstName, lastName, role, email, phoneNum, dob, gender, height, weight, 
      affiliation, designation, workPhone, workFax,workAddress, doctorId, patients, pwd, pwd2, ongoingConversations } = values

      const lastId = await getLastId(role);
      const newId =  new Date().getTime(); //Creates unique property id 
      //const newId = Number(lastId) + 1;
     
  
      //checks password  
      if (pwd == pwd2) {
        //checks role
        if (role == "Doctor") {
          createUserWithEmailAndPassword(auth, email, pwd)
          .then(() => {
            setDoc(doc(collection(db, role + "s"), String(newId)), {
              uid: newId,
              firstName,
              lastName,
              role,
              email,
              phoneNum,
              affiliation,
              designation,
              workPhone,
              workFax,
              workAddress,
              patients,
              ongoingConversations
            })
          })
          .catch((error) => {
              alert(error.message)
          });
        }
        else if (role == "Patient") {
          const docRef = doc(db, 'Doctors', doctorId);
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            Alert.alert(`No doctor with ID ${doctorId}`, 
            "Please double check your doctor's HeartHealth app ID and try again")
          }
          else {
            createUserWithEmailAndPassword(auth, email, pwd)
                .then(() => {
                  setDoc(doc(collection(db, role + "s"), String(newId)), {
                    uid: newId,
                    firstName,
                    lastName,
                    role,
                    email,
                    phoneNum,
                    gender,
                    dob,
                    height,
                    weight,
                    doctorId,
                  })
                })
                .catch((error) => {
                    alert(error.message)
                });
            updateDoc(docRef, {patients: arrayUnion({uid: newId, firstName: firstName, lastName: lastName})});
          }
        }
        else {
          alert("Not a valid user!");
        }
      } 
      else {
          alert("Passwords are different!");
      }
  }

  const userType = ["Patient", "Doctor"];

  const affiliation = ["Hospital", "Clinic"];
  const designation = ["MD", "PA", "DNP", "CNP"];
  const gender = ["Male", "Female", "Other"];

    return (
      <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} >

  <SafeAreaView >
    <Text style={styles.textInBackground}>Register</Text>
      <KeyboardAwareScrollView behavior={Platform.select({android: undefined, ios: 'padding'})}style={styles.mainContent}> 
        <Text style={styles.titleText}>First Name</Text>
        <TextInput style={styles.input} onChangeText={text => handleChange(text, "firstName")} />
        <Text style={styles.titleText}>Last Name</Text>
        <TextInput style={styles.input} onChangeText={text => handleChange(text, "lastName")} />
        <Text style={styles.titleText}>Email Address</Text>
        <TextInput style={styles.input} keyboardType="email-address" onChangeText={text => handleChange(text.toLowerCase(), "email")} />
        <Text style={styles.titleText}>Personal Phone Number</Text>
        <TextInput style={styles.input} keyboardType="numeric" onChangeText={text => handleChange(text, "phoneNum")} />
        {/* Role */}
        <Text style={styles.titleText}>User Role</Text>
        <SelectDropdown
            data = {userType}
            onSelect = {(selectedItem, index) => {
                setShow(false);

                if (selectedItem == "Patient") {
                    setShow(true);
                    setShow2(false);
                    handleChange(selectedItem, "role");
                  }
                if (selectedItem == "Doctor") {
                    setShow2(true);
                    setShow(false);
                    handleChange(selectedItem, "role");
                }

            }}

            defaultButtonText={"Select role..."}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown4BtnStyle}
            buttonTextStyle={styles.dropdown4BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#444"}
                  size={13}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown4DropdownStyle}
            rowStyle={styles.dropdown4RowStyle}
            rowTextStyle={styles.dropdown4RowTxtStyle}
        />

        {/* Patient Questions */}
          {
            show?<TextInput style={styles.input} keyboardType="numeric" placeholder="Date of Birth (MM/DD/YYYY)" onChangeText={text => handleChange(text, "dob")} />:null
          }
          {
            show?
            <SelectDropdown
            data={gender}
            onSelect={(selectedItem, index) => {
              handleChange(selectedItem, "gender");
            }}
            defaultButtonText={"Select gender..."}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown4BtnStyle}
            buttonTextStyle={styles.dropdown4BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#444"}
                  size={13}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown4DropdownStyle}
            rowStyle={styles.dropdown4RowStyle}
            rowTextStyle={styles.dropdown4RowTxtStyle}
          />:null
          }
          {
            show?<TextInput style={styles.input} placeholder="Height (in)" keyboardType="numeric" onChangeText={text => handleChange(text, "height")} />:null
          }
          {
            show?<TextInput style={styles.input} placeholder="Weight (lb)" keyboardType="numeric" onChangeText={text => handleChange(text, "weight")} />:null
          }
          {
            show?<TextInput style={styles.input} placeholder="Doctor ID" keyboardType="numeric" onChangeText={text => handleChange(text, "doctorId")} />:null
          }

        {/* Doctor Questions */}
          {/* Affiliation */}
          {
            show2?
            <SelectDropdown
            data={affiliation}
            onSelect={(selectedItem, index) => {
              handleChange(selectedItem, "affiliation");
            }}
            defaultButtonText={"Select affiliation..."}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown4BtnStyle}
            buttonTextStyle={styles.dropdown4BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#444"}
                  size={13}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown4DropdownStyle}
            rowStyle={styles.dropdown4RowStyle}
            rowTextStyle={styles.dropdown4RowTxtStyle}
          />:null
          }

          {/* Designation */}
          {
            show2?
            <SelectDropdown
            data={designation}
            onSelect={(selectedItem, index) => {
              handleChange(selectedItem, "designation");
            }}
            defaultButtonText={"Select designation..."}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown4BtnStyle}
            buttonTextStyle={styles.dropdown4BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#444"}
                  size={13}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown4DropdownStyle}
            rowStyle={styles.dropdown4RowStyle}
            rowTextStyle={styles.dropdown4RowTxtStyle}
          />:null
          }
          {
          show2?<TextInput style={styles.input} placeholder="Work Phone Number" keyboardType="numeric" onChangeText={text => handleChange(text, "workPhone")} />:null
         }
        
          {
          show2?<TextInput style={styles.input} placeholder="Work Fax Number" keyboardType="numeric" onChangeText={text => handleChange(text, "workFax")} />:null
          }

          {
          show2?<TextInput style={styles.input} placeholder="Full Work Address" onChangeText={text => handleChange(text, "workAddress")} />:null
          }

        <Text style={styles.titleText}>Password</Text>
        <TextInput style={styles.input} secureTextEntry={true}  onChangeText={text => handleChange(text, "pwd")} />
        <Text style={styles.titleText}>Confirm Password</Text>
        <TextInput style={styles.input} secureTextEntry={true}  onChangeText={text => handleChange(text, "pwd2")} />

        <Pressable onPress={() => SignUp()} style={styles.mainButtons}>
        <Text style={styles.buttonText}>Register</Text>
        </Pressable>
        

      </KeyboardAwareScrollView> 
  </SafeAreaView>
  </ScrollView>
          </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fc3636',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainContent: {
      backgroundColor: "white",
      borderRadius: 9,
      padding: 30,
      width: 350,
      marginBottom: 10
    },
    textInBackground: {
      fontSize: 45,
      color: "white",
      fontWeight: 'bold',
      marginVertical: 8,
      textAlign: 'center'
    },
    mainButtons: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#fc3636',
      margin: 10,
    },
    buttonText: {
      fontSize: 20,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    titleText: {
      fontWeight: "bold",
      alignItems: 'stretch',
      marginLeft: 12,
    },
    input: {
      height: 40,
      width: 250,
      margin: 10,
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      borderColor: "#c5c3c3",
      overflow: "hidden",
    },
    dropdown: {
      flex: 1,
    },
    dropdown4BtnStyle: {
      width: 230,
      marginTop: 10,
      marginBottom: 10,
      height: 34,
      backgroundColor: "#FFF",
      borderWidth: 1,
      borderRadius: 5,
      borderColor: "#c5c3c3",
      width: 210,
      left: 10,
    },
    dropdown4BtnTxtStyle: { color: "#444", textAlign: "left" },
    dropdown4DropdownStyle: { backgroundColor: "#EFEFEF", width: 210, },
    dropdown4RowStyle: {
      backgroundColor: "#EFEFEF",
      borderBottomColor: "#C5C5C5",
    },
    dropdown4RowTxtStyle: { color: "#444", textAlign: "left" },
    label: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    closeInput: {
      height: 40,
      margin: 10,
      borderWidth: 1,
      padding: 10,
      borderColor: "#888",
      flex: 1,
    },
  });

export default RegisterScreen; 