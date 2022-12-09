import React, {useEffect} from 'react';
import {Container, Heading, Text} from "native-base";
import {useDispatch, useSelector} from "react-redux";
import {coffeeSelector, getCoffeeShopDataAsync} from "../Redux/CoffeShopSliceReducer";
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "../Firebase/firebaseConfig";
import Loading from "./Loading";
import {FlatList, TouchableOpacity} from "react-native";

const Home = ({navigation}) => {
    const allCoffeeShopData = useSelector(coffeeSelector.selectAll);
    const {loading} = useSelector(state => state.coffeeShop);
    const dispatch = useDispatch();
    useEffect(() => {

        onSnapshot(collection(db, "coffeeShop"), () => {
            dispatch(getCoffeeShopDataAsync());
        })


    }, [dispatch])

    if (loading) return <Loading/>

    return (
        <Container>
            <Heading>
                A component library for the{" "}
                <Heading color="emerald.400">React Ecosystem</Heading>
            </Heading>


            <FlatList data={allCoffeeShopData}

                      renderItem={({item}) => (
                          <TouchableOpacity onPress={() => navigation.navigate("Details",{id:item.id})}>
                              <Text>{item.coffeeShopName}</Text>

                          </TouchableOpacity>

                      )}/>


        </Container>
    );
};

export default Home;
