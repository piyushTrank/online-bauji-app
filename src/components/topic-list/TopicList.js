import React from "react";
import {FlatList, StyleSheet, View, Text} from "react-native";
import Accordian from "../accordian/Accordian";
import {obTheme} from "../utils/colors";
import TopicItem from "./TopicItem";

const TopicList = ({topicList}) => {
  const renderTopics = arr => {
    return arr.map(el => <TopicItem data={el} key={el.id} />);
  };

  const renderList = arr => {
    return arr.map(el => (
      <Accordian key={el.sectionId} title={el.sectionTitle} data="Test data">
        {renderTopics(el.sectionTopics)}
      </Accordian>
    ));
  };

  return (
    <View style={styles.parentContainer}>
      {/* <Accordian title="Test Acc" data="Test data" /> */}
      <Text style={styles.topicHead}>Course Content</Text>
      {renderList(topicList)}
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    marginTop: 16,
    marginBottom: 30,
  },
  topicHead: {
    fontSize: 14,
    paddingHorizontal: 16,
    fontWeight: "700",
    textTransform: "uppercase",
    lineHeight: 18,
    color: obTheme.text,
    paddingBottom: 8,
  },
});

export default TopicList;
