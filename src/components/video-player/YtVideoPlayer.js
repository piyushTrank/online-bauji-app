import React from "react";
import YouTube from "react-native-youtube";
import {View, StyleSheet} from "react-native";

const YtVideoPlayer = ({videoUrl}) => {
  const [player, setPlayer] = React.useState({
    isReady: false,
    status: null,
    quality: null,
    error: null,
    isPlaying: false,
  });

  console.log("Player", player);

  return (
    <View style={styles.parentContainer}>
      <YouTube
        apiKey="AIzaSyCE5REzqP6sKcb4P5mA34-a9OoiTth-XEA"
        videoId="sEG8a-9JIMU" // The YouTube video ID
        play={player.isPlaying} // control playback of video with true/false
        fullscreen={player.fullscreen} // control whether the video should play in fullscreen or inline
        loop={false} //control whether the video should loop when ended
        controls={1}
        onReady={e => setPlayer({...player, isReady: true})}
        onChangeState={e => setPlayer({...player, status: e.state})}
        onChangeQuality={e => setPlayer({...player, quality: e.quality})}
        //onError={e => setPlayer({...player, error: e.error})}
        onError={e => console.log("Err", e)}
        style={{alignSelf: "stretch", height: 300}}
        modestbranding={false}
        showinfo={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
});

export default YtVideoPlayer;
