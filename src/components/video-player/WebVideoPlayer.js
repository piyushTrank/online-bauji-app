import React from "react";
import {ActivityIndicator, StyleSheet, Dimensions, View} from "react-native";
import Orientation from "react-native-orientation-locker";
import {WebView} from "react-native-webview";

const width = Dimensions.get("window").width;

const WebVideoPlayer = ({videoUrl}) => {
  const runFirst = "alert('Working);";

  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <View style={{flex: 1}}>
      {/* <Text
        selectable={true}
        selectionColor="orange"
        style={{color: "#000000"}}>
        {videoUrl}
      </Text> */}
      <WebView
        onLoad={() => setIsLoading(false)}
        javaScriptEnabled={true}
        injectedJavaScript={`
        setTimeout(() => {
            document.getElementsByClassName('vjs-control-bar')[0].addEventListener('touchstart', function(){
              setTimeout(() => {
                if(document.getElementById('vjs_video_3').classList.contains('vjs-fullscreen')) {
                  window.ReactNativeWebView.postMessage("fs-active");
                } else {
                  window.ReactNativeWebView.postMessage("fs-inactive");
                }
              }, 500)
            })
        }, 2000)
        
        true;
        `}
        // scrollEnabled={true}
        allowsFullscreenVideo={true}
        allowsInlineMediaPlayback={true}
        source={{
          uri: `https://onilnebauji.tranktechnologies.com/app-video?url=${videoUrl}`,
        }}
        style={{flex: 1}}
        sharedCookiesEnabled={true}
        useWebKit
        mediaPlaybackRequiresUserAction={false}
        androidHardwareAccelerationDisabled={true}
        // androidLayerType="hardware"
        mixedContentMode="always"
        onError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          console.log("WebView error: ", nativeEvent);
        }}
        thirdPartyCookiesEnabled={true}
        onMessage={m => {
          console.log("alert", m.nativeEvent.data);

          if (m.nativeEvent.data === "fs-active") {
            Orientation.unlockAllOrientations();
            Orientation.lockToLandscape();
          }
          if (m.nativeEvent.data === "fs-inactive") {
            Orientation.unlockAllOrientations();
            Orientation.lockToPortrait();
          }
        }}
      />

      {isLoading ? (
        <View style={styles.loadWrap}>
          <ActivityIndicator size="large" />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  loadWrap: {
    position: "absolute",
    top: 250,
    left: width / 2,
    zIndex: -1,
  },
});

export default WebVideoPlayer;
