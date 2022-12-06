import React, {useState} from 'react';
import {data} from "../api/aboutUserdata";
import {Avatar, Box, HStack, Icon, Pressable, Text, View, VStack} from "native-base";
import {SwipeListView} from "react-native-swipe-list-view";
import {Spacer} from "native-base/src/components/primitives/Flex";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import {Linking} from "react-native";
const Basic = () => {
    const [listData, setListData] = useState(data);
    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setListData(newData);
    };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };


    const renderItem = ({
                            item,
                            index
                        }) => <Box>
        <Pressable onPress={() => console.log('You touched me')} alignItems="center" bg="white"
                   borderBottomColor="trueGray.200" borderBottomWidth={1} justifyContent="center" height={50}
                   underlayColor={'#AAA'} _pressed={{
            bg: 'trueGray.200'
        }} py={8}>
            <Box pl="4" pr="5" py="2">
            <HStack width="100%" px={4}>

                <HStack space={3} alignItems="center">
                    <Avatar color="white" bg={'secondary.700'}  >
                        {index+1}
                    </Avatar>
                    <VStack>
                        <Text color="coolGray.800" _dark={{
                            color: 'warmGray.50'
                        }} bold>{item.id}</Text>
                    </VStack>
                    <Spacer />
                </HStack>
            </HStack>
            </Box>
        </Pressable>
    </Box>;
    const renderHiddenItem = (data, rowMap) => <HStack flex={1} pl={2}>
        <Pressable px={4} ml="auto" cursor="pointer" bg="dark.500" justifyContent="center"
                   onPress={() => Linking.openURL(data.item.link)} _pressed={{
            opacity: 0.5
        }}>
            <Icon as={Ionicons} name="home" />
        </Pressable>
    </HStack>;

    return (
        <Box bg="white" safeArea flex={1}>
            <SwipeListView data={listData} renderItem={renderItem} renderHiddenItem={renderHiddenItem}
                           rightOpenValue={-130} previewRowKey={'1'} previewOpenValue={-40} previewOpenDelay={3000}
                           onRowDidOpen={onRowDidOpen}

            />

        </Box>
    );
};

export default Basic;
