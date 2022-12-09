import React from 'react';
import {FormControl, Text, TextArea} from "native-base";

const MyTextArea = ({label, mt, ...props}) => {
    return (
        <FormControl mt={mt}>
            <Text color="white" mb="1" pl="5">
                {label}
            </Text>
            <TextArea {...props} borderRadius="15" bg="primary.200" h="100" mx="4" borderColor= "primary.200"/>
        </FormControl>
    );
};

export default MyTextArea;
