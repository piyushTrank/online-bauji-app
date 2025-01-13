import React from "react";
import axios from "axios";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import {decode} from "html-entities";
import FastImage from "react-native-fast-image";
import {api_blog_url} from "../utils/apiInfo";
import {obTheme} from "../utils/colors";

const post_per_page = 10;

const width = Dimensions.get("window").width;

const ListItem = props => {
  const loadCategory = arr => {
    if (arr.length > 0) {
      if (arr[0].length > 0) {
        return arr[0].map(el => {
          return (
            <Text
              style={styles.categoryBtn}
              key={el.id}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {decode(el.name)}
            </Text>
          );
        });
      }
    }
  };

  return (
    <View style={styles.listItemCont}>
      <View style={styles.listItemWrap}>
        <TouchableWithoutFeedback
          onPress={() => props.handleItemClick(props.item.slug)}>
          <View style={styles.listItemImg}>
            {props.item._embedded["wp:featuredmedia"][0].source_url !== null ? (
              <FastImage
                style={{
                  width: width / 2 - 25,
                  height: 100,
                  alignSelf: "stretch",
                  flex: 1,
                }}
                source={{
                  uri: props.item._embedded["wp:featuredmedia"][0].source_url,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : null}
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.listItemContent}>
          <TouchableWithoutFeedback
            onPress={() => props.handleItemClick(props.item.slug)}>
            <Text
              style={styles.listItemTxt}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {decode(props.item.title.rendered)}
            </Text>
          </TouchableWithoutFeedback>
          <View style={styles.listItemPriceWrap}>
            {loadCategory(props.item._embedded["wp:term"])}
          </View>
          <TouchableWithoutFeedback
            onPress={() => props.handleItemClick(props.item.slug)}>
            <View style={styles.readMoreBtn}>
              <Text style={styles.readMoreBtnTxt}>Read More</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

const BlogList = ({navigation}) => {
  const [blogPosts, setBlogPosts] = React.useState({
    data: null,
    loadMoreStatus: true,
    currentPage: 0,
    isLoading: false,
  });

  React.useEffect(() => {
    if (blogPosts.data === null) fetchPosts(1);

    return () => {
      setBlogPosts({
        data: null,
        loadMoreStatus: true,
        currentPage: 0,
        isLoading: false,
      });
    };
  }, []);

  const fetchPosts = async pageNum => {
    try {
      setBlogPosts({...blogPosts, isLoading: true});

      const res = await axios.get(
        `${api_blog_url}/custom-products?per_page=${pageNum}&page=${post_per_page}&sort=default`,
      );

      setBlogPosts({
        ...blogPosts,
        data:
          blogPosts.data === null ? res.data : [...blogPosts.data, ...res.data],
        currentPage: blogPosts.currentPage + 1,
        isRefreshing: false,
        isLoading: false,
      });
    } catch (err) {
      if (err.response.status === 400) {
        setBlogPosts({
          ...blogPosts,
          loadMoreStatus: false,
        });
      }
    }
  };

  const handleNavchange = blogSlug => {
    navigation.navigate("BlogPostDetailScreen", {blogSlug});
  };

  return (
    <View style={styles.parentContainer}>
      <View style={styles.categoryContent}>
        <FlatList
          ListHeaderComponent={
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryHeaderTxt}>Our Blog</Text>
            </View>
          }
          ListFooterComponent={
            blogPosts.loadMoreStatus ? (
              blogPosts.isLoading ? (
                <ActivityIndicator size="large" />
              ) : null
            ) : (
              <View style={styles.endLabelCont}>
                <Text style={styles.endLabelTxt}>That's All Folks!</Text>
              </View>
            )
          }
          numColumns={2}
          data={blogPosts.data}
          renderItem={({item, index}) => (
            <ListItem
              item={{...item, ind: index}}
              handleItemClick={handleNavchange}
            />
          )}
          showsHorizontalScrollIndicator={false}
          style={styles.sliderContainer}
          onEndReachedThreshold={0.4}
          onEndReached={() => {
            blogPosts.loadMoreStatus
              ? fetchPosts(blogPosts.currentPage + 1)
              : null;
          }}
          contentContainerStyle={{flexGrow: 1}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: obTheme.white,
    paddingHorizontal: 11,
    paddingTop: 30,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  categoryHeaderTxt: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 16,
    color: obTheme.text,
    paddingHorizontal: 5,
    marginBottom: 16,
    textTransform: "uppercase",
  },
  listItemImg: {
    borderTopStartRadius: 15,
    width: width / 2,
  },
  listItemContent: {
    backgroundColor: obTheme.white,
    paddingHorizontal: 8,
    paddingBottom: 8,
    elevation: 5,
    flex: 1,
    width: width / 2 - 25,
    minHeight: 100,
  },
  listItemCont: {
    width: width / 2,
    flex: 1,
    marginTop: 15,
    paddingHorizontal: 5,
    borderRadius: 15,
    marginBottom: 16,
  },
  listItemTxt: {
    color: obTheme.text,
    flexShrink: 1,
    fontSize: 12,
    lineHeight: 15,
    marginVertical: 8,
    fontWeight: "600",
  },
  categoryBtn: {
    color: obTheme.text,
    marginTop: 5,
    backgroundColor: obTheme.blue,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 8,
    color: obTheme.white,
    alignSelf: "flex-start",
    textTransform: "uppercase",
    textAlign: "center",
  },
  endLabelCont: {
    paddingVertical: 8,
    flex: 1,
    textAlign: "center",
  },
  endLabelTxt: {
    color: obTheme.text,
    fontSize: 11,
    textAlign: "center",
  },
  readMoreBtn: {
    backgroundColor: obTheme.primary,
    color: obTheme.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  readMoreBtnTxt: {
    color: obTheme.white,
    fontSize: 10,
    textTransform: "uppercase",
    fontWeight: "500",
  },
});

export default BlogList;
