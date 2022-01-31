import React from "react";
import axios from "axios";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import {api_url} from "../utils/apiInfo";
import {TouchableOpacity} from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";
import {useSelector} from "react-redux";

const sliderImg = require("../../assets/images/home/slider_img.png");

const demoData = [
  {
    id: 1,
    url: sliderImg,
  },
  {
    id: 2,
    url: sliderImg,
  },
  {
    id: 3,
    url: sliderImg,
  },
  {
    id: 4,
    url: sliderImg,
  },
];

const width = Dimensions.get("window").width;

const ListItem = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      key={props.item.id}
      onPress={() => props.handleSlideClick(props.item.id)}>
      <FastImage
        key={props.item.id}
        style={{
          width: width - 60,
          height: 140,
          marginEnd: 10,
          borderRadius: 20,
        }}
        source={{
          uri: props.item.banner_url,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </TouchableOpacity>
  );
};

const HomeSlider = ({navigation}) => {
  const categories = useSelector(state => state.misc.categories);
  const [sliderData, setSliderData] = React.useState(null);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios(`${api_url}/layout`);

    console.log("Slider res", res);

    setSliderData(res.data.banner);
  };

  const handleNavchange = catId => {
    const selCat = categories.filter(el => el.id === parseInt(catId));

    if (selCat.length > 0) {
      const data = {catId, parentId: selCat[0].parent, catName: selCat[0].name};
      console.log("data", data);

      navigation.navigate("CategoryScreen", {data});
    }
  };

  // console.log("sliderData", sliderData);

  return sliderData !== null ? (
    <FlatList
      horizontal
      data={sliderData}
      renderItem={({item}) => (
        <ListItem item={item} handleSlideClick={handleNavchange} />
      )}
      showsHorizontalScrollIndicator={false}
      style={styles.sliderContainer}
    />
  ) : (
    <View style={styles.loadWrap}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    marginTop: 10,
    marginHorizontal: 16,
  },
  slideItem: {
    marginHorizontal: 10,
    borderRadius: 20,
  },
  loadWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeSlider;
