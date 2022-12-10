import React from 'react';
import {FormControl, Text} from "native-base";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {ScrollView} from "react-native";
import {useField} from "formik";

const MyPlaceInput = ({mt, label, ...props}) => {


    const [field, meta, helpers] = useField(props);

    return (
        <FormControl mt={mt}>
            <Text color="white" mb="1" pl="5">{label}</Text>

            <ScrollView horizontal={true}
                        nestedScrollEnabled={true}
                        keyboardShouldPersistTaps='handled'
                        contentContainerStyle={{flexGrow: 2}}


            >


                <GooglePlacesAutocomplete
                    value={field.value['address']}
                    keepResultsAfterBlur={true}
                    keyboardShouldPersistTaps={"always"}
                    listViewDisplayed={true}
                    styles={{
                        textInputContainer: {
                            marginHorizontal: 10,
                            borderRadius: 15,
                            width: 250,
                        },
                        textInput: {
                            backgroundColor: '#D1C0AD',
                            borderRadius: 15,
                            marginHorizontal: 4,
                            width: 250,
                        },
                        row: {
                            backgroundColor: '#D1C0AD',
                            marginHorizontal: 4,
                            marginLeft: 10,
                            width: 250,
                            height: 50,
                            color: 'black',
                        },
                        poweredContainer: {
                            backgroundColor: '#D1C0AD',
                            marginHorizontal: 4,
                            marginLeft: 10,
                            width: 250,
                            height: 40,
                            color: 'black',
                        },
                        separator: {
                            backgroundColor: 'transparent',
                            width: 250,
                        },
                    }}
                    query={{
                        key: 'AIzaSyDmKJYeqgs3F42zaQtHVC8jgivkn3URjVw',
                        language: 'en',
                        components: 'country:ca'
                    }}
                    fetchDetails={true}
                    onPress={(data, details = null) => {

                        const location = {
                            fullAddress: details.formatted_address,
                            lat: details.geometry.location.lat,
                            lng: details.geometry.location.lng
                        }

                        helpers.setValue(location);

                    }}/>

            </ScrollView>

        </FormControl>
    );
};

export default MyPlaceInput;
