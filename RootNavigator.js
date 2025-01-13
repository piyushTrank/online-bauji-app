import React from "react";
import {LogBox, View, Text} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {getCart} from "./src/store/actions/cart.actions";
import SplashScreenFirst from "./src/components/splash-screens/SplashScreenFirst";
import StNavigator from "./src/navigators/StNavigator";

function RootNavigator() {
  const dispatch = useDispatch();
  const [hideSplash, setHideSplash] = React.useState(false);
  const currentUser = useSelector(state => state.user.userInfo);

  React.useEffect(() => {
    LogBox.ignoreLogs([]); // You might want to be more specific about which logs to ignore
  }, []);

  React.useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  React.useEffect(() => {
    const splashTimer = setTimeout(() => {
      setHideSplash(true);
    }, 3000);

    return () => clearTimeout(splashTimer);
  }, []);

  const renderNavigation = () => {
    return <StNavigator userInfo={currentUser} />;
  };

  return hideSplash ? renderNavigation() : <SplashScreenFirst />;
}

export default RootNavigator;
