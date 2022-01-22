import {useNavigation, useRoute} from "@react-navigation/native";
import React from "react";
import {View, Text, StyleSheet, TouchableWithoutFeedback} from "react-native";
import {useSelector} from "react-redux";
import {TabCartSvg, TabCourseSvg, TabHomeSvg} from "../svg/TabHome";
import {obTheme} from "../utils/colors";

const tabData = [
  {
    id: 1,
    title: "Home",
    icon: <TabHomeSvg />,
    screenName: "Home",
  },
  {
    id: 2,
    title: "My Courses",
    icon: <TabCourseSvg />,
    screenName: "My Courses",
  },
  {
    id: 3,
    title: "Cart",
    icon: <TabCartSvg />,
    screenName: "Cart",
  },
];

const TabNavbar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const cart = useSelector(state => state.cart.cartData);

  const renderTabs = () => {
    return tabData.map(el => {
      const isActive = el.screenName === route.name;

      return (
        <View
          style={
            isActive ? {...styles.tbItem, ...styles.activeTab} : styles.tbItem
          }
          key={el.id}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(el.screenName)}>
            <View
              style={styles.btnWrap}
              //onPress={() => navigation.navigate("Cart")}
            >
              {el.screenName === "Cart" && cart !== null ? (
                cart.length > 0 ? (
                  <Text style={styles.cartNum}>{cart.length}</Text>
                ) : null
              ) : null}
              {el.icon}
              <Text style={styles.tbItemTxt}>{el.title}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    });
  };

  return <View style={styles.parentContainer}>{renderTabs()}</View>;
};

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: obTheme.secondary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    textAlign: "center",
    paddingHorizontal: 24,
    height: 56,
  },
  tbItem: {
    opacity: 0.6,
  },
  activeTab: {
    opacity: 1,
  },
  btnWrap: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  tbItemTxt: {
    fontSize: 10,
    paddingTop: 6,
    lineHeight: 12,
    color: obTheme.white,
  },
  cartNum: {
    backgroundColor: obTheme.primary,
    color: obTheme.white,
    fontSize: 8,
    fontWeight: "600",
    position: "absolute",
    zIndex: 2,
    width: 12,
    height: 12,
    textAlign: "center",
    borderRadius: 8,
    opacity: 1,
    top: -8,
    left: 20,
  },
});

export default TabNavbar;
