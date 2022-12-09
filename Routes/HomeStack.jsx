import {createStackNavigator} from "@react-navigation/stack";
import Home from "../Screens/Home";
import Details from "../Screens/Details";
import CoffeeShopDetails from "../Screens/CoffeShopDetails";

const Stack = createStackNavigator();

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name={'Home'} component={Home}/>
        <Stack.Screen name={'Details'} component={CoffeeShopDetails}/>

    </Stack.Navigator>
);
export default HomeStack;
