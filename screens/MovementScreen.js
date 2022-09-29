//import * as React from 'react'
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, Dimensions, ScrollView, View, TouchableOpacity } from 'react-native';
import {LineChart} from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import { collection, query, where, onSnapshot,doc,limit, orderBy } from "firebase/firestore";
import {db} from "../firebase";
import {Divider} from 'react-native-elements';

const screenWidth = Dimensions.get("window").width;

export default function MovementScreen({route}) {
    const navigation = useNavigation();
    const uID = route.params.userID;
  
    const [datap, setDatap] = useState([]);
    useEffect(() => onSnapshot(doc(db, "Patients", uID), (doc) => {
      setDatap(doc.data());
    }), []);
    const xquery = query(collection(db, `Patients/${uID}/position`), orderBy("Timestamp", "desc"), limit(28));
    const [xvalues, setxValues] = React.useState([94, 99, 92, 92]);

    /*
    React.useEffect(() => onSnapshot(xquery, (querySnapshot) => {
      const xvalue = [];
      querySnapshot.forEach((doc) => {
        let X = doc.data().x;
        xvalue.push(X);
      });
      const arrOfxvalue = xvalue.map(Number);
      const reversedxvalue = arrOfxvalue.reverse();
      setxValues(reversedxvalue);
    }), []);*/

    const yquery = query(collection(db, `Patients/${uID}/position`), orderBy("Timestamp", "desc"), limit(28));
    const [yvalues, setyValues] = React.useState([-372, -361, -377, -369]);
    /*
    React.useEffect(() => onSnapshot(yquery, (querySnapshot) => {
      const yvalue = [];
      querySnapshot.forEach((doc) => {
        let Y = doc.data().y;
        yvalue.push(Y);
      });
      const arrOfyvalue = yvalue.map(Number);
      const reversedyvalue = arrOfyvalue.reverse();
      setyValues(reversedyvalue);
    }), []);*/

    const zquery = query(collection(db, `Patients/${uID}/position`), orderBy("Timestamp", "desc"), limit(28));
    const [zvalues, setzValues] = React.useState([-1977, -2025, -1991, -1975]);
    /*
    React.useEffect(() => onSnapshot(zquery, (querySnapshot) => {
      const zvalue = [];
      querySnapshot.forEach((doc) => {
        let Z = doc.data().z;
        zvalue.push(Z);
      });
      const arrOfzvalue = zvalue.map(Number);
      const reversedzvalue = arrOfzvalue.reverse();
      setzValues(reversedzvalue);
    }), []);*/

    const time = query(collection(db, `Patients/${uID}/position`), orderBy("Timestamp", "desc"), limit(28));
    const [timevalues, setTimeValues] = React.useState(["2:39:37 PM", "2:42:14 PM", "2:44:22 PM", "2:51:32 PM"]);

    /*
    React.useEffect(() => onSnapshot(time, (querySnapshot) => {
      const timearr = [];
      querySnapshot.forEach((doc) => {
          let time = doc.data().Timestamp;
          timearr.push(time);
      });
      //const arrOftime = timearr.map(Number);
      const reversedtime = timearr.reverse();
      setTimeValues(reversedtime);
    }), []);*/

    const Xdata = {
      labels: timevalues,
      datasets: [
        {
          data: xvalues,
        },
      ],
    };
    
    const Ydata = {
      labels: timevalues,
      datasets: [
        {
          data: yvalues,
        },
      ],
    };
    
    const Zdata = {
      labels: timevalues,
      datasets: [
        {
          data: zvalues
        },
      ],
    };
    return(
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

            <View style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.navigate("MovementActivityScreen", {userID: uID})} style={[styles.button, {backgroundColor: '#fc3636'}]}>
                <Text style={styles.buttonText}>Activity</Text>
              </TouchableOpacity>
              </View>

        {/* Movement Graphs */}
        <ScrollView style={styles.scroll}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.textStyle}>X Value Chart
            </Text>
            <LineChart
              data = {Xdata}
              width = {screenWidth-7}
              height={380}
              verticalLabelRotation={90} //Degree to rotate
              chartConfig = {chartConfig}
              withInnerLines={false}
              bezier style = {{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
            <Text style={styles.textStyle}>Y Value Chart
            </Text>
            <LineChart
              data = {Ydata}
              width = {screenWidth-7}
              height={380}
              verticalLabelRotation={90} //Degree to rotate
              chartConfig = {chartConfig}
              withInnerLines={false}
              bezier style = {{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
            <Text style={styles.textStyle}>Z Value Chart
            </Text>
            <LineChart
              data = {Zdata}
              width = {screenWidth-7}
              height={380}
              verticalLabelRotation={90} //Degree to rotate
              chartConfig = {chartConfig}
              withInnerLines={false}
              bezier style = {{
                marginVertical: 8,
                borderRadius: 16
              }}
          />
        </View>
        </ScrollView>
        </SafeAreaView>
    );
}
  
  //Chart styling
  const chartConfig = {
    backgroundGradientFrom: '#f79d9d',
    backgroundGradientTo: '#fc3636',
    backgroundColor: "black",
    color: (opacity = 1) => `black`,
    barPercentage: 0.5,
    marginVertical: 8,
    borderRadius: 16,
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    },
    textStyle: {
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    scroll: {
      marginTop: 15,
    },
    button: {
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fc3636',
      flexDirection: 'row',
      paddingHorizontal: 25,
      paddingVertical: 15,
      margin: 10,
      borderRadius: 7,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 25,
      fontWeight: 'bold',
      letterSpacing: 0.7,
      lineHeight: 30
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
  });