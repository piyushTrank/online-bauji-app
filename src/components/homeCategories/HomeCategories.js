import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import {decode} from "html-entities";
import {useSelector} from "react-redux";
import FastImage from "react-native-fast-image";

import {LinkArrowSvg} from "../svg/GlobalIcons";
import {obTheme} from "../utils/colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ListItem = props => {
  // console.log("Props", props.item.parent, props);

  const handleClick = () => {
    const dataToSend = {
      catId: props.item.id,
      parentId: props.item.parent !== 0 ? props.item.parent : null,
      catName: props.item.name,
    };

    props.handleCategoryNav(dataToSend);
  };

  return (
    <View style={styles.listItemCont}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => handleClick()}>
        <View style={styles.listItemWrap}>
          <View style={styles.listItemImg}>
            {props.item.image !== null ? (
              <FastImage
                style={{width: 32, height: 32}}
                source={{
                  uri: props.item.image.src,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : null}
          </View>
          <Text style={styles.listItemTxt}>{decode(props.item.name)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const HomeCategories = ({navigation}) => {
  const obCategories = useSelector(state => state.misc.categories);

  const [categoryData, setCategoryData] = React.useState(null);

  React.useEffect(() => {
    if (obCategories !== null) {
      const parentCategories = obCategories.filter(el => el.parent === 0);
      setCategoryData(parentCategories);
    }
  }, [obCategories]);

  const handleCategoryNav = data => {
    console.log("Cat Data", data);
    navigation.navigate("CategoryScreen", {data});
  };

  // console.log("categoryData", categoryData);

  return (
    <View style={styles.parentContainer}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryHeaderTxt}>CATEGORIES</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("AllCategoriesScreen")}>
          <View style={styles.btnWrap}>
            <Text style={styles.btnTxt}>SEE ALL</Text>
            <LinkArrowSvg />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryContent}>
        <FlatList
          horizontal
          data={categoryData}
          renderItem={({item, index}) => (
            <ListItem
              item={{...item, ind: index}}
              handleCategoryNav={handleCategoryNav}
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
    paddingHorizontal: 24,
    marginVertical: 36,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryHeaderTxt: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 14,
    color: obTheme.text,
  },
  categoryContent: {
    marginTop: 16,
  },
  btnWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnTxt: {
    marginEnd: 8,
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 14,
    color: obTheme.text,
  },
  listItemImg: {
    backgroundColor: "#eee",
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    alignSelf: "center",
    elevation: 3,
  },
  listItemCont: {
    width: width / 4,
    marginTop: 15,
    paddingHorizontal: 5,
  },
  listItemTxt: {
    color: obTheme.text,
    flexShrink: 1,
    textAlign: "center",
    fontSize: 11,
    lineHeight: 15,
    marginTop: 8,
  },
});

export default HomeCategories;
