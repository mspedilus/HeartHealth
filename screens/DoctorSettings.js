import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";


//Tutorial code for list item: https://reactnativeelements.com/docs/listitem#icon
const list = [
  {
    title: 'Edit Personal Information',
    icon: 'person',
    link: 'DoctorEditInfoScreen'
  },
  {
    title: 'Privacy Policy',
    icon: 'shield',
    link: 'PrivacyPolicy'
  },
  {
    title: 'Send App Feedback',
    icon: 'edit',
    link: 'SendFeedback'
  },
  {
    title: 'Log Out',
    icon: 'logout',
  },
]

function DoctorSettings() {
    const navigation = useNavigation();
    const auth = getAuth();
    return (
      <SafeAreaView style={styles.container}>
          <View styles={styles.header}>
            <Text style={{fontSize: 30, margin: 20, textAlign: 'center'}}>Settings</Text>
          </View>
  
          <View style={{padding:40, backgroundColor: 'white'}}>
            {
              list.map((item, i) => (
                <ListItem key={i} onPress={() => item.title == 'Log Out' ? signOut(auth) : navigation.navigate(item.link)} 
                  containerStyle={{backgroundColor:'white'}} style={{width: 300, borderBottomWidth: 1, borderBottomColor: 'black'}}
                >
                  <Icon name={item.icon} />
                  <ListItem.Content style={{height: 45}}>
                    <ListItem.Title>{item.title}</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron color='black'/>
                </ListItem>
              ))
            }
          </View>
  
          <View style={styles.footer}>
            <Text>Version 1.0</Text>
            <Text>Florida Atlantic University Research</Text>
            <Text>HeartHealth@Copyright 2022</Text>
            <Text style={{fontStyle: 'italic'}}>All rights reserved</Text>
          </View>
        <StatusBar style="auto" />
      </SafeAreaView>
      
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  header: {
    flex: 0.5,
    paddingTop: 60,
  },
  icon: {
    padding: 10,
    marginRight: 10
  },
  uid: {
    padding: 10,
    marginRight: 10
  },
  footer: {
    position: 'absolute', 
    left: 0, 
    right: 0, 
    bottom: 0, 
    margin: 40, 
    alignItems: 'center'
  }
});

export default DoctorSettings; 