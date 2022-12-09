import React from 'react';
import {FormControl, Input, Text} from "native-base";

const MyTextInput = ({label, mt, ...props}) => {


    return (
        <FormControl mt={mt}>
            <Text color="white" mb="1" pl="5">{label}</Text>
            <Input {...props} borderRadius="15" bg="primary.200" mx="4" borderColor= "primary.200"/>
        </FormControl>
    );
};

export default MyTextInput;

/*

<FormControl mt="3">
                                    <Text color="white" mb="1" pl="5">
                                        Address
                                    </Text>
                                    <TextArea borderRadius="15" bg="primary.200" h="70" mx="4"/>
                                </FormControl>
 */
