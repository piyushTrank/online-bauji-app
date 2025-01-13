import React from "react";
import {TouchableOpacity, StyleSheet, View, Text} from "react-native";
import {useDispatch} from "react-redux";
import {changeTopic} from "../../store/actions/topic.actions";
import Accordian from "../accordian/Accordian";
import {obTheme} from "../utils/colors";
import TopicItem from "./TopicItem";

const TopicList = ({topicList, isPreview, navigation}) => {
  const dispatch = useDispatch();

  const handlePreview = topicInfo => {
    dispatch(changeTopic(topicInfo));
    navigation.navigate("PreviewTopicScreen");
  };

  const renderTopics = (arr, sectionId) => {
    return arr.map(el => {
      const dataToSend = {
        title: el.topicTitle,
        data:
          isPreview && el.topicPreview !== null
            ? el.topicPreview.previewData
            : null,
        type: el.topicType,
        id: el.id,
        sectionId,
      };
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          key={el.id}
          disabled={!(isPreview && el.topicPreview !== null)}
          onPress={() =>
            isPreview && el.topicPreview !== null
              ? handlePreview(dataToSend)
              : false
          }>
          <TopicItem
            data={el}
            key={el.id}
            isPreview={isPreview && el.topicPreview !== null}
            handlePreview={handlePreview}
            sectionId={sectionId}
          />
        </TouchableOpacity>
      );
    });
  };

  const renderList = arr => {
    return arr.map(el => (
      <Accordian key={el.sectionId} title={el.sectionTitle} data="Test data">
        {renderTopics(el.sectionTopics, el.sectionId)}
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

TopicList.defaultProps = {
  isPreview: false,
  topicList: [],
};

export default TopicList;
