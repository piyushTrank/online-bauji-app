import React from "react";
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import Icon from "../IconNB";
import {obTheme} from "../utils/colors";

const TopicItem = ({data, isPreview, handlePreview, sectionId}) => {
  const onPreviewClick = () => {
    const dataToSend = {
      title: data.topicTitle,
      data: data.topicPreview.previewData,
      type: data.topicType,
      id: data.id,
      sectionId,
    };
    console.log("Change", dataToSend);
    handlePreview(dataToSend);
  };

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
      {isPreview ? (
        <View style={styles.playVideoWrap}>
          <Icon
            type="MaterialIcons"
            name="play-circle-outline"
            color={obTheme.secondary}
            size={24}
          />
        </View>
      ) : null}
      {/* {isPreview ? (
        <TouchableOpacity onPress={onPreviewClick}>
          <View style={styles.playVideoWrap}>
            <Icon
              type="MaterialIcons"
              name="play-circle-outline"
              color={obTheme.secondary}
              size={24}
            />
          </View>
        </TouchableOpacity>
      ) : null} */}
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
  playVideoWrap: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

TopicItem.defaultProps = {
  handlePreview: () => {},
};

export default TopicItem;
