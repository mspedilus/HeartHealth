import {Text, View, StyleSheet,ScrollView, ActivityIndicator, Dimensions, SafeAreaView } from 'react-native';
import {Divider} from 'react-native-elements';
import {useState} from 'react';
import { useEffect } from 'react';
import {db, app} from "../firebase"
import { doc, getDoc } from 'firebase/firestore';
import { getDatabase, ref, onValue, limitToLast, query} from 'firebase/database';
import {LineChart} from 'react-native-chart-kit'
import { userInfo } from './LoadingScreen';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height * 0.5;

export default function PatientResultSessions() {
    const realtimeDB = getDatabase(app)
    const starCountRef = query(ref(realtimeDB, userInfo.uid)/*, imitToLast(30)*/)
    const [done, setDone] = useState(false)
    const [loading, setLoading] = useState(true)
    const [patientInfo, setPatientInfo] = useState({})
    const [data, setData] = useState([])
    const [graphData, setGraphData] = useState( {ECG_Timestamps: [], ECG_Data: [], 
                                                 HR_Timestamps: [], HR_Data: [], 
                                                 TI_Timestamps: [], TI_Data: [], 
                                                 AS_Timestamps: [], AS_Data: [],
                                                 ECG_Timestamp: [], ECG_Data: [] })
                                                
    useEffect(() => {
      if(Object.keys(patientInfo).length === 0) getPatientInfo() //Gets patient info for top header
      
      onValue(starCountRef,  (snapshot) => { //Gets data from real time database
        setData(snapshot.val())
       });
    }, [])

    useEffect(() => {
      if(data != null) if (data.length != 0) getData()
      
      //Filters and adds sensor data into designated state
      setDone(true) //For loading icon
      if(done == true && loading == true) setLoading(false) //For loading icon
    }, [data])
    
    //Returns patient info
    async function getPatientInfo () {
       const docRef = doc(db, "Patients", String(userInfo.uid));
       const docSnap = await getDoc(docRef);
       if (docSnap.exists()) {
           setPatientInfo(docSnap.data())
        }
    }

    //Filters and adds sensor data into designated state
    function getData() {

      //Declare variables
      let HR_Timestamps = []
      let TI_Timestamps = []
      let AS_Timestamps = []
      let ECG_Timestamp = ""
      let HR_values = []
      let TI_values = []
      let AS_values = []
      let ECG_values = ""

      for(const [key2, value2] of Object.entries(data)){ //timestamp, data

        for(const [key3, value3] of Object.entries(value2)){ //data, specific data type
          if(key3.includes("ECG")){  //Filters to only include ECG data
            if(ECG_Timestamp != key2) ECG_Timestamp = key2
            ECG_values = value3
          }
           else if(key3.includes("HR") && typeof value3 != 'string'){  //Filters to only include HR data
            if(!HR_Timestamps.includes(key2)) HR_Timestamps.push(key2)
            HR_values.push(value3)
          }
          else if(key3.includes("TI") && typeof value3 != 'string'){  //Filters to only include TI data
            if(!TI_Timestamps.includes(key2)) TI_Timestamps.push(key2)
            TI_values.push(value3)
          }
          else if(key3.toLowerCase().includes("status")){  //Filters to only include AS data
            let bit = value3.toLowerCase() == "not active" ? 0 : 1
            if(!AS_Timestamps.includes(key2)) AS_Timestamps.push(key2)
            AS_values.push(bit)
          }
        }

       }

       let ar = ECG_values.split(",")
       ECG_values = ar.map(Number)
      setGraphData({ HR_Timestamps: HR_Timestamps, HR_Data: HR_values, 
                     TI_Timestamps: TI_Timestamps, TI_Data: TI_values,
                     AS_timestamps: AS_Timestamps, AS_Data: AS_values,
                     ECG_Timestamp: ECG_Timestamp, ECG_Data: ECG_values})

    }

    // console.log("data", data)
    // console.log("Graph", graphData)
    // console.log("timestamp", timestamps)
    // console.log("heart rate", heartRate)
    // console.log("TI", thoracicImpedance)
    // console.log("status", status)
    // console.log("ECG", ECG)
    // console.log("ECG", ECG_Graph)
    // console.log("ECG Timestapms", ECG_Timestamps)
    // console.log("loading", loading)
    // console.log(graphData.ECG_Data)

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
          {(graphData.HR_Data.length == 0 || graphData.HR_Data == null) && loading == false ? <Text style={styles.noDataText}>No data available for heart rate</Text> 

          :

          (graphData.HR_Data.length > 0 && loading == false) &&

          <View style={styles.graphContainer}>
            <Text style={{textAlign: 'center'}}>Heart Rate Data (bpm)</Text>
            <LineChart
                  data={{
                    labels: graphData.HR_Timestamps,
                    datasets: [ { data: graphData.HR_Data,
                                  strokeWidth: 2 }] 
                  }}
                  width={screenWidth - 20}
                  height={screenHeight * 0.85}
                  verticalLabelRotation={90} //Degree to rotate
                  chartConfig={chartConfig}
                  withInnerLines={false}
                  style={styles.graph}
                />
          </View>
          }

          {/* Thoracic Impedance Graph */}
          {(graphData.TI_Data.length == 0 || graphData.TI_Data == null) && loading == false ? <Text style={styles.noDataText}>No data available for thoracic Impedance</Text> 

          :

          (graphData.TI_Data.length > 0 && loading == false) &&
            
          <View style={styles.graphContainer}>
            <Text style={{textAlign: 'center'}}>Thoracic Impedance Data (|Z| ohms)</Text>
            <LineChart
                  data={{
                    labels: graphData.TI_Timestamps,
                    datasets: [ { data: graphData.TI_Data,
                                  strokeWidth: 2 }] 
                  }}
                  width={screenWidth - 20}
                  height={screenHeight * 0.85}
                  verticalLabelRotation={90} //Degree to rotate
                  withInnerLines={false}
                  chartConfig={chartConfig}
                  style={styles.graph}
                />
          </View>
          }


          {/* Activity Status Graph*/}
          {(graphData.AS_Data.length == 0 || graphData.AS_Data == null) && loading == false ? <Text style={styles.noDataText}>No data available for activity status</Text> 

          :

          (graphData.AS_Data.length > 0 && loading == false) &&
            
          <View style={styles.graphContainer}>
            <Text style={{textAlign: 'center'}}>Activity Status (0 = Not Active, 1 = Active)</Text>
            <LineChart
                  data={{
                    labels: graphData.AS_timestamps,
                    datasets: [ { data: graphData.AS_Data,
                                  strokeWidth: 2 }] 
                  }}
                  width={screenWidth - 20}
                  height={screenHeight * 0.85}
                  withInnerLines={false}
                  verticalLabelRotation={90} //Degree to rotate
                  chartConfig={chartConfig}
                  style={styles.graph}
                />
          </View>
          }



          {/* ECG Graph */}
          {(graphData.ECG_Data.length == 0 || graphData.ECG_Data == null) && loading == false ? <Text style={styles.noDataText}>No data available for ECG</Text> 

          :

          (graphData.ECG_Data.length > 0 && loading == false) &&
            
          <View style={styles.graphContainer}>
            <Text style={{textAlign: 'center'}}>ECG Data (mV)</Text>
            <LineChart
                    data={{
                      datasets: [ { data: graphData.ECG_Data,  
                                    strokeWidth: 2 }] 
                    }}
                    withInnerLines={false}
                    withDots={graphData.ECG_Data.length > 30 ? false : true}
                    verticalLabelRotation={90} //Degree to rotate
                    width={screenWidth - 20}
                    height={screenHeight * 0.85}
                    chartConfig={chartConfig}
                    style={styles.graph}
                  />
                  <Text style={{bottom: 50, fontSize: 8}}>{graphData.ECG_Timestamp}</Text>
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
    },
    propsForLabels: {
      fontSize: 8
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
noDataText:{
  marginBottom: 20
}
})