import React, {useState, useRef, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';
import { db } from "../firebase"; //DO NOT IMPORT FROM 'firebase/firestore/lite'
import { doc, getDoc, setDoc, collection, orderBy, query, serverTimestamp, updateDoc  } from 'firebase/firestore';
import { userInfo } from './LoadingScreen';
import ChatMessage from './ChatMessage';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function PatientChatScreen () {


    // useEffect(() => {
    //     getPatientName()
    // }, []);


    // async function getPatientName(){
    //     const docRef = doc(db, "Doctors", userInfo.doctorId);
    //     const docSnap = await getDoc(docRef);
    //     setPatientName(docSnap.data().firstName +  " " + docSnap.data().lastName )

    // }

    // const [patientName, setPatientName] = useState("")
    // const messageRef = query(collection(db, String(userInfo.doctorId + userInfo.uid)), orderBy("createdAt"));
    // const [messages] = useCollectionData(messageRef, {idField: 'id'})
    // const [formValue, setFormValue] = useState('')
    // const scrollViewRef = useRef();
    
    //  async function sendMessage() {
    //     const uid = userInfo.uid;

    //     await setDoc(doc(collection(db, String(userInfo.doctorId + userInfo.uid))), {
    //         text: formValue,
    //         createdAt: serverTimestamp(),
    //         uid
    //       });
          
    //     this.textInput.clear()
    //     setFormValue('')

    // }


     //const auth = getAuth(app);

     const [ongoingConversations, setOngoingConversations] = useState([])
     const [formValue, setFormValue] = useState('')
 
     const messageRef = query(collection(db, String(userInfo.doctorId) + String(userInfo.uid)), orderBy("createdAt"));
     const [messages] = useCollectionData(messageRef, {idField: 'id'})
     const scrollViewRef = useRef();
     const docRef = doc(db, "Doctors", String(userInfo.doctorId));

     async function getDoctorName(){
        const docRef = doc(db, "Doctors", userInfo.doctorId);
        const docSnap = await getDoc(docRef);
        setDoctorName(docSnap.data().firstName +  " " + docSnap.data().lastName )

    }

    const [doctorName, setDoctorName] = useState("")

     useEffect(() => {
         getOngoingConversations()
         getDoctorName()
     }, []);
 
     async function getOngoingConversations(){
         const docSnap = await getDoc(docRef)
 
         if (docSnap.exists()) {
           setOngoingConversations(docSnap.data().ongoingConversations)
         } 
     }
 
      async function sendMessage() {
         const patient = {
             firstName: userInfo.firstName,
             lastName: userInfo.lastName,
             uid: userInfo.uid
         }
 
         if (!ongoingConversations.some( patient => patient.uid === userInfo.uid )) {
            const data = {"ongoingConversations": [...ongoingConversations, patient]}
            updateDoc(docRef, data)
            .then(console.log("Success: New uid added"))
            .catch(error => { console.log("Error: unable to add uid \n" + error); })
            setOngoingConversations([...ongoingConversations, patient])   
        }

 
         await setDoc(doc(collection(db, String(userInfo.doctorId) + String(userInfo.uid))), {
             text: formValue,
             createdAt: serverTimestamp(),
             uid: userInfo.uid
           });
 
         this.textInput.clear()
         setFormValue('')
 
     }
 
 

    return (
        <View style={{flex: 1}}>
            <Text style={styles.header}>               
                 <FontAwesome style={styles.icon} name={"user-circle"} size={30} color={'black'}/>  {doctorName}
             </Text>
            <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true }) }>
                 {messages && messages.map((msg, index) => <ChatMessage key={index} message={msg} />)}
            </ScrollView>
    
            <View style={styles.bottomContainer}>
 
                <TextInput value={formValue} style={styles.input} placeholder="Enter message" ref={input => { this.textInput = input }}
                           onChangeText={(newText) => setFormValue(newText)}  />
                <Pressable onPress={sendMessage}>
                <FontAwesome style={styles.icon} name={"send-o"} size={30} color={'black'}/> 
                </Pressable>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    bottomContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fc3636'
    },
    input: {
        borderWidth: 1, 
        borderColor: 'black', 
        flex: 1, 
        flexWrap: 'wrap',
        borderRadius: 10,
        paddingLeft: 10,
        margin: 5,
        backgroundColor: 'white',
        color: 'black',
        height: 45
    },
    button: {
        backgroundColor: 'white',
        borderWidth: 1,
        width: 70,
        height: 40,
        borderRadius: 5,
        top: 7
    },
    icon: {
        top: 2,
        right: 2,
        padding: 10,
      },


})