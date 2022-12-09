import {createDrawerNavigator} from "@react-navigation/drawer";
import About from "../Screens/About";
import HomeStack from "./HomeStack";
import AddCoffeeForm from "../Screens/AddCoffeeForm";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
    <Drawer.Navigator>
        <Drawer.Screen name="HomeStack" component={HomeStack}/>
        <Drawer.Screen name="About" component={About}/>
        <Drawer.Screen name="Add a Coffee Shop" component={AddCoffeeForm}/>
    </Drawer.Navigator>
);
export default DrawerNavigator;
