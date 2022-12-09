import 'react-native-gesture-handler';
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import DrawerNavigator from "./Routes/DrawerNavigator";
import {mainTheme} from "./styles/maintheme.styles";
import {Provider} from "react-redux";
import {store} from "./Redux/Store";


const Stack = createNativeStackNavigator();
const App = () => (

    <NativeBaseProvider theme={mainTheme}>
        <Provider store={store}>
            <NavigationContainer>
                <DrawerNavigator/>
            </NavigationContainer>
        </Provider>
    </NativeBaseProvider>
);


export default App


