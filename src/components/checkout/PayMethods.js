import React from "react";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";

import {StyleSheet, View, Text, ActivityIndicator} from "react-native";
import {obTheme} from "../utils/colors";
import {api_url} from "../utils/apiInfo";
import axios from "axios";

const PayMethods = ({getPayMethod}) => {
  const [paymentOp, setPaymentOp] = React.useState({
    data: [],
    selected: null,
    radioData: null,
  });

  React.useEffect(() => {
    fetchPaymentMethods();
  }, []);

  React.useEffect(() => {
    renderRadioData();
  }, [paymentOp.data]);

  const renderRadioData = () => {
    if (paymentOp.data.length > 0) {
      const radioDataArr = paymentOp.data.map(el => ({
        label: el.gateway_title,
        value: el.gateway_id,
      }));

      setPaymentOp({...paymentOp, radioData: radioDataArr});
    }
  };

  const fetchPaymentMethods = async () => {
    //Fetch Payment Method
    const paymentOpRes = await axios.get(
      `${api_url}/checkout/payment-gateway`,
      null,
    );
    console.log("Payment Op Res", paymentOpRes);
    getPayMethod(paymentOpRes.data[0].gateway_id);
    setPaymentOp({
      ...paymentOp,
      data: paymentOpRes.data,
      selected: paymentOpRes.data[0].gateway_id,
    });
  };

  return (
    <View style={styles.parentContainer}>
      <View>
        <Text style={styles.paymentOpHead}>Select Payment Option</Text>
      </View>
      {paymentOp.radioData !== null ? (
        <RadioForm
          radio_props={paymentOp.radioData}
          initial={0}
          formHorizontal={false}
          labelHorizontal={true}
          buttonColor={obTheme.primary}
          buttonInnerColor={obTheme.primary}
          buttonSize={10}
          animation={true}
          onPress={value => {
            getPayMethod(value);
            setPaymentOp({
              ...paymentOp,
              selected: value,
            });
          }}
          style={styles.radioWrap}
        />
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
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  paymentOpHead: {
    fontSize: 14,
    color: obTheme.text,
    fontWeight: "700",
    marginBottom: 20,
    textTransform: "uppercase",
  },
  radioWrap: {
    marginVertical: 10,
  },
});

export default PayMethods;
