import React from "react";

import Toast from "react-native-toast-message";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import {FloatingTitleTextInputField} from "../global/FloatingTitleTextInputField";
import {obTheme} from "../utils/colors";
import {validateIsEmail} from "../utils/utilFn";
import {useDispatch} from "react-redux";
import {changeAuthSkip} from "../../store/actions/metaData.actions";
import {userSignUp} from "../../store/actions/auth.actions";

const skipArrow = require("../../assets/images/auth/rightArrow.png");

const SignUpForm = props => {
  const dispatch = useDispatch();

  const [formVal, setFormVal] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    enableOffer: false,
  });

  function updateMasterState(attrName, value) {
    setFormVal({
      ...formVal,
      [attrName]: value,
    });
  }

  const handleChangeAuth = () => {
    props.handleScreenChange(1);
  };

  const handleSubmit = () => {
    console.log("Form Val", formVal);

    if (!validateIsEmail(formVal.email)) {
      Toast.show({
        type: "error",
        text1: "Please enter valid email address.",
        position: "bottom",
      });
    } else if (formVal.password === "") {
      Toast.show({
        type: "error",
        text1: "Email and Password cannot be empty.",
        position: "bottom",
      });
    } else {
      console.log("FormVal", formVal);
      dispatch(userSignUp(formVal, Toast));
    }
  };

  const handleSkip = () => {
    dispatch(changeAuthSkip(true));
  };

  const handleCheckBoxChange = () => {
    setFormVal({
      ...formVal,
      enableOffer: !formVal.enableOffer,
    });
  };

  return (
    <>
      <View style={styles.parentContainer}>
        <Text style={styles.authHead}>CREATE ACCOUNT</Text>
        <View style={styles.loginForm}>
          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="firstName"
              title="First Name"
              value={formVal.firstName}
              updateMasterState={updateMasterState}
              otherTextInputProps={{
                autoCapitalize: "none",
              }}
            />
          </View>
          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="lastName"
              title="Last Name"
              value={formVal.lastName}
              updateMasterState={updateMasterState}
              otherTextInputProps={{
                autoCapitalize: "none",
              }}
            />
          </View>
          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="email"
              title="Email"
              value={formVal.email}
              updateMasterState={updateMasterState}
              otherTextInputProps={{
                autoCapitalize: "none",
              }}
            />
          </View>
          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="password"
              title="Password"
              value={formVal.password}
              updateMasterState={updateMasterState}
              textInputStyles={
                {
                  // here you can add additional TextInput styles
                  // color: 'green',
                }
              }
              otherTextInputProps={{
                // here you can add other TextInput props of your choice
                autoCapitalize: "none",
                secureTextEntry: true,
                value: formVal.password,
              }}
            />
          </View>

          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="confirmPassword"
              title="Confirm Password"
              value={formVal.confirmPassword}
              updateMasterState={updateMasterState}
              textInputStyles={
                {
                  // here you can add additional TextInput styles
                  // color: 'green',
                }
              }
              otherTextInputProps={{
                // here you can add other TextInput props of your choice
                autoCapitalize: "none",
                secureTextEntry: true,
                value: formVal.confirmPassword,
              }}
            />
          </View>

          <View
            style={{
              ...styles.fieldWrap,
              flexDirection: "row",
              alignItems: "center",
            }}>
            <CheckBox
              value={formVal.enableOffer}
              onValueChange={handleCheckBoxChange}
              style={{color: "#000000"}}
              tintColors={{true: obTheme.primary, false: obTheme.text}}
              tintColor={{true: obTheme.primary, false: obTheme.text}}
            />
            <Text style={styles.checkLabel}>
              I'm in for emails with exciting discounts and personalized
              recommendations
            </Text>
          </View>

          <TouchableOpacity onPress={handleSubmit} activeOpacity={0.9}>
            <View style={styles.btn}>
              <Text style={{color: obTheme.white, fontWeight: "700"}}>
                SUBMIT
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.authOp}>
        <Text style={{color: obTheme.text}}>Have an Account?</Text>
        <TouchableWithoutFeedback onPress={handleChangeAuth}>
          <Text
            style={{
              color: obTheme.primary,
              fontWeight: "700",
              marginTop: 5,
              fontSize: 16,
            }}>
            LOGIN
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleSkip}>
          <View style={styles.skipWrap}>
            <Text style={styles.skipTxt}>SKIP</Text>
            <Image source={skipArrow} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: obTheme.white,
    paddingVertical: 35,
    paddingHorizontal: 24,
    marginHorizontal: 24,
    borderRadius: 30,
    marginTop: -150,
  },
  authHead: {
    fontSize: 20,
    lineHeight: 24,
    color: obTheme.text,
    textAlign: "center",
    fontWeight: "700",
  },
  fieldWrap: {
    marginTop: 20,
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
    backgroundColor: obTheme.primary,
  },
  authOp: {
    alignItems: "center",
    marginTop: 30,
  },

  skipWrap: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    fontSize: 16,
  },
  // checkbox: {
  //   borderColor: obTheme.text,
  // },
  skipTxt: {
    paddingEnd: 5,
    fontSize: 16,
    color: obTheme.text,
  },
  checkLabel: {
    paddingHorizontal: 10,
    lineHeight: 20,
    color: obTheme.text,
  },
});

export default SignUpForm;
