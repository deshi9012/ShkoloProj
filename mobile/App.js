import React,{ useState, useEffect, useRef } from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, useDispatch} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import userReducer from "./store/reducers/user";

import LoginScreen from "./screens/LoginScreen";
import ItemDetailsScreen from "./screens/ItemDetailsScreen";
import TimelineScreen from "./screens/TimelineScreen";
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const rootReducer = combineReducers({
  user: userReducer
});

const store = createStore(rootReducer, composeWithDevTools());

console.disableYellowBox = true;

let TimelineStack = createStackNavigator({
  Timeline: TimelineScreen,
  ItemDetails: ItemDetailsScreen
});

let LoginStack = createStackNavigator({
  Login: LoginScreen,
});

let Navigation = createAppContainer(createSwitchNavigator({
    Login: LoginStack,
    Timeline: TimelineStack,
  }, {
    initialRouteName: 'Login'
  })
);

let registerForPushNotificationsAsync = async()=>{
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}


export default function App() {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);


  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  );
}
