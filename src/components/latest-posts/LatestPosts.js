import React from "react";
import axios from "axios";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import {decode} from "html-entities";
import moment from "moment";
import FastImage from "react-native-fast-image";

import {LinkArrowSvg, StarSvg} from "../svg/GlobalIcons";
import {obTheme} from "../utils/colors";
import {api_blog_url} from "../utils/apiInfo";

const width = Dimensions.get("window").width;

const ListItem = props => {
  const loadCategory = arr => {
    return arr.map(el => {
      if (el.length > 0) {
        if (el[0].taxonomy === "category") {
          return (
            <Text
              style={styles.categoryBtn}
              key={el[0].id}
              numberOfLines={1}
              ellipsizeMode="tail">
              {decode(el[0].name)}
            </Text>
          );
        }
      } else {
        return null;
      }
    });
  };

  return (
    <View style={styles.listItemCont}>
      <TouchableWithoutFeedback
        onPress={() => props.handleItemClick(props.item.slug)}>
        <View style={styles.listItemWrap}>
          <View style={styles.listItemImg}>
            {props.item._embedded["wp:featuredmedia"][0].source_url !== null ? (
              <FastImage
                style={{width: width / 2 - 10, height: 120}}
                source={{
                  uri: props.item._embedded["wp:featuredmedia"][0].source_url,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : null}
          </View>
          <View style={styles.listItemContent}>
            <Text
              style={styles.listItemTxt}
              numberOfLines={2}
              ellipsizeMode="tail">
              {decode(props.item.title.rendered)}
            </Text>
            <View style={styles.listItemPriceWrap}>
              {loadCategory(props.item._embedded["wp:term"])}
            </View>
            <View style={styles.postDate}>
              <Text style={styles.postDateTxt}>
                Posted on: {moment(props.item.date).format("DD/MM/YYYY")}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const LatestPosts = ({navigation}) => {
  const [latestPostsData, setLatestPostsDataData] = React.useState(null);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let res = await axios.get(
      `${api_blog_url}/custom-products?per_page=1&page=1&sort=default`,
    );

    console.log("Latest Posts res", res);

    setLatestPostsDataData(res.data);
  };

  const handleNavchange = blogSlug => {
    navigation.navigate("BlogPostDetailScreen", {blogSlug});
  };

  return <></>;

  return (
    <View style={styles.parentContainer}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryHeaderTxt}>Recent Posts</Text>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate("Drawer Navigation", {screen: "Blog"})
          }>
          <View style={styles.btnWrap}>
            <Text style={styles.btnTxt}>SEE ALL</Text>
            <LinkArrowSvg />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.categoryContent}>
        {latestPostsData !== null ? (
          <FlatList
            horizontal
            data={latestPostsData}
            renderItem={({item, index}) => (
              <ListItem
                item={{...item, ind: index}}
                handleItemClick={handleNavchange}
              />
            )}
            showsHorizontalScrollIndicator={false}
            style={styles.sliderContainer}
          />
        ) : (
          <View style={styles.loadWrap}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: obTheme.white,
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  categoryHeaderTxt: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 14,
    color: obTheme.text,
    textTransform: "uppercase",
  },
  btnWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  listItemWrap: {
    flex: 1,
  },
  categoryContent: {
    marginTop: 16,
  },
  btnTxt: {
    marginEnd: 8,
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 14,
    color: obTheme.text,
  },
  listItemPriceWrap: {},
  listItemImg: {
    borderTopStartRadius: 15,
  },
  listItemContent: {
    backgroundColor: obTheme.white,
    paddingHorizontal: 8,
    paddingBottom: 8,
    elevation: 5,
    minHeight: 100,
    marginBottom: 24,
  },
  listItemCont: {
    width: width / 2,
    marginTop: 15,
    paddingHorizontal: 5,
    borderRadius: 15,
  },
  listItemTxt: {
    color: obTheme.text,
    flexShrink: 1,
    fontSize: 12,
    lineHeight: 15,
    marginVertical: 8,
    fontWeight: "600",
  },
  priceWrap: {
    marginTop: 8,
  },
  variablePriceWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  variablePriceLabel: {
    fontSize: 10,
    color: obTheme.text,
    textTransform: "uppercase",
    paddingEnd: 5,
  },
  coursePrice: {
    fontSize: 16,
    fontWeight: "700",
    color: obTheme.text,
  },
  simplePriceWrap: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  simpleRegPrice: {
    color: obTheme.text,
  },
  saleRegPrice: {
    fontSize: 10,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    marginStart: 5,
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
  },
  loadWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  postDate: {
    marginTop: 8,
  },
  postDateTxt: {
    color: obTheme.lightGray,
    fontSize: 11,
  },
});

export default LatestPosts;
