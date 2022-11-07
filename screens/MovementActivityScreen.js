//import React from 'react';
import {TextInput, Text, StyleSheet, ScrollView, SafeAreaView, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import {Divider} from 'react-native-elements';
import {db} from "../firebase";
import { collection, query, onSnapshot,doc,limit, orderBy } from "firebase/firestore";

export default function Activity({route}) {
    const navigation = useNavigation();
    const uID = route.params.userID;
    const [datap, setDatap] = useState([]);
    useEffect(() => onSnapshot(doc(db, "Patients", uID), (doc) => {
    setDatap(doc.data());
    }), []);

// Retrieve last two positions

    const xquery = query(collection(db, `Patients/${uID}/position`), orderBy("Timestamp", "desc"), limit(2));
    const [xvalues, setxValues] = React.useState([0]);
    React.useEffect(() => onSnapshot(xquery, (querySnapshot) => {
      const xvalue = [];
      querySnapshot.forEach((doc) => {
        let X = doc.data().x;
        xvalue.push(X);
      });
      const arrOfxvalue = xvalue.map(Number);
      setxValues(arrOfxvalue);
    }), []);
    const x0 = xvalues[0]; // latest value by time
    const x1 = xvalues[1]; 

    const yquery = query(collection(db, `Patients/${uID}/position`), orderBy("Timestamp", "desc"), limit(2));
    const [yvalues, setyValues] = React.useState([0]);
    React.useEffect(() => onSnapshot(yquery, (querySnapshot) => {
      const yvalue = [];
      querySnapshot.forEach((doc) => {
        let Y = doc.data().y;
        yvalue.push(Y);
      });
      const arrOfyvalue = yvalue.map(Number);
      setyValues(arrOfyvalue);
    }), []);
    const y0 = yvalues[0]; // latest value by time
    const y1 = yvalues[1]; 

    const zquery = query(collection(db, `Patients/${uID}/position`), orderBy("Timestamp", "desc"), limit(2));
    const [zvalues, setzValues] = React.useState([0]);
    React.useEffect(() => onSnapshot(zquery, (querySnapshot) => {
      const zvalue = [];
      querySnapshot.forEach((doc) => {
        let Z = doc.data().z;
        zvalue.push(Z);
      });
      const arrOfzvalue = zvalue.map(Number);
      setzValues(arrOfzvalue);
    }), []);
    const z0 = zvalues[0]; // latest value by time
    const z1 = zvalues[1]; 

    //make copy of variables
    let zValue = z0;
    let yValue = y0;
    let x0Value = x0;
    let x1Value = x1;

    //convert to int
    let z = parseInt(zValue);
    let y = parseInt(yValue);
    let newX = x0Value;
    let oldX = x1Value;

    //compare changes in position values 
    let num;
    if (y < 0 && z < 0){
        num = 1;
    }
    else if (newX != oldX){
      num = 0;
    }
    else num = 2;
    
    return (
      <SafeAreaView style={styles.container}>
        {/* Heading Box */}
        <View style={{alignItems: 'center'}}>
                <Text style={styles.heading}>{datap.firstName} {datap.lastName}</Text>
            </View>

            <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.biometricText}>Weight: </Text> 
                    <Text style={styles.biometricValue}>{datap.weight} lbs</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.biometricText}>Height: </Text> 
                    <Text style={styles.biometricValue}>{datap.height} in</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.biometricText}>Gender: </Text> 
                    <Text style={styles.biometricValue}>{datap.gender}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.biometricText}>DOB: </Text> 
                    <Text style={styles.biometricValue}>{datap.dob}</Text>
                </View>
            </View>

            <View style={{alignItems: 'center'}}>
                    <Divider style={styles.divider} width={1}/>
            </View> 

      <ScrollView style={styles.scroll}>
        <View style={styles.view}>
          <TextInput
            underlineColorAndroid="transparent"
            label="Walking"
            placeholderTextColor={'black'}
            editable={false}
            disabled={true}
            style={num == 0 ? styles.inputValid : styles.input}
            placeholder="Walking"
            
          />
          <FontAwesome5 style={styles.icon} name={'walking'} color={'black'}/>
        </View>

        <View style={styles.view}>
          <TextInput
            underlineColorAndroid="transparent"
            label="Laying"
            editable={false}
            disabled={true}
            style={num == 1 ? styles.inputValid : styles.input}
            placeholder="Laying"
            placeholderTextColor={'black'}
          />
          
          <FontAwesome style={styles.icon} name={'bed'} color={'black'}/>
        </View>

        <View style={styles.view}>
          <TextInput
            underlineColorAndroid="transparent"
            label="Idle"
            editable={false}
            disabled={true}
            style={num == 2 ? styles.inputValid : styles.input}
            placeholder="Idle"
            placeholderTextColor={'black'}
          />
          <FontAwesome5 style={styles.icon} name={'child'} color={'black'}/>
        </View>
        </ScrollView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create(({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignContent: 'center',
        alignItems: 'center',
    },
    view: {
      flexDirection: 'row',
      paddingBottom: 5,
      justifyContent: 'center'
    },
    input: {
        borderWidth: 1,
        height: 50,
        width: 300,
        margin: 30,
        padding: 50,
        borderRadius: 10,
        textAlign: 'left',
        fontSize: 35,
        backgroundColor: 'lightgray',
        shadowColor: 'black',
        shadowOffset: {height: 4},
        shadowOpacity: 0.6,
        shadowRadius: 6,
        paddingVertical: 0,
        
    },
    inputValid: {
        borderWidth: 1,
        backgroundColor: '#fc3636',
        height: 50,
        borderRadius: 10,
        width: 300,
        margin: 30,
        padding: 50,
        textAlign: 'left',
        fontSize: 35,
        shadowColor: 'black',
        shadowOffset: {height: 4},
        shadowOpacity: 0.6,
        shadowRadius: 6,
        paddingVertical: 0,
    },
    icon: {
        padding: 34,
        fontSize: 40,
        position: 'absolute',
        right: 15,
        
    },
    scroll: {
      marginTop: 15,
    },
    button: {
      justifyContent: 'space-between',
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#fc3636',
      flexDirection: 'row',
      padding: 10,
      margin: 10,
      borderRadius: 10,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 20
    },
    divider: {
      width: '85%',
      margin: 20
    },
    heading: {
      fontSize: 35,
      padding: 5,
      marginTop: 10
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
}));