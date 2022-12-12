import { SafeAreaView, StyleSheet, Text, View, Pressable, TouchableOpacity} from 'react-native';
import React from 'react'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from 'react-native-vector-icons/Ionicons';
import "firebase/auth";
import "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { userInfo } from '../App';//require cycle warning

//Home screen for patients
function PatientHome() {
    const navigation = useNavigation();

    return(
        <SafeAreaView style={styles.container}>
            {/* Settings Icon and UID */}
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignContent: 'flex-start', backgroundColor: '#fc3636'}}>
                <Text style={styles.id}></Text>
                <Pressable onPress={() => navigation.navigate("PatientSettings")}>
                    <FontAwesome style={styles.gIcon} name={'gear'} size={30} color={'black'}/> 
                </Pressable>
            </View>

            {/* Heading Box */}
            <View style={{alignItems: 'center'}}>
                <Text style={styles.heading}>Welcome</Text>
                <Text style={styles.subheading}>{userInfo.firstName} {userInfo.lastName}</Text>
            </View>

            {/* Button Section */}
            <View style={styles.buttonBox}> 
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => navigation.navigate("HFMInfo")} style={[styles.button, {backgroundColor: '#ffadad'}]}>
                            <Text style={styles.buttonText}>How HeartHealth {'\n'}Works</Text>
                            <FontAwesome style={styles.icon} name={'info-circle'} size={35} color={'black'}/> 
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => navigation.navigate("PatientEditInfoScreen")} style={[styles.button, {backgroundColor: '#f87c7c'}]}>
                            <Text style={styles.buttonText}>Profile</Text>
                            <FontAwesome style={styles.icon} name={'user'} size={35} color={'black'}/> 
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => navigation.navigate("DrContact")} style={[styles.button, {backgroundColor: '#f85353'}]}>
                            <Text style={styles.buttonText}>Doctor Contact {'\n'}Information</Text>
                            <FontAwesome style={styles.icon} name={'user-md'} size={35} color={'black'}/> 
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => navigation.navigate("PatientStatInfo")} style={[styles.button, {backgroundColor: '#e62e2e'}]}>
                            <Text style={styles.buttonText}>Stats</Text>
                            <FontAwesome style={styles.icon} name={'area-chart'} size={35} color={'black'}/> 
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => navigation.navigate("PatientChatScreen")} style={[styles.button, {backgroundColor: '#971313'}]}>
                            <Text style={styles.buttonText}>Chat with Doctor</Text>
                            <Ionicons name={'chatbubble-ellipses'} style={styles.icon} size={35} color={'black'} />
                        </TouchableOpacity>
                    </View>
            </View>
        </SafeAreaView>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    buttonBox: {
        alignItems: 'center',
        marginTop: 30
    },
    button: {
        justifyContent: 'space-between',
        backgroundColor: '#fd9292',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 20,
        margin: 10,
        borderRadius: 10,
        width: '80%',
        shadowColor: 'black',
        shadowOffset: {height: 4},
        shadowOpacity: 0.6,
        shadowRadius: 6,
      },
      heading: {
        fontSize: 35,
        padding: 5,
        marginTop: 10,
        fontWeight: 'bold'

      },
    subheading: {
        padding: 2,
        marginRight: 5,
        fontSize: 25,
      },
      gIcon: {
        padding: 10,
        marginRight: 10
      },
      icon: {
        padding: 10,
        marginLeft: 10
      },
      buttonText: {
        color: 'white',
        textAlign: 'left',
        fontSize: 25
      },
      id: { //do not set this equal to uid
        padding: 10,
        marginRight: 10
      },
  });
  
  export default PatientHome;