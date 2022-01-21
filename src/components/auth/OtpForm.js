import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import {obTheme} from "../utils/colors";

import {BackHandler} from "react-native";

const OtpForm = props => {
  const [numberVal, onChangeNumber] = React.useState(null);

  const handleSubmit = () => {
    // props.handleScreenChange(1);
  };

  function handleBackButtonClick() {
    props.handleScreenChange(1);
    return true;
  }

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick,
      );
    };
  }, []);

  return (
    <SafeAreaView style={styles.parentContainer}>
      <View style={styles.otpForm}>
        <Text style={{color: obTheme.white}}>Enter OTP</Text>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={numberVal}
            placeholder="Enter 6-digit OTP"
            placeholderTextColor="#ffffff"
            keyboardType="numeric"
            maxLength={6}
          />
        </View>
      </View>
      <Text style={styles.authSwitcher}>Resend OTP</Text>
      <TouchableOpacity onPress={handleSubmit} activeOpacity={0.9}>
        <View style={styles.btn}>
          <Text style={{color: obTheme.white, fontWeight: "700"}}>SUBMIT</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    width: "100%",
    backgroundColor: obTheme.primary,
    color: obTheme.white,
    paddingTop: 40,
    paddingHorizontal: 24,
    paddingBottom: 50,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  otpHead: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 25,
    color: obTheme.white,
  },
  otpForm: {
    flexFlow: "row",
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 5,
  },
  authSwitcher: {
    color: obTheme.yellow,
    marginTop: 10,
    textAlign: "right",
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 3,
    fontSize: 16,
    lineHeight: 18,
    borderColor: obTheme.white,
    color: obTheme.white,
    letterSpacing: 3,
    fontFamily: "Roboto",
  },
  btn: {
    fontSize: 16,
    width: "100%",
    fontWeight: 700,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 30,
    backgroundColor: obTheme.secondary,
  },
});

export default OtpForm;
