import axios from "axios";
import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import {useDispatch, useSelector} from "react-redux";
import {userLogout} from "../../store/actions/auth.actions";
import {FloatingTitleTextInputField} from "../global/FloatingTitleTextInputField";
import {api_url} from "../utils/apiInfo";
import {obTheme} from "../utils/colors";

const initialFormVal = {
  current_password: "",
  new_password: "",
  confirm_password: "",
};

const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.userInfo);
  const [formVal, setFormVal] = React.useState(initialFormVal);

  const handleSubmit = async () => {
    const new_pass = formVal.new_password;
    const conf_pass = formVal.confirm_password;

    if (new_pass !== "" && conf_pass !== "" && new_pass !== conf_pass) {
      Toast.show({
        type: "error",
        text1: "Passwords do not match!!",
        position: "bottom",
      });
      setFormVal(initialFormVal);
    }

    console.log("FormVal", formVal, currentUser.id);

    try {
      const changePassFormData = new FormData();
      changePassFormData.append("user_id", currentUser.id);
      changePassFormData.append("password_current", formVal.current_password);
      changePassFormData.append("password_1", formVal.new_password);
      changePassFormData.append("password_2", formVal.confirm_password);
      console.log("Here", changePassFormData);

      const res = await axios.post(
        `${api_url}/change-password`,
        changePassFormData,
      );

      console.log("Change password Data", res);

      if (res.data.code === 1) {
        Toast.show({
          type: "success",
          text1: "Password changed.",
          position: "bottom",
        });

        setTimeout(() => {
          dispatch(userLogout());
        }, 1000);
      } else {
        throw Error(res.data.message);
      }
    } catch (error) {
      console.log("Change password Error", error);
      Toast.show({
        type: "error",
        text1: error.message,
        position: "bottom",
      });
    }
  };

  function updateMasterState(attrName, value) {
    setFormVal({
      ...formVal,
      [attrName]: value,
    });
  }

  return (
    <View style={styles.parentContainer}>
      <Text style={styles.formHead}>Change Your Password</Text>
      {!formVal.isLoading ? (
        <View style={styles.changePassForm}>
          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="current_password"
              title="Current Password"
              value={formVal.current_password}
              updateMasterState={updateMasterState}
              otherTextInputProps={{
                autoCapitalize: "none",
                secureTextEntry: true,
                value: formVal.current_password,
              }}
            />
          </View>
          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="new_password"
              title="New Password"
              value={formVal.new_password}
              updateMasterState={updateMasterState}
              otherTextInputProps={{
                autoCapitalize: "none",
                secureTextEntry: true,
                value: formVal.new_password,
              }}
            />
          </View>
          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="confirm_password"
              title="Confirm Password"
              value={formVal.confirm_password}
              updateMasterState={updateMasterState}
              otherTextInputProps={{
                autoCapitalize: "none",
                secureTextEntry: true,
                value: formVal.confirm_password,
              }}
            />
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={() => handleSubmit()}>
            <View style={{...styles.fieldWrap, ...styles.btnWrap}}>
              <Text style={styles.btnWrapTxt}>Change Password</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.loaderWrap}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: obTheme.white,
    paddingHorizontal: 16,
    marginBottom: 60,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  fieldWrap: {
    marginTop: 20,
  },
  formHead: {
    fontSize: 14,
    color: obTheme.text,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  loaderWrap: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  btnWrap: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "center",
    backgroundColor: obTheme.primary,
  },
  btnWrapTxt: {
    color: obTheme.white,
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});

export default ChangePasswordForm;
