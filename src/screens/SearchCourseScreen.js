import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import {debounce} from "lodash";
import Header from "../components/header/Header";
import {obTheme} from "../components/utils/colors";
import Icon from "../components/IconNB";
import {api_url} from "../components/utils/apiInfo";
import axios from "axios";
import FastImage from "react-native-fast-image";

const SearchCourseScreen = ({navigation}) => {
  const [formVal, setFormVal] = React.useState({
    data: null,
    isLoading: false,
    searchTxt: "",
  });

  const inpRef = React.useRef(null);

  const handleSearch = async val => {
    setFormVal({
      ...formVal,
      isLoading: true,
    });
    const res = await axios.get(`${api_url}/custom-search?search=${val}`);

    console.log("Search: ", res.data.products);

    setFormVal({
      ...formVal,
      data: !!res.data.products ? res.data.products : [],
      searchTxt: val,
      isLoading: false,
    });
  };

  const handler = React.useCallback(debounce(handleSearch, 500), []);

  const handleInputChange = val => {
    handler(val);
  };

  const loadResults = () => {
    if (formVal.data !== null) {
      if (formVal.data.length > 0) {
        return formVal.data.map(el => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={el.id}
            onPress={() =>
              navigation.navigate("SingleCourseScreen", {prodId: el.id})
            }>
            <View key={el.id} style={styles.resultItem}>
              <FastImage
                style={{
                  width: 64,
                  height: 64,
                  alignSelf: "center",
                  borderRadius: 8,
                }}
                source={{
                  uri: el.images[0].src,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <Text style={styles.resultTitle}>{el.name}</Text>
            </View>
          </TouchableOpacity>
        ));
      } else {
        return formVal.searchTxt !== "" ? (
          <View style={styles.resultItem}>
            <Text style={styles.resultTitle}>No results found.</Text>
          </View>
        ) : null;
      }
    } else {
      return null;
    }
  };

  console.log("inpRef", inpRef);

  return (
    <View style={styles.parentContainer}>
      <View style={styles.headerWrapper}>
        <Header
          navigation={navigation}
          showDrawer={false}
          showBack={true}
          showCart={false}
          showSearch={false}
          showUser={false}
        />
      </View>
      <View style={styles.scrollContainer}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={styles.scrollWrap}>
          <View style={styles.searchHeader}>
            <View style={styles.searchBarWrap}>
              <Icon
                type="MaterialIcons"
                name="search"
                color={obTheme.text}
                size={24}
              />
              <TextInput
                style={styles.input}
                onChangeText={handleInputChange}
                placeholder="Search Course"
                placeholderTextColor="#999"
                autoFocus={true}
                ref={inpRef}
                // value={text}
              />
            </View>
          </View>
          {!formVal.isLoading ? (
            <View style={styles.searchResults}>{loadResults()}</View>
          ) : (
            <View style={styles.loadWrap}>
              <ActivityIndicator size="large" />
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: obTheme.secondary,
  },
  scrollWrap: {
    paddingVertical: 30,
  },
  scrollContainer: {
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    flex: 1,
    backgroundColor: obTheme.white,
    marginTop: 20,
  },
  headerWrapper: {
    backgroundColor: obTheme.secondary,
  },
  searchBarWrap: {
    backgroundColor: "#f2f2f2",
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginHorizontal: 16,
    borderRadius: 30,
    marginBottom: 8,
  },
  input: {
    fontSize: 14,
    color: obTheme.text,
    lineHeight: 16,
    paddingHorizontal: 16,
    flex: 1,
  },
  searchResults: {
    flex: 1,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  resultTitle: {
    color: obTheme.text,
    flex: 1,
    paddingStart: 8,
  },
});

export default SearchCourseScreen;
