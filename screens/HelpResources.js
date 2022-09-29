import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, Linking } from 'react-native';

const HeartFailureURL = "https://www.heart.org/en/health-topics/heart-failure/what-is-heart-failure";
const HeartFailureImage = "./img/HeartFaliureImage.jpg";

function HelpResources() {
    return(
        <SafeAreaView style={{backgroundColor: '#c4e9ff'}}>
            <ScrollView style={{height: '100%'}}>
                <View style={styles.container}>
                    <Text style={styles.heading}>Additional Help and Resources</Text>
                    <Text style={styles.paragraph}>Please note this app does not provide a means to speak with your doctor directly. To follow up with your 
                        doctor, please contact their medical practice and schedule an appointment or call. You can reference 
                        your doctor's contact information from the application home page via the 'Contact my doctor' button option.
                    </Text>
                    <Text style={styles.paragraph}>To provide any feedback, comments, or suggestions reagrding your experience with the application,
                        please navigate to 'Settings' from the home page and click the 'Send App Feedback' option.
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>If you are experiencing a medical emergency, please dial 911. </Text>
                    <Text style={styles.paragraph}>If you are experiencing symptoms of a heart failure, call 911 immediately 
                        and follow up with your doctor. Symptoms of heart failure include:
                    </Text>
                    <Image source={require(HeartFailureImage)} style={{alignSelf: 'center', width: 300, height: 200}}/>
                    <Text style={styles.paragraph}>Heart failure is a term used to describe a heart that cannot keep up with its workload. The body may not get the oxygen it needs.
                        Some common signs and symptoms include: shortness of breath, persistent coughing or wheezing,buildup of excess fluid in body tissue (swelling in the feet or ankles),
                        tiredness and fatigue, lack of appetite or nausea, confused or impaired thinking, and/or increased heart rate.
                    </Text>
                    <Text style={styles.paragraph}>Please speak with your doctor to learn about the symptoms of heart failure
                    - fast action can save lives. Follow up on the link below for more information.
                    </Text>
                    <Text style={{color: 'blue'}} onPress={() => Linking.openURL(HeartFailureURL)}>Heart Failure</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#c4e9ff'
    },
    heading: {
        fontSize: 20, 
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 35,
        paddingBottom: 20,
    },
    paragraph: {
        paddingTop: 10,
        paddingBottom: 10
    }
  });

  export default HelpResources;