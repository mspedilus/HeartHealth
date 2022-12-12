import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Alert, SafeAreaView, Pressable, TextInput, Image } from 'react-native';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import "firebase/compat/firestore";

function LoginScreen({navigation}) {

    const [values, setValues] = useState({
      email: "",
      pwd: ""
  })
  

  function resetPass() {

    const { email, pwd } = values;
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
    .then(() => {
      Alert.alert('A password reset link has been sent to the email you registered with.')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Alert.alert(errorCode, errorMessage);
    });
  }

  function handleChange(text, eName) {
      setValues(prev => {
          return {
              ...prev,
              [eName]: text
          }
      })
  }

  function Login() {

      const { email, pwd } = values;
      const auth = getAuth();

      signInWithEmailAndPassword(auth, email, pwd)
      .then(() => {
      })
      .catch((error) => {
          alert(error.message)
      });
  }

    return (
        <SafeAreaView style={styles.container}>

  <Image source={require('./img/heartlogo.png')} style={{width:245, height: 190}}/>
      <Text style={styles.textInBackground}>Heart Health</Text>
    
      <View style={styles.mainContent}>
        <Text style={styles.welcomeText}>Welcome</Text>
      <View style={styles.inputContainer}>
        <Image source={require('./img/mail_icon.png')} style={styles.mailIcon}/>
        <TextInput
          style={styles.input}
          onChangeText={text => handleChange(text, "email")}
          editable={true}
          placeholder="Email Address"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
      <Image source={require('./img/lock_icon.png')} style={styles.lockIcon}/>
          <TextInput
          style={styles.input}
          onChangeText={text => handleChange(text, "pwd")}
          placeholder="Password"
          secureTextEntry={true}
        />
      </View>

      <Pressable onPress={() => resetPass()}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
      </Pressable>   

      <View style={{ alignItems: 'center', justifyContent: 'center'}}>

        <Pressable onPress={() => Login()} style={({ pressed }) => pressed ? styles.pressedButton : styles.mainButtons }>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable  onPress={() => navigation.navigate("Register")}>
          <Text>Don't have an account? <Text style={styles.forgotText}>Sign up</Text></Text>
        </Pressable>

      </View>

      </View>
      <StatusBar style="auto" />

    </SafeAreaView>
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
      width: 350
    },
    pressedButton:{
      marginRight: 5,
      marginBottom: 15,
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#fc3636',
      opacity: 0.7
    },
    textInBackground: {
      fontSize: 50,
      color: "#ffffff",
      opacity: 0.90,
      fontWeight: 'bold',
      letterSpacing: 3,
      marginVertical: 5
    },
    welcomeText: {
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      opacity: 0.8
    },
    titleText: {
      fontWeight: "bold",
      alignItems: 'stretch',
      marginLeft: 19,
    },
    input: {
      width: 187,
    },
    mainButtons: {
      marginRight: 5,
      marginBottom: 15,
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#fc3636'
      
    },
    buttonText: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },

    forgotText: {
      fontWeight: "bold",
      alignItems: 'stretch',
      marginLeft: 50,
      textDecorationLine: 'underline',
      textAlign: 'center',
      marginRight: 52,
      marginVertical: 15,
      opacity: 0.85

    },
    mailIcon: {
      width:40, 
      height: 40,
      opacity: 0.8
    },

    lockIcon: {
      width:25, 
      height: 25, 
      opacity: 0.8, 
      marginTop: 5,
      marginBottom: 7,
      marginLeft: 6, 
      marginRight: 9
    },

    inputContainer: {
      flexDirection: 'row', 
      borderBottomWidth: 1, 
      borderColor: '#adabab'
    }
  });

export default LoginScreen; 