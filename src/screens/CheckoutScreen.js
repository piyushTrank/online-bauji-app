import React from "react";
import axios from "axios";
import Toast from "react-native-toast-message";
import {SafeAreaView, StyleSheet, View, ScrollView, LogBox} from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import {useDispatch, useSelector} from "react-redux";
import CheckoutList from "../components/checkout-list/CheckoutList";
import CheckoutBillingAdd from "../components/checkout/CheckoutBillingAdd";
import PayMethods from "../components/checkout/PayMethods";
import Header from "../components/header/Header";
import {api_url, getReqOptions} from "../components/utils/apiInfo";
import {obTheme} from "../components/utils/colors";
import {clearCart, getCart} from "../store/actions/cart.actions";
import {saveOrder} from "../store/actions/order.actions";

const CheckoutScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.userInfo);

  const [checkoutDet, setCheckoutDet] = React.useState({
    payment_method: null,
  });

  React.useEffect(() => {
    //dispatch(getCart());
    LogBox.ignoreAllLogs(); //Ignore all log notifications
  }, []);

  const handlePaymentSuccess = async (response, orderData) => {
    try {
      // handle success
      // Alert.alert(`Success: ${response.razorpay_payment_id}`);

      console.log("Response", response);

      // const data = {
      //   orderCreationId: order_id,
      //   razorpayPaymentId: response.razorpay_payment_id,
      //   razorpayOrderId: response.razorpay_order_id,
      //   razorpaySignature: response.razorpay_signature,
      // };

      //Data for Subscription
      const line_items_sub = orderData.line_items.map(el => ({
        id: el.variation_id,
        parentId: el.product_id,
        duration:
          el.meta_data.length > 0
            ? el.meta_data[0].display_value.toLowerCase()
            : null,
      }));

      console.log("line_items_sub", line_items_sub);

      const dataOrdered = JSON.stringify({
        order_id: orderData.id,
        user_id: orderData.customer_id,
        transaction_id: response.razorpay_payment_id,
        line_items_sub,
      });

      const orderUpdateRes = await axios.post(
        `${api_url}/checkout/update-order`,
        dataOrdered,
        getReqOptions,
      );

      console.log("Data ordered", dataOrdered, orderUpdateRes);

      dispatch(
        saveOrder({
          ...orderData,
          ...response,
          subData: {...orderUpdateRes.data},
        }),
      );

      dispatch(clearCart(true));

      Toast.show({
        type: "success",
        text1: "Order Completed successfully",
        position: "bottom",
      });

      navigation.navigate("OrderSuccessScreen");
    } catch (error) {
      console.log("success payment error", error);
    }
  };

  const displayRazorpay = async orderData => {
    const orderAmt = parseFloat(orderData.total) * 100;

    let options = {
      description: "Payment for Online Bauji",
      image:
        "https://www.onlinebauji.com/backend/wp-content/uploads/2022/01/logo.png",
      currency: "INR",
      amount: orderAmt.toString(),
      // order_id: orderData.id,
      key: "rzp_test_xYXyzzH20hIXLB",
      name: "Test",
      prefill: {
        name: `${currentUser.first_name} ${currentUser.last_name} `,
        email: `${currentUser.email}`,
        contact: `${currentUser.billing.phone}`,
      },
      theme: {color: "#0774d6"},
    };

    try {
      const response = await RazorpayCheckout.open(options);
      console.log("Outer Resopnsie", response);
      const successRes = await handlePaymentSuccess(response, orderData);
    } catch (error) {
      console.log("displayRazorpay error", error);
    }
  };

  const handleCheckout = async () => {
    try {
      if (checkoutDet.payment_method === null) {
        new Error(`No payment method selected`);
        return;
      }

      console.log("checkoutDet", checkoutDet);

      //Create new order
      const newOrderRes = await axios.post(
        `${api_url}/checkout/new-order?u_id=${currentUser.id}&payment_method=${checkoutDet.payment_method}`,
      );

      console.log("newOrderRes", newOrderRes);

      if (checkoutDet.payment_method === "razorpay") {
        displayRazorpay(newOrderRes.data);
      } else {
        dispatch(saveOrder(newOrderRes.data));
        dispatch(clearCart());
      }
    } catch (error) {
      console.log("Checkout error", error);
    }
  };

  const getPayMethod = payMethod => {
    console.log("getPayMethod", payMethod);
    setCheckoutDet({
      ...checkoutDet,
      payment_method: payMethod,
    });
  };

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
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={styles.scrollWrap}>
          <CheckoutBillingAdd userId={currentUser.id} />
          <PayMethods getPayMethod={getPayMethod} />
          <CheckoutList handleCheckout={handleCheckout} />
        </ScrollView>
      </View>
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
    backgroundColor: obTheme.white,
    marginTop: 50,
    flexGrow: 1,
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

export default CheckoutScreen;
