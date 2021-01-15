import React from 'react';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, useDispatch} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import userReducer from "./store/reducers/user";

import LoginScreen from "./screens/LoginScreen";
import ItemDetailsScreen from "./screens/ItemDetailsScreen";
import TimelineScreen from "./screens/TimelineScreen";
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer, createSwitchNavigator} from "react-navigation";

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

export default function App() {
  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  );
}

