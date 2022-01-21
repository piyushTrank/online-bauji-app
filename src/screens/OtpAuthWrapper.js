import React from "react";
import {View, StyleSheet, Image} from "react-native";
import OtpForm from "../components/auth/OtpForm";
import PhoneOtpForm from "../components/auth/PhoneOtpForm";
import {obTheme} from "../components/utils/colors";

const logo = require("../assets/images/global/online-bauji-otp-logo.png");
// const topImg = require("../assets/images/global/splash-design-1.png");

const OtpAuthWrapper = props => {
  const [otpScreen, setOtpScreen] = React.useState(1);

  const changeOtpScreen = screenIndex => {
    setOtpScreen(screenIndex);
  };

  return (
    <View style={styles.parentContainer}>
      <Image source={logo} />
      {otpScreen === 1 ? (
        <PhoneOtpForm handleScreenChange={changeOtpScreen} />
      ) : (
        <OtpForm handleScreenChange={changeOtpScreen} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: obTheme.secondary,
    paddingTop: 60,
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default OtpAuthWrapper;
