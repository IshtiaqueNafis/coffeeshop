import {createStackNavigator} from "@react-navigation/stack";
import Home from "../Screens/Home";
import Details from "../Screens/Details";
import CoffeeShopDetails from "../Screens/CoffeShopDetails";
import SplashScreen from "../Components/SplashScreen";

const Stack = createStackNavigator();

const HomeStack = () => (
    <Stack.Navigator initialRouteName={"Splash"}>
        <Stack.Screen name={"Splash"} component={SplashScreen}></Stack.Screen>
        <Stack.Screen options={{headerShown: false}} name={'Home'} component={Home}/>
        <Stack.Screen name={'Details'} component={CoffeeShopDetails}/>

    </Stack.Navigator>
);
export default HomeStack;
