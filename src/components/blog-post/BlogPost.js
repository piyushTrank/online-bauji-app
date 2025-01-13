import React from "react";
import {View, WebView} from "react-native-webview";

const BlogPost = ({postSlug}) => {
  return (
    <WebView
      javaScriptEnabled={true}
      source={{
        uri: `https://www.onlinebauji.com/blog/${postSlug}`,
      }}
      style={{flex: 1}}
      sharedCookiesEnabled={true}
      useWebKit
      mixedContentMode="always"
      onError={syntheticEvent => {
        const {nativeEvent} = syntheticEvent;
      }}
      thirdPartyCookiesEnabled={true}
    />
  );
};

export default BlogPost;
