import React from "react";
import {SafeAreaView, StyleSheet, View, ScrollView} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import CartList from "../components/cart-list/CartList";
import Header from "../components/header/Header";
import {obTheme} from "../components/utils/colors";
import {getCart} from "../store/actions/cart.actions";

const CartScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const order = useSelector(state => state.order);
  React.useEffect(() => {
    dispatch(getCart());
    console.log("order", order);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.parentContainer}>
      <View style={styles.headerWrapper}>
        <Header
          navigation={navigation}
          showDrawer={false}
          showBack={true}
          showCart={false}
          showSearch={false}
          showUser={false}
        />
      </View>

      <View style={styles.scrollContainer}>
        <CartList />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: obTheme.secondary,
  },
  scrollContainer: {
    marginTop: 50,
    flexGrow: 1,
    // flex: 1,
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
});

export default CartScreen;
