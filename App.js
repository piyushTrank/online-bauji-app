/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";

//Toast
import Toast from "react-native-toast-message";

//Navigation
import {NavigationContainer, DefaultTheme} from "@react-navigation/native";
import RootNavigator from "./RootNavigator";

//Redux
import {PersistGate} from "redux-persist/lib/integration/react";
import {persistor, store} from "./src/store";
import {Provider} from "react-redux";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#352C65",
    secondary: "#EF5F8D",
    text: "#343434",
  },
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        <Toast />
      </PersistGate>
    </Provider>
  );
}

export default App;
