import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
import {LogBox} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {getCart} from "./src/store/actions/cart.actions";
import SplashScreenFirst from "./src/components/splash-screens/SplashScreenFirst";
import StNavigator from "./src/navigators/StNavigator";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const dispatch = useDispatch();
  const [hideSplash, setHideSplash] = React.useState(false);
  const [isUser, setIsUser] = React.useState("");
  const currentUser = useSelector(state => state.user.userInfo);

  React.useEffect(() => {
    LogBox.ignoreLogs([]);
  }, []);

  //Get Cart
  React.useEffect(() => {
    dispatch(getCart());

    setIsUser(currentUser);
  }, []);

  React.useEffect(() => {
    let splashTimer = setTimeout(() => {
      setHideSplash(true);
    }, 3000);

    return () => {
      clearTimeout(splashTimer);
    };
  }, []);

  const renderNavigation = () => {
    return (
      <StNavigator userInfo={currentUser} />
      // <Stack.Navigator screenOptions={{headerShown: false}}>
      //   {showAuth ? (
      //     <>
      //       <Stack.Screen name="OtpScreen" component={OtpAuthWrapper} />
      //       <Stack.Screen name="AuthScreen" component={AuthWrapper} />
      //     </>
      //   ) : null}
      //   <Stack.Screen name="HomeScreen" component={HomeScreen} />
      // </Stack.Navigator>
    );
  };

  return hideSplash && isUser !== "" ? (
    renderNavigation()
  ) : (
    <SplashScreenFirst />
  );
}

export default RootNavigator;
