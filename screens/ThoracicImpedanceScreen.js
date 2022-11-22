import {Dimensions,  View, Text, StyleSheet, SafeAreaView, ActivityIndicator }from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import React, { useEffect, useState } from 'react';
import {Divider} from 'react-native-elements';

const screenWidth = Dimensions.get("window").width * 0.9;
const screenHeight = Dimensions.get("window").height * 0.5;

export default function ThoracicImpedanceScreen({route}) {
    const patientInfo = route.params.patientInfo;
    const selectedDate = route.params.selectedDate
    const [isLoading, setIsLoading] = useState(true)
    const [values, setValues] = useState(route.params.data);

    
    useEffect(() => {
      setIsLoading(false)
    }, [])

    
    return(
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


            {/* Graph */}

            
            {isLoading == true ? <ActivityIndicator visible={true} textContent={"Loading..."} textStyle={styles.spinnerTextStyle} />
            
              :

              values.length == 0 ? <Text style={styles.noDataText}>No data available</Text> 
            
              :

            <View style={{alignItems: 'center'}}>
                <Text style={{textAlign: 'center'}}>Thoracic Impedance Data (|Z| ohms)</Text>
                <Text style={{textAlign: 'center'}}>{selectedDate}</Text>

                <View style={styles.graph}>
                    <LineChart
                      data={{
                        datasets: [
                          {
                            data: values
                          }
                        ]
                      }}
                      width={screenWidth}
                      height={screenHeight}
                      withInnerLines={false}
                      xLabelsOffset={-15}
                      verticalLabelRotation={90} //Degree to rotate
                      yAxisInterval={1}
                      chartConfig={chartConfig}
                      style={{
                        marginVertical: 8,
                        borderRadius: 16,
                        padding: 10
                      }}
                    />
                </View>
                <Text style={{textAlign: "center", bottom: 70, fontSize: 13}}>{selectedDate}</Text>
            </View>
          }
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
  },
  noDataText: {
    textAlign: "center"
  }
});
