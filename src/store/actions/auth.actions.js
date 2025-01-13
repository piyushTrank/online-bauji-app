import axios from "axios";
import {persistor} from "../index";
import {
  api_url,
  getReqOptions,
  registerReqOptions,
} from "../../components/utils/apiInfo";
import {
  LOGIN,
  LOGOUT,
  RESETOTP,
  SENDOTP,
  SIGNUP,
  VERIFYOTP,
} from "./actiontypes";

export const userLogin =
  (userEmail, userPassword, toast) => async (dispatch, getState) => {
    try {
      const dataToSend = {
        email: userEmail,
        password: userPassword,
      };

      console.log("data sent", JSON.stringify(dataToSend));

      const res = await axios.post(
        `${api_url}/login`,
        JSON.stringify(dataToSend),
        getReqOptions,
      );

      console.log("Login res", res.data);

      if (res.data.code === "1") {
        const {
          id,
          avatar_url,
          first_name,
          last_name,
          email,
          username,
          role,
          billing,
        } = res.data.details;

        const userObj = {
          userInfo: {
            id,
            avatar_url,
            first_name,
            last_name,
            email,
            username,
            role,
            billing,
          },
        };

        //await getCartOnLogin(id, dispatch);

        toast.show({
          type: "success",
          text1: `Welcome ${first_name}`,
          position: "bottom",
        });

        dispatch({
          type: LOGIN,
          payload: userObj,
        });
      } else {
        throw Error(res.data.message);
      }
    } catch (error) {
      console.log("Login Error", error);
      toast.show({
        type: "error",
        text1: error.message,
        position: "bottom",
      });
    }
  };

export const userSignUp = (data, toast) => async (dispatch, getState) => {
  try {
    const signUpFormData = new FormData();
    signUpFormData.append("fname", data.firstName);
    signUpFormData.append("lname", data.lastName);
    signUpFormData.append("email", data.email);
    signUpFormData.append("password", data.password);
    signUpFormData.append("mobile", data.phone);
    signUpFormData.append("confirmpass", data.confirmPassword);
    signUpFormData.append("enableOffer", data.enableOffer);

    console.log("sign up", data);

    const res = await axios.post(
      `${api_url}/register`,
      signUpFormData,
      registerReqOptions(),
    );

    console.log("Sign Up Data", res.data);

    if (res.data.status === "1") {
      const {
        id,
        avatar_url,
        first_name,
        last_name,
        email,
        username,
        role,
        billing,
      } = res.data.details;

      const userObj = {
        userInfo: {
          id,
          avatar_url,
          first_name,
          last_name,
          email,
          username,
          role,
          billing,
        },
      };

      toast.show({
        type: "success",
        text1: `Welcome ${first_name}`,
        position: "bottom",
      });

      dispatch({
        type: SIGNUP,
        payload: userObj,
      });
    } else {
      throw Error(
        !!res.data.message
          ? res.data.message
          : "Unable to register at the moment. Please try again later.",
      );
    }
  } catch (error) {
    console.log("Sign up Error", error);
    toast.show({
      type: "error",
      text1: error.message,
      position: "bottom",
    });
  }
};

export const sendOtp = (mobNum, toast) => async (dispatch, getState) => {
  try {
    const res = await axios.get(`${api_url}/send-otp?mobile=${mobNum}`);

    console.log("Send otp res", res.data);

    if (res.data.status === "1") {
      toast.show({
        type: "success",
        text1: res.data.message,
        position: "bottom",
      });
      dispatch({
        type: SENDOTP,
        payload: mobNum,
      });
    } else {
      throw Error(res.data);
    }
  } catch (error) {
    console.log("sendOtp error", error);
    toast.show({
      type: "error",
      text1: error.message,
      position: "bottom",
    });
  }
};

export const verifyOtp =
  (otpNum, mobNum, toast) => async (dispatch, getState) => {
    try {
      const res = await axios.get(
        `${api_url}/verify-otp?otp=${otpNum}&mobile=${mobNum}`,
      );

      console.log("Verify otp res", res.data);

      if (res.data.code === "1") {
        //New User
        if (res.data.details === null) {
          dispatch({
            type: VERIFYOTP,
            payload: {
              status: null,
              value: true,
            },
          });
        } else {
          //User exists
          const {
            id,
            avatar_url,
            first_name,
            last_name,
            email,
            username,
            role,
            billing,
          } = res.data.details;

          const userObj = {
            userInfo: {
              id,
              avatar_url,
              first_name,
              last_name,
              email,
              username,
              role,
              billing,
            },
          };

          toast.show({
            type: "success",
            text1: `Welcome ${first_name}`,
            position: "bottom",
          });

          dispatch({
            type: LOGIN,
            payload: userObj,
          });
        }
      } else {
        throw Error(res.data.message);
      }
    } catch (error) {
      dispatch({
        type: VERIFYOTP,
        payload: {
          status: null,
          value: false,
        },
      });
      console.log("verifyOtp error", error);
      toast.show({
        type: "error",
        text1: error.message,
        position: "bottom",
      });
    }
  };

export const resetOtp = () => ({
  type: RESETOTP,
});

export const userLogout = navigation => {
  persistor.purge();
  setTimeout(() => {
    navigation.push("AuthScreen");
  }, 500);
  return {
    type: LOGOUT,
  };
};
