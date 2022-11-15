import React, {useState, useRef, useEffect, ScrollView} from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, TextInput, Pressable, StyleSheet, Dimensions } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { userInfo } from './LoadingScreen';
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../firebase"; 

const screenWidth = Dimensions.get("window").width;

export default function DoctorChatSearchResults() {

    const navigation = useNavigation();
    const inputRef = useRef(null)
    const route = useRoute();
    const list = route.params.result
    const listLength = route.params.result.length
    const [patientList, setPatientList] =  useState(list.slice(0, listLength - 1))
    const [searchValue, setSearchValue] = useState(list[listLength - 1])
    const [allPatients, setAllPatients] = useState([])

    
    useEffect(() => {
        getAllPatients()
    }, [0]);

    async function getAllPatients(){
        const docRef = doc(db, "Doctors", String(userInfo.uid));
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setAllPatients(docSnap.data().patients) 
        }
        else {
             console.log("No such document!");
        }
     }
 

    function onSearch () {
            let searchVal= searchValue.toLowerCase()

            const result = allPatients.filter((patient) => {            
                if(patient.firstName.toLowerCase().includes(searchVal) || patient.lastName.toLowerCase().includes(searchVal) || String(patient.uid).toLowerCase().includes(searchVal)){
                    return true
                }
                else{
                    return false
                }
            });
            setPatientList(result)

            if(result.length === 0){
                setPatientList([])
            }
        }

  return (
    <View style={styles.mainContainer}>
        <View style={styles.searchBox}>
            <TextInput value={searchValue} ref={inputRef} style={styles.input} placeholder="Search here..."  
                       onChangeText={(newText) => setSearchValue(newText)}  />
            <Pressable onPress={onSearch}>
                 <FontAwesome style={styles.icon} name={"search"} size={30} color={'black'}/>  
            </Pressable>

        </View>
    {patientList.length === 0 ? <Text style={styles.noResultText}>No results found</Text> : 
    
    <ScrollView>
        <View>
            {patientList.map((patient, index) => {
                return (
                    <Pressable key={index} style={({pressed}) => pressed && styles.select} onPressOut={() =>{ navigation.navigate("DoctorChatScreen", {patient})}}>
                        <Text style={styles.searchResultsText}>{patient.firstName} {patient.lastName} {patient.uid} </Text>       
                    </Pressable>
                )
            })}
        </View> 
    </ScrollView>
    
    
    }

       
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
    noResultText: {
        textAlign: "center",
        marginVertical: 10,
        right: 10,
        fontSize: 20
    }
})