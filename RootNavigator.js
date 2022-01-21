import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
import {useDispatch} from "react-redux";
import {getCart} from "./src/store/actions/cart.actions";
import SplashScreenFirst from "./src/components/splash-screens/SplashScreenFirst";
import StNavigator from "./src/navigators/StNavigator";
import OtpAuthWrapper from "./src/screens/OtpAuthWrapper";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const dispatch = useDispatch();
  const [hideSplash, setHideSplash] = React.useState(false);
  // const [showAuth, setShowAuth] = React.useState(true);

  // const currentUser = useSelector(state => state.user.userInfo);
  // const authSkip = useSelector(state => state.metaData.authSkip);

  // React.useEffect(() => {
  //   if (currentUser !== null) {
  //     setShowAuth(false);
  //   } else if (!!authSkip) {
  //     setShowAuth(false);
  //   } else {
  //     setShowAuth(true);
  //   }
  // });

  //Get Cart
  React.useEffect(() => {
    dispatch(getCart());
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
      <StNavigator />
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

  return hideSplash ? renderNavigation() : <SplashScreenFirst />;
}

export default RootNavigator;
