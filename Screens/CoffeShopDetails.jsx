/* 
Design: Farshad Jalali Ameri - 101303158
Logic :  Roberto Borges - 101255891/ Israr Wahid - 101348701
Testing: Sarah Sami - 101334588
*/

import React, {useCallback, useEffect} from 'react';
import {Box, Button, Heading, HStack, Icon, Image, Pressable, ScrollView, Text, VStack} from "native-base";
import {FontAwesome, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {addRatingCoffeeShop, db} from "../Firebase/firebaseConfig";
import {coffeeSelector, deleteCoffeeShopAsync, getSingleCoffeeShopDataAsync} from "../Redux/CoffeShopSliceReducer";
import {useDispatch, useSelector} from "react-redux";
import Loading from "./Loading";
import {collection, onSnapshot} from "firebase/firestore";
import {Linking} from "react-native";
import {AirbnbRating} from "react-native-ratings";
import MyMapMarker from "../Components/MyMapMarker";

const CoffeeShopDetails = ({route, navigation}) => {
    const {id} = route.params;
    const coffeeShop = useSelector(state => coffeeSelector.selectById(state, id));
    const {loading} = useSelector(state => state.coffeeShop);
    const dispatch = useDispatch();

    const onDelete = useCallback((id) => dispatch(deleteCoffeeShopAsync({id})), [])


    const onTwitterPress = (data) => {
        let twitterParameters = [];
        twitterParameters.push('text=' + encodeURI(data));
        const url =
            'https://twitter.com/intent/tweet?'
            + twitterParameters.join('&');

        Linking.openURL(url)
            .then((data) => {
                alert('Twitter Opened');
            })
            .catch(() => {
                alert('Something went wrong');
            });
    }


    const onFaceBookPress = (data) => {
        let facebookParameters = [];
        facebookParameters.push('u=' + encodeURI(`https://www.google.com/maps/place/${data}`));
        const url =
            'https://www.facebook.com/sharer/sharer.php?'
            + facebookParameters.join('&');
        Linking.openURL(url)
            .then((data) => {
                alert('Facebook Opened');
            })
            .catch(() => {
                alert('Something went wrong');
            });
    }


    const onEmailPress = async (coffeeShop) => {

        const {coffeeShopName, address, phone} = coffeeShop
        const emailSubject = `Information about ${coffeeShopName}`;
        const emailBody = `Name: ${address}\nAddress: ${address}\nPhone: ${phone}`;
        const emailUrl = `mailto:?subject=${emailSubject}&body=${emailBody}`;
        await Linking.openURL(emailUrl);
    };

    const onCallPress = (phone) => {
        Linking.openURL(`tel:${phone}`)
    }
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
                    source={require("../assets/latte_img.jpg")}
                    alt="Alternate Text"
                />
            </Box>
            <Box borderTopRadius="15" bg="white" paddingBottom="30px">
                <Box mt="5" alignItems="center">
                    <Heading maxW="200" maxH="200" fontWeight="medium">
                        {coffeeShop?.coffeeShopName}
                    </Heading>
                </Box>
                <HStack mt="5">
                    <AirbnbRating
                        defaultRating={coffeeShop?.coffeeRating}
                        showRating={false}
                        ratingCount={5}
                        size={25}
                        selectedColor="#ec9c60"
                        onFinishRating={async value => await addRatingCoffeeShop(value, id)}
                        starContainerStyle={{
                            marginLeft: 30,
                        }}
                    />
                    <Box flex="1" alignItems="flex-end" mr="8">
                        <HStack>


                            <Pressable
                                onPress={() => {
                                    navigation.navigate("Edit", {id});
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
                                onPress={
                                    () => onDelete(id)
                                }

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
                <HStack marginTop="3">
                    <VStack mt="3" ml="8">
                        <HStack>
                            <Icon
                                as={Ionicons}
                                name="md-location-sharp"
                                size="30px"
                                color="primary.50"
                            />
                            <Box maxW="120" maxH="300" mx="3">
                                <Text fontSize="md">
                                    {coffeeShop?.address?.fullAddress}
                                </Text>
                            </Box>
                        </HStack>
                        <HStack mt="5">
                            <Pressable
                                onPress={() => {
                                    onCallPress(coffeeShop?.phoneNumber)
                                }}
                            >
                                <Icon
                                    as={Ionicons}
                                    name="ios-call"
                                    size="25px"
                                    color="primary.50"
                                />
                            </Pressable>
                            <Box w="200" maxH="30">
                                <Text fontSize="md" ml="3">
                                    +1 {coffeeShop?.phoneNumber}
                                </Text>
                            </Box>
                        </HStack>
                    </VStack>
                    <Box flex="1" alignItems="flex-end" mr="8">
                        <MyMapMarker
                            lat={coffeeShop?.address?.lat} lng={coffeeShop?.address?.lng}/>
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
                <Box alignItems="center">
                    <HStack mx="8" mt="3">
                        <Pressable
                            onPress={() => {
                                const value = coffeeShop?.address?.fullAddress.split(",")[0]
                                const replaced = value.split(" ").join('+');
                                onFaceBookPress(replaced);


                            }}
                        >
                            <Icon
                                as={FontAwesome}
                                name="facebook-square"
                                size="50px"
                                color="primary.300"
                            />
                        </Pressable>
                        <Pressable
                            ml="5"
                            onPress={() => {
                                const text = `CoffeeShop name is ${coffeeShop?.coffeeShopName}
                            it is located at ${coffeeShop?.address?.fullAddress} phone number is ${coffeeShop?.phoneNumber}
                            `

                                onTwitterPress(text);
                            }}
                        >
                            <Icon
                                as={FontAwesome}
                                name="twitter-square"
                                size="50px"
                                color="primary.500"
                            />
                        </Pressable>
                        <Pressable
                            ml="5"
                            onPress={async () => {
                                await onEmailPress(coffeeShop);
                            }}
                        >
                            <Icon
                                as={FontAwesome}
                                name="share-alt-square"
                                size="50px"
                                color="primary.600"
                            />
                        </Pressable>
                    </HStack>
                </Box>
            </Box>
        </ScrollView>
    );
};

export default CoffeeShopDetails;
