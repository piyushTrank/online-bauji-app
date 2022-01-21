import React from "react";
import {useNavigation} from "@react-navigation/native";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import FloatingTextInput from "../components/FloatingTextInput";
import Icon from "../components/IconNB";
import ProgressDialog from "../components/ProgressDialog";
import {changeAuthSkip} from "../store/actions/metaData.actions";
import {userLogout} from "../store/actions/auth.actions";

function TestScreen({route, navigation}) {
  console.log(route);

  const currentUser = useSelector(state => state.user.userInfo);

  //const navigation = useNavigation();

  const dispatch = useDispatch();

  const handleEnableAuth = () => {
    dispatch(changeAuthSkip(false));

    setTimeout(() => {
      navigation.navigate("OtpScreen");
    }, 1000);
  };

  const handleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <View style={styles.container}>
      <Icon type="AntDesign" name="closecircle" color="red" size={24} />
      <Text>Hello World</Text>
      <View style={{padding: 20, width: "100%"}}>
        <FloatingTextInput label="First Name" />
        <FloatingTextInput label="Last Name" />
      </View>
      {currentUser !== null ? (
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleEnableAuth}>
          <Text>Login</Text>
        </TouchableOpacity>
      )}

      {/* <ProgressDialog loading={true} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TestScreen;
