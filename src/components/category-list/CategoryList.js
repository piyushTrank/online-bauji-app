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
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {decode} from "html-entities";
import {obTheme} from "../utils/colors";
import {useDispatch, useSelector} from "react-redux";
import {getAllCategories} from "../../store/actions/misc.actions";
import Icon from "../IconNB";

const width = Dimensions.get("window").width;

const CategoryList = ({navigation}) => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.misc.categories);

  const [categoryData, setCategoryData] = React.useState({
    data: null,
  });

  React.useEffect(() => {
    setCategoryData({
      data: categories,
    });

    return () => {
      setCategoryData({
        data: null,
      });
    };
  }, []);

  const handleNavchange = (catId, parentId, catName) => {
    const data = {catId, parentId, catName};
    console.log("data", data);

    navigation.navigate("CategoryScreen", {data});
  };

  const renderCategories = arr => {
    const parentCatArr = arr.filter(el => el.parent === 0);
    console.log("prodId", parentCatArr.length);

    arr.forEach(el => {
      if (el.parent !== 0) {
        parentCatArr.forEach(parEl => {
          if (parEl.id === el.parent) {
            if (!parEl.childCat) {
              parEl.childCat = [el];
            } else {
              if (!parEl.childCat.some(chkEl => chkEl.id === el.id))
                parEl.childCat.push(el);
            }
          }
        });
      }
    });

    return parentCatArr.map(el => (
      <View key={el.id} style={styles.catItemWrap}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleNavchange(el.id, null, el.name)}>
          <View style={styles.catBtnInner}>
            <View style={styles.catBtnRight}>
              <Icon
                type="FontAwesome"
                name="angle-right"
                size={16}
                color={obTheme.text}
              />
              <Text style={styles.catItemTxt}>{decode(el.name)}</Text>
            </View>
            <Icon
              type="MaterialCommunityIcons"
              name="chevron-right-circle"
              color={obTheme.primary}
              size={24}
            />
          </View>
        </TouchableOpacity>
        {!!el.childCat
          ? el.childCat.map(childEl => (
              <View key={childEl.id} style={styles.childCatItemWrap}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    handleNavchange(childEl.id, el.id, childEl.name)
                  }>
                  <View
                    style={{...styles.catBtnInner, ...styles.childCatBtnInner}}>
                    <View style={styles.catBtnRight}>
                      <Icon
                        type="FontAwesome"
                        name="angle-double-right"
                        size={16}
                        color={obTheme.text}
                      />
                      <Text style={styles.childCatItemTxt}>
                        {decode(childEl.name)}
                      </Text>
                    </View>
                    <Icon
                      type="MaterialCommunityIcons"
                      name="chevron-right-circle"
                      color={obTheme.primary}
                      size={24}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            ))
          : null}
      </View>
    ));
  };

  return (
    <View style={styles.parentContainer}>
      <View style={styles.categoryContent}>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryHeaderTxt}>All Categories</Text>
        </View>
        <ScrollView style={styles.categoryList}>
          {categoryData.data !== null
            ? renderCategories(categoryData.data)
            : null}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: obTheme.white,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 16,
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
  catBtnInner: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: obTheme.lightGray,
    borderStyle: "solid",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  catBtnRight: {
    flexDirection: "row",
  },
  catItemTxt: {
    color: obTheme.text,
    fontWeight: "600",
    paddingStart: 5,
  },
  childCatBtnInner: {
    paddingStart: 32,
    paddingVertical: 10,
  },
  childCatItemTxt: {
    color: obTheme.text,
    paddingStart: 5,
  },
});

export default CategoryList;
