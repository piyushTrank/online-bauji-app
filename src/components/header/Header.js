import {DrawerActions, useNavigation} from "@react-navigation/native";
import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

import Icon from "../IconNB";
import {obTheme} from "../utils/colors";

import {SearchSvg, UserSvg, BackSvg, HeaderCartSvg} from "../svg/HeaderIcons";
import {ObLogo} from "../svg/GlobalIcons";

const Header = ({
  navigation,
  showBack,
  showCart,
  showDrawer,
  showLogo,
  showSearch,
  showUser,
}) => {
  //const navigation = useNavigation();

  const handleDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSearch = () => {
    navigation.navigate("SearchScreen");
  };

  return (
    <View style={styles.headerContainer}>
      {showDrawer ? (
        <TouchableWithoutFeedback onPress={handleDrawer}>
          <View style={styles.hamburgerTrigger}>
            <Icon
              type="MaterialIcons"
              name="menu"
              color={obTheme.primary}
              size={24}
            />
          </View>
        </TouchableWithoutFeedback>
      ) : null}
      {showBack ? (
        <TouchableWithoutFeedback onPress={handleBack}>
          <View style={styles.backWrap}>
            <BackSvg />
          </View>
        </TouchableWithoutFeedback>
      ) : null}
      {showLogo ? (
        <View style={styles.logo}>
          <ObLogo />
        </View>
      ) : null}
      <View style={styles.headerOp}>
        {showSearch ? (
          <TouchableOpacity activeOpacity={0.8} onPress={() => handleSearch()}>
            <Icon
              type="MaterialIcons"
              name="search"
              color={obTheme.white}
              size={24}
            />
          </TouchableOpacity>
        ) : null}
        {showCart ? <HeaderCartSvg /> : null}
        {/* {showUser ? <UserSvg style={styles.userIcon} /> : null} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,
  },
  hamburgerTrigger: {
    backgroundColor: obTheme.white,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  backWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoWrap: {
    paddingHorizontal: 10,
  },
  headerOp: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userIcon: {
    marginStart: 24,
  },
});

Header.defaultProps = {
  showDrawer: true,
  showLogo: true,
  showSearch: true,
  showUser: true,
  showBack: false,
  showCart: false,
};

export default Header;
