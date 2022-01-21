import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import {decode} from "html-entities";
import {useSelector} from "react-redux";

import {RupeeSymbol} from "../svg/GlobalIcons";
import {obTheme} from "../utils/colors";

const width = Dimensions.get("window").width;

const ListItem = props => {
  console.log("props", props);

  const loadPrice = () => {
    if (props.item.type === "variable") {
      return (
        <View style={{...styles.variablePriceWrap, ...styles.priceWrap}}>
          <Text style={styles.variablePriceLabel}>Starting from </Text>
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

  return (
    <View style={styles.listItemCont}>
      <View style={styles.listItemWrap}>
        <View style={styles.listItemContent}>
          <Text style={styles.listItemTxt}>{decode(props.item.name)}</Text>
          <View style={styles.listItemPriceWrap}>
            <View style={styles.listItemPriceWrap}>{loadPrice()}</View>
          </View>
        </View>
      </View>
    </View>
  );
};

const CheckoutList = ({handleCheckout}) => {
  const cart = useSelector(state => state.cart);

  const [cartList, setCartList] = React.useState(null);
  const [cartPrice, setCartPrice] = React.useState(null);

  React.useEffect(() => {
    setCartList(cart.cartData);
    setCartPrice(cart.cartPrices);
  }, [cart]);

  console.log("cartList", cart);

  return (
    <View style={styles.parentContainer}>
      <View style={styles.categoryContent}>
        {cartList !== null ? (
          cartList.length > 0 ? (
            <FlatList
              nestedScrollEnabled={true}
              ListHeaderComponent={
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryHeaderTxt}>Order Details</Text>
                </View>
              }
              ListFooterComponent={
                <View style={styles.cartPriceCont}>
                  <Text style={styles.cartPriceHead}>Order Info</Text>
                  <View style={styles.cartPriceWrap}>
                    <Text style={styles.cartPriceTxt}>Sub Total</Text>
                    <Text style={styles.cartPrice}>
                      <RupeeSymbol /> {cartPrice.cart_subtotal}
                    </Text>
                  </View>
                  <View style={styles.cartPriceWrap}>
                    <Text style={styles.cartPriceTxt}>Discount</Text>
                    <Text style={styles.cartPrice}>
                      <RupeeSymbol /> {cartPrice.discount_total}
                    </Text>
                  </View>
                  <View style={styles.cartPriceWrap}>
                    <Text style={styles.cartPriceTxt}>Taxes</Text>
                    <Text style={styles.cartPrice}>
                      <RupeeSymbol /> {cartPrice.taxes}
                    </Text>
                  </View>
                  <View style={styles.cartPriceWrap}>
                    <Text style={styles.cartPriceTxt}>Total</Text>
                    <Text style={styles.cartPriceTotal}>
                      <RupeeSymbol /> {cartPrice.total}
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handleCheckout()}>
                    <View style={styles.checkoutBtn}>
                      <Text style={styles.checkoutBtnTxt}>Make Payment</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              }
              data={cartList}
              renderItem={({item, index}) => (
                <ListItem item={{...item, ind: index}} />
              )}
              style={styles.sliderContainer}
              contentContainerStyle={{flexGrow: 1}}
            />
          ) : (
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyTxt}>Cart is empty.</Text>
            </View>
          )
        ) : (
          <View>
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
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginBottom: 16,
  },
  categoryHeaderTxt: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 14,
    color: obTheme.text,
    textTransform: "uppercase",
  },
  listItemWrap: {
    flex: 1,
  },
  categoryContent: {
    marginTop: 16,
  },
  listItemContent: {
    backgroundColor: obTheme.white,
    paddingHorizontal: 8,
    paddingBottom: 8,
    //width: width / 2 - 30,
    elevation: 5,
  },
  listItemCont: {
    // width: width / 2 - 10,
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
  },
  priceWrap: {
    marginTop: 8,
  },
  variablePriceLabel: {
    fontSize: 10,
    color: obTheme.text,
    textTransform: "uppercase",
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
  listItemPriceWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cartPriceCont: {
    elevation: 5,
    backgroundColor: obTheme.white,
    flex: 1,
    marginVertical: 16,
    marginHorizontal: 5,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  cartPriceWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  cartPriceHead: {
    color: obTheme.text,
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "700",
    marginBottom: 16,
  },
  cartPriceTxt: {
    color: obTheme.lightGray,
    fontWeight: "500",
  },
  cartPrice: {
    color: obTheme.text,
    fontSize: 16,
    fontWeight: "500",
  },
  cartPriceTotal: {
    color: obTheme.text,
    fontSize: 20,
    fontWeight: "700",
  },
  checkoutBtn: {
    backgroundColor: obTheme.primary,
    color: obTheme.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  checkoutBtnTxt: {
    color: obTheme.white,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  emptyWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTxt: {
    fontSize: 14,
    color: obTheme.lightGray,
  },
});

export default CheckoutList;
