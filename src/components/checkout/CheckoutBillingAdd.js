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
import CountryPicker from "../country-picker/CountryPicker";
import Icon from "../IconNB";

const CheckoutBillingAdd = ({userId, validityChk}) => {
  const dispatch = useDispatch();

  console.log("validityChk", validityChk);

  const [formVal, setFormVal] = React.useState({
    fields: {
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
    },
    isLoading: true,
    isValid: false,
    showAdd: true,
  });

  React.useEffect(() => {
    fetchBillingAdd();
  }, []);

  const isFormValid = chkObj => {
    const chkNames = [
      "first_name",
      "country",
      "state",
      "address_1",
      "city",
      "postcode",
      "phone",
      "email",
    ];

    let isValid = true;

    chkNames.some(el => {
      // console.log("Chk", el, chkObj[el]);
      if (chkObj[el] === "") {
        isValid = false;
        return false;
      }
    });

    if (!!validityChk) validityChk(isValid);

    return isValid;
  };

  const fetchBillingAdd = async () => {
    //Fetch billing Address
    const userData = new FormData();
    userData.append("user_id", userId);
    const res = await axios.post(`${api_url}/myprofile`, userData);
    console.log("Billing Data", res);
    setFormVal({
      ...formVal,
      fields: {
        ...formVal.fields,
        ...res.data.data.billing,
      },
      isLoading: false,
      showAdd: !getBtnLabel(res.data.data.billing),
      isValid: isFormValid(res.data.data.billing),
    });
  };

  function updateMasterState(attrName, value) {
    setFormVal({
      ...formVal,
      fields: {
        ...formVal.fields,
        [attrName]: value,
      },
    });
  }

  const handleSubmit = async () => {
    // console.log("FormVal", formVal);
    try {
      const isValid = isFormValid(formVal.fields);
      console.log("isValid", isValid);

      if (!isValid) {
        Toast.show({
          type: "error",
          text1: "Fields marked(*) are required.",
          position: "bottom",
        });

        return;
      }

      const dataToSend = {
        billing: formVal.fields,
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

        setFormVal({
          ...formVal,
          showAdd: true,
        });
      }
    } catch (error) {
      console.log("Update billing address error", error);
    }
  };

  const onSelectChange = (selectedPickerVal, selectType) => {
    console.log("onSelectChange", selectedPickerVal, selectType);

    if (selectType === "selectedCountry") {
      setFormVal({
        ...formVal,
        fields: {
          ...formVal.fields,
          country: selectedPickerVal.label,
        },
      });
    } else {
      setFormVal({
        ...formVal,
        fields: {
          ...formVal.fields,
          state: selectedPickerVal.label,
        },
      });
    }
  };

  const getBtnLabel = chkObj => {
    let isEmpty = true;

    for (let key in chkObj) {
      if (formVal[key] !== "") isEmpty = false;
    }

    return isEmpty;
  };

  const handleEdit = () => {
    setFormVal({
      ...formVal,
      showAdd: false,
    });
  };

  console.log("formVal.showAdd", formVal.showAdd);

  return (
    <View style={styles.parentContainer}>
      <Text style={styles.billingAddHead}>Billing Details</Text>
      {!formVal.isLoading ? (
        formVal.showAdd ? (
          <View style={styles.userAdd}>
            <View style={styles.userAddTop}>
              <Text style={styles.userName}>
                {formVal.fields.first_name} {formVal.fields.last_name}
              </Text>
              <TouchableOpacity activeOpacity={0.8} onPress={handleEdit}>
                <View style={styles.editWrap}>
                  <Icon
                    type="MaterialIcons"
                    name="edit"
                    color={obTheme.white}
                    size={16}
                  />
                </View>
              </TouchableOpacity>
            </View>
            {formVal.fields.company !== "" ? (
              <Text style={styles.addressTxt}>{formVal.fields.company},</Text>
            ) : null}
            {formVal.fields.address_1 !== "" ||
            formVal.fields.address_2 !== "" ? (
              <Text style={styles.addressTxt}>
                {formVal.fields.address_1} {formVal.fields.address_2}
              </Text>
            ) : null}
            {formVal.fields.city !== "" ||
            formVal.fields.state !== "" ||
            formVal.fields.country !== "" ? (
              <Text style={styles.addressTxt}>
                {formVal.fields.city} {formVal.fields.state},{" "}
                {formVal.fields.country}
              </Text>
            ) : null}
            <View style={styles.phoneWrap}>
              <Icon
                type="Octicons"
                name="device-mobile"
                color={obTheme.secondary}
                size={16}
              />
              <Text style={styles.phoneTxt}>{formVal.fields.phone}</Text>
            </View>
          </View>
        ) : (
          <>
            <View style={styles.fieldWrap}>
              <FloatingTitleTextInputField
                attrName="first_name"
                title="First Name*"
                value={formVal.fields.first_name}
                updateMasterState={updateMasterState}
                otherTextInputProps={{}}
              />
            </View>
            <View style={styles.fieldWrap}>
              <FloatingTitleTextInputField
                attrName="last_name"
                title="Last Name"
                value={formVal.fields.last_name}
                updateMasterState={updateMasterState}
                otherTextInputProps={{}}
              />
            </View>
            <View style={styles.fieldWrap}>
              <FloatingTitleTextInputField
                attrName="company"
                title="Company Name(optional)"
                value={formVal.fields.company}
                updateMasterState={updateMasterState}
                otherTextInputProps={{}}
              />
            </View>
            <CountryPicker
              onSelectChange={onSelectChange}
              data={{
                country: formVal.fields.country,
                state: formVal.fields.state,
              }}
            />
            <View style={styles.fieldWrap}>
              <FloatingTitleTextInputField
                attrName="address_1"
                title="Street Address 1*"
                value={formVal.fields.address_1}
                updateMasterState={updateMasterState}
                otherTextInputProps={{}}
              />
            </View>
            <View style={styles.fieldWrap}>
              <FloatingTitleTextInputField
                attrName="address_2"
                title="Street Address 2"
                value={formVal.fields.address_2}
                updateMasterState={updateMasterState}
                otherTextInputProps={{}}
              />
            </View>
            <View style={styles.fieldWrap}>
              <FloatingTitleTextInputField
                attrName="city"
                title="Town / City*"
                value={formVal.fields.city}
                updateMasterState={updateMasterState}
                otherTextInputProps={{}}
              />
            </View>
            <View style={styles.fieldWrap}>
              <FloatingTitleTextInputField
                attrName="postcode"
                title="Postal Code*"
                value={formVal.fields.postcode}
                updateMasterState={updateMasterState}
                otherTextInputProps={{}}
              />
            </View>
            <View style={styles.fieldWrap}>
              <FloatingTitleTextInputField
                attrName="phone"
                title="Phone/Mobile*"
                value={formVal.fields.phone}
                updateMasterState={updateMasterState}
                otherTextInputProps={{}}
              />
            </View>
            <View style={styles.fieldWrap}>
              <FloatingTitleTextInputField
                attrName="email"
                title="Email Address*"
                value={formVal.fields.email}
                updateMasterState={updateMasterState}
                otherTextInputProps={{}}
              />
            </View>
            <View style={styles.fieldWrap}>
              <FloatingTitleTextInputField
                attrName="gst"
                title="GST No. (optional)"
                value={formVal.fields.gst}
                updateMasterState={updateMasterState}
                otherTextInputProps={{}}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleSubmit()}>
              <View style={{...styles.fieldWrap, ...styles.btnWrap}}>
                <Text style={styles.btnWrapTxt}>
                  {getBtnLabel(formVal.fields)
                    ? "Add Address"
                    : "Update Address"}
                </Text>
              </View>
            </TouchableOpacity>
          </>
        )
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
  userAdd: {
    backgroundColor: obTheme.white,
    padding: 16,
    elevation: 3,
    marginTop: 24,
    borderRadius: 10,
  },
  userName: {
    color: obTheme.text,
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  addressTxt: {
    color: obTheme.text,
    marginBottom: 5,
  },
  phoneWrap: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
  phoneTxt: {
    color: obTheme.text,
    paddingStart: 8,
  },
  userAddTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  editWrap: {
    backgroundColor: obTheme.primary,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
});

export default CheckoutBillingAdd;
