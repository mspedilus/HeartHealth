import {Text, View, StyleSheet,ScrollView, ActivityIndicator, Dimensions, SafeAreaView } from 'react-native';
import {Divider} from 'react-native-elements';
import {useState} from 'react';
import { useEffect } from 'react';
import {db, app} from "../firebase"
import { doc, getDoc} from 'firebase/firestore';
import { getDatabase, ref, onValue} from 'firebase/database';
import {LineChart} from 'react-native-chart-kit'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height * 0.5;

export default function PatientResultSessions({route}) {

    const patientUid = route.params.patientUid;
    const realtimeDB = getDatabase(app);
    const starCountRef = ref(realtimeDB);
    
    const [patientInfo, setPatientInfo] = useState({})
    const [data, setData] = useState({})
    const [ECG, setECG] = useState([])
    const [ECG_Graph, setECG_Graph] = useState([])
    const [gotValue, setGotValue] = useState(false)
    const [ECG_Timestamps, setECG_Timestamps] = useState([])
    const [heartRate, setHeartRate] = useState({timestamps: [], data: []})
    const [thoracicImpedance, setThoracicImpedance] = useState({timestamps: [], data: []})
    const [status, setStatus] = useState({timestamps: [], data: []})
    const [loading, setLoading] = useState(true)
    const [done, setDone] = useState(false)

    useEffect(() => {
      if(Object.keys(patientInfo).length === 0) getPatientInfo() //Gets patient info for top header
      
      onValue(starCountRef,  (snapshot) => { //Gets data from real time database
        setData(snapshot.val())
       });

    }, [])

    useEffect(() => {
      getData() //Filters and adds sensor data into designated state
      setDone(true) //For loading icon
      if(done) setLoading(false) //For loading icon
    }, [data])

    
    //Returns patient info
    async function getPatientInfo () {
       const docRef = doc(db, "Patients", String(patientUid));
       const docSnap = await getDoc(docRef);
       if (docSnap.exists()) {
           setPatientInfo(docSnap.data())
        }
    }


    //Filters and adds sensor data into designated state
    function getData() {
      
      //Reset values 
      setHeartRate({timestamps: [], data: []})
      setThoracicImpedance({timestamps: [], data: []})
      setStatus({timestamps: [], data: []})
      setECG([])
      setECG_Timestamps([])

      //Declare variables
      let HR_Timestamps = []
      let TI_Timestamps = []
      let AS_Timestamps = []
      let ECG_Timestamps = []
      let HR_values = []
      let TI_values = []
      let AS_values = []
      let HR_Exist = false
      let TI_Exist = false
      let AS_Exist = false
      let ECG_Timestamps_Exist = false

      for (const [key, value] of Object.entries(data)){ // ID, timestamp
        if(key == patientUid){
          for(const [key2, value2] of Object.entries(value)){ //timestamp, data

            let ECG_Exist = false
            let ECG_data = []

            for(const [key3, value3] of Object.entries(value2)){ //data, specific data type
              if(key3.includes("ECG") && typeof value3 != 'string'){  //Filters to only include ECG data
                ECG_Exist = true
                ECG_Timestamps_Exist = true
                if(!ECG_Timestamps.includes(key2)) ECG_Timestamps.push(key2)
                ECG_data.push(value3)
              }
               else if(key3.includes("HR") && typeof value3 != 'string'){  //Filters to only include HR data
                HR_Exist = true
                if(!HR_Timestamps.includes(key2)) HR_Timestamps.push(key2)
                HR_values.push(value3)
              }
              else if(key3.includes("TI") && typeof value3 != 'string'){  //Filters to only include TI data
                TI_Exist = true
                if(!TI_Timestamps.includes(key2)) TI_Timestamps.push(key2)
                TI_values.push(value3)
              }
              else if(key3.toLowerCase().includes("status")){  //Filters to only include AS data
                AS_Exist = true
                let bit = value3.toLowerCase() == "not active" ? 0 : 1
                if(!AS_Timestamps.includes(key2)) AS_Timestamps.push(key2)
                AS_values.push(bit)
              }
            }

            //Adds data for ECG
            if(ECG_Exist == true) {
              if(ECG_Graph.length == 0 && gotValue == false){
                setGotValue(true)
                setECG_Graph(ECG_data)
              }
              setECG((prevData) => [...prevData, {[key2]: ECG_data}])
            }
    
          }
        }
      }

      //Adds data for HR, TI, & AC
      if(HR_Exist == true) setHeartRate({timestamps: HR_Timestamps, data: HR_values})
      if(TI_Exist == true) setThoracicImpedance({timestamps: TI_Timestamps, data: TI_values})
      if(AS_Exist == true) setStatus({timestamps: AS_Timestamps, data: AS_values})
      if(ECG_Timestamps_Exist == true) setECG_Timestamps(ECG_Timestamps)

    }

    // console.log("timestamp", timestamps)
    // console.log("heart rate", heartRate)
    // console.log("TI", thoracicImpedance)
    // console.log("status", status)
    // console.log("ECG", ECG)
    //console.log("ECG", ECG_Graph)
    //console.log("ECG Timestapms", ECG_Timestamps)
    // console.log("loading", loading)

  return (

    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scroll}>

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


      {/* Graphs */}
      <View style={{alignItems: 'center'}}>

          {loading == true && <ActivityIndicator visible={true} textContent={"Loading..."} textStyle={styles.spinnerTextStyle} />}

        
          {/* Heart Rate Graph */}
          {heartRate.data.length == 0 && loading == false ? <Text style={styles.noDataText}>No data available for heart rate</Text> 

          :

          (heartRate.data.length > 0 && loading == false) &&

          <View style={styles.graphContainer}>
            <Text style={{textAlign: 'center'}}>Heart Rate Data (bpm)</Text>
            <LineChart
                  data={{
                    labels: heartRate.timestamps,
                    datasets: [ { data: heartRate.data,
                                  strokeWidth: 2 }] 
                  }}
                  width={screenWidth - 20}
                  height={screenHeight * 0.85}
                  chartConfig={chartConfig}
                  withInnerLines={false}
                  style={styles.graph}
                />
          </View>
          }

          {/* Thoracic Impedance Graph */}
          {thoracicImpedance.data.length == 0 && loading == false ? <Text style={styles.noDataText}>No data available for thoracic Impedance</Text> 

          :

          (thoracicImpedance.data.length > 0 && loading == false) &&
            
          <View style={styles.graphContainer}>
            <Text style={{textAlign: 'center'}}>Thoracic Impedance Data (|Z| ohms)</Text>
            <LineChart
                  data={{
                    labels: thoracicImpedance.timestamps,
                    datasets: [ { data: thoracicImpedance.data,
                                  strokeWidth: 2 }] 
                  }}
                  width={screenWidth - 20}
                  height={screenHeight * 0.85}
                  withInnerLines={false}
                  chartConfig={chartConfig}
                  style={styles.graph}
                />
          </View>
          }


          {/* Activity Status Graph*/}
          {status.data.length == 0 && loading == false ? <Text style={styles.noDataText}>No data available for activity status</Text> 

          :

          (status.data.length > 0 && loading == false) &&
            
          <View style={styles.graphContainer}>
            <Text style={{textAlign: 'center'}}>Activity Status (0 = Not Active, 1 = Active)</Text>
            <LineChart
                  data={{
                    labels: status.timestamps,
                    datasets: [ { data: status.data,
                                  strokeWidth: 2 }] 
                  }}
                  width={screenWidth - 20}
                  height={screenHeight * 0.85}
                  withInnerLines={false}
                  chartConfig={chartConfig}
                  style={styles.graph}
                />
          </View>
          }



          {/* ECG Graph */}
          {ECG.length == 0 && loading == false ? <Text style={styles.noDataText}>No data available for ECG</Text> 

          :

          (ECG.length > 0 && loading == false) &&
            
          <View style={styles.graphContainer}>
            <Text style={{textAlign: 'center'}}>ECG Data (mV)</Text>
            <LineChart
                    data={{
                      datasets: [ { data: ECG_Graph,  
                                    strokeWidth: 2 }] 
                    }}
                    withInnerLines={false}
                    withDots={ECG.length > 30 ? false : true}
                    width={screenWidth - 20}
                    height={screenHeight * 0.85}
                    chartConfig={chartConfig}
                    style={styles.graph}
                  />

            <SelectDropdown
              data={ECG_Timestamps}
              defaultButtonText={Object.keys(ECG[0])[0]}            
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                ECG.some((data) => {
                  if(Object.keys(data)[0] == selectedItem){
                    setTimeout(() => setECG_Graph(Object.values(data)[0]), 0);
                    return true
                  }
                })
                return selectedItem
              }}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#444"}
                    size={13}
                  />
                );
              }}
              dropdownIconPosition={"right"} 
              buttonStyle={styles.dropdown}
              />
          </View>
          }
      </View>
    </ScrollView> 
</SafeAreaView> 
    )
}

const chartConfig = {
    backgroundGradientFrom: '#f79d9d',
    backgroundGradientTo: '#fc3636',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "2"
    }
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
},
graph: {
  marginVertical: 8,
  borderRadius: 16,
},
graphContainer: {
  alignItems: 'center', 
marginVertical: 20
},
dropdown: { 
  borderBottomColor: "black",
  borderWidth: 1,
  top: -68
}
})








