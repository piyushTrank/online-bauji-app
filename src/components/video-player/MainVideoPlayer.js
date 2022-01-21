import React from "react";
import {StyleSheet, View, LogBox} from "react-native";
import Video from "react-native-video-player";

const MainVideoPlayer = ({videoUrl}) => {
  React.useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);

  return (
    <View style={styles.container}>
      <Video
        autoplay={true}
        style={{height: 200}}
        url="https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  //   container: {
  //     height: 150,
  //   },
});

MainVideoPlayer.defaultProps = {
  videoUrl:
    "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
};

export default MainVideoPlayer;
