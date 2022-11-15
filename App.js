import React, {useState} from 'react';
import { LogBox, Platform } from 'react-native';
import { initializeApp } from 'firebase/app';
import "firebase/compat/auth";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { query, getDocs, collection, getFirestore, } from "firebase/firestore";


//Screens
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

//Patient Only Screens
import PatientHome from "./screens/PatientHome";
import PatientSettings from "./screens/PatientSettings";
import HFMInfo from './screens/HFMInfo';
import HelpResources from './screens/HelpResources';
import DrContact from './screens/DrContact';
import PatientEditInfo from "./screens/PatientEditInfo";
import PatientChatScreen from "./screens/PatientChatScreen"
import PatientStatInfo from './screens/PatientStatInfo';
import PatientThoracicImpedanceScreen from "./screens/ThoracicImpedanceScreen";
import PatientHeartRateScreen from "./screens/HeartRateScreen";
import PatientECGScreen from "./screens/ECGScreen";
import PatientMovementScreen from "./screens/MovementScreen";
import PatientMovementActivityScreen from "./screens/MovementActivityScreen";

//Doctor Only Screens
import DoctorHome from "./screens/DoctorHome";
import DoctorSettings from './screens/DoctorSettings';
import DoctorEditInfo from "./screens/DoctorEditInfo";
import PatientSearch from "./screens/PatientSearch";
import PatientInfo from './screens/PatientInfo';
import ThoracicImpedanceScreen from "./screens/ThoracicImpedanceScreen";
import HeartRateScreen from "./screens/HeartRateScreen";
import ECGScreen from "./screens/ECGScreen";
import MovementScreen from "./screens/MovementScreen";
import MovementActivityScreen from "./screens/MovementActivityScreen";
import DoctorChatScreen from "./screens/DoctorChatScreen"
import DoctorChatSearchScreen from './screens/DoctorChatSearchScreen';
import DoctorChatSearchResults from './screens/DoctorChatSearchResults';
import PatientResultSessions from './screens/PatientResultSessions';

//Screens accessed by both users
import PrivacyPolicy from './screens/PrivacyPolicy';
import SendFeedback from './screens/SendFeedback';
import LoadingScreen from './screens/LoadingScreen';


let userInfo;
let userEmail;

const Stack = createNativeStackNavigator();

