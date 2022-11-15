import { View, Text, TextInput, Pressable, StyleSheet, Dimensions, ScrollView } from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import { userInfo } from './LoadingScreen';
import { doc, getDoc, setDoc, collection, orderBy, query } from 'firebase/firestore';
import { db } from "../firebase"; 
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DoctorBottomNavbar from './DoctorBottomNavbar';

const screenWidth = Dimensions.get("window").width;

export default function DoctorChatSearchScreen() {

    const navigation = useNavigation();
    const [patientList, setPatientList] = useState([]);
    const [searchValue, setSearchValue] = useState("")
    const [searchBarSelected, setSearchBarSelected] = useState(false)
    const [ongoingConversations, setOngoingConversations ] = useState([])
    const docRef = doc(db, "Doctors", String(userInfo.uid));
    const inputRef = useRef(null)

    useEffect(() => {
        getPatientList()
    }, [0]);


    async function getPatientList(){
       const docSnap = await getDoc(docRef);
       if (docSnap.exists()) {
           setPatientList(docSnap.data().patients)
           setOngoingConversations(docSnap.data().ongoingConversations)

       }
       else {
            console.log("No such document!");
       }
    }

    function onSearch () {
        let searchVal= searchValue.toLowerCase()
        const result = patientList.filter((patient) => {            
            if(patient.firstName.toLowerCase().includes(searchVal) || patient.lastName.toLowerCase().includes(searchVal) || String(patient.uid).toLowerCase().includes(searchVal)){
                return true
            }
            else{
                return false
            }
        });
        result.push(searchValue)
        navigation.navigate("DoctorChatSearchResults", {result})
    }
    
  return (

    <View style={styles.mainContainer}>
        <View style={styles.searchBox}>
            <TextInput value={searchValue} ref={inputRef} style={styles.input} placeholder="Search here..."  
                       onChangeText={(newText) => setSearchValue(newText)} onFocus={()=> setSearchBarSelected((value) => !value)} 
                       onBlur={()=> setSearchBarSelected((value) => !value)} />
            <Pressable onPress={onSearch}>
                 <FontAwesome style={styles.icon} name={"search"} size={30} color={'black'}/>  
            </Pressable>

        </View>


        {searchBarSelected ?
        <ScrollView>
            <View>
                {patientList.length !== 0 && patientList.map((patient, index) => {
                    return (
                    <Pressable key={index} style={({pressed}) => pressed && styles.select} onPressOut={() =>{ navigation.navigate("DoctorChatScreen", {patient})}}>
                        <Text style={styles.searchResultsText}>{patient.firstName} {patient.lastName} {patient.uid} </Text>       
                    </Pressable>)
                })}
            </View>
        </ScrollView>
        :
        <ScrollView>
            <View>
                {ongoingConversations.map((patient, index) => {
                    return(

                    <Pressable key={index} style={({pressed}) => pressed && styles.select} onPressOut={() =>{ navigation.navigate("DoctorChatScreen", {patient})}}>
                        <View style={styles.ongoingConvoText}>
                            <FontAwesome style={styles.icon} name={"user-circle"} size={50} color={'black'}/>  
                            <View>
                                <Text style={{fontSize: 20}}>{patient.firstName} {patient.lastName} {patient.uid}</Text>
                                <Text style={{color: "grey"}}>View message</Text>
                            </View>
                        </View>
        
                    </Pressable>                                
                    )
                    })}
            </View>
        </ScrollView>
       }

      
          {/* Bottom Nav Bar */}
          <DoctorBottomNavbar />

    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    input: {
        borderWidth: 1, 
        borderColor: 'black', 
        flexWrap: 'wrap',
        borderRadius: 10,
        paddingLeft: 10,
        margin: 5,
        backgroundColor: 'white',
        color: 'black',
        height: 45,
        width: screenWidth * 0.85
    },
    searchBox: {
        borderBottomWidth: 1,
        borderColor: "black",
        flexDirection: "row"
    },
    searchResultsText: {
        fontSize: 20,
        marginHorizontal: 10,
        paddingVertical: 8,
    },
    select: {
        backgroundColor: "#fc3636",
    },    
    icon: {
        padding: 10,
        alignItems: "center"
      },
    ongoingConvoText: {
        flexDirection: "row",
        alignItems: 'center'
    },
    bottomNavView: {
        position: 'absolute',
        width: screenWidth,
        bottom: 0,
      },
      buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around', 
        left: 10,
        right: 5
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
      buttonText: {
        fontSize: 12,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
})