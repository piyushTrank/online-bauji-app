import axios from "axios";
import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  LogBox,
} from "react-native";
import {useSelector} from "react-redux";
import Header from "../components/header/Header";
import SimilarCourses from "../components/similar-courses/SimilarCourses";
import SpTopInfo from "../components/single-product/SpTopInfo";
import SingleProductTab from "../components/tab-navbar/SingleProductTab";
import TopicList from "../components/topic-list/TopicList";
import {api_url} from "../components/utils/apiInfo";
import {obTheme} from "../components/utils/colors";

const INITIAL_STATE = {
  data: null,
  topicsData: null,
  currProdId: null,
};

const SingleCourseScreen = ({route, navigation}) => {
  // console.log("Single Product route", route.params.prodId);
  const cart = useSelector(state => state.cart.cartData);

  const [singleProduct, setSingleProduct] = React.useState(INITIAL_STATE);
  const [inCart, setInCart] = React.useState({
    status: null,
    variationName: null,
  });

  React.useEffect(() => {
    LogBox.ignoreLogs([]);
  }, []);

  const chkCart = prodId => {
    const prodExists = cart.filter(el => el.id === prodId);

    if (prodExists.length > 0) {
      setInCart({
        status: true,
        variationName:
          singleProduct.data.type === "variable"
            ? prodExists[0].varitions
            : null,
      });
    } else {
      setInCart({
        status: false,
        variationName: null,
      });
    }
  };

  React.useEffect(() => {
    if (!!route.params.prodId) {
      setSingleProduct(INITIAL_STATE);
      setTimeout(() => {
        fetchProduct(route.params.prodId);
      }, 200);
    } else {
      navigation.goBack();
    }
  }, [route]);

  React.useEffect(() => {
    if (singleProduct.data !== null && cart !== null) {
      chkCart(singleProduct.data.id);
    }
  }, [cart, singleProduct, navigation]);

  //When Single product screen is in focus
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("in focus", singleProduct, cart);
      // setTimeout(() => {

      if (singleProduct.data !== null) {
        fetchProduct(singleProduct.data.id);
      }
      // }, 500);
    });

    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setInCart({
        ...inCart,
        status: null,
      });
    });

    return unsubscribe;
  }, [navigation]);

  const fetchProduct = async prodId => {
    try {
      //Fetch Product Details
      const res = await axios.get(
        `${api_url}/get-products-by-id?id=${prodId}`,
        null,
      );
      //console.log("Single Products res", res);

      //Fetch Course Topics
      const topicsRes = await axios.post(
        `${api_url}/sectionTopic?course_id=${prodId}`,
        null,
      );
      //console.log("Topic Res", topicsRes);

      setSingleProduct({
        ...singleProduct,
        data: res.data,
        topicsData: topicsRes.data,
      });
    } catch (error) {
      console.log("Single Product Err", error);
    }
  };

  const handleProductChange = prodId => {
    setSingleProduct(INITIAL_STATE);
    fetchProduct(prodId);
  };

  const handleVariationChange = varId => {
    setSingleProduct({
      ...singleProduct,
      currProdId: varId,
    });
  };

  console.log("singleProduct.topicsData", singleProduct.topicsData);

  return (
    <SafeAreaView style={styles.parentContainer}>
      <View style={styles.headerWrapper}>
        <Header
          navigation={navigation}
          showDrawer={false}
          showBack={true}
          showCart={true}
          showSearch={false}
        />
      </View>

      {singleProduct.data !== null ? (
        <>
          <View style={styles.scrollContainer}>
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              style={styles.scrollWrap}>
              <SpTopInfo
                data={singleProduct.data}
                onChangeVariation={handleVariationChange}
                inCart={inCart}
              />
              <View style={singleProduct.topicsData}>
                {singleProduct.topicsData.length > 0 ? (
                  <TopicList
                    topicList={singleProduct.topicsData}
                    isPreview={true}
                    navigation={navigation}
                  />
                ) : (
                  <Text style={styles.noContentTxt}>
                    No course content available.
                  </Text>
                )}
              </View>
              <SimilarCourses
                onChangeProduct={handleProductChange}
                courseIds={singleProduct.data.related_ids.join(",")}
                navigation={navigation}
              />
            </ScrollView>
          </View>

          <View style={styles.tabNavCont}>
            <SingleProductTab
              singleProductData={singleProduct}
              navigation={navigation}
              inCart={inCart}
            />
          </View>
        </>
      ) : (
        <View style={styles.loaderWrap}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: obTheme.secondary,
  },
  scrollWrap: {
    paddingVertical: 30,
  },
  scrollContainer: {
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    flex: 1,
    flexGrow: 1,
    backgroundColor: obTheme.white,
    marginTop: 20,
    paddingBottom: 0,
  },
  contentWrapper: {
    flex: 1,
  },
  headerWrapper: {
    backgroundColor: obTheme.secondary,
  },
  loaderWrap: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  noContentTxt: {
    color: obTheme.lightGray,
    fontSize: 14,
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 8,
  },
});

export default SingleCourseScreen;
