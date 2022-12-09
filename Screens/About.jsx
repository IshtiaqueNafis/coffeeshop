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
    <ScrollView>
      <Box safeArea mx="5" w="90%" alignItems="center">
        <Heading fontSize="5xl" color="primary.50">
          About Us
        </Heading>
        <Text fontSize="xl" color="primary.100" mt="10">
          Coffee Shops Guide was launched in November 2022 in Toronto, Canada.
          We are a Mobile App Developer Team. We want you to enjoy your coffee
          without worrying about the place, Coffee Shop Guide simplifies your
          search for coffee shops quickly and efficiently.
        </Text>
        <Text fontSize="xl" color="primary.100" mt="10">
          Developers:
        </Text>
        <Text fontSize="xl" color="primary.100">
          Israr Wahid - 101348701
        </Text>
        <Text fontSize="xl" color="primary.100">
          Sarah Sami - 101334588
        </Text>
        <Text fontSize="xl" color="primary.100">
          Farshad Jalali Ameri - 101303158
        </Text>
        <Text fontSize="xl" color="primary.100">
          Nafis Ishtiaque - 101206872
        </Text>
        <Text fontSize="xl" color="primary.100">
          Roberto Borges - 101255891
        </Text>
      </Box>
    </ScrollView>
  );
};

export default About;
