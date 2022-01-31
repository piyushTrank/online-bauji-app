import React from "react";
import {useNavigation} from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {changeAuthSkip} from "../store/actions/metaData.actions";
import {userLogout} from "../store/actions/auth.actions";
import {obTheme} from "../components/utils/colors";
import Header from "../components/header/Header";
import HomeSlider from "../components/homeSlider/HomeSlider";
import HomeCategories from "../components/homeCategories/HomeCategories";
import TopSearch from "../components/top-search/TopSearch";
import FeaturedCourses from "../components/featured-courses/FeaturedCourses";
import {
  getAllCategories,
  getLatestProducts,
} from "../store/actions/misc.actions";
import TabNavbar from "../components/tab-navbar/TabNavbar";
import LatestPosts from "../components/latest-posts/LatestPosts";

function HomeScreen({route, navigation}) {
  const currentUser = useSelector(state => state.user.userInfo);

  //const navigation = useNavigation();

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getLatestProducts());
  }, [navigation]);

  // const handleEnableAuth = () => {
  //   dispatch(changeAuthSkip(false));

  //   setTimeout(() => {
  //     navigation.navigate("OtpScreen");
  //   }, 1000);
  // };

  // const handleLogout = () => {
  //   dispatch(userLogout());
  // };

  return (
    <View style={styles.parentContainer}>
      <View style={styles.headerWrapper}>
        <Header navigation={navigation} />
      </View>
      <View style={styles.scrollContainer}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={styles.scrollWrap}>
          <HomeSlider navigation={navigation} />
          <HomeCategories navigation={navigation} />
          <TopSearch navigation={navigation} />
          <FeaturedCourses navigation={navigation} />
          <LatestPosts navigation={navigation} />
        </ScrollView>
      </View>
      <View style={styles.tabNavCont}>
        <TabNavbar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: obTheme.secondary,
  },
  headerWrapper: {
    flex: 1,
  },
  scrollWrap: {
    paddingVertical: 30,
  },
  scrollContainer: {
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    flex: 2,
    backgroundColor: obTheme.white,
    marginTop: 20,
  },
  headerWrapper: {
    backgroundColor: obTheme.secondary,
  },
  tabNavCont: {
    height: 56,
  },
});

export default HomeScreen;
