import {createDrawerNavigator} from "@react-navigation/drawer";
import About from "../Screens/About";
import HomeStack from "./HomeStack";
import AddCoffeeForm from "../Screens/AddCoffeeForm";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
    <Drawer.Navigator>
        <Drawer.Screen name="Coffee Shops" component={HomeStack}/>
        <Drawer.Screen name="Add Coffee Shop" component={AddCoffeeForm}/>
        <Drawer.Screen name="About Us" component={About}/>
    </Drawer.Navigator>
);
export default DrawerNavigator;
