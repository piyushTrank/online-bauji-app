import React from "react";
import {ScrollView, StyleSheet, Dimensions, View} from "react-native";
import RenderHtml from "react-native-render-html";
import {obTheme} from "../utils/colors";

const width = Dimensions.get("window").width;

const tagsStyles = {
  body: {
    whiteSpace: "normal",
    color: obTheme.text,
    padding: "10px 16px",
    backgroundColor: "#f2f2f2",
  },
  a: {
    color: obTheme.primary,
  },
};

const ContentPlayer = ({data}) => {
  return (
    <ScrollView style={StyleSheet.parentContainer}>
      <RenderHtml
        contentWidth={width}
        source={{html: data}}
        tagsStyles={tagsStyles}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: obTheme.white,
  },
});

export default ContentPlayer;
