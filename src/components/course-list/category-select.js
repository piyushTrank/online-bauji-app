import {decode} from "html-entities";
import React from "react";
import {StyleSheet, View, Appearance, Text} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {useSelector} from "react-redux";
import Icon from "../IconNB";
import {obTheme} from "../utils/colors";

const CategorySelect = ({getSelectedCat}) => {
  const colorScheme = Appearance.getColorScheme();

  const categories = useSelector(state => state.misc.categories);

  const [pickerData, setPickerData] = React.useState({
    categoryData: null,
    selectedCategory: null,
  });

  const createSelectData = arr => {
    if (arr.length > 0) {
      const selectData = arr.map(el => ({
        label: decode(el.name),
        value: el.id,
      }));

      return selectData;
    } else {
      return [];
    }
  };

  React.useEffect(() => {
    const catData = [
      {value: 0, label: "All Courses"},
      ...createSelectData(categories),
    ];
    setPickerData({
      categoryData: catData,
      selectedCategory: catData[0],
    });
  }, []);

  React.useEffect(() => {
    getSelectedCat(pickerData.selectedCategory);
  }, [pickerData.selectedCategory]);

  const handleSelectChange = val => {
    const selCat = pickerData.categoryData.filter(el => el.value === val);
    if (selCat.length > 0) {
      setPickerData({
        ...pickerData,
        selectedCategory: selCat[0],
      });
    }
  };

  return (
    <View style={styles.parentContainer}>
      <Text style={styles.labelTxt}>Select Category</Text>
      {pickerData.categoryData !== null ? (
        <RNPickerSelect
          onValueChange={value => {
            handleSelectChange(value);
          }}
          value={
            pickerData.selectedCategory !== null
              ? pickerData.selectedCategory.value
              : null
          }
          items={pickerData.categoryData}
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: "Select Category...",
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

export default CategorySelect;
