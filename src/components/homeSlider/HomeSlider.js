import React from "react";
import {FlatList, StyleSheet, Image} from "react-native";

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

const ListItem = props => {
  return <Image source={props.item.url} style={styles.slideItem} />;
};

const HomeSlider = () => {
  return (
    <FlatList
      horizontal
      data={demoData}
      renderItem={({item}) => <ListItem item={item} />}
      showsHorizontalScrollIndicator={false}
      style={styles.sliderContainer}
    />
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    marginTop: 10,
  },
  slideItem: {
    marginHorizontal: 10,
    borderRadius: 20,
  },
});

export default HomeSlider;
