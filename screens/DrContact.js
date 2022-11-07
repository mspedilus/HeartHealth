import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import { onSnapshot,doc } from "firebase/firestore";
import { db } from "../firebase";
import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { userInfo } from '../App';


function populateList(datap) {
    const list = [
        {
          title: 'Phone',
          icon: 'phone',
          family: 'font-awesome',
          text: "datap.workPhone"
        },
        {
          title: 'Fax',
          icon: 'fax',
          family: 'font-awesome',
          text: datap.workFax
        },
        {
          title: 'Email',
          icon: 'email',
          family: 'material',
          text: datap.email
        },
        {
          title: 'Address',
          icon: 'home',
          family: 'font-awesome',
          text: datap.workAddress
        },
    ]
    return list;
}


function DrContact() {

    const navigation = useNavigation();
    const [datap, setDatap] = useState([]);
    useEffect(() => onSnapshot(doc(db, "Doctors", userInfo.doctorId), (doc) => {
      setDatap(doc.data());
    }), []);
    const list = populateList(datap);
    return(
        <View style={styles.container}>
            <Text style={styles.heading}>Your Doctor Information</Text>
            <View>
                {/* Overview Info  */}
                <View style={{alignItems:'center', padding: 40}}>
                    <Text style={styles.subheading}>Dr. {datap.firstName} {datap.lastName} {datap.designation}.</Text>
                    <Text style={{fontSize: 18, fontStyle:'italic'}}>{datap.affiliation}</Text>
                </View>
                
                {/* Details  */}
                <View style={{paddingTop:30}}>
                    {
                        list.map((item, i) => (
                        <ListItem key={i} containerStyle={{backgroundColor:'white'}} bottomDivider>
                            <Icon name={item.icon} type={item.family}/>
                            <ListItem.Content >
                                <ListItem.Title>{item.title}</ListItem.Title>
                                <ListItem.Subtitle style={styles.subtitle}>{item.text}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                        ))
                    }
                </View>
            </View>
        </View>
    );
    }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    logo: {
        height: 100,
        width: 100,
        borderRadius: 15,
        margin: 10
    },
    heading: {
        fontSize: 35,
        padding: 5
    },
  subheading: {
        padding: 2,
        fontSize: 25,
    },
    subtitle: {
        fontSize: 12,
        fontStyle: 'italic'
    }
});

export default DrContact;