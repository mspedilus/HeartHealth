import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Dimensions, Pressable, StyleSheet, Text, View, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { userInfo } from './LoadingScreen';
import React from 'react'


const screenWidth = Dimensions.get("window").width;

function DoctorHome() {

    const navigation = useNavigation();
    return (
      <SafeAreaView style={styles.container}>
          <View style={{marginTop: 20}}>
              <Text style={styles.uid}>ID: {userInfo.uid}</Text>
          </View>

          {/* Header */}
          <View style={{alignItems: 'center', justifyContent: 'center', flex: 0.3}}>
                <Text style={{fontSize: 30, marginVertical: 10}}>Welcome</Text>
          </View>

          <View style={styles.infoBox}>
                <Text style={{fontSize: 22, marginVertical: 10}}>Dr. {userInfo.firstName} {userInfo.lastName} {userInfo.designation}</Text>
                <Text style={{fontStyle: 'italic', fontSize: 12, paddingTop: 5, paddingBottom: 10}}>{userInfo.affiliation} Affiliate</Text>
                <Icon name='heartbeat' type='font-awesome' color='black' size={40}/>
          </View>

          <View style={styles.subText}>
            <Text style={styles.infoText}>
              Share your ID on the top of this page with your patients
              before they register with HeartHealth.
            </Text>
            <Text style={styles.infoText}>
              Please coordinate with your patients that are using the HeartHealth application to 
              obtain their ID for patient search. 
            </Text>
            <Text style={styles.infoText}>
              View more information about your patients below with the 'Patient Search' tab.
            </Text>
          </View>
      
          {/* Bottom Nav Bar */}

        {/*DoctorChatSearchScreen*/} 


          <View style={styles.bottomNavView}>
                <View style={styles.buttonRow}>
              <Pressable onPress={() => navigation.navigate("DoctorHome")} style={({pressed}) => pressed ? styles.mainButtonsPressed : styles.mainButtons }>
                  <Text style={styles.buttonText}>Home</Text>
                  <Ionicons name={'home'} size={25} color={'white'} />
                </Pressable>
              <Pressable onPress={() => navigation.navigate("PatientSearchScreen")} style={({pressed}) => pressed ? styles.mainButtonsPressed : styles.mainButtons }>
                  <Text style={styles.buttonText}>Patient Search</Text>
                  <Ionicons name={'search'} size={25} color={'white'} />
                </Pressable>                                
                <Pressable onPress={() => navigation.navigate("PatientResultSessions")} style={({pressed}) => pressed ? styles.mainButtonsPressed : styles.mainButtons }>
                  <Text style={styles.buttonText}>Chat</Text>
                  <Ionicons name={'chatbubble-ellipses'} size={25} color={'white'} />
                </Pressable>
              <Pressable onPress={() => navigation.navigate("DoctorSettings")} style={({pressed}) => pressed ? styles.mainButtonsPressed : styles.mainButtons }>
                  <Text style={styles.buttonText}>Settings</Text>
                  <Ionicons name={'settings'} size={25} color={'white'} />
                </Pressable>
            </View>
          <StatusBar style="auto" />
          </View>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
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
  subText: {
    width: screenWidth * 0.8,
    marginTop: 35,
    justifyContent: 'center'
  },
  mainButtons: {
    width: screenWidth / 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    elevation: 3,
    backgroundColor: '#fc3636',
    position: 'relative',
    right:    10,
    bottom:   0,
    paddingBottom: 20,
  },
  mainButtonsPressed: {
    width: screenWidth / 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    elevation: 3,
    backgroundColor: '#fc3636',
    position: 'relative',
    right:    10,
    bottom:   0,
    paddingBottom: 20,
    opacity: 0.7
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    left: 10,
    right: 5
  },
  buttonText: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  bottomNavView: {
    position: 'absolute',
    width: screenWidth,
    bottom: 0,
  },
  infoText: {
    textAlign: 'center',
    marginVertical: 20
  },
  infoBox: {
    alignItems: 'center', 
    justifyContent: 'center',
    flex: 0.35,
    width: screenWidth,
    backgroundColor: '#fc3636',
    shadowColor: 'black',
    shadowOffset: {height: 4},
    shadowOpacity: 0.6,
    shadowRadius: 6,
  }
});

export default DoctorHome;