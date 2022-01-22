import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import {useSelector} from "react-redux";
import ContentPlayer from "../components/content-player/ContentPlayer";
import {BackSvg} from "../components/svg/HeaderIcons";
import {obTheme} from "../components/utils/colors";
import WebVideoPlayer from "../components/video-player/WebVideoPlayer";

const PreviewTopicScreen = ({navigation}) => {
  const topic = useSelector(state => state.topic.activeTopic);

  const [coursesData, setCoursesData] = React.useState({
    activeTopic: null,
  });

  React.useEffect(() => {
    if (topic !== null) {
      setCoursesData({
        ...coursesData,
        activeTopic: topic,
      });
    } else {
      setCoursesData({
        ...coursesData,
        activeTopic: null,
      });
    }
  }, [topic]);

  const playerRender = () => {
    if (coursesData.activeTopic !== null) {
      if (coursesData.activeTopic.type === "video") {
        return <WebVideoPlayer videoUrl={coursesData.activeTopic.data} />;
      } else if (coursesData.activeTopic.type === "content") {
        return <ContentPlayer data={coursesData.activeTopic.data} />;
      } else {
        return <Text style={{color: obTheme.text}}>Invalid Content</Text>;
      }
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.parentContainer}>
      {coursesData.activeTopic !== null ? (
        <>
          <View style={styles.topInfoWrap}>
            <TouchableWithoutFeedback onPress={handleBack}>
              <View style={styles.backWrap}>
                <BackSvg />
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.topInfoTxtWrap}>
              <Text style={styles.topInfoLabel}>Course Preview:</Text>
              <Text style={styles.topicTitleTxt}>
                {coursesData.activeTopic.title}
              </Text>
            </View>
          </View>
          <View style={styles.playerWrap}>{playerRender()}</View>
          <View style={{marginVertical: 16, alignItems: "center"}}>
            <TouchableOpacity activeOpacity={0.8} onPress={handleBack}>
              <View
                style={{
                  backgroundColor: obTheme.primary,
                  color: obTheme.white,
                  padding: 16,
                  borderRadius: 30,
                  width: 150,
                  alignItems: "center",
                }}>
                <Text style={{color: obTheme.white}}>Return to Course</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.loadWrap}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: obTheme.white,
  },
  playerWrap: {
    height: 350,
  },
  scrollWrap: {
    flex: 2,
    flexGrow: 1,
  },
  headerWrapper: {
    backgroundColor: obTheme.secondary,
  },
  topicInfoWrap: {
    backgroundColor: obTheme.white,
    padding: 16,
  },
  topicTitleTxt: {
    color: obTheme.white,
    fontSize: 16,
    fontWeight: "600",
    marginTop: 5,
  },
  topInfoWrap: {
    backgroundColor: obTheme.secondary,
    padding: 16,
    flexDirection: "row",
  },
  topInfoLabel: {
    color: obTheme.white,
    fontSize: 12,
    textTransform: "uppercase",
  },
  backWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingEnd: 16,
  },
});

export default PreviewTopicScreen;
