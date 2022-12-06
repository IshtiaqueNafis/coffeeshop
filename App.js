import 'react-native-gesture-handler';
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import DrawerNavigator from "./Routes/DrawerNavigator";


const Stack = createNativeStackNavigator();
const App = () => (

    <NativeBaseProvider>
        <NavigationContainer>
            <DrawerNavigator/>
        </NavigationContainer>
    </NativeBaseProvider>
);
export default App


