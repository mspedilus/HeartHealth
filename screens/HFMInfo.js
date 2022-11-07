import { SafeAreaView, StyleSheet, Text, View, Image, Linking, ScrollView } from 'react-native';
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import {Divider} from 'react-native-elements';

function HFMInfo()  {
    const HeartFailureURL = "https://www.heart.org/en/health-topics/heart-failure/what-is-heart-failure";
    const HeartFailureImage = "./img/HeartFaliureImage.jpg";

    return(
        <SafeAreaView style={{backgroundColor: 'white'}}>
            <ScrollView style={{height: '100%'}}>
                <View style={styles.container}>
                    {/* Header */}
                    <Text style={styles.header}>Behind the Heart Failure Management System</Text>

                    {/* Part 1 */}
                    <CollapsibleView style={[styles.outerCollapse, {backgroundColor: '#ffadad'}]} noArrow={true} title={<Text style={styles.outerText}>Understanding Heart Failure</Text>}>
                        <CollapsibleView style={styles.innerCollapse} noArrow={true} title={<Text style={styles.innerText}>The Circulatory System</Text>}>
                            {/* Circulatory System */}
                            <View style={{alignItems: 'center'}}>
                                <Divider style={styles.divider} width={1}/>
                            </View>
                            <Text style={styles.basicText}>The human heart serves a central role in the circulatory system, which consists of an 
                                intricate network of blood vessels responsible for delivering oxygen and nutrient rich 
                                blood to various organs throughout the body. The circulatory system also serves to remove 
                                waste products from cells, such as carbon dioxide. Arteries are blood vessels that carry 
                                oxygen and nutrient rich blood from the heart to organs and veins carry blood back to the 
                                heart to be replenished for further use [1, 2]. 
                            </Text>
                            <Image source={require('./img/circulatory_system.jpg')} style={{height: 220, width: 150, alignSelf: 'center', margin: 15}}/>
                        </CollapsibleView>

                        <CollapsibleView style={styles.innerCollapse} noArrow={true} title={<Text style={styles.innerText}>The Heart</Text>}>
                            {/* The Heart */}
                            <View style={{alignItems: 'center'}}>
                                <Divider style={styles.divider} width={1}/>
                            </View>
                            <Text style={styles.basicText}>The heart is a muscle comprised of various chambers and valves that control the flow of 
                                blood to the body so it can be delivered to organs or to the lungs so blood can be 
                                replenished with nutrients and oxygen. These two major pathways are denoted as pulmonary 
                                circulation (network from the heart to the lungs) or system circulation (network from the 
                                heart to all other parts of the body). The right and left ventricles pump blood out of 
                                the body and the left and right atria receive blood entering the heart. A system of 
                                electrical signals in the heart control the contractions of the muscle so the heart 
                                can pump blood throughout blood vessels [2]. 
                            </Text>
                            <Image source={require('./img/heart.png')} style={{height: 160, width: 150, alignSelf: 'center', margin: 15}}/>
                        </CollapsibleView>

                        <CollapsibleView style={styles.innerCollapse} noArrow={true} title={<Text style={styles.innerText}>Heart Failure</Text>}>
                            {/* Heart Failure */}
                            <View style={{alignItems: 'center'}}>
                                <Divider style={styles.divider} width={1}/>
                            </View>
                            <Text style={styles.basicText}>Heart failure is a condition where the heart fails to pump blood effectively, 
                                resulting in the body not receiving the oxygen it needs to meet its demands. 
                                The heart either does not fill up with enough oxygenated blood from the lungs 
                                or is too weak to pump blood properly throughout the body. The condition can 
                                develop over a longer period, known as chronic heart failure, or develop suddenly, 
                                known as acute heart failure. Acute heart failure can develop from sudden damage to 
                                the heart, such as a heart attack or blood clot. Chronic heart failure is typically 
                                linked to other underlying medical conditions that increase the risk for heart 
                                failure, such as diabetes, high blood pressure, and obesity. The condition can leave 
                                the heart with permanent damage and there is currently no cure, so early detection 
                                is crucial for the prevention and management of symptoms [3, 4].  
                            </Text>
                        </CollapsibleView>
                        
                    </CollapsibleView>

                    {/* Part 2 */}
                    <CollapsibleView style={[styles.outerCollapse, {backgroundColor: '#f85353'}]} noArrow={true} title={<Text style={styles.outerText}>The Heart Failure Management System</Text>}>
                    <CollapsibleView style={styles.subInnerCollapse} noArrow={true} title={<Text style={styles.innerText}>Wearble Sensor Guide</Text>}>

                        <View style={{alignItems: 'center'}}>
                        <Divider style={styles.divider} width={1}/>

                        <Text style={styles.basicText}>Please ensure that you have reviewed the wearable sensor protocol with your doctor
                            prior to data collection. Below you can find a refresher for affixing the sensors.
                        </Text>
                        <View>
                            <Text style={styles.list}>1. Place the electrodes as shown in Figure below. Kindly note that the blue cardiac
                                electrode will be placed on the left side i.e., on the side of heart.
                            </Text>
                            <Text style={styles.list}>2. Power ON the belt by plugging in the USB cable in the battery pack.</Text>
                            <Text style={styles.list}>3. After 1 min turn the switch on the belt towards downward direction, opposite to 
                                what it is by default.
                            </Text>
                            <Text style={styles.list}>4. When done, turn OFF the belt (by plugging out the USB cable from the battery pack) 
                                and then turn back the switch towards upward direction, as it was initially.
                            </Text>
                            <Text style={styles.list}>5. Repeat point 3 next day whenever the belt is turned ON.</Text>
                            <Text style={styles.list}>6. Repeat point 4 whenever the belt is turned OFF.</Text>
                        </View>
                        <Image source={require('./img/sensors.png')} style={{alignSelf: 'center', resizeMode:'contain', width: 350, height: 300}}/>
                    </View>
                        </CollapsibleView>

                        <CollapsibleView style={styles.innerCollapse} noArrow={true} title={<Text style={styles.innerText}>Sensors</Text>}>
                            {/* Wearable Sensors */}
                            <View style={{alignItems: 'center'}}>
                                <Divider style={styles.divider} width={1}/>
                            </View>
                            <Text style={styles.basicText}>The wearable sensors are designed to collect biometric data that can aid in 
                                detecting the onset of heart failure when evaluated by a medical professional. 
                                The sensors collect information on your heart rate, thoracic impedance, position, 
                                and electrocardiogram.  
                            </Text>
                            {/* Heart rate sensor */}
                            <CollapsibleView style={styles.subInnerCollapse} noArrow={true} title={<Text style={styles.subInnerText}>Heart Rate Sensor</Text>}>
                                <View style={{alignItems: 'center'}}>
                                    <Divider style={styles.divider} width={1}/>
                                </View>
                                <Text style={styles.basicText}>Heart rate refers to the number of times the heart beats in a minute to pump 
                                    blood throughout the body. Generally, heart rate is lower at rest and at normal 
                                    conditions and increases with exercise, emotions, medication, caffeine, and a 
                                    variety of other expected factors. If the heart is in good shape, it can pump blood 
                                    more effectively and requires less beats per minute than average, resulting in a 
                                    lower heart rate. This is widely seen amongst athletes with excellent cardiovascular 
                                    health. With heart failure, the opposite is observed - the heart cannot pump blood 
                                    effectively and must overcompensate by having a rapid and irregular heartbeat [5, 6]. 
                                </Text>
                                <Image source={require('./img/heart_rate.jpg')} style={{height: 160, width: 220, alignSelf: 'center', margin: 15}}/>
                            </CollapsibleView>
                            {/* ECG sensor */}
                            <CollapsibleView style={styles.subInnerCollapse} noArrow={true} title={<Text style={styles.subInnerText}>ECG Sensor</Text>}>
                                <View style={{alignItems: 'center'}}>
                                    <Divider style={styles.divider} width={1}/>
                                </View>
                                <Text style={styles.basicText}>Electrocardiograms, also known as ECGs or EKGs, are tools used to record the 
                                    electrical signals of the heart. A heart that is not functioning properly can 
                                    present many abnormalities in its electrical signal activity that medical 
                                    professionals are trained to observe. ECGs are commonly utilized to assess 
                                    potential for heart failure by identifying abnormalities of the heart [7].  
                                </Text>
                                <Image source={require('./img/ecg.png')} style={{height: 160, width: 220, alignSelf: 'center', margin: 15}}/>
                            </CollapsibleView>
                            {/* Thoracic impedance sensor */}
                            <CollapsibleView style={styles.subInnerCollapse} noArrow={true} title={<Text style={styles.subInnerText}>Thoracic Impedance Sensor</Text>}>
                                <View style={{alignItems: 'center'}}>
                                    <Divider style={styles.divider} width={1}/>
                                </View>
                                <Text style={styles.basicText}>Since heart failure results in the heart pumping blood ineffectively, this can 
                                    often mean that blood gets backed up, which leads to fluid buildup in the lungs and 
                                    legs. Thoracic impedance is a measurement of intrathoracic (chest) fluid buildup. 
                                    If the measurement goes beyond the normal baseline value for a patient, it can be 
                                    indicative of heart failure [8, 9].   
                                </Text>
                                <Image source={require('./img/thoracic_impedance.jpg')} style={{height: 250, width: 150, alignSelf: 'center', margin: 15}}/>
                            </CollapsibleView>
                            {/* Position Sensor */}
                            <CollapsibleView style={styles.subInnerCollapse} noArrow={true} title={<Text style={styles.subInnerText}>Position Sensor</Text>}>
                                <View style={{alignItems: 'center'}}>
                                    <Divider style={styles.divider} width={1}/>
                                </View>
                                <Text style={styles.basicText}>Physical exercise and basic activity have positive effects on cardiovascular 
                                    health and can aid significantly in reducing the risk for heart failure. 
                                    The position sensor will measure triaxial acceleration data, which will provide insights into your 
                                    physical motion. If a patient is often sedentary, this can increase the risk 
                                    for heart failure and aid in its prediction [10].    
                                </Text>
                                <Image source={require('./img/exercise.jpg')} style={{height: 160, width: 200, alignSelf: 'center', margin: 15}}/>
                            </CollapsibleView>
                        </CollapsibleView>

                        <CollapsibleView style={styles.innerCollapse} noArrow={true} title={<Text style={styles.innerText}>Mobile Application</Text>}>
                            {/* Mobile Application */}
                            <View style={{alignItems: 'center'}}>
                                    <Divider style={styles.divider} width={1}/>
                            </View>
                            <Text style={styles.basicText}>The data from the sensors will be visible to your authorized doctor via the mobile 
                                application. Predicting the onset of heart failure can be difficult to do by 
                                evaluating patients only during doctor visits. By virtue of the wearable sensors 
                                collecting data frequently that will be visible in real-time to your doctor from 
                                the ease and comfort of their cell phone, they will be able to see a bigger picture 
                                of your heart health and make better assessments as to your risk for heart failure.  
                            </Text>
                        </CollapsibleView>
                        
                    </CollapsibleView>

                    {/* Part 3 - Other Information*/}
                    <CollapsibleView style={[styles.outerCollapse, {backgroundColor: '#971313'}]} noArrow={true} title={<Text style={styles.outerText}>Other Information</Text>}>

                    <CollapsibleView style={styles.innerCollapse} noArrow={true} title={<Text style={styles.innerText}>Disclaimer</Text>}>
                    <View style={{alignItems: 'center'}}>
                    <Divider style={styles.divider} width={1}/>
                    <Text style={styles.basicText}>Please note this app does not provide a means to speak with your doctor directly. To follow up with your 
                        doctor, please contact their medical practice and schedule an appointment or call. You can reference 
                        your doctor's contact information from the application home page via the 'Contact my doctor' button option.
                    </Text>
                    <Text style={styles.basicText}>{'\n'}To provide any feedback, comments, or suggestions reagrding your experience with the application,
                        please navigate to 'Settings' from the home page and click the 'Send App Feedback' option.
                    </Text>
                    <Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>{'\n'}If you are experiencing a medical emergency, please seek medical assistance and dial 911.{'\n'} </Text>
                    <Text style={styles.basicText}>Symptoms of heart failure include:
                    </Text>
                    <Image source={require(HeartFailureImage)} style={{alignSelf: 'center', width: 300, height: 200}}/>
                    <Text style={styles.basicText}>{'\n'}Heart failure is a term used to describe a heart that cannot keep up with its workload. The body may not get the oxygen it needs.
                        Some common signs and symptoms include: shortness of breath, persistent coughing or wheezing,buildup of excess fluid in body tissue (swelling in the feet or ankles),
                        tiredness and fatigue, lack of appetite or nausea, confused or impaired thinking, and/or increased heart rate.
                    </Text>
                    <Text style={styles.basicText}>{'\n'}Please speak with your doctor to learn about the symptoms of heart failure
                    - fast action can save lives. Follow up on the link below for more information.{'\n'}
                    </Text>
                    <Text style={{color: 'blue'}} onPress={() => Linking.openURL(HeartFailureURL)}>Heart Failure</Text>
                </View>
                    </CollapsibleView>


                    <CollapsibleView style={styles.innerCollapse} noArrow={true} title={<Text style={styles.innerText}>References</Text>}>
                        <View style={{alignItems: 'center'}}>
                        <Divider style={styles.divider} width={1}/>
                        <Text style={styles.basicText}>
                        <Text style={styles.link} onPress={() => Linking.openURL('http://google.com')}>1. https://www.uofmhealth.org/health-library/tx4097abc#:~:text=The%20right%20ventricle%20pumps%20the,the%20rest%20of%20the%20body {'\n'}</Text>
                            <Text style={styles.link}>2. https://kidshealth.org/en/teens/heart.html#:~:text=The%20circulatory%20system%20is%20made,waste%20products%2C%20like%20carbon%20dioxide {'\n'}</Text>
                            <Text style={styles.link}>3. https://www.nhsinform.scot/illnesses-and-conditions/heart-and-blood-vessels/about-the-heart/understanding-how-your-heart-functions  {'\n'}</Text>
                            <Text style={styles.link}>4. https://www.heart.org/en/health-topics/heart-failure/what-is-heart-failure {'\n'}</Text>
                            <Text style={styles.link}>5. https://www.webmd.com/heart-disease/heart-failure/watching-rate-monitor {'\n'}</Text>
                            <Text style={styles.link}>6. https://www.webmd.com/heart-disease/guide-heart-failure {'\n'}</Text>
                            <Text style={styles.link}>7. https://www.mayoclinic.org/tests-procedures/ekg/about/pac-20384983 {'\n'}</Text>
                            <Text style={styles.link}>8. https://www.mayoclinic.org/diseases-conditions/heart-failure/symptoms-causes/syc-20373142#:~:text=Heart%20failure%20occurs%20when%20the,to%20appear%20blue%20(cyanotic). {'\n'}</Text>
                            <Text style={styles.link}>9. https://www.ahajournals.org/doi/10.1161/circulationaha.104.492207 {'\n'}</Text>
                            <Text style={styles.link}>10. https://www.hopkinsmedicine.org/health/wellness-and-prevention/exercise-and-the-heart {'\n'}</Text>
                        </Text>
                        </View>
                    </CollapsibleView>

        

                    </CollapsibleView>

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
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'white',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 35,
        paddingBottom: 30,
    },
    subheading: {
        fontSize: 15,
        fontStyle: 'italic',
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 10,
        marginRight: 10
    },
    link: {
        color: 'black'
    },
    outerCollapse: {
        borderRadius: 10,
        borderWidth: 0,
        shadowColor: 'black',
        shadowOffset: {height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 4,
        width: '95%',
        marginTop: 20,
        paddingTop: 40,
        paddingBottom: 40,
    },
    innerCollapse: {
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'lightgrey',
    },
    subInnerCollapse: {
        borderRadius: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'lightgrey',
    },
    outerText: {
        fontSize: 20,
        padding: 10,
        color: 'white'
    },
    innerText: {
        fontSize: 17,
        padding: 10,
    },
    subInnerText: {
        padding: 10,
        fontSize: 15,
        fontStyle: 'italic',
    },
    header: {
        fontSize: 25, 
        textAlign:'center', 
        padding: 10,
        paddingBottom: 30
    },
    divider: {
        width: '85%',
        margin: 10
    },
    basicText: {
        lineHeight: 23,
        marginLeft: 10,
        marginRight: 10
    },
    list: {
        padding: 5,
        lineHeight: 23,
        marginLeft: 15,
        marginRight: 10
    }
  });

  export default HFMInfo;