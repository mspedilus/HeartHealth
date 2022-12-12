import { SafeAreaView, Dimensions, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { userInfo } from './LoadingScreen';
import React from 'react'
import DoctorBottomNavbar from './DoctorBottomNavbar';

const screenWidth = Dimensions.get("window").width;

//Doctor's home screen
function DoctorHome() {

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
          <DoctorBottomNavbar />
          
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