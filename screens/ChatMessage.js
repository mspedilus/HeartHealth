import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { app } from "../firebaseToo";
import { getAuth } from 'firebase/auth';
import { userInfo } from './LoadingScreen';
 
const screenWidth = Dimensions.get("window").width;

export default function ChatMessage(props) {
    const auth = getAuth(app);
    const {text, uid} = props.message;
    const messageStyle = uid === userInfo.uid ? 'sent' : 'received';

    
  return (

       <Text style={messageStyle === 'sent' ? styles.sentMessages : styles.receivedMessages}>{text}</Text>

  )
}

const styles = StyleSheet.create({
    
    sentMessages: {
        backgroundColor: '#fc3636',
        fontSize: 15,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderRadius: 20,
        alignSelf: "flex-end",
        marginRight: 15,
        marginVertical: 5,
        overflow: 'hidden',
        maxWidth: screenWidth * 0.8
    },
    receivedMessages: {
        backgroundColor: '#dbd8d8',
        fontSize: 15,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderRadius: 20,
        alignSelf: "flex-start",
        marginLeft: 15,
        marginVertical: 5,
        overflow: 'hidden',
        maxWidth: screenWidth * 0.8
    }
})