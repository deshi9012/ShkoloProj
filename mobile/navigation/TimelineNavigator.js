import { createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import TimelineScreen from "../screens/TimelineScreen";
import ItemDetailsScreen from "../screens/ItemDetailsScreen";


const TimelineNavigator = createStackNavigator({
  Timeline: TimelineScreen,
  ItemDetails: ItemDetailsScreen
});

export default createAppContainer(TimelineNavigator);