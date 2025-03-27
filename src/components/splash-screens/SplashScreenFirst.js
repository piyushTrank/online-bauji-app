import React from "react";
import { SafeAreaView, Image, Dimensions } from "react-native";

const {height, width} = Dimensions.get("window");
const SplashScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Image
        source={require("../../assets/images/global/splashtrading.png")}
        style={{
          flex: 1,
          height,
          width
        }}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;
