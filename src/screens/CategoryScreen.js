import React from "react";
import {View, StyleSheet, ScrollView, Text} from "react-native";
import CategoryCourseList from "../components/course-list/CategoryCourseList";

import CourseList from "../components/course-list/CourseList";
import Header from "../components/header/Header";
import TabNavbar from "../components/tab-navbar/TabNavbar";
import {obTheme} from "../components/utils/colors";

const CategoryScreen = ({route, navigation}) => {
  console.log("route", route, route.params);

  const [catInfo, setCatInfo] = React.useState({
    id: null,
  });

  return (
    <View style={styles.parentContainer}>
      <View style={styles.headerWrapper}>
        <Header navigation={navigation} showDrawer={false} showBack={true} />
      </View>
      <View style={styles.scrollContainer}>
        <CategoryCourseList catData={route.params.data} />
      </View>

      <View style={styles.tabNavCont}>
        <TabNavbar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: obTheme.secondary,
  },
  scrollContainer: {
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    flex: 1,
    backgroundColor: obTheme.white,
    marginTop: 50,
  },
  contentWrapper: {
    flex: 1,
  },
  headerWrapper: {
    backgroundColor: obTheme.secondary,
  },
});

export default CategoryScreen;
