import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, Dimensions, ScrollView, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import {LineChart} from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import { Divider } from 'react-native-elements';

const screenWidth = Dimensions.get("window").width * 0.9;
const screenHeight = Dimensions.get("window").height * 0.55;

export default function MovementScreen({route}) {

    const navigation = useNavigation();
    const patientInfo = route.params.patientInfo;
    const selectedDate = route.params.selectedDate
    const [isLoading, setIsLoading] = useState(true)
    const [timevalues, setTimeValues] = useState([]);
    const [xvalues, setxValues] = React.useState([]);
    const [yvalues, setyValues] = React.useState([]);
    const [zvalues, setzValues] = React.useState([]);

      
    useEffect(() => {
      setParameters()
      setIsLoading(false)
    }, [])
  
    function setParameters(){
      const data = route.params.data

      data.map((item) => {
        //If item's x value, y value, or z value is undefined the data point wont be reflected in the graphs
        if(item.x !== undefined && item.y !== undefined && item.z !== undefined ){
          console.log("x " + item.x)
          setxValues( (prevData) => [...prevData, item.x] )
          setyValues( (prevData) => [...prevData, item.y] )
          setzValues( (prevData) => [...prevData, item.z] )
          setTimeValues( (prevData) =>[...prevData, item.time] )
        }
      })
    }

    const Xdata = {
      labels: timevalues,
      datasets: [{ data: xvalues }]
    }
    
    const Ydata = {
      labels: timevalues,
      datasets: [{ data: yvalues }]
    }
    
    const Zdata = {
      labels: timevalues,
      datasets: [{ data: zvalues }] 
    }

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

            <View style={{alignItems: 'center'}}>
              <Text style={{textAlign: 'center'}}>{selectedDate}</Text>
              <TouchableOpacity onPress={() => navigation.navigate("MovementActivityScreen", 
              {"patientInfo": patientInfo, "xValues": xvalues, "yValues": yvalues, "zValues": zvalues })} style={[styles.button, {backgroundColor: '#fc3636'}]}>
                <Text style={styles.buttonText}>Activity</Text>
              </TouchableOpacity>
              </View>


         <ScrollView style={styles.scroll}>
          <View style={{alignItems: 'center'}}>

              {/* Movement Graphs */}
              {isLoading == true && <ActivityIndicator visible={true} textContent={"Loading..."} textStyle={styles.spinnerTextStyle} />}

              { xvalues.length == 0 ? <Text style={styles.noDataText}>No data available for x values</Text> 

              :
                
              <View>
                  <Text style={styles.textStyle}>X Value Chart</Text>
                  <LineChart
                    data = {Xdata}
                    width = {screenWidth}
                    height={screenHeight}
                    verticalLabelRotation={90} //Degree to rotate
                    chartConfig = {chartConfig}
                    withInnerLines={false}
                    bezier style = {{
                      marginVertical: 8,
                      borderRadius: 16
                    }}
                  />
              </View>
              }


              { yvalues.length == 0 ? <Text style={styles.noDataText}>No data available for y values</Text> 

              :
              
              <View>
                <Text style={styles.textStyle}>Y Value Chart</Text>
                <LineChart
                    data = {Ydata}
                    width = {screenWidth}
                    height={screenHeight}
                    verticalLabelRotation={90} //Degree to rotate
                    chartConfig = {chartConfig}
                    withInnerLines={false}
                    bezier style = {{
                          marginVertical: 8,
                          borderRadius: 16
                          }} 
                />
              </View>

              }


              { zvalues.length == 0 ? <Text style={styles.noDataText}>No data available for z values</Text> 

              :
              
              <View>
                  <Text style={styles.textStyle}>Z Value Chart</Text>
                  <LineChart
                  data = {Zdata}
                  width = {screenWidth}
                  height={screenHeight}
                  verticalLabelRotation={90} //Degree to rotate
                  chartConfig = {chartConfig}
                  withInnerLines={false}
                  bezier style = {{
                          marginVertical: 8,
                          borderRadius: 16
                          }}
                  />
              </View>

              }

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
    spinnerTextStyle: {
      color: "#FFF"
  },
  noDataText: {
    textAlign: "center"
  }
  });