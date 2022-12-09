import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import { Formik } from "formik";
import * as Yup from "yup";
import MyTextInput from "../Components/MyTextInput";
import MyTextArea from "../Components/MyTextArea";
import MyPlaceInput from "../Components/MyPlaceInput";
import { MultipleSelectList } from "react-native-dropdown-select-list/index";
import { coffeShopTags } from "../api/coffeShopTags";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { addCoffeeShopDataAsync } from "../Redux/CoffeShopSliceReducer";

const AddCoffeeForm = ({ navigation }) => {
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();

  const initialValues = {
    coffeeShopName: "",
    address: "",
    phoneNumber: "",
    description: "",
    tags: [],
  };
  const validationSchema = Yup.object({
    coffeeShopName: Yup.string().required("name is a required field"),
    address: Yup.string().required("address is required"),
    phoneNumber: Yup.number().required("phone is a required field"),
    description: Yup.string().required("description is required"),
    tags: Yup.array()
      .max(5, "only 5 tag is allowed")
      .required("provide latest one tag"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        values.tags = [...selected];
        if (selected.length > 0) {
          await dispatch(addCoffeeShopDataAsync({ data: values }));
          resetForm();
          setSelected([]);
          navigation.navigate("Home");
        } else {
          Alert.alert("Must choose 1 tag atleast");
        }
      }}
    >
      {({
        handleChange,
        handleBlur,
        errors,
        touched,
        handleSubmit,
        values,
        isSubmitting,
        isValid,
        dirty,
        resetForm,
      }) => (
        <ScrollView>
          <Box>
            <Box
              bg="primary.50"
              p="2"
              borderLeftRadius="30"
              marginLeft="40"
              alignItems="center"
            >
              <Heading ml="5" color="white" fontWeight="medium">
                Add Coffee Shop
              </Heading>
            </Box>
            <Box
              p="2"
              my="5"
              maxW="290"
              borderRightRadius="30"
              bg="primary.100"
            >
              <VStack>
                <MyTextInput
                  label={"Enter Name"}
                  mt={"5"}
                  onChangeText={handleChange("coffeeShopName")}
                  onBlur={handleBlur("coffeeShopName")}
                  value={values.coffeeShopName}
                />

                <MyPlaceInput
                  label={"Address"}
                  mt={"3"}
                  name={"address"}
                  onChangeText={handleChange("address")}
                  onBlur={handleBlur("address")}
                  value={values.address}
                />

                <MyTextInput
                  label={"Phone"}
                  mt={"3"}
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  value={values.phoneNumber}
                  keyboardType="numeric"
                />

                <MyTextArea
                  label={"Description"}
                  mt={"3"}
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={values.description}
                />

                <View
                  style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}
                >
                  <MultipleSelectList
                    setSelected={(val) => setSelected(val)}
                    placeholder={"Tags"}
                    data={coffeShopTags}
                    searchPlaceholder={"Search"}
                    label={"Tags"}
                    save={"value"}
                    boxStyles={{
                      backgroundColor: "#D1C0AD",
                      borderColor: "#D1C0AD",
                      color: "white",
                    }}
                    inputStyles={{
                      color: "white",
                    }}
                    dropdownStyles={{
                      backgroundColor: "#D1C0AD",
                    }}
                    dropdownTextStyles={{
                      color: "white",
                    }}
                    dropdownItemStyles={{
                      backgroundColor: "#D1C0AD",
                    }}
                    badgeStyles={{
                      backgroundColor: "#5C3724",
                    }}
                    checkBoxStyles={{
                      borderColor: "white",
                      color: "white",
                    }}
                    labelStyles={{
                      color: "white",
                      fontWeight: "Thin",
                    }}
                  />
                </View>

                <Box alignItems="center" mt="5">
                  <Button my="3" bg="primary.50" w="100" onPress={handleSubmit}>
                    Save
                  </Button>
                </Box>
              </VStack>
            </Box>
          </Box>
        </ScrollView>
      )}
    </Formik>
  );
};

export default AddCoffeeForm;
