import React from "react";

// Toast
import Toast from "react-native-toast-message";

// Navigation
import {NavigationContainer, DefaultTheme} from "@react-navigation/native";
import RootNavigator from "./RootNavigator";

// Redux
import {PersistGate} from "redux-persist/lib/integration/react";
import {persistor, store} from "./src/store";
import {Provider} from "react-redux";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {enableScreens} from "react-native-screens";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet} from "react-native";

enableScreens();
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
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer theme={MyTheme}>
            <RootNavigator />
          </NavigationContainer>
          <Toast />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
