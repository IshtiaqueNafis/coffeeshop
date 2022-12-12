/* Design: Farshad Jalali Ameri - 101303158 
   Logic :  Nafis Ishtiaque - 101206872 / Sarah Sami - 101334588
   Testing: Israr Wahid - 101348701
*/


import React, {useEffect} from "react";
import {Box, FlatList, HStack, Icon, Image, Input, Pressable, Text, VStack,} from "native-base";
import {useDispatch, useSelector} from "react-redux";
import {coffeeSelector, getCoffeeShopDataAsync, setSearchTerm,} from "../Redux/CoffeShopSliceReducer";
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "../Firebase/firebaseConfig";
import {Ionicons, Feather} from "@expo/vector-icons";
import {AirbnbRating} from "react-native-ratings";


const Home = ({navigation}) => {
    const allCoffeeShopData = useSelector(coffeeSelector.selectAll);
    const {coffeeShopLoaded, searchTerm,loading} = useSelector((state) => state.coffeeShop);
    const dispatch = useDispatch();
    const [refresh, setRefresh] = React.useState(0);
    useEffect(() => {
        if (!coffeeShopLoaded) {
            onSnapshot(collection(db, "coffeeShop"), () => {

                dispatch(getCoffeeShopDataAsync());

            });
        }
    }, [dispatch, coffeeShopLoaded]);


    return (
        <Box flex={1} m="3" width="100%">
            <Pressable
                alignSelf="flex-end"
                mr="5"
                onPress={() => navigation.navigate("About Us")}
            >
                <HStack mr="5">
                    <Text color="primary.50" mr="3">
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
                mt="5"
                alignSelf="center"
            />
            <Pressable onPress={() => navigation.navigate("Add Coffee Shop")}>
                <HStack mt="5" ml="5">
                    <Icon
                        as={Ionicons}
                        name="add-circle-outline"
                        size="6"
                        color="black"
                    />
                    <Text ml="3" color="primary.50">Add New</Text>
                </HStack>
            </Pressable>
            <Box mt="5" mr="10" ml="5">
            <Input 
            InputLeftElement={<Icon as={<Feather name="search" />} size={5} ml="2" color="primary.50" />}
            bg="white"
            variant="rounded"
            marginRight="10"
            w="100%"
            value={searchTerm}
                       onChangeText={text => dispatch(setSearchTerm(text))}
                       placeholder="Search Shops"/>
            </Box>
            <FlatList
                data={allCoffeeShopData}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => {
                    if (item.coffeeShopName != undefined) {
                        return (
                            <Box bg="white" m="5" w="85%" borderRadius="30">
                                <Pressable
                                    onPress={() => navigation.navigate("Details", {id: item.id})}
                                    bg="white"
                                    borderRadius="30"
                                >
                                    <HStack>
                                        <Image
                                            my="3"
                                            ml="3"
                                            source={require("../assets/shop_logo.png")}
                                            alt="Alternate Text"
                                            maxW="120px"
                                            maxH="120px"
                                            h="120px"
                                            w="120px"
                                            borderRadius="10"
                                        />
                                        <VStack alignSelf="center">
                                            <Text fontSize="2xl" maxW="150" ml="3" mt="5" color="primary.50">
                                                {item.coffeeShopName}
                                            </Text>
                                            <AirbnbRating
                                                defaultRating={item.coffeeRating}
                                                isDisabled={true}
                                                showRating={false}
                                                ratingCount={5}
                                                size={25}
                                                selectedColor="#ec9c60"
                                                starContainerStyle={{marginLeft: 10, marginTop: 10, marginBottom: 20}}
                                            />
                                        </VStack>
                                    </HStack>
                                </Pressable>
                            </Box>
                        )
                    }
                }}
                extraData={refresh}
            />
        </Box>
    );
};

export default Home;
