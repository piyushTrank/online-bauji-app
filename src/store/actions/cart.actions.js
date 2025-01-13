import axios from "axios";
import {api_url} from "../../components/utils/apiInfo";
import {ADD_CART, CLEAR_CART, GET_CART} from "./actiontypes";

export const addCartItem = (prodId, toast) => async (dispatch, getState) => {
  try {
    const dataToSend = {
      id: prodId,
      quantity: 1,
    };

    const userInfo = getState().user.userInfo;

    if (userInfo !== null) {
      dataToSend.user_id = userInfo.id;
    }

    const res = await axios.post(
      `${api_url}/cart/add`,
      JSON.stringify(dataToSend),
    );

    console.log("Add To cart", res);

    //Add to cart Success
    if (res.data.code === "1") {
      setTimeout(() => {
        toast.show({
          type: "success",
          text1: res.data.message,
          position: "bottom",
        });
      }, 100);

      dispatch({
        type: ADD_CART,
      });

      return true;
    } else {
      throw Error("Unable to add product in cart");
    }
  } catch (error) {
    console.log("Add to Cart Error", error);
    toast.show({
      type: "error",
      text1: error.message,
      position: "bottom",
    });

    return false;
  }
};

export const getCart = () => async (dispatch, getState) => {
  try {
    console.log("Get state", getState());
    const userId = getState()?.user?.userInfo?.id;
    const res = await axios.get(`${api_url}/cart?user_id=${userId}`, {
      withCredentials: true,
      //headers: { "Access-Control-Allow-Credentials": true },
    });

    // console.log("Get Cart", res.data);

    dispatch({
      type: GET_CART,
      payload: {
        cartProductArr: res.data.cart_data,
        cartPrices: {
          cart_subtotal: res.data.cart_subtotal,
          discount_total: res.data.discount_total,
          taxes: res.data.taxes,
          total: res.data.total,
        },
      },
    });

    return true;
  } catch (error) {
    console.log("get Cart Error", error);
    return false;
  }
};

export const clearCart =
  (hideSnack = false) =>
  async (dispatch, getState) => {
    try {
      const userId = getState().user.userInfo.id;
      const res = await axios.get(`${api_url}/cart/clear`, {
        withCredentials: true,
      });

      console.log("Cleared Cart", res);

      if (res.data === 1) {
        if (!hideSnack) {
          // setTimeout(() => {
          //   dispatch({
          //     type: SnackbarTypes.OPEN_SNACKBAR,
          //     payload: {
          //       msg: "Cart Cleared.",
          //       type: "success",
          //     },
          //   });
          // }, 100);
        }

        dispatch({
          type: CLEAR_CART,
        });
      }
    } catch (error) {
      console.log("Clear Cart Error", error);
    }
  };

export const removeCartItem = cartKey => async (dispatch, getState) => {
  try {
    const res = await axios.get(
      `${api_url}/cart/remove?cart_item_key=${cartKey}`,
      {
        withCredentials: true,
      },
    );

    console.log("Remove Cart Item Res", res);

    dispatch({
      type: GET_CART,
      payload: {
        cartProductArr: res.data.cart_data,
        cartPrices: {
          cart_subtotal: res.data.cart_subtotal,
          discount_total: res.data.discount_total,
          taxes: res.data.taxes,
          total: res.data.total,
        },
      },
    });
  } catch (error) {
    console.log("Remove Cart Item error", error);
  }
};
