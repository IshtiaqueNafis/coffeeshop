import React from 'react';
import {Heading, Text, View} from "native-base";

const Home = () => {
    console.log('this is home')
    return (
        <View>
            <Heading>
                A component library for the{" "}
                <Heading color="emerald.400">React Ecosystem</Heading>
            </Heading>
            <Text pt="3">
                NativeBase is a simple, modular and accessible component library that
                gives you building blocks to build you React applications.
            </Text>
        </View>
    );
};

export default Home;
