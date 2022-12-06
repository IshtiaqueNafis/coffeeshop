import {createDrawerNavigator} from "@react-navigation/drawer";
import About from "../Screens/About";
import HomeStack from "./HomeStack";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
    <Drawer.Navigator>
        <Drawer.Screen name="HomeStack" component={HomeStack}/>
        <Drawer.Screen name="About" component={About}/>
    </Drawer.Navigator>
);
export default DrawerNavigator;
