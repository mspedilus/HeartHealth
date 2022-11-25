import {Text, View, StyleSheet,ScrollView, Pressable, ActivityIndicator } from 'react-native';
import {Divider} from 'react-native-elements';
import {useState} from 'react';
import { useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import {db, app} from "../firebase"
import { doc, getDoc} from 'firebase/firestore';
import { getDatabase, ref, onValue} from 'firebase/database';
import DoctorBottomNavbar from './DoctorBottomNavbar';

export default function PatientResultSessions({route}) {

    const patientUid = route.params.patientUid;
    const navigation = useNavigation();   
    const realtimeDB = getDatabase(app);
    const starCountRef = ref(realtimeDB);
    
    const [sensorData, setSensorData] = useState([])
    const [patientInfo, setPatientInfo] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({})
    const [listOfDates, setListOfDates] = useState([])

    useEffect(() => {
      getPatientInfo()
      onValue(starCountRef,  (snapshot) => {
        setData(snapshot.val())
       });
    }, [])

    useEffect(() => {
      if(data) {
        getList()
        setIsLoading(false)
      }
    }, [data])

    //Returns list of dates
    function getList () {
      l = []
      for(const [key, value] of Object.entries(data)){
        if(patientUid === key){
          for(const [key2, value2] of Object.entries(value)){ 
            l.push(key2)
          }
          setListOfDates(l);
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








