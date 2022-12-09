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
                        container: {
                        },
                        textInputContainer: {
                            marginHorizontal: 10
                        },
                        textInput: {
                            backgroundColor: '#D1C0AD',
                            borderRadius: 15,
                            marginHorizontal: 4,
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
                            address: details.formatted_address,
                        }
                        console.log({location})
                        helpers.setValue(location.address);

                    }}


                    placeholder={'enter a place'}/>

            </ScrollView>

        </FormControl>
    );
};

export default MyPlaceInput;
