import React from "react";
import {StyleSheet, View, Text} from "react-native";
import {obTheme} from "../utils/colors";
import TopicItems from "./TopicItems";

const TopicSection = ({sectionData, activeTopic}) => {
  return (
    <View style={styles.parentContainer}>
      <View style={styles.sectionHeadWrap}>
        <Text style={styles.sectionHead}>{sectionData.sectionTitle}</Text>
        <View style={styles.sectionMeta}>
          <Text style={styles.metaTxt}>
            {sectionData.sectionMeta.sectionVideos} Lectures -
          </Text>
          <Text style={{...styles.metaTxt, marginStart: 8}}>
            {sectionData.sectionMeta.sectionDuration}
          </Text>
        </View>
      </View>
      <View style={styles.sectionContentWrap}>
        <TopicItems
          topicData={sectionData.sectionTopics}
          sectionId={sectionData.sectionId}
          activeTopic={activeTopic}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  sectionHeadWrap: {
    flex: 1,
    backgroundColor: obTheme.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sectionHead: {
    color: obTheme.white,
    fontSize: 16,
    fontWeight: "600",
  },
  metaTxt: {
    color: obTheme.white,
  },
  sectionMeta: {
    flexDirection: "row",
  },
  sectionContentWrap: {
    flex: 1,
    backgroundColor: obTheme.white,
    elevation: 5,
    paddingTop: 12,
  },
});

export default TopicSection;
