import axios from "axios";
import React from "react";
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

import {api_url} from "../utils/apiInfo";
import {obTheme} from "../utils/colors";
import {StarSvg} from "../svg/GlobalIcons";
import {useNavigation} from "@react-navigation/native";

const post_per_page = 2;
const width = Dimensions.get("window").width;

const ListItem = props => {
  const loadPrice = () => {
    if (props.item.type === "variable") {
      return (
        <View style={{...styles.variablePriceWrap, ...styles.priceWrap}}>
          <Text style={styles.variablePriceLabel}>Starting </Text>
          <Text style={{...styles.variablePrice, ...styles.coursePrice}}>
            ₹ {props.item.price}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{...styles.simplePriceWrap, ...styles.priceWrap}}>
          {props.item.sale_price !== "" ? (
            <>
              <Text style={{...styles.simpleSalePrice, ...styles.coursePrice}}>
                ₹ {props.item.sale_price}
              </Text>
              <Text style={{...styles.simpleRegPrice, ...styles.saleRegPrice}}>
                ₹ {props.item.regular_price}
              </Text>
            </>
          ) : (
            <Text style={{...styles.simpleRegPrice, ...styles.coursePrice}}>
              ₹ {props.item.regular_price}
            </Text>
          )}
        </View>
      );
    }
  };

  const loadCategory = () => {
    if (props.item.categories.length > 0) {
      return props.item.categories.map(el => (
        <Text
          style={styles.categoryBtn}
          key={el.id}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {decode(el.name)}
        </Text>
      ));
    } else {
      return null;
    }
  };

  return (
    <View style={styles.listItemCont}>
      <TouchableWithoutFeedback
        onPress={() => props.handleItemClick(props.item.id)}>
        <View style={styles.listItemWrap}>
          <View style={styles.listItemImg}>
            {props.item.image !== null ? (
              <FastImage
                style={{
                  width: width / 2 - 25,
                  height: 100,
                  alignSelf: "stretch",
                  flex: 1,
                }}
                source={{
                  uri: props.item.images[0].src,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : null}
          </View>
          <View style={styles.listItemContent}>
            <Text
              style={styles.listItemTxt}
              ellipsizeMode="tail"
              numberOfLines={2}>
              {decode(props.item.name)}
            </Text>
            <StarSvg
              ratingCount={Math.floor(parseFloat(props.item.average_rating))}
            />
            <View style={styles.listItemPriceWrap}>{loadCategory()}</View>
            <View style={styles.listItemPriceWrap}>{loadPrice()}</View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const CourseList = () => {
  const navigation = useNavigation();

  const [courseData, setCourseData] = React.useState({
    data: null,
    loadMoreStatus: true,
    currentPage: 0,
    isRefreshing: false,
    isLoading: false,
  });

  React.useEffect(() => {
    if (courseData.data === null) fetchCourses(1);

    return () => {
      setCourseData({
        data: null,
        loadMoreStatus: true,
        currentPage: 0,
        isRefreshing: false,
        isLoading: false,
      });
    };
  }, []);

  const fetchCourses = async pageNum => {
    try {
      setCourseData({...courseData, isLoading: true});

      const res = await axios.get(
        `${api_url}/custom-products?page=${pageNum}&per_page=${post_per_page}&sort=default`,
      );

      //console.log("Course res:", res.data);

      setCourseData({
        ...courseData,
        data:
          courseData.data === null
            ? res.data.product
            : [...courseData.data, ...res.data.product],
        currentPage: courseData.currentPage + 1,
        isRefreshing: false,
        isLoading: false,
      });
    } catch (err) {
      console.log("Blog Err", err);
      //   if (err.response.status === 400) {
      //     setCourseData({
      //       ...courseData,
      //       loadMoreStatus: false,
      //     });
      //   }
    }
  };

  const handleRefresh = () => {
    setCourseData({
      data: null,
      loadMoreStatus: true,
      currentPage: 0,
      isRefreshing: true,
    });

    setTimeout(() => {
      fetchCourses(1);
    }, 1000);
  };

  const handleNavchange = prodId => {
    console.log("prodId", prodId);
    navigation.navigate("SingleCourseScreen", {prodId});
  };

  return (
    <View style={styles.parentContainer}>
      <View style={styles.categoryContent}>
        <FlatList
          ListHeaderComponent={
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryHeaderTxt}>All Courses</Text>
            </View>
          }
          ListFooterComponent={
            courseData.loadMoreStatus ? (
              courseData.isLoading ? (
                <ActivityIndicator size="large" />
              ) : null
            ) : (
              <View style={styles.endLabelCont}>
                <Text style={styles.endLabelTxt}>That's All Folks!</Text>
              </View>
            )
          }
          numColumns={2}
          data={courseData.data}
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
            courseData.loadMoreStatus
              ? fetchCourses(courseData.currentPage + 1)
              : null;
          }}
          refreshing={courseData.isRefreshing}
          onRefresh={handleRefresh}
          progressViewOffset={40}
          //columnWrapperStyle={{flexGrow: 1}}
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
    minHeight: 125,
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
});

export default CourseList;
