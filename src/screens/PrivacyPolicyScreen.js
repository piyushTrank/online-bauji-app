import React from "react";
import {View, StyleSheet, ScrollView, Text} from "react-native";
import WebView from "react-native-webview";
import Header from "../components/header/Header";
import {obTheme} from "../components/utils/colors";

const PrivacyPolicyScreen = ({navigation}) => {
  return (
    <View style={styles.parentContainer}>
      <View style={styles.headerWrapper}>
        <Header navigation={navigation} />
      </View>
      <View style={styles.scrollContainer}>
        <WebView
          javaScriptEnabled={true}
          source={{
            uri: `https://www.onlinebauji.com/privacy-policy?hideLayout=true`,
          }}
          style={{flex: 1}}
          sharedCookiesEnabled={true}
          useWebKit
          mixedContentMode="always"
          onError={syntheticEvent => {
            const {nativeEvent} = syntheticEvent;
            console.log("WebView error: ", nativeEvent);
          }}
          thirdPartyCookiesEnabled={true}
          cacheEnabled={false}
        />
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

export default PrivacyPolicyScreen;
