import React from "react";
import {ActivityIndicator, Text, View} from "react-native";
import {WebView} from "react-native-webview";

const WebVideoPlayer = ({videoUrl}) => {
  const runFirst = `
      setTimeout(function() { window.alert('hi') }, 2000);
      true; // note: this is required, or you'll sometimes get silent failures
    `;

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
        // scrollEnabled={true}
        allowsFullscreenVideo={true}
        allowsInlineMediaPlayback={true}
        source={{
          uri: `https://www.onlinebauji.com/app-video?url=${videoUrl}`,
        }}
        style={{flex: 1}}
        // injectedJavaScript={runFirst}
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
      />
      <View style={{position: "absolute"}}>
        {isLoading ? <ActivityIndicator size="large" /> : null}
      </View>
    </View>
  );
};

export default WebVideoPlayer;
