import axios from "axios";
import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Platform,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import FastImage from "react-native-fast-image";
import Toast from "react-native-toast-message";
import {useSelector} from "react-redux";
import {FloatingTitleTextInputField} from "../global/FloatingTitleTextInputField";
import Icon from "../IconNB";
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
    selectedFile: null,
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
    if (formVal.selectedFile !== null) {
      finalData.append("image", {
        name: formVal.selectedFile.path.substr(
          formVal.selectedFile.path.lastIndexOf("/") + 1,
        ),
        type: formVal.selectedFile.mime,
        uri:
          Platform.OS === "android"
            ? formVal.selectedFile.path
            : formVal.selectedFile.path.replace("file://", ""),
      });
    }

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

  const handleImgChange = () => {
    ImagePicker.openPicker({
      width: 128,
      height: 128,
      cropping: true,
      mediaType: "photo",
      includeBase64: true,
    }).then(image => {
      setFormVal({
        ...formVal,
        selectedFile: {
          ...image,
          baseImg: `data:${image.mime};base64,${image.data}`,
        },
      });
      console.log("Image picker", image);
    });
  };

  return (
    <View style={styles.parentContainer}>
      <Text style={styles.formHead}>Update Your Profile</Text>
      {!formVal.isLoading ? (
        <View style={styles.profileForm}>
          <View style={styles.avatarWrap}>
            <FastImage
              style={{
                width: 100,
                height: 100,
                alignSelf: "center",
                flex: 1,
                borderRadius: 50,
                marginTop: 24,
                backgroundColor: obTheme.white,
                elevation: 2,
              }}
              source={{
                uri:
                  formVal.selectedFile === null
                    ? formVal.avatar_url
                    : formVal.selectedFile.baseImg,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <TouchableOpacity onPress={handleImgChange}>
              <View style={styles.uploadBtn}>
                <Icon
                  type="MaterialIcons"
                  name="file-upload"
                  color={obTheme.white}
                  size={24}
                />
                <Text style={styles.uploadBtnTxt}>Upload</Text>
              </View>
            </TouchableOpacity>
          </View>
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
  avatarWrap: {
    width: 120,
    height: 150,
    alignSelf: "center",
  },
  uploadBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: obTheme.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    width: 100,
    alignSelf: "center",
  },
  uploadBtnTxt: {
    color: obTheme.white,
    fontSize: 12,
    fontWeight: "500",
  },
});

export default MyProfileForm;