export default function App() {
  LogBox.ignoreLogs(['Require cycle']);
  LogBox.ignoreLogs(['Setting a timer']);
  LogBox.ignoreLogs(['AsyncStorage']);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);

  async function checkRole(email, firebaseApp) {
    const db = getFirestore(firebaseApp);
    const doctors = query(collection(db, "Doctors"));
    const patients = query(collection(db, "Patients"));

    const querySnapshotD = await getDocs(doctors);
    const querySnapshotP = await getDocs(patients);

    querySnapshotD.forEach((doc) => {
      let info = doc.data();
      if (info.email == email) {
        if (info.role == "Doctor") {
          setIsDoctor(true);
          userInfo = {...info};
          return;
        }
      }
    })

    querySnapshotP.forEach((doc) => {
      let info = doc.data();
      if (info.email == email) {
        if (info.role == "Patient") {
          setIsDoctor(false);
          userInfo = {...info};
          return;
        }
      }
    })
  }

  const firebaseConfig = {
    apiKey: "AIzaSyCD10KucIjlrPVxGK8hlKdv4_Hc7tHeAnE",
    authDomain: "egnproject-2a600.firebaseapp.com",
    databaseURL: "https://egnproject-2a600-default-rtdb.firebaseio.com",
    projectId: "egnproject-2a600",
    storageBucket: "egnproject-2a600.appspot.com",
    messagingSenderId: "517236214863",
    appId: "1:517236214863:web:1fff67b54f558706b0ee3a",
    measurementId: "G-237KSFEBFT"
  };

  //Checking if firebase has been initialized
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userEmail = user.email;
      checkRole(userEmail, app);
      setIsLoggedIn(true);
    }
    else {
      userInfo = "";
      setIsLoggedIn(false);
    }
  });

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {
           isLoggedIn == true?
          (
            <>
            <Stack.Screen options={{header: () => null}} name="LoadingScreen" component={LoadingScreen} />
            {
              isDoctor == true?
              (
                <>
                <Stack.Group screenOptions={{ headerStyle: { backgroundColor: '#fc3636' },  headerTintColor: 'black', 
                                              headerBackTitle: "", title: "" } }>
                  <Stack.Screen name="DoctorHome" component={DoctorHome} />
                  <Stack.Screen options={{headerBackTitle: Platform.OS === 'ios' ? "" : "", title: Platform.OS === 'ios' ? "" : "" }}
                                name="PatientInfo" component={PatientInfo} />
                  <Stack.Screen options={{ title: ' ' }} name="PatientSearchScreen" component={PatientSearch} />
                </Stack.Group>

  
                                           
                   <Stack.Group screenOptions={{ headerStyle: { backgroundColor: '#fc3636' },  headerTintColor: 'black',
                                                headerBackTitle: Platform.OS === 'ios' ? "Patient Info" : "", title: Platform.OS === 'ios' ? "" : "Patient Info" }}>
                    <Stack.Screen options={{headerBackTitle: Platform.OS === 'ios' ? "" : "", title: Platform.OS === 'ios' ? "" : "" }}  
                                            name="ThoracicImpedanceScreen" component={ThoracicImpedanceScreen} />
                    <Stack.Screen options={{headerBackTitle: Platform.OS === 'ios' ? "" : "", title: Platform.OS === 'ios' ? "" : "" }}  
                                            name="ECGScreen" component={ECGScreen} />
                    <Stack.Screen options={{headerBackTitle: Platform.OS === 'ios' ? "" : "", title: Platform.OS === 'ios' ? "" : "" }}  
                                            name="HeartRateScreen" component={HeartRateScreen} />
                    <Stack.Screen options={{headerBackTitle: Platform.OS === 'ios' ? "" : "", title: Platform.OS === 'ios' ? "" : "" }}  
                                            name="MovementScreen" component={MovementScreen} />
                    <Stack.Screen options={{headerBackTitle: Platform.OS === 'ios' ? "" : "", title: Platform.OS === 'ios' ? "" : "" }}  
                                            name="MovementActivityScreen" component={MovementActivityScreen} />
                    <Stack.Screen options={{headerBackTitle: "", title: Platform.OS === 'ios' ? "" : "" }}  
                                            name="PatientResultSessions" component={PatientResultSessions} />
                  </Stack.Group>
        
                  <Stack.Group screenOptions={{ headerStyle: { backgroundColor: '#fc3636' },  headerTintColor: 'black',
                                                headerBackTitle: Platform.OS === 'ios' ? "Home" : "", title: Platform.OS === 'ios' ? "" : "Home" }}>
                    <Stack.Screen options={{ title: ' ' }} name="DoctorSettings" component={DoctorSettings} />
                    <Stack.Screen options={{ title: ' ' }} name="DoctorEditInfoScreen" component={DoctorEditInfo} />
                    <Stack.Screen options={{ title: ' ' }} name="PrivacyPolicy" component={PrivacyPolicy} />
                    <Stack.Screen options={{ title: ' ' }} name="SendFeedback" component={SendFeedback} />
                    <Stack.Screen options={{ title: ' ' }} name="DoctorChatScreen" component={DoctorChatScreen} />
                    <Stack.Screen options={{ title: ' ' }} name="DoctorChatSearchScreen" component={DoctorChatSearchScreen} />
                    <Stack.Screen options={{ title: ' ' }} name="DoctorChatSearchResults" component={DoctorChatSearchResults} /> 
                  </Stack.Group>
                </>
              )
              : 
              (
                <>
                  <Stack.Screen options={{header: () => null}} name="PatientHome" component={PatientHome} />

                  <Stack.Group screenOptions={{ headerStyle: { backgroundColor: '#fc3636' },  headerTintColor: 'black',
                                                headerBackTitle: Platform.OS === 'ios' ? "Home" : "", title: Platform.OS === 'ios' ? "" : "Home" }}>
                    <Stack.Screen name="HFMInfo" component={HFMInfo} />
                    <Stack.Screen name="HelpResources" component={HelpResources} />
                    <Stack.Screen name="DrContact" component={DrContact} />
                    <Stack.Screen name="PatientSettings" component={PatientSettings} />
                    <Stack.Screen name="PatientChatScreen" component={PatientChatScreen} />
                    <Stack.Screen name="PatientStatInfo" component={PatientStatInfo} />
                </Stack.Group>

                
                <Stack.Group screenOptions={{ headerStyle: { backgroundColor: '#fc3636' },  headerTintColor: 'black',
                                                headerBackTitle: Platform.OS === 'ios' ? "Patient Info" : "", title: Platform.OS === 'ios' ? "" : "Patient Info" }}>
                    <Stack.Screen options={{headerBackTitle: Platform.OS === 'ios' ? "Back" : "", title: Platform.OS === 'ios' ? "" : "Back" }}  
                                            name="PatientThoracicImpedanceScreen" component={PatientThoracicImpedanceScreen} />
                    <Stack.Screen options={{headerBackTitle: Platform.OS === 'ios' ? "Back" : "", title: Platform.OS === 'ios' ? "" : "Back" }}  
                                            name="PatientECGScreen" component={PatientECGScreen} />
                    <Stack.Screen options={{headerBackTitle: Platform.OS === 'ios' ? "Back" : "", title: Platform.OS === 'ios' ? "" : "Back" }}  
                                            name="PatientHeartRateScreen" component={PatientHeartRateScreen} />
                    <Stack.Screen options={{headerBackTitle: Platform.OS === 'ios' ? "Back" : "", title: Platform.OS === 'ios' ? "" : "Back" }}  
                                            name="PatientMovementScreen" component={PatientMovementScreen} />
                    <Stack.Screen options={{headerBackTitle: Platform.OS === 'ios' ? "Back" : "", title: Platform.OS === 'ios' ? "" : "Back" }}  
                                            name="PatientMovementActivityScreen" component={PatientMovementActivityScreen} />
                  </Stack.Group>

                <Stack.Group screenOptions={{ headerStyle: { backgroundColor: '#fc3636' },  headerTintColor: 'black',
                                              headerBackTitle: Platform.OS === 'ios' ? "Settings" : "", title: Platform.OS === 'ios' ? "" : "Settings" }}>
                    <Stack.Screen name="PatientEditInfoScreen" component={PatientEditInfo} />                                                  
                    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
                    <Stack.Screen name="SendFeedback" component={SendFeedback} />
                </Stack.Group>



                </>
              )
            }
            </>
          )
            :    
            // If not logged in
            (
              <>
              <Stack.Screen options={{header: () => null}} name="login" component={LoginScreen} />
              <Stack.Group screenOptions={{ headerStyle: { backgroundColor: '#fc3636' }}}>
              <Stack.Screen name="Register" component={RegisterScreen} 
                            options={{ headerBackTitle: Platform.OS === 'ios' ? "Login" : "", title: Platform.OS === 'ios' ? "" : "Login", 
                            headerTintColor: 'black'}} />
              </Stack.Group>
            </>

            )  
        }

      </Stack.Navigator> 
    </NavigationContainer>
  );
}


export {userInfo}; // for panels where user info from database gets displayed
export {userEmail};
