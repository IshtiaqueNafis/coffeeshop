import React, { useEffect } from "react";
import {
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  Center,
  NativeBaseProvider,
  Pressable,
  Image,
  Icon,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import {
  coffeeSelector,
  getCoffeeShopDataAsync,
} from "../Redux/CoffeShopSliceReducer";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
import Loading from "./Loading";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Button from "native-base/src/components/primitives/Button/Button";
import { Rating, AirbnbRating } from "react-native-ratings";

const Home = ({ navigation }) => {
  const allCoffeeShopData = useSelector(coffeeSelector.selectAll);
  const { loading } = useSelector((state) => state.coffeeShop);
  const dispatch = useDispatch();
  const[refresh, setRefresh] = React.useState(0);
  useEffect(() => {
    onSnapshot(collection(db, "coffeeShop"), () => {
      dispatch(getCoffeeShopDataAsync());
    });
  }, [dispatch]);

  if (loading) return <Loading />;

  return (
    <Box flex={1} m="3" width="100%">
      <Pressable
        alignSelf="flex-end"
        mr="5"
        onPress={() => navigation.navigate("About Us")}
      >
        <HStack>
          <Text color="primary.50" mr="1">
            About Us
          </Text>
          <Icon
            as={Ionicons}
            name="ios-information-circle-outline"
            size="6"
            color="black"
          />
        </HStack>
      </Pressable>
      <Image
        source={require("../assets/logo.png")}
        alt="Logo"
        maxW="400px"
        maxH="400px"
        alignSelf="center"
      />
      <Box my="3">
        <Heading color="primary.50" textAlign="center">
          Add search bar in the box
        </Heading>
      </Box>
      <Pressable onPress={() => navigation.navigate("Add Coffee Shop")}>
        <HStack>
          <Icon
            as={Ionicons}
            name="add-circle-outline"
            size="6"
            color="black"
          />
          <Text color="primary.50">Add New</Text>
        </HStack>
      </Pressable>
      <FlatList
        data={allCoffeeShopData}
        keyExtractor={(item) => item.id}
        extraData={refresh}
        renderItem={({ item }) => (
          <Box bg="white" m="5" w="85%" borderRadius="30">
            <Pressable
              onPress={() => navigation.navigate("Details", { id: item.id })}
              bg="white"
              borderRadius="30"
            >
              <HStack>
                <Image
                  my="3"
                  ml="3"
                  source={require("../assets/test_img.jpeg")}
                  alt="Alternate Text"
                  maxW="120px"
                  maxH="120px"
                  h="120px"
                  w="120px"
                  borderRadius="10"
                />
                <VStack alignSelf="center">
                  <Text fontSize="2xl" maxW="150" ml="3" color="primary.50">
                    {item.coffeeShopName}
                  </Text>
                  <AirbnbRating
                    defaultRating={item.coffeeRating}
                    isDisabled={true}
                    showRating={false}
                    ratingCount={5}
                    size={25}
                    selectedColor="#ec9c60"
                    starContainerStyle={{ marginLeft: 10, marginTop: 10 }}
                  />
                </VStack>
              </HStack>
            </Pressable>
          </Box>
        )}
      />
    </Box>
  );
};

export default Home;
