import {Dimensions,  View, Text, StyleSheet, SafeAreaView }from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import { collection, query, where, onSnapshot,doc,limit, orderBy } from "firebase/firestore";
import {db} from "../firebase";
import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import {Divider} from 'react-native-elements';


export default function ThoracicImpedanceScreen({route}) {
    const navigation = useNavigation();
    const uID = route.params.userID;
    const [datap, setDatap] = useState([]);
    useEffect(() => onSnapshot(doc(db, "Patients", uID), (doc) => {
      setDatap(doc.data());
    }), []);

    const q = query(collection(db, `Patients/${uID}/thorImp`), orderBy("Timestamp", "desc"), limit(28));
    const [values, setValues] = useState([366.7, 371.7, 373.57, 367.88]);
    /*
    useEffect(() => onSnapshot(q, (querySnapshot) => {
      const thorImp = [];
      querySnapshot.forEach((doc) => {
        let ti = doc.data().Z;
        thorImp.push(ti);
      });
      const arrOfNum = thorImp.map(Number);
      const reversedThorImp = arrOfNum.reverse();
      setValues(reversedThorImp);
    }), []);*/

    const time = query(collection(db, `Patients/${uID}/thorImp`), orderBy("Timestamp", "desc"), limit(28));
    const [timevalues, setTimeValues] = useState(["2:39:37 PM", "2:42:14 PM", "2:44:22 PM", "2:51:32 PM"]);

    /*useEffect(() => onSnapshot(time, (querySnapshot) => {
      const timearr = [];
      querySnapshot.forEach((doc) => {
          let Time = doc.data().Timestamp;
          timearr.push(Time);
      });
      const reversedtime = timearr.reverse();
      setTimeValues(reversedtime);
    }), []);*/
    
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

            {/* Graph */}
            <View style={{alignItems: 'center'}}>
                <Text style={{textAlign: 'center'}}>Thoracic Impedance Data (|Z| ohms)</Text>
                <Text style={{textAlign: 'center'}}>08/29/2022</Text>

                <View style={styles.graph}>
                    <LineChart
                      data={{
                        labels: timevalues, //x-axis labels
                        datasets: [
                          {
                            data: values
                          }
                        ]
                      }}
                      width={Dimensions.get("window").width * 0.95}
                      height={Dimensions.get("window").height * 0.50}
                      withInnerLines={false}
                      xLabelsOffset={-15}
                      verticalLabelRotation={90} //Degree to rotate
                      yAxisInterval={1}
                      chartConfig={chartConfig}
                      bezier 
                      style={{
                        marginVertical: 8,
                        borderRadius: 16,
                        padding: 10
                      }}
                    />
                </View>
            </View>
      </SafeAreaView>
    );
}

const chartConfig = {
  backgroundColor: "black",
  backgroundGradientFrom: "#f79d9d",
  backgroundGradientTo: "#fc3636",
  barPercentage: 0.5,
  color: (opacity = 0.) => 'black',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
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
  divider: {
    width: '85%',
    margin: 20
  },
  navButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#fc3636',
    margin: 10,
  },
  navButtonText: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  navButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
  },
  graph: {
    shadowColor: 'black',
    shadowOffset: {height: 4},
    shadowOpacity: 0.6,
    shadowRadius: 6,
  }
});
