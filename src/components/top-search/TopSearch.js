import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  Dimensions,
} from "react-native";
import {decode} from "html-entities";
import {useSelector} from "react-redux";
import FastImage from "react-native-fast-image";

import {LinkArrowSvg, StarSvg} from "../svg/GlobalIcons";
import {obTheme} from "../utils/colors";
import axios from "axios";
import {api_url} from "../utils/apiInfo";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ListItem = props => {
  // console.log("Props", props.item.parent, props);

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
          numberOfLines={1}
          ellipsizeMode="tail">
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
                style={{width: width / 2 - 10, height: 120}}
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
              numberOfLines={2}
              ellipsizeMode="tail">
              {decode(props.item.name)}
            </Text>
            <StarSvg
              ratingCount={Math.floor(parseFloat(props.item.average_rating))}
            />
            <View style={styles.listItemPriceWrap}>{loadPrice()}</View>
            <View style={styles.listItemPriceWrap}>{loadCategory()}</View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const TopSearch = ({navigation}) => {
  // const obLatestProducts = useSelector(state => state.misc.latestProducts);
  const [topSearchData, setTopSearchData] = React.useState(null);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let res = await axios.get(
      `${api_url}/custom-products?page=1&per_page=10&sort=popularity`,
    );

    console.log("Top Search res", res);

    setTopSearchData(res.data.product);
  };

  const handleNavchange = prodId => {
    console.log("prodId", prodId);
    navigation.navigate("SingleCourseScreen", {prodId});
  };

  return (
    <View style={styles.parentContainer}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryHeaderTxt}>TOP SEARCHES</Text>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate("Drawer Navigation", {screen: "Courses"})
          }>
          <View style={styles.btnWrap}>
            <Text style={styles.btnTxt}>SEE ALL</Text>
            <LinkArrowSvg fill={obTheme.white} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.categoryContent}>
        <FlatList
          horizontal
          data={topSearchData}
          renderItem={({item, index}) => (
            <ListItem
              item={{...item, ind: index}}
              handleItemClick={handleNavchange}
            />
          )}
          showsHorizontalScrollIndicator={false}
          style={styles.sliderContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: obTheme.secondary,
    paddingHorizontal: 16,
    paddingVertical: 32,
    marginBottom: 36,
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
    color: obTheme.white,
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
    color: obTheme.white,
  },
  listItemImg: {
    borderTopStartRadius: 15,
  },
  listItemContent: {
    backgroundColor: obTheme.white,
    paddingHorizontal: 8,
    paddingBottom: 8,
    minHeight: 125,
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
});

export default TopSearch;
