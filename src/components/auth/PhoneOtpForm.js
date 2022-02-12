import React from "react";
import Toast from "react-native-toast-message";
import {useNavigation} from "@react-navigation/native";

import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import {obTheme} from "../utils/colors";
import {useDispatch} from "react-redux";
import {resetOtp, sendOtp} from "../../store/actions/auth.actions";

const PhoneOtpForm = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [numberVal, onChangeNumber] = React.useState(null);

  React.useEffect(() => {
    dispatch(resetOtp());
  }, []);

  const handleSubmit = () => {
    if (numberVal === null || numberVal === "") {
      Toast.show({
        type: "error",
        text1: "Mobile Number cannot be empty.",
        position: "bottom",
      });
    } else if (numberVal.length < 10) {
      Toast.show({
        type: "error",
        text1: "Mobile Number must have 10 digits.",
        position: "bottom",
      });
    } else {
      dispatch(sendOtp(numberVal, Toast));
      props.handleScreenChange(2);
    }
  };

  const handleAuthSwitch = () => {
    navigation.navigate("AuthScreen");
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <Text style={styles.otpHead}>
        Get ready to join our pool of knowledge!
      </Text>
      <View style={styles.otpForm}>
        <Text style={{color: obTheme.white}}>
          Enter 10-digit Mobile Number *
        </Text>
        <View style={styles.inputWrap}>
          <Text style={styles.inputCode}>+91</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={numberVal}
            placeholder="0000000000"
            placeholderTextColor="#ffffff"
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>
      </View>
      <Text onPress={handleAuthSwitch} style={styles.authSwitcher}>
        Login with Email Id
      </Text>
      <TouchableOpacity onPress={handleSubmit} activeOpacity={0.9}>
        <View style={styles.btn}>
          <Text style={{color: obTheme.white, fontWeight: "700"}}>
            SEND OTP
          </Text>
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
  inputCode: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: obTheme.white,
    lineHeight: 18,
    fontSize: 16,
    color: obTheme.white,
  },
  input: {
    // height: 40,
    flex: 1,
    borderBottomWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 3,
    fontSize: 16,
    lineHeight: 18,
    borderColor: obTheme.white,
    color: obTheme.white,
    letterSpacing: 5,
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

export default PhoneOtpForm;
