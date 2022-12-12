import React, { useEffect, useState } from "react";
import { SafeAreaView, ActivityIndicator, StyleSheet, View } from "react-native";
import { userInfo } from "../App";

//Provides loading action when first logged in
const LoadingScreen = props => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);
    useEffect(() => {
        if (!loading && (userInfo)) {
            if (userInfo.role == "Doctor") {
                props.navigation.replace("DoctorHome");    
            }
            else {
                props.navigation.replace("PatientHome");    
            }
        }
    }, [!loading, props.navigation]);

return (
    <SafeAreaView style={{ flex: 1 }}>
        <View style = {styles.container}>
            <ActivityIndicator
            visible={loading}
            textContent={"Loading..."}
            textStyle={styles.spinnerTextStyle}
            />
        </View>
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 70
    },
    spinnerTextStyle: {
        color: "#FFF"
    }
});

export {userInfo};
export default LoadingScreen
