import React from "react";
import {Image, View, StyleSheet, Dimensions, ScrollView} from "react-native";
import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SignUpForm";
import {obTheme} from "../components/utils/colors";

const logo = require("../assets/images/global/online-bauji-otp-logo.png");
// const topImg = require("../assets/images/global/splash-design-1.png");

const window = Dimensions.get("window");

const AuthWrapper = () => {
  const [authScreen, setAuthScreen] = React.useState(1);

  const changeAuthScreen = authInd => {
    setAuthScreen(authInd);
  };

  return (
    <ScrollView
      style={styles.parentContainer}
      keyboardShouldPersistTaps="handled">
      <View style={styles.roundedContainer}>
        <View style={styles.roundedBg}></View>
        <Image style={styles.topLogo} source={logo} />
      </View>
      {authScreen === 1 ? (
        <LoginForm handleScreenChange={changeAuthScreen} />
      ) : (
        <SignUpForm handleScreenChange={changeAuthScreen} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flexGrow: 1,
  },
  roundedContainer: {
    alignSelf: "center",
    width: window.width,
    overflow: "hidden",
    height: window.height / 2,
    alignItems: "center",
  },
  roundedBg: {
    backgroundColor: obTheme.secondary,
    borderRadius: window.width,
    width: window.width * 2,
    height: window.width * 2,
    marginLeft: -(window.width / 2),
    position: "absolute",
    bottom: 0,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  topLogo: {
    marginTop: 80,
  },
});

export default AuthWrapper;
