/* 
Design: Farshad Jalali Ameri - 101303158
*/

import React, { useState } from "react";
import { data } from "../api/aboutUserdata";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Image,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  extendTheme,
  TextArea,
  ScrollView,
  Icon,
  ArrowUpIcon,
} from "native-base";
import Basic from "./Basic";

const About = () => {
  const [userData, setUserData] = useState(data);
  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };
  return (
    <ScrollView safeArea>
      
      <Box mx="5" w="90%" alignItems="center" mt="5">
      <Image
                source={require("../assets/logo.png")}
                alt="Logo"
                maxW="400px"
                maxH="400px"
                alignSelf="flex-end"
            />
        <HStack>
        <Heading fontSize="5xl" color="#383444" mt="5" mr="5">
          About Us
        </Heading>
        </HStack>
        <Box mx="5" w="300px" mb="10">
          <Text fontSize="xl" mt="10">
            Coffee Shops Guide was launched in November 2022 in Toronto, Canada.
            We are a Mobile App Developer Team. We want you to enjoy your coffee
            without worrying about the place, Coffee Shop Guide simplifies your
            search for coffee shops quickly and efficiently.
          </Text>
          <Text fontSize="xl" mt="10">
            Developers:
          </Text>
          <Text fontSize="xl">
            Israr Wahid - 101348701
          </Text>
          <Text fontSize="xl">
            Sarah Sami - 101334588
          </Text>
          <Text fontSize="xl">
            Farshad Jalali Ameri - 101303158
          </Text>
          <Text fontSize="xl">
            Nafis Ishtiaque - 101206872
          </Text>
          <Text fontSize="xl">
            Roberto Borges - 101255891
          </Text>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default About;
