import { SafeAreaView, StyleSheet, Dimensions, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react'
import { db } from "../firebase";
import { collection, addDoc} from 'firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

/*
  REFERENCE:
  https://firebase.google.com/docs/firestore/manage-data/add-data
  ^^ Add a document section for auto generated ID
*/
class SendFeedback extends Component {
  state = {
      comment: '',
      rating: 0,
      selectedButton: '',
  }

  sendValues(rating, comment) {
      if (rating != 0) {
        addDoc(collection(db, 'AppFeedback'), {
          rating: rating,
          comment: comment,
        });
        Alert.alert('Feedback submitted. Thank you!')
      }
      else if (comment == "") {
        Alert.alert('Cannot submit empty feedback')
      }
  }

  render() {
      function buttonStyle(selectedButton, buttonNum) {
          return {
            width: 30,
            height: 30,
            borderColor: 'grey',
            borderWidth:1,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor: selectedButton === buttonNum ? '#fc3636' : 'white'
          }
      }

      return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView behavior={Platform.select({android: undefined, ios: 'padding'})}style={styles.mainContent}>
  
            {/* Header */}
            <View style={styles.header}> 
              <Text style={{fontSize: 25}}>App Feedback</Text>
            </View> 
  
            {/* Description */}
            <View style={{width: 310}}>
                <Text style={{textAlign: 'center', paddingBottom: 30}}>Feel free to send any feedback or suggestions regarding your experience with application. Your submission will be anonymous.</Text>
            </View>

        {/* Rating Section */}
        <View style={{flex: 2, alignItems: 'center', alignContent: 'center'}}>
            <Text>Please rate your overall satisfaction with the app</Text>
            <View style={styles.buttonGrid}>
                  <TouchableOpacity style={buttonStyle(this.state.selectedButton, 'button1')} onPress={() => this.setState({ rating: 1, selectedButton: 'button1' })}>
                      <Text>1</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={buttonStyle(this.state.selectedButton, 'button2')} onPress={() => this.setState({ rating: 2, selectedButton: 'button2' })}>
                      <Text>2</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={buttonStyle(this.state.selectedButton, 'button3')} onPress={() => this.setState({ rating: 3, selectedButton: 'button3'})}>
                      <Text>3</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={buttonStyle(this.state.selectedButton, 'button4')} onPress={() => this.setState({ rating: 4, selectedButton: 'button4' })}>
                      <Text>4</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={buttonStyle(this.state.selectedButton, 'button5')} onPress={() => this.setState({ rating: 5, selectedButton: 'button5' })}>
                      <Text>5</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={buttonStyle(this.state.selectedButton, 'button6')} onPress={() => this.setState({ rating: 6, selectedButton: 'button6' })}>
                      <Text>6</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={buttonStyle(this.state.selectedButton, 'button7')} onPress={() => this.setState({ rating: 7, selectedButton: 'button7' })}>
                      <Text>7</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={buttonStyle(this.state.selectedButton, 'button8')} onPress={() => this.setState({ rating: 8, selectedButton: 'button8' })}>
                      <Text>8</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={buttonStyle(this.state.selectedButton, 'button9')} onPress={() => this.setState({ rating: 9, selectedButton: 'button9' })}>
                      <Text>9</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={buttonStyle(this.state.selectedButton, 'button10')} onPress={() => this.setState({ rating: 10, selectedButton: 'button10' })}>
                      <Text>10</Text>
                  </TouchableOpacity>
            </View>

          {/* Input Form */}
            <Text style={{marginTop: 10}}>Additional Comments</Text>
            <TextInput style = {styles.textInput} onChangeText={(text) => this.setState({ comment: text })} secureTextEntry={true} multiline={true} height={200} />
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={() => this.sendValues(this.state.rating, this.state.comment)}
            >
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
          <StatusBar style="auto" />
        </KeyboardAwareScrollView>
      </SafeAreaView>
      );
  }
}

export default function SendAppFeedback() {
    const navigation = useNavigation();
    return (
      <SendFeedback/>
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
      borderColor: 'grey',
      borderWidth: 1,
      padding: 5,
      marginTop: 5,
      marginBottom: 15,
      borderRadius: 15, 
      width: Dimensions.get('window').width * 0.7,
      height: Dimensions.get('window').width * 0.7,
      textAlignVertical: 'top'
    },
    header: {
      alignItems: 'center',
      marginBottom: 40,
      paddingTop: 40,
    },
    buttonGrid: {
      flexDirection: 'row',
      paddingTop: 5,
      paddingBottom: 15
    },
    submitButton: {
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
    }
  });