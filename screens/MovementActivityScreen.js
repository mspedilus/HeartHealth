//import React from 'react';
import {TextInput, Text, StyleSheet, ScrollView, SafeAreaView, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Divider} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from "react-native-vector-icons/FontAwesome";


export default function Activity({route}) {

    const patientInfo = route.params.patientInfo
    const xVals = route.params.xValues
    const yVals = route.params.yValues
    const zVals = route.params.zValues
    const [xValues, setXValues] = useState([])
    const [yValues, setYValues] = useState([])
    const [zValues, setZValues] = useState([])



    useEffect(() => {
      const xLength = xVals.length
      const yLength = yVals.length
      const zLength = zVals.length

      if(xLength >= 2){
        setXValues(xVals.slice(xLength - 2, xLength))
      }
      if(yLength >= 2){
        setYValues(yVals.slice(yLength - 2, yLength))

      }      
      if(zLength >= 2){
        setZValues(zVals.slice(zLength - 2, zLength))
      }

    }, [])

    const x0 = xValues[0]; // latest value by time
    const x1 = xValues[1]; 

    const y0 = yValues[0]; // latest value by time
    const y1 = yValues[1]; 

    const z0 = zValues[0]; // latest value by time
    const z1 = zValues[1]; 

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

    if (xValues.length == 0 || yValues.length  == 0 || zValues.length  == 0){
      num = 0;
    }
    else if (y < 0 && z < 0){
        num = 2;
    }
    else if (newX != oldX){
      num = 1;
    }
    else num = 3;
    
    return (
      <SafeAreaView style={styles.container}>

        {/* Heading Box */}
        <View style={{alignItems: 'center'}}>
                <Text style={styles.heading}>{patientInfo.firstName} {patientInfo.lastName}</Text>
            </View>

            <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.biometricText}>Weight: </Text> 
                    <Text style={styles.biometricValue}>{patientInfo.weight} lbs</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.biometricText}>Height: </Text> 
                    <Text style={styles.biometricValue}>{patientInfo.height} in</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.biometricText}>Gender: </Text> 
                    <Text style={styles.biometricValue}>{patientInfo.gender}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.biometricText}>DOB: </Text> 
                    <Text style={styles.biometricValue}>{patientInfo.dob}</Text>
                </View>
            </View>

            <View style={{alignItems: 'center'}}>
                    <Divider style={styles.divider} width={1}/>
            </View> 

      <ScrollView style={styles.scroll}>
      {num == 0 && <Text style={styles.noDataText}>Not enough data to make prediction</Text> }
      <View>
          <View style={styles.view}>
            <TextInput
              underlineColorAndroid="transparent"
              label="Walking"
              placeholderTextColor={'black'}
              editable={false}
              disabled={true}
              style={num == 1 ? styles.inputValid : styles.input}
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
              style={num == 2 ? styles.inputValid : styles.input}
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
            style={num == 3 ? styles.inputValid : styles.input}
            placeholder="Idle"
            placeholderTextColor={'black'}
          />
          <FontAwesome5 style={styles.icon} name={'child'} color={'black'}/>
        </View>
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
    noDataText: {
      textAlign: "center"
    }
}));


