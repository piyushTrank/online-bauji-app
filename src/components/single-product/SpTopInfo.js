import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Share,
  TouchableWithoutFeedback,
  Appearance,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import FastImage from "react-native-fast-image";
import moment from "moment";
import RenderHtml from "react-native-render-html";
import {obTheme} from "../utils/colors";
import {
  RupeeSymbol,
  ShareIconSvg,
  StarSvg,
  UpdatedOnSvg,
} from "../svg/GlobalIcons";
import {main_domain} from "../utils/apiInfo";
import Icon from "../IconNB";

const tagsStyles = {
  body: {
    whiteSpace: "normal",
    color: obTheme.text,
  },
  a: {
    color: obTheme.primary,
  },
};

const width = Dimensions.get("window").width;

const SpTopInfo = ({data, onChangeVariation, inCart}) => {
  const colorScheme = Appearance.getColorScheme();
  const [variableData, setVariableData] = React.useState({
    data: null,
    selectedVariation: null,
    isDisabled: false,
  });

  //Select variation viz in cart and disable Select
  React.useEffect(() => {
    if (data.type === "variable") {
      if (inCart.status) {
        selVar = data.variationProduct.filter(
          el => el.post_excerpt === inCart.variationName,
        );

        if (selVar.length > 0)
          setVariableData({
            ...variableData,
            selectedVariation: selVar[0],
            isDisabled: true,
          });
      } else {
        setVariableData({
          ...variableData,
          isDisabled: false,
        });
      }
    }
  }, [inCart]);

  React.useEffect(() => {
    if (data.type === "variable") {
      if (data.variationProduct.length > 0) {
        const selectData = data.variationProduct.map(el => ({
          label: el.post_excerpt.split("months: ")[1],
          value: el.ID,
        }));
        onChangeVariation(data.variationProduct[0].ID);

        setVariableData({
          data: selectData,
          selectedVariation: data.variationProduct[0],
          isDisabled: false,
        });
      }
    }
  }, []);

  const loadPrice = () => {
    if (data.type === "variable" && variableData.selectedVariation !== null) {
      return (
        <View style={{...styles.variablePriceWrap, ...styles.priceWrap}}>
          {variableData.selectedVariation.sale_price !== "" ? (
            <>
              <Text style={{...styles.simpleSalePrice, ...styles.coursePrice}}>
                {variableData.selectedVariation.sale_price}
              </Text>
              <Text style={{...styles.simpleRegPrice, ...styles.saleRegPrice}}>
                {variableData.selectedVariation.price}
              </Text>
            </>
          ) : (
            <Text style={{...styles.simpleRegPrice, ...styles.coursePrice}}>
              {variableData.selectedVariation.price}
            </Text>
          )}
        </View>
      );
    } else {
      return (
        <View style={{...styles.simplePriceWrap, ...styles.priceWrap}}>
          {data.sale_price !== "" ? (
            <>
              <Text style={{...styles.simpleSalePrice, ...styles.coursePrice}}>
                {data.sale_price}
              </Text>
              <Text style={{...styles.simpleRegPrice, ...styles.saleRegPrice}}>
                {data.regular_price}
              </Text>
            </>
          ) : (
            <Text style={{...styles.simpleRegPrice, ...styles.coursePrice}}>
              {data.regular_price}
            </Text>
          )}
        </View>
      );
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: `${data.name}`,
        message: `Hey, I saw this great course on Online Bauji. Checkout Here: ${main_domain}/courses/${data.slug}`,
        url: `${main_domain}/courses/${data.slug}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSelectChange = varId => {
    const selectedVar = data.variationProduct.filter(el => el.ID == varId);
    onChangeVariation(varId);
    setVariableData({
      ...variableData,
      selectedVariation: selectedVar[0],
    });
  };

  const renderVariations = () => {
    if (variableData.data !== null) {
      return (
        <RNPickerSelect
          disabled={variableData.isDisabled}
          onValueChange={value => {
            console.log(value);
            handleSelectChange(value);
          }}
          value={
            variableData.selectedVariation !== null
              ? variableData.selectedVariation.ID
              : null
          }
          items={variableData.data}
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: "Select Course Duration...",
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
      );
    }
  };

  return (
    <View style={styles.parentContainer}>
      <View style={styles.featImg}>
        <FastImage
          style={{width: width / 2, height: 120}}
          source={{
            uri: data.images[0].src,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <TouchableWithoutFeedback onPress={onShare}>
          <View style={{position: "absolute", right: 16, top: 0}}>
            <ShareIconSvg />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.courseInfo}>
        <Text style={styles.courseName}>{data.name}</Text>
        <View style={styles.metaInfo}>
          <StarSvg ratingCount={Math.floor(parseFloat(data.average_rating))} />
          {data.type === "variable" ? (
            <View style={styles.variationSelect}>{renderVariations()}</View>
          ) : null}

          <View style={styles.priceWrapCont}>
            <RupeeSymbol />
            {loadPrice()}
          </View>
          <View style={styles.courseUpdated}>
            <UpdatedOnSvg />
            <Text style={styles.courseUpdatedTxt}>
              Updated on {moment(data.date_modified).format("DD-MM-YYYY")}
            </Text>
          </View>
          <View style={styles.courseDesc}>
            <RenderHtml
              contentWidth={width}
              source={{html: data.description}}
              tagsStyles={tagsStyles}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  featImg: {
    alignItems: "center",
    marginBottom: 24,
    position: "relative",
  },
  courseName: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 18,
    marginBottom: 8,
    color: obTheme.text,
  },
  courseUpdated: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  courseUpdatedTxt: {
    color: obTheme.text,
    marginStart: 8,
    fontSize: 12,
  },
  priceWrapCont: {
    flexDirection: "row",
    marginTop: 8,
    alignItems: "center",
  },
  priceWrap: {
    marginStart: 8,
  },
  coursePrice: {
    fontSize: 18,
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
  courseDesc: {
    marginTop: 8,
    marginBottom: 8,
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

export default SpTopInfo;
