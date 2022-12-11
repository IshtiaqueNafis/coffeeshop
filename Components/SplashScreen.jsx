import React, {useEffect} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';

const SplashScreen = ({navigation}) => {



    setTimeout(()=>{
        navigation.replace("Home")
    },3000)




    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/SplashScreen.png')}
                style={styles.image}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default SplashScreen;
