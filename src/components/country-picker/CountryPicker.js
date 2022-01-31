import axios from "axios";
import React from "react";
import {StyleSheet, View, Appearance, Text} from "react-native";

import RNPickerSelect from "react-native-picker-select";
import Icon from "../IconNB";
import {api_url} from "../utils/apiInfo";
import {obTheme} from "../utils/colors";
import {isEmptyObj} from "../utils/utilFn";

const CountryPicker = ({wrapStyles, onSelectChange, data}) => {
  const colorScheme = Appearance.getColorScheme();

  const [pickerData, setPickerData] = React.useState({
    countryData: null,
    stateData: null,
    selectedCountry: null,
    selectedState: null,
  });

  React.useEffect(() => {
    if (data.country !== "") {
      updatePickerData(data);
    } else {
      fetchPickerData();
    }
  }, []);

  //   React.useEffect(() => {
  //     if (data.country !== "" && pickerData.countryData !== null) {
  //       const selCountry = pickerData.countryData.filter(
  //         el => el.label === data.country,
  //       );
  //       if (selCountry.length > 0)
  //         setPickerData({...pickerData, selectedCountry: selCountry[0]});
  //     }

  //     if (data.state !== "" && pickerData.stateData !== null) {
  //       const selState = pickerData.stateData.filter(
  //         el => el.label === data.state,
  //       );
  //       if (selState.length > 0)
  //         setPickerData({...pickerData, selectedState: selState[0]});
  //     }
  //   }, [data]);

  const fetchPickerData = async (countryCode, selectedCountry) => {
    const countryCodeParam = !!countryCode ? `?country=${countryCode}` : "";
    const res = await axios.get(`${api_url}/countryCode${countryCodeParam}`);

    console.log("Country picker", res.data);

    if (!!countryCode) {
      const rnSelectState = createSelectData(
        !!res.data.state ? res.data.state : {},
      );
      setPickerData({
        ...pickerData,
        selectedCountry: selectedCountry,
        stateData: rnSelectState,
      });
    } else {
      const rnSelectCountry = createSelectData(res.data.countries);
      setPickerData({
        ...pickerData,
        countryData: rnSelectCountry,
      });
    }
  };

  const updatePickerData = async data => {
    console.log("data", data);
    const resCountry = await axios.get(`${api_url}/countryCode`);

    console.log("Update Country picker", resCountry.data);

    const rnSelectCountry = createSelectData(resCountry.data.countries);
    let selCountryData = null;
    let selStateData = null;
    let rnSelectState = null;
    if (data.country !== "") {
      const chkSelCountryData = rnSelectCountry.filter(
        el => el.label === data.country,
      );

      if (chkSelCountryData.length > 0) {
        selCountryData = chkSelCountryData[0];
        const resState = await axios.get(
          `${api_url}/countryCode?country=${chkSelCountryData[0].value}`,
        );

        console.log("Update State picker", resState.data);

        rnSelectState = createSelectData(
          !!resState.data.state ? resState.data.state : {},
        );

        if (data.state !== "") {
          const chkSelStateData = rnSelectState.filter(
            el => el.label === data.state,
          );

          console.log("chkSelStateData", rnSelectState);

          if (chkSelStateData.length > 0) {
            selStateData = chkSelStateData[0];
          }
        }

        setPickerData({
          countryData: rnSelectCountry,
          stateData: rnSelectState,
          selectedCountry: selCountryData,
          selectedState: selStateData,
        });
      } else {
        setPickerData({
          countryData: rnSelectCountry,
          stateData: rnSelectState,
          selectedCountry: selCountryData,
          selectedState: selStateData,
        });
      }
    }
  };

  const handleSelectChange = (selId, selectType) => {
    const arr =
      selectType === "selectedCountry"
        ? pickerData.countryData
        : pickerData.stateData;
    const selectedVar = arr.filter(el => el.value == selId);
    console.log("selId", selId, selectedVar, selectType);
    if (selectedVar.length > 0) {
      onSelectChange(selectedVar[0], selectType);

      if (selectType === "selectedCountry") {
        fetchPickerData(selectedVar[0].value, selectedVar[0]);
      } else {
        setPickerData({
          ...pickerData,
          selectedState: selectedVar[0],
        });
      }
    }
  };

  const createSelectData = obj => {
    if (!isEmptyObj(obj)) {
      const selectData = [];

      for (key in obj) {
        selectData.push({
          label: obj[key],
          value: key,
        });
      }

      return selectData;
    } else {
      return [];
    }
  };

  //   if (pickerData.countryData !== null) {
  //     console.log("Selected Country data", pickerData.selectedCountry);
  //   }

  return (
    <View style={{...styles.pickerWrap, ...wrapStyles}}>
      {pickerData.countryData !== null ? (
        <View style={styles.fieldWrap}>
          <Text style={styles.labelTxt}>Select Country*</Text>
          <RNPickerSelect
            onValueChange={value => {
              console.log(value);
              handleSelectChange(value, "selectedCountry");
            }}
            value={
              pickerData.selectedCountry !== null
                ? pickerData.selectedCountry.value
                : null
            }
            items={pickerData.countryData}
            useNativeAndroidPickerStyle={false}
            placeholder={{
              label: "Select Country...",
              value: null,
              color: colorScheme === "dark" ? obTheme.white : obTheme.text,
            }}
            style={styles}
            Icon={() => (
              <Icon
                type="MaterialCommunityIcons"
                name="chevron-down"
                color={obTheme.lightGray}
                size={24}
              />
            )}
          />
        </View>
      ) : null}

      {pickerData.stateData !== null ? (
        <View style={styles.fieldWrap}>
          <Text style={styles.labelTxt}>Select State*</Text>
          <RNPickerSelect
            onValueChange={value => {
              console.log(value);
              handleSelectChange(value, "selectedState");
            }}
            value={
              pickerData.selectedState !== null
                ? pickerData.selectedState.value
                : null
            }
            items={pickerData.stateData}
            useNativeAndroidPickerStyle={false}
            placeholder={{
              label: "Select State...",
              value: null,
              color: colorScheme === "dark" ? obTheme.white : obTheme.text,
            }}
            style={styles}
            Icon={() => (
              <Icon
                type="MaterialCommunityIcons"
                name="chevron-down"
                color={obTheme.lightGray}
                size={24}
              />
            )}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  fieldWrap: {
    marginTop: 16,
  },
  labelTxt: {
    color: obTheme.text,
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: obTheme.lightGray,
    borderRadius: 4,
    color: obTheme.text,
    paddingRight: 30, // to ensure the text is never behind the icon
  },

  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    marginTop: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: obTheme.lightGray,
    borderRadius: 8,
    color: obTheme.text,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 20,
    right: 15,
  },
});

CountryPicker.defaultProps = {
  wrapStyles: {},
};

export default CountryPicker;
