import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView } from 'react-native';

function SensorGuide() {
    return(
        <SafeAreaView style={{backgroundColor: 'white'}}>
            <ScrollView style={{height: '100%'}}>
                <View style={styles.container}>
                    <Text style={styles.heading}>Wearable Sensors Guide</Text>
                    <Text style={styles.paragraph}>Please ensure that you have reviewed the wearable sensor protocol with your doctor
                        prior to data collection. Below you can find a refresher for affixing the sensors.
                    </Text>
                    <View style={{alignItems: 'center'}}>
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
        backgroundColor: 'white'
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
    },
    list: {
        padding: 5
    }
  });

  export default SensorGuide;