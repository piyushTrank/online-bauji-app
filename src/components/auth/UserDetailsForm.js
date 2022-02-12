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
import {useDispatch, useSelector} from "react-redux";
import {userSignUp} from "../../store/actions/auth.actions";

const UserDetailsForm = props => {
  const dispatch = useDispatch();

  const authOptions = useSelector(state => state.metaData.authOptions);

  const [formVal, setFormVal] = React.useState({
    fields: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: authOptions.mobNum,
      enableOffer: false,
    },
    isFormValid: false,
  });

  function updateMasterState(attrName, value) {
    setFormVal({
      ...formVal,
      fields: {
        ...formVal.fields,
        [attrName]: value,
      },
    });
  }

  const handleSubmit = () => {
    const reqFields = [
      "firstName",
      "email",
      "password",
      "confirmPassword",
      "phone",
    ];

    let chkReqFields = true;

    reqFields.forEach(el => {
      if (formVal.fields[el] === "") {
        Toast.show({
          type: "error",
          text1: "Fields marked(*) cannot be empty.",
          position: "bottom",
        });
        chkReqFields = false;
        return false;
      }
    });

    console.log("chkReqFields", chkReqFields);

    if (!chkReqFields) return;

    if (!validateIsEmail(formVal.fields.email)) {
      Toast.show({
        type: "error",
        text1: "Please enter valid email address.",
        position: "bottom",
      });
    } else if (formVal.fields.password === "") {
      Toast.show({
        type: "error",
        text1: "Email and Password cannot be empty.",
        position: "bottom",
      });
    } else if (formVal.fields.password !== formVal.fields.confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Passwords do not match.",
        position: "bottom",
      });
    } else {
      console.log("FormVal", formVal.fields);
      dispatch(userSignUp(formVal.fields, Toast));
    }
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
              title="First Name*"
              value={formVal.fields.firstName}
              updateMasterState={updateMasterState}
              otherTextInputProps={{}}
            />
          </View>
          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="lastName"
              title="Last Name"
              value={formVal.fields.lastName}
              updateMasterState={updateMasterState}
              otherTextInputProps={{}}
            />
          </View>
          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="email"
              title="Email*"
              value={formVal.fields.email}
              updateMasterState={updateMasterState}
              otherTextInputProps={{
                autoCapitalize: "none",
                keyboardType: "email-address",
              }}
            />
          </View>

          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="phone"
              title="Mobile Number*"
              value={formVal.fields.phone}
              updateMasterState={updateMasterState}
              otherTextInputProps={{
                editable: false,
              }}
            />
          </View>

          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="password"
              title="Password*"
              value={formVal.fields.password}
              updateMasterState={updateMasterState}
              otherTextInputProps={{
                autoCapitalize: "none",
                secureTextEntry: true,
                value: formVal.password,
              }}
            />
          </View>

          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="confirmPassword"
              title="Confirm Password*"
              value={formVal.fields.confirmPassword}
              updateMasterState={updateMasterState}
              otherTextInputProps={{
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

export default UserDetailsForm;
