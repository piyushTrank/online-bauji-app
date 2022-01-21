import React from "react";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import MyProfileScreen from "../screens/MyProfileScreen";
import BlogScreen from "../screens/BlogScreen";
// import {TbNavigator} from "./TbNavigator";
// import StNavigator from "./StNavigator";
import {useDispatch, useSelector} from "react-redux";
import {userLogout} from "../store/actions/auth.actions";
import HomeScreen from "../screens/HomeScreen";
import CoursesScreen from "../screens/CoursesScreen";
import OrderSuccessScreen from "../screens/OrderSuccessScreen";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import FastImage from "react-native-fast-image";
import {obTheme} from "../components/utils/colors";
import BillingAddressScreen from "../screens/BillingAddressScreen";
import ChangePasswordScreen from "../screens/ChangePassword";
import {changeAuthSkip} from "../store/actions/metaData.actions";

const defaultUser = require("../assets/images/global/default_user.png");

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  // const currentUser = useSelector(state => state.user.userInfo);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.headerCont}>
        <View style={styles.userImgWrap}>
          <FastImage
            style={{
              width: 32,
              height: 32,
              alignSelf: "center",
              borderRadius: 32,
            }}
            source={
              props.currentUser !== null
                ? {
                    uri: props.currentUser.avatar_url,
                    priority: FastImage.priority.normal,
                  }
                : defaultUser
            }
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <View style={styles.userMeta}>
          {props.currentUser !== null ? (
            <>
              <Text style={styles.userMetaTxt}>
                {props.currentUser.first_name} {props.currentUser.last_name}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  props.navigation.navigate("MyProfileScreen");
                  props.navigation.closeDrawer();
                }}>
                <Text style={styles.profileBtn}>View Profile</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                dispatch(changeAuthSkip(false));

                setTimeout(() => {
                  props.navigation.navigate("OtpScreen");
                  props.navigation.closeDrawer();
                }, 200);
              }}>
              <Text style={styles.userLogin}>Login / SignUp</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <DrawerItemList {...props} />
      {props.currentUser !== null ? (
        <DrawerItem
          label="Logout"
          onPress={() => {
            dispatch(userLogout(props.navigation));
            props.navigation.closeDrawer();
          }}
        />
      ) : null}
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

const DrNavigator = () => {
  const currentUser = useSelector(state => state.user.userInfo);

  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={props => (
        <CustomDrawerContent {...props} currentUser={currentUser} />
      )}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Courses" component={CoursesScreen} />

      <Drawer.Screen name="Blog" component={BlogScreen} />
      {currentUser !== null ? (
        <>
          <Drawer.Screen
            name="Billing Address"
            component={BillingAddressScreen}
          />
          <Drawer.Screen
            name="Change Password"
            component={ChangePasswordScreen}
          />
          <Drawer.Screen name="Order Success" component={OrderSuccessScreen} />
        </>
      ) : null}
      {/* <Drawer.Screen name="Courses" component={StNavigator} /> */}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  headerCont: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  userImgWrap: {
    elevation: 5,
    backgroundColor: obTheme.white,
    borderRadius: 32,
  },
  userMeta: {
    paddingStart: 8,
  },
  userMetaTxt: {
    color: obTheme.text,
    fontSize: 14,
    fontWeight: "700",
  },
  userLogin: {
    backgroundColor: obTheme.primary,
    color: obTheme.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    fontWeight: "500",
    fontSize: 11,
    textTransform: "uppercase",
  },
  profileBtn: {
    color: obTheme.primary,
    textTransform: "uppercase",
    fontSize: 11,
    fontWeight: "500",
    paddingTop: 4,
  },
});

export default DrNavigator;
