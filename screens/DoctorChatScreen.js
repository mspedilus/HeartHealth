import React, {useState, useRef, useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, Pressable, ScrollView } from 'react-native';
import { db } from "../firebase"; //DO NOT IMPORT FROM 'firebase/firestore/lite'
import { doc, getDoc, setDoc, collection, orderBy, query, limit, serverTimestamp  } from 'firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import { userInfo } from './LoadingScreen';
import ChatMessage from './ChatMessage';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { app } from "../firebaseToo";
import { getAuth } from 'firebase/auth';
import FontAwesome from "react-native-vector-icons/FontAwesome";


const screenHeight= Dimensions.get("window").height;
const screenWidth= Dimensions.get("window").width;

export default function DoctorChatScreen () {

    /*
    let chatHistoryExist = false;
    const patientList = userInfo.patients;
    const [patientListWithChatHistories, setPatientListWithChatHistories] = useState([]);

    useEffect(() => {
        patientList.map((patient) => {
            chatHistory(patient)
            console.log("CHAT 2" + chatHistoryExist)


        })
    }, []);

    async function chatHistory (patient){
        
        const querySnapshot = await getDocs(collection(db, String(patient)));
        
        querySnapshot.forEach((doc) => {
          if(Object.entries(doc.data()).length !== 0) {
            console.log(doc.data());
            chatHistoryExist = true;
            console.log("CHAT " + chatHistoryExist)
          }
        });

        if(chatHistoryExist === true){
            console.log("In here")
            setPatientListWithChatHistories((data) => [...data, patient ])
            chatHistoryExist = false;
        }
    }
    */

    /*
    const messageRef = query(collection(db, "messages2"), orderBy("createdAt"), limit(25));
    const [messages] = useCollectionData(messageRef, {idField: 'id'})
    const auth = getAuth(app);
    const [formValue, setFormValue] = useState('')

    
    async function sendMessage() {
        const {uid} = auth.currentUser;

        await setDoc(doc(collection(db, "messages2")), {
            text: formValue,
            createdAt: serverTimestamp(),
            uid
          });

        setFormValue('')
    }*/
    useEffect(() => {
        getPatientName()
    }, []);




    async function getPatientName(){
        const docRef = doc(db, "Patients", "1663521991361");
        const docSnap = await getDoc(docRef);
        setPatientName(docSnap.data().firstName +  " " + docSnap.data().lastName )

    }
    const [patientName, setPatientName] = useState("")
    const messageRef = query(collection(db, "1663521991361"), orderBy("createdAt"), limit(25));
    const [messages] = useCollectionData(messageRef, {idField: 'id'})
    const auth = getAuth(app);
    const [formValue, setFormValue] = useState('')
    const scrollViewRef = useRef();
    
     async function sendMessage() {
        const uid = userInfo.uid;

        await setDoc(doc(collection(db, "1663521991361")), {
            text: formValue,
            createdAt: serverTimestamp(),
            uid
          });

        this.textInput.clear()
        setFormValue('')

    }




    return (
        <View style={{flex: 1}}>
            <Text style={styles.header}>               
                 <FontAwesome style={styles.icon} name={"user-circle"} size={30} color={'black'}/>  {patientName}
             </Text>
            <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true }) }>
                 {messages && messages.map(msg => <ChatMessage message={msg} />)}
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

/*
            <View>
            {patientListWithChatHistories.map((patient) => {
                return (<Text>{patient}</Text>)
            })}    
            </View>

*/

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