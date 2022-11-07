import {Text, View, StyleSheet,ScrollView, Pressable } from 'react-native';
import {Divider} from 'react-native-elements';
import { realTimeDatabaseData } from "../firebase"
import {useState} from 'react';
import { useEffect } from 'react';
import { userInfo } from './LoadingScreen';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import {db} from "../firebase"
import { doc, getDoc} from 'firebase/firestore';

export default function PatientResultSessions() {

    const navigation = useNavigation();

    //const data = realTimeDatabaseData()
    const [listOfDates, setListOfDates] = useState([])
    //const route = useRoute();
    //const patientUid = route.params.patientUid;
    const patientUid = 1663521991361
    const data = {"1665783700192": {"11-01-2022": {"ECG": [0,1]}}, 
                  "1665783871839": {"11-01-2022": {"ECG": [{time: "12:00", value: 1}, {time: "12:00", value: 1}], "heartRate": [{time: "12:00", value: 1}, {time: "12:00", value: 1}], "movement": [{time: "12:00", value: 1}, {time: "12:00", value: 1}], "thoracicImpedance": [{time: "12:00", value: 1}, {time: "12:00", value: 1}]}, "11-02-2022": {"ECG": [{time: "12:00", value: 1}, {time: "12:00", value: 1}]}, "11-03-2022": {"heartRate": [{time: "12:00", value: 1}, {time: "12:00", value: 1}]}}}
   
    const [sensorData, setSensorData] = useState([])
    const [patientInfo, setPatientInfo] = useState({})

    //Formats data to display list of dates on screen
    useEffect(() => {
      getList()
      getPatientInfo()
    }, [])
          
    //Returns list of dates
    function getList () {
      for(const [key, value] of Object.entries(data)){
        //if(patientUid === key){
          if(key == "1665783871839")
          for(const [key2, value2] of Object.entries(value)){
            setListOfDates((prev) => [...prev, key2]);
            setSensorData((prev) => [...prev, value2]);
          }
        }
      }
    
    //Returns patient info
    async function getPatientInfo () {
      const docRef = doc(db, "Patients", String(patientUid));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPatientInfo(docSnap.data())
      }
    }
 
  //Displays list of dates
  const displayList = (date, index) => {
    return (
    <Pressable style={({pressed}) => pressed && styles.select} onPress={() => (navigation.navigate("PatientInfo", {"sensorData": sensorData, "patientInfo": patientInfo}))}>
        <Text style={styles.text} key={index}>{date}</Text>
    </Pressable>
    )
  }

  return (
    <ScrollView>
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
                    {/* Button Row 2 */}
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.biometricText}>Gender: </Text> 
                        <Text style={styles.biometricValue}>{patientInfo.gender}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.biometricText}>DOB: </Text> 
                        <Text style={styles.biometricValue}>{patientInfo.dob}</Text>
                    </View>
                </View>
      <View>

      <View style={{alignItems: 'center'}}>
                    <Divider style={styles.divider} width={1}/>
      </View>

        { listOfDates.map(displayList) }
      </View>
    </ScrollView>

    )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    textAlign: "center",

  },
  select: {
      backgroundColor: "#fc3636",
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
  heading: {
    fontSize: 35,
    padding: 5,
    marginTop: 10
  },
  divider: {
    width: '85%',
    margin: 20
  }
})