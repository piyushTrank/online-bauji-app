import React from "react";
import {View, StyleSheet, Text} from "react-native";
import Icon from "../IconNB";
import {obTheme} from "../utils/colors";

const TopicItem = ({data}) => {
  return (
    <View style={styles.parentTopic}>
      <Icon
        type="MaterialIcons"
        name={data.topicType === "video" ? "videocam" : "content-paste"}
        color={obTheme.secondary}
        size={24}
      />
      <View style={styles.topicContentWrap}>
        <Text style={styles.topicTxt}>{data.topicTitle}</Text>
        <View style={styles.topicMeta}>
          <Text style={styles.topicType}>{data.topicType} - </Text>
          <Text style={styles.topicType}>{data.topicDuration}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentTopic: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 16,
  },
  topicMeta: {
    flexDirection: "row",
  },
  topicTxt: {
    color: obTheme.text,
    fontSize: 14,
    paddingBottom: 4,
  },
  topicContentWrap: {
    paddingStart: 8,
    flex: 1,
  },
  topicType: {
    color: obTheme.text,
    textTransform: "capitalize",
    fontSize: 12,
  },
});

export default TopicItem;
