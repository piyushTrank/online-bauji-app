import axios from "axios";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {useDispatch} from "react-redux";
import Toast from "react-native-toast-message";
import {FloatingTitleTextInputField} from "../global/FloatingTitleTextInputField";
import {api_url} from "../utils/apiInfo";
import {obTheme} from "../utils/colors";
import {isEmptyObj} from "../utils/utilFn";

const CheckoutBillingAdd = ({userId}) => {
  const dispatch = useDispatch();

  const [formVal, setFormVal] = React.useState({
    first_name: "",
    last_name: "",
    company: "",
    country: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    postcode: "",
    phone: "",
    email: "",
    gst: "",
    isLoading: true,
  });

  React.useEffect(() => {
    fetchBillingAdd();
  }, []);

  const fetchBillingAdd = async () => {
    //Fetch billing Address
    const userData = new FormData();
    userData.append("user_id", userId);
    const res = await axios.post(`${api_url}/myprofile`, userData);
    console.log("Billing Data", res);
    setFormVal({
      ...formVal,
      ...res.data.data.billing,
      isLoading: false,
    });
  };

  function updateMasterState(attrName, value) {
    setFormVal({
      ...formVal,
      [attrName]: value,
    });
  }

  const handleSubmit = async () => {
    // console.log("FormVal", formVal);
    try {
      const dataToSend = {
        billing: formVal,
        user_id: userId,
      };

      const res = await axios.post(
        `${api_url}/checkout/update-billing`,
        JSON.stringify(dataToSend),
      );

      console.log("Update Billing: ", res);

      if (!isEmptyObj(res.data.billing)) {
        Toast.show({
          type: "success",
          text1: "Billing Address Updated.",
          position: "bottom",
        });
      }
    } catch (error) {
      console.log("Update billing address error", error);
    }
  };

  return (
    <View style={styles.parentContainer}>
      <Text style={styles.billingAddHead}>Billing Details</Text>
      {!formVal.isLoading ? (
        <>
          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="first_name"
              title="First Name*"
              value={formVal.first_name}
              updateMasterState={updateMasterState}
              otherTextInputProps={{}}
            />
          </View>
          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="last_name"
              title="Last Name"
              value={formVal.last_name}
              updateMasterState={updateMasterState}
              otherTextInputProps={{}}
            />
          </View>
          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="company"
              title="Company Name(optional)"
              value={formVal.company}
              updateMasterState={updateMasterState}
              otherTextInputProps={{}}
            />
          </View>
          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="country"
              title="Country*"
              value={formVal.country}
              updateMasterState={updateMasterState}
              otherTextInputProps={{}}
            />
          </View>
          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="state"
              title="State*"
              value={formVal.state}
              updateMasterState={updateMasterState}
              otherTextInputProps={{}}
            />
          </View>
          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="address_1"
              title="Street Address 1*"
              value={formVal.address_1}
              updateMasterState={updateMasterState}
              otherTextInputProps={{}}
            />
          </View>
          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="address_2"
              title="Street Address 2"
              value={formVal.address_2}
              updateMasterState={updateMasterState}
              otherTextInputProps={{}}
            />
          </View>
          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="city"
              title="Town / City*"
              value={formVal.city}
              updateMasterState={updateMasterState}
              otherTextInputProps={{}}
            />
          </View>
          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="postcode"
              title="Post Code*"
              value={formVal.postcode}
              updateMasterState={updateMasterState}
              otherTextInputProps={{}}
            />
          </View>
          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="phone"
              title="Phone/Mobile*"
              value={formVal.phone}
              updateMasterState={updateMasterState}
              otherTextInputProps={{}}
            />
          </View>
          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="email"
              title="Email Address*"
              value={formVal.email}
              updateMasterState={updateMasterState}
              otherTextInputProps={{}}
            />
          </View>
          <View style={styles.fieldWrap}>
            <FloatingTitleTextInputField
              attrName="gst"
              title="GST No. (optional)*"
              value={formVal.gst}
              updateMasterState={updateMasterState}
              otherTextInputProps={{}}
            />
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={() => handleSubmit()}>
            <View style={{...styles.fieldWrap, ...styles.btnWrap}}>
              <Text style={styles.btnWrapTxt}>Add/Update Address</Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.loaderWrap}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: obTheme.white,
    paddingHorizontal: 16,
    marginBottom: 60,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  fieldWrap: {
    marginTop: 20,
  },
  billingAddHead: {
    fontSize: 14,
    color: obTheme.text,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  loaderWrap: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  btnWrap: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "center",
    backgroundColor: obTheme.primary,
  },
  btnWrapTxt: {
    color: obTheme.white,
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});

export default CheckoutBillingAdd;
