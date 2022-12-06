import React, {useState} from 'react';
import {data} from "../api/aboutUserdata";
import {Box, Center} from "native-base";
import Basic from "./Basic";

const About = () => {

    const [userData, setUserData] = useState(data)
    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };
    return (

        <Box textAlign="center" bg="white" flex={4} safeAreaTop>

                <Basic/>

        </Box>


    );
};

export default About;
