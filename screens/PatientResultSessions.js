import {Text, View, StyleSheet,ScrollView, Pressable, ActivityIndicator } from 'react-native';
import {Divider} from 'react-native-elements';
import {useState} from 'react';
import { useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import {app, db} from "../firebase"
import { doc, getDoc} from 'firebase/firestore';
import { getDatabase, ref, onValue} from 'firebase/database';
import DoctorBottomNavbar from './DoctorBottomNavbar';

export default function PatientResultSessions({route}) {

    const [sensorData, setSensorData] = useState([])
    const [patientInfo, setPatientInfo] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const[data, setData] = useState({})
    const realtimeDB = getDatabase(app);
    const starCountRef = ref(realtimeDB);
    const navigation = useNavigation();   
    const [listOfDates, setListOfDates] = useState([])
    const patientUid = route.params.patientUid;


    useEffect(() => {
      onValue(starCountRef,  (snapshot) => {
        setData(snapshot.val())
       });
    }, [])

useEffect(() => {
  if(data) {
    getList()
    getPatientInfo()
    setIsLoading(false)
  }
}, [data])

    //const patientUid = 1663521991361
   // const data = {"1665783700192": {"11-01-2022": {"ECG": [0,1]}}, 
    //              "1665783871839": {"11-01-2022": {"ECG": [{time: "12:00", value: 1}, {time: "12:00", value: 1}], "heartRate": [{time: "12:00", value: 1}, {time: "12:00", value: 1}], 
    //              "movement": [ {time: "12:00", x: 1, y: 2, z: 3}, {time: "12:00", x: 1, y: 2, z: 3}], "thoracicImpedance": [{time: "12:00", value: 1}, {time: "12:00", value: 1}]}, "11-02-2022": {"ECG": [{time: "12:00", value: 1}, {time: "12:00", value: 1}]}, "11-03-2022": {"heartRate": [{time: "12:00", value: 1}, {time: "12:00", value: 1}]}}}
   


    //Formats data to display list of dates on screen


    //Returns list of dates
    function getList () {
      for(const [key, value] of Object.entries(data)){
        if(patientUid === key){
          //if(key == "1665783871839")
          for(const [key2, value2] of Object.entries(value)){ 
            setListOfDates((prev) => [...prev, key2]);
          }
          setSensorData((prev) => [...prev, value]);
        }}
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
    <Pressable key={index} style={({pressed}) => pressed && styles.select} onPress={() => (navigation.navigate("PatientInfo", {"sensorData": sensorData, "patientInfo": patientInfo, "selectedDate": {date} }))}>
        <Text style={styles.text} >{date}</Text>
    </Pressable>
    )
  }
  
  return (

<View style={styles.mainContainer}>

  { isLoading == true ? <ActivityIndicator style={{marginTop: 10}} visible={isLoading} textContent={"Loading..."} textStyle={styles.spinnerTextStyle} /> 

    :
    
    <View >
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

                        <View style={{alignItems: 'center'}}>
                      <Divider style={styles.divider} width={1}/>
              </View>

            <ScrollView>
              <View>
                { listOfDates.map(displayList) }
              </View>
            </ScrollView>
    </View>  }

    <DoctorBottomNavbar />
  </View>
    
    )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
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
  },
  spinnerTextStyle: {
    color: "#FFF"
}
})