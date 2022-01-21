import React from "react";
import {View, Button, Text, StyleSheet} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Icon from "../components/IconNB";
import MyCoursesScreen from "../screens/MyCourses";
import CartScreen from "../screens/CartScreen";
import HomeScreen from "../screens/HomeScreen";
import {obTheme} from "../components/utils/colors";
import {TabCartSvg, TabCourseSvg, TabHomeSvg} from "../components/svg/TabHome";

function TbNavigator({navigation}) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = "android";

          if (route.name === "Home") {
            return <TabHomeSvg />;
          } else if (route.name === "My Courses") {
            return <TabCourseSvg />;
          } else if (route.name === "Cart") {
            return <TabCartSvg />;
          }
        },
        tabBarStyle: [
          {
            backgroundColor: obTheme.secondary,
          },
        ],
      })}>
      <Tab.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="My Courses"
        component={MyCoursesScreen}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Cart"
        component={CartScreen}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TbNavigator;
