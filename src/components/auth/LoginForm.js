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
import {FloatingTitleTextInputField} from "../global/FloatingTitleTextInputField";
import {obTheme} from "../utils/colors";
import {validateIsEmail} from "../utils/utilFn";
import {useDispatch} from "react-redux";
import {changeAuthSkip} from "../../store/actions/metaData.actions";
import {userLogin} from "../../store/actions/auth.actions";

const skipArrow = require("../../assets/images/auth/rightArrow.png");

const LoginForm = props => {
  const dispatch = useDispatch();

  const [formVal, setFormVal] = React.useState({
    email: "",
    password: "",
  });

  function updateMasterState(attrName, value) {
    setFormVal({
      ...formVal,
      [attrName]: value,
    });
  }

  const handleChangeAuth = () => {
    props.handleScreenChange(2);
  };

  const handleSubmit = () => {
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
      dispatch(userLogin(formVal.email, formVal.password, Toast));
    }
  };

  const handleSkip = () => {
    dispatch(changeAuthSkip(true));
  };

  return (
    <>
      <View style={styles.parentContainer}>
        <Text style={styles.authHead}>LOGIN</Text>
        <View style={styles.loginForm}>
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

          <Text style={{color: obTheme.primary, marginTop: 5}}>
            Forgot Password
          </Text>

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
        <Text style={{color: obTheme.text}}>Don't have an Account?</Text>
        <TouchableWithoutFeedback onPress={handleChangeAuth}>
          <Text
            style={{
              color: obTheme.primary,
              fontWeight: "700",
              marginTop: 5,
              fontSize: 16,
            }}>
            REGISTER
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

  skipTxt: {
    paddingEnd: 5,
    fontSize: 16,
    color: obTheme.text,
  },
});

export default LoginForm;
