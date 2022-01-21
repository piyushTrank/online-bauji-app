import React from "react";
import {useTheme} from "@react-navigation/native";
import {View, StyleSheet, Image} from "react-native";

const logo = require("../../assets/images/global/online-bauji-logo.png");
const splashDesign1 = require("../../assets/images/global/splash-design-1.png");
const splashDesign2 = require("../../assets/images/global/splash-design-2.png");

const SplashScreenFirst = () => {
  const {colors} = useTheme();

  return (
    <View style={styles.parentContainer}>
      <Image
        fadeDuration={300}
        source={splashDesign1}
        style={styles.splashDesignTop}
      />
      <Image fadeDuration={600} source={logo} />
      <Image
        fadeDuration={300}
        source={splashDesign2}
        style={styles.splashDesignBottom}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#352C65",
    justifyContent: "center",
  },
  splashDesignTop: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  splashDesignBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
});

export default SplashScreenFirst;
