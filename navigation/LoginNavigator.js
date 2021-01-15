import { createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import LoginScreen from "../screens/LoginScreen";

const Navigator = createStackNavigator({
  Login: LoginScreen,

});

export default createAppContainer(Navigator);