import React, {useEffect} from 'react';
import {Box, Button, Heading, HStack, Icon, Image, Pressable, ScrollView, Text, VStack} from "native-base";
import {AntDesign, Feather, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {db} from "../Firebase/firebaseConfig";
import {coffeeSelector, deleteCoffeeShopAsync, getSingleCoffeeShopDataAsync} from "../Redux/CoffeShopSliceReducer";
import {useDispatch, useSelector} from "react-redux";
import Loading from "./Loading";
import {collection, onSnapshot} from "firebase/firestore";
import {Linking} from "react-native";

const CoffeeShopDetails = ({route, navigation}) => {
    const {id} = route.params;
    const coffeeShop = useSelector(state => coffeeSelector.selectById(state, id));
    const {loading} = useSelector(state => state.coffeeShop);
    const dispatch = useDispatch();

    const onEmailPress = async (coffeeShop) => {

        const {coffeeShopName, address, phone} = coffeeShop
        const emailSubject = `Information about ${coffeeShopName}`;
        const emailBody = `Name: ${address}\nAddress: ${address}\nPhone: ${phone}`;
        const emailUrl = `mailto:?subject=${emailSubject}&body=${emailBody}`;
        await Linking.openURL(emailUrl);
    };

    useEffect(() => {
        onSnapshot(collection(db, "coffeeShop"), () => {
            dispatch(getSingleCoffeeShopDataAsync({id}));
        })
    }, [id, dispatch])

    if (loading) return <Loading/>
    if (!coffeeShop) navigation.navigate("Home")
    return (
        <ScrollView safeArea>
            <Box maxH="200px">
                <Image
                    source={require("../assets/test_img.jpeg")}
                    alt="Alternate Text"
                />
            </Box>
            <Box borderTopRadius="15" bg="white">
                <Box mt="5" alignItems="center">
                    <Heading maxW="200" maxH="200" fontWeight="medium">
                        {coffeeShop?.coffeeShopName}
                    </Heading>
                </Box>
                <HStack mt="5">
                    {/*<Rating*/}
                    {/*    type="custom"*/}
                    {/*    fractions={0} //Editable rating*/}
                    {/*    ratingCount={5}*/}
                    {/*    imageSize={25}*/}
                    {/*    ratingColor="#ec9c60"*/}
                    {/*    style={{*/}
                    {/*        marginLeft: 30,*/}
                    {/*    }}*/}
                    {/*/>*/}
                    <Box flex="1" alignItems="flex-end" mr="8">
                        <HStack>
                            <Pressable
                                onPress={() => {
                                    console.log("Edit me");
                                }}
                                ml="5"
                            >
                                <Icon
                                    as={MaterialCommunityIcons}
                                    name="circle-edit-outline"
                                    size="30px"
                                    color="primary.50"
                                />
                            </Pressable>
                            <Pressable
                                onPress={async () => {

                                    await dispatch(deleteCoffeeShopAsync({id}))


                                }}
                                ml="3"
                            >
                                <Icon
                                    as={MaterialCommunityIcons}
                                    name="delete-circle-outline"
                                    size="30px"
                                    color="primary.50"
                                />
                            </Pressable>
                        </HStack>
                    </Box>
                </HStack>
                <HStack>
                    <VStack mt="3" ml="8">
                        <HStack>
                            <Icon
                                as={Ionicons}
                                name="md-location-sharp"
                                size="30px"
                                color="primary.50"
                            />
                            <Box w="200" maxW="145" maxH="300">
                                <Text fontSize="md" ml="3">
                                    {coffeeShop?.address}
                                </Text>
                            </Box>
                        </HStack>
                        <HStack mt="1">
                            <Pressable
                                onPress={() => {
                                    navigation.navigate("Home");
                                }}
                            >
                                <Icon
                                    as={Ionicons}
                                    name="ios-call"
                                    size="25px"
                                    color="primary.50"
                                />
                            </Pressable>
                            <Box w="200" maxW="145" maxH="30">
                                <Text fontSize="md" ml="3">
                                    +1 {coffeeShop?.phoneNumber}
                                </Text>
                            </Box>
                        </HStack>
                    </VStack>
                    <Box flex="1" alignItems="flex-end" mr="8">
                        {/*<Image*/}
                        {/*    mt="3"*/}
                        {/*    source={require("./assets/Google.png")}*/}
                        {/*    alt="Alternate Text"*/}
                        {/*    maxW="120px"*/}
                        {/*    maxH="120px"*/}
                        {/*    h="120px"*/}
                        {/*    w="120px"*/}
                        {/*/>*/}
                    </Box>
                </HStack>
                <Box mt="3" mx="8">
                    <Text fontSize="md">
                        {coffeeShop?.description}
                    </Text>
                    <Box mt="3">
                        <HStack flexWrap="wrap">
                            {coffeeShop?.tags?.map(tag => (
                                <Button key={tag} bg="primary.50" w="150" h="10" m="1" /*Place tags here*/>
                                    {tag}
                                </Button>
                            ))}


                        </HStack>
                    </Box>
                </Box>
                <HStack mx="8" mt="3">
                    <Pressable
                        onPress={() => {
                            console.log("Instagram me");
                        }}
                    >
                        <Icon
                            as={Feather}
                            name="instagram"
                            size="50px"
                            color="primary.400"
                        />
                    </Pressable>
                    <Pressable
                        ml="3"
                        onPress={() => {
                            console.log("Facebook me");
                        }}
                    >
                        <Icon
                            as={AntDesign}
                            name="facebook-square"
                            size="50px"
                            color="primary.300"
                        />
                    </Pressable>
                    <Pressable
                        ml="3"
                        onPress={() => {
                            console.log("Facebook me");
                        }}
                    >
                        <Icon
                            as={AntDesign}
                            name="twitter"
                            size="50px"
                            color="primary.500"
                        />
                    </Pressable>
                    <Pressable
                        ml="3"
                        onPress={async () => {
                            await onEmailPress(coffeeShop);
                        }}
                    >
                        <Icon
                            as={AntDesign}
                            name="sharealt"
                            size="50px"
                            color="primary.600"
                        />
                    </Pressable>
                </HStack>
            </Box>
        </ScrollView>
    );
};

export default CoffeeShopDetails;