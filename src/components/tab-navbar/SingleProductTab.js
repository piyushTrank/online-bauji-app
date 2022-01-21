import axios from "axios";
import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import Toast from "react-native-toast-message";
import FastImage from "react-native-fast-image";
import {useDispatch, useSelector} from "react-redux";
import {BuyNowSvg, RupeeSymbol, StarSvg} from "../svg/GlobalIcons";
import {TabCartSvg} from "../svg/TabHome";
import {api_url} from "../utils/apiInfo";
import {obTheme} from "../utils/colors";
import {getCart} from "../../store/actions/cart.actions";
import SuccessAnim from "../animations/SuccessAnim";
import {CLEAR_CART} from "../../store/actions/actiontypes";

var isHidden = true;

const SingleProductTab = ({singleProductData, navigation, inCart}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.userInfo);
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;

  const [showCartPop, setShowCartPop] = React.useState({
    status: false,
    bounceValue: new Animated.Value(windowHeight),
  });

  React.useEffect(() => {
    if (!inCart.status) {
      setShowCartPop({
        status: false,
        bounceValue: new Animated.Value(windowHeight),
      });
      isHidden = true;
    }
  }, [inCart]);

  const handleAddCart = () => {
    let prodId = singleProductData.data.id;
    if (singleProductData.data.type === "variable") {
      prodId = singleProductData.currProdId;
    }

    console.log("handleAddCart", prodId);
    addCartItem(prodId);
  };

  const handleBuyNow = () => {
    let prodId = singleProductData.data.id;
    if (singleProductData.data.type === "variable") {
      prodId = singleProductData.currProdId;
    }

    console.log("handleBuyNow", prodId);
    buyNowAction(prodId);
  };

  const toggleSubview = () => {
    var toValue = windowHeight;

    if (isHidden) {
      toValue = 0;
    }

    //This will animate the transalteY of the subview between 0 & 100 depending on its current state
    //100 comes from the style below, which is the height of the subview.
    Animated.spring(showCartPop.bounceValue, {
      toValue: toValue,
      velocity: 3,
      tension: 2,
      friction: 8,
      useNativeDriver: true,
    }).start();

    isHidden = !isHidden;
  };

  const addCartItem = async (prodId, shouldNavigate = false) => {
    try {
      const dataToSend = {
        id: prodId,
        quantity: 1,
      };

      if (currentUser !== null) {
        dataToSend.user_id = currentUser.id;
      }

      const res = await axios.post(
        `${api_url}/cart/add`,
        JSON.stringify(dataToSend),
      );

      console.log("Add To cart", res);

      if (shouldNavigate) {
        navigation.navigate("Checkout");
        return;
      }

      //Add to cart Success
      if (res.data.code === "1") {
        toggleSubview();
        dispatch(getCart());
        setShowCartPop({
          ...showCartPop,
          status: true,
        });
      } else {
        throw Error("Unable to add product in cart");
      }
    } catch (error) {
      console.log("Add to Cart Error", error);
      Toast.show({
        type: "error",
        text1: error.message,
        position: "bottom",
      });
    }
  };

  const buyNowAction = async prodId => {
    try {
      const dataToSend = {
        id: prodId,
        quantity: 1,
      };

      //Clear
      const clearCartRes = await axios.get(`${api_url}/cart/clear`, {
        withCredentials: true,
      });

      if (clearCartRes.data === 1) {
        dispatch({
          type: CLEAR_CART,
        });

        if (currentUser !== null) {
          dataToSend.user_id = currentUser.id;
        }

        const res = await axios.post(
          `${api_url}/cart/add`,
          JSON.stringify(dataToSend),
        );

        console.log("Add To cart", res);

        //Add to cart Success
        if (res.data.code === "1") {
          dispatch(getCart());
          setTimeout(() => {
            navigation.navigate("Checkout");
          }, 500);
        } else {
          throw Error("Unable to add product in cart");
        }
      }
    } catch (error) {
      console.log("Buy Now Error", error);
    }
  };

  return (
    <View style={styles.parentContainer}>
      {!inCart.status ? (
        <>
          <TouchableWithoutFeedback onPress={() => handleAddCart()}>
            <View
              style={{...styles.btnWrap, backgroundColor: obTheme.secondary}}>
              <TabCartSvg />
              <Text style={styles.btnTxt}>Add to Cart</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => handleBuyNow()}>
            <View style={{...styles.btnWrap, backgroundColor: obTheme.primary}}>
              <BuyNowSvg />
              <Text style={styles.btnTxt}>Buy Now</Text>
            </View>
          </TouchableWithoutFeedback>
        </>
      ) : (
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Cart")}>
          <View
            style={{
              ...styles.btnWrap,
              backgroundColor: obTheme.secondary,
            }}>
            <TabCartSvg />
            <Text style={styles.btnTxt}>Go to Cart</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
      <Animated.View
        style={[
          styles.subView,
          {transform: [{translateY: showCartPop.bounceValue}]},
          {height: windowHeight},
        ]}>
        <TouchableWithoutFeedback onPress={() => toggleSubview()}>
          <View style={styles.subViewTop}></View>
        </TouchableWithoutFeedback>
        <View style={styles.subViewBottom}>
          <View style={{alignItems: "center", marginBottom: 24}}>
            <SuccessAnim style={{width: 64, height: 64, textAlign: "center"}} />
            <Text style={styles.succMsgTxt}>
              Successfully added this course to cart.
            </Text>
          </View>
          <View style={styles.subViewItem}>
            <FastImage
              style={{width: windowWidth / 2, height: 120}}
              source={{
                uri: singleProductData.data.images[0].src,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.subViewMeta}>
              <Text style={styles.courseName}>
                {singleProductData.data.name}
              </Text>
              <StarSvg
                ratingCount={Math.floor(
                  parseFloat(singleProductData.data.average_rating),
                )}
              />
            </View>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Cart")}>
          <View
            style={{
              backgroundColor: obTheme.secondary,
              ...styles.fullBtn,
            }}>
            <TabCartSvg />
            <Text style={styles.btnTxt}>Go to Cart</Text>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    //flex: 1,
    flexDirection: "row",
    height: 56,
  },
  btnWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "row",
  },
  fullBtn: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "row",
    height: 56,
  },
  btnTxt: {
    color: obTheme.white,
    paddingStart: 5,
    textTransform: "uppercase",
    fontSize: 12,
    lineHeight: 14,
  },
  subView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  subViewTop: {
    flex: 1,
    backgroundColor: obTheme.white,
    opacity: 0.8,
  },
  subViewBottom: {
    backgroundColor: obTheme.white,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  succMsgTxt: {
    fontSize: 14,
    textAlign: "center",
    color: obTheme.text,
  },
  subViewItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  courseName: {
    color: obTheme.text,
    marginVertical: 8,
  },
  subViewMeta: {
    marginBottom: 36,
  },
});

export default SingleProductTab;
