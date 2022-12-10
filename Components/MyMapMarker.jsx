import React, {useState} from 'react';
import {View} from "native-base";
import MapView, {Marker} from "react-native-maps";

const MyMapMarker = ({lat, lng}) => {

    const [mapRegion, setmapRegion] = useState({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    });

    return (
        <View>
            <MapView
                region={mapRegion}>
                <Marker coordinate={mapRegion} title='Marker'/>


            </MapView>


        </View>
    );
};

export default MyMapMarker;
