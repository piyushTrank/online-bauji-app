import React from "react";
import {View, StyleSheet, BackHandler, Text} from "react-native";
import WebView from "react-native-webview";
import BlogList from "../components/blog-list/BlogList";
import Header from "../components/header/Header";
import {obTheme} from "../components/utils/colors";

const BlogScreen = ({navigation}) => {
  const [wvdata, setWvData] = React.useState({
    canGoBack: false,
  });

  const webview = React.useRef(null);

  const onAndroidBackPress = currState => {
    if (webview.current && wvdata.canGoBack) {
      webview.current.goBack();
      return true; // prevent default behavior (exit app)
    }

    if (currState === false) {
      navigation.goBack();
    }

    return false;
  };

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onAndroidBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onAndroidBackPress);
    };
  }, [wvdata]); // Never re-run this effect

  return (
    <View style={styles.parentContainer}>
      <View style={styles.headerWrapper}>
        <Header navigation={navigation} />
      </View>
      <View style={styles.scrollContainer}>
        <BlogList navigation={navigation} />
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
    marginTop: 20,
  },
  contentWrapper: {
    flex: 1,
  },
  headerWrapper: {
    backgroundColor: obTheme.secondary,
  },
});

export default BlogScreen;
