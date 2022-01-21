import axios from "axios";
import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import FastImage from "react-native-fast-image";
import Toast from "react-native-toast-message";
import {useSelector} from "react-redux";
import {FloatingTitleTextInputField} from "../global/FloatingTitleTextInputField";
import {api_url} from "../utils/apiInfo";
import {obTheme} from "../utils/colors";

const MyProfileForm = () => {
  const currentUser = useSelector(state => state.user.userInfo);

  const [formVal, setFormVal] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    avatar_url: "",
    display_name: "",
    isLoading: true,
  });

  React.useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const profData = new FormData();

    profData.append("user_id", currentUser.id);

    const res = await axios.post(`${api_url}/myprofile`, profData);

    console.log("Profile Res", res);

    const {first_name, last_name, email, avatar_url} = res.data.data;
    const {display_name} = res.data.detail.data;

    setFormVal({
      ...formVal,
      first_name,
      last_name,
      email,
      avatar_url: Array.isArray(avatar_url) ? avatar_url[0] : avatar_url,
      display_name,
      isLoading: false,
    });
  };

  const handleSubmit = async () => {
    console.log("FormVal", formVal);

    const finalData = new FormData();

    finalData.append("user_id", currentUser.id);
    finalData.append("first_name", formVal.first_name);
    finalData.append("last_name", formVal.last_name);
    finalData.append("display_name", formVal.display_name);

    // Display the values
    // for (var value of finalData.values()) {
    //   console.log("form data", value);
    // }

    try {
      const res = await axios.post(`${api_url}/profile`, finalData);

      console.log("Changed Profile: ", res);

      if (res.data.status === "1") {
        Toast.show({
          type: "success",
          text1: "Profile updated.",
          position: "bottom",
        });
      }
    } catch (error) {
      console.log("Profile update error", error);
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
      <Text style={styles.formHead}>Update Your Profile</Text>
      {!formVal.isLoading ? (
        <View style={styles.profileForm}>
          <FastImage
            style={{
              width: 100,
              height: 100,
              alignSelf: "center",
              flex: 1,
              borderRadius: 32,
              marginTop: 24,
            }}
            source={{
              uri: formVal.avatar_url,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="first_name"
              title="First Name*"
              value={formVal.first_name}
              updateMasterState={updateMasterState}
              otherTextInputProps={{}}
            />
          </View>
          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="last_name"
              title="Last Name*"
              value={formVal.last_name}
              updateMasterState={updateMasterState}
              otherTextInputProps={{}}
            />
          </View>
          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="email"
              title="Email Address*"
              value={formVal.email}
              updateMasterState={updateMasterState}
              otherTextInputProps={{
                editable: false,
              }}
            />
          </View>
          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="display_name"
              title="Display Name"
              value={formVal.display_name}
              updateMasterState={updateMasterState}
              otherTextInputProps={{}}
            />
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={() => handleSubmit()}>
            <View style={{...styles.fieldWrap, ...styles.btnWrap}}>
              <Text style={styles.btnWrapTxt}>Update Profile</Text>
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

export default MyProfileForm;
