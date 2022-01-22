import React from "react";
import {ActivityIndicator, Text, View} from "react-native";
import {WebView} from "react-native-webview";

const WebVideoPlayer = ({videoUrl}) => {
  const runFirst = "alert('Working);";

  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <View style={{flex: 1}}>
      <Text
        selectable={true}
        selectionColor="orange"
        style={{color: "#000000"}}>
        {videoUrl}
      </Text>
      <WebView
        onLoad={() => setIsLoading(false)}
        javaScriptEnabled={true}
        injectedJavaScript={`
        (function() {
          
          setTimeout(() => {
            
            const video = document.getElementsByTagName("video")[0];
            video.addEventListener('webkitbeginfullscreen', (event) => {
              window.ReactNativeWebView.postMessage("Full Screen");
            })
            video.addEventListener('webkitendfullscreen', (event) => {
              window.ReactNativeWebView.postMessage("End Full Screen");
            })
          }, 3000)
        })();
        true; // note: this is required, or you'll sometimes get silent failures
        `}
        // scrollEnabled={true}
        allowsFullscreenVideo={true}
        allowsInlineMediaPlayback={true}
        source={{
          uri: `https://www.onlinebauji.com/app-video?url=${videoUrl}`,
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
        onMessage={m => console.log("alert", m.nativeEvent.data)}
      />
      <View style={{position: "absolute"}}>
        {isLoading ? <ActivityIndicator size="large" /> : null}
      </View>
    </View>
  );
};

export default WebVideoPlayer;
