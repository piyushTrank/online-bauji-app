import React from "react";
import {View, StyleSheet, ScrollView} from "react-native";
import {obTheme} from "../components/utils/colors";
import Header from "../components/header/Header";
import CategoryList from "../components/category-list/CategoryList";

function AllCategoriesScreen({route, navigation}) {
  return (
    <View style={styles.parentContainer}>
      <View style={styles.headerWrapper}>
        <Header navigation={navigation} />
      </View>
      <View style={styles.scrollContainer}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={styles.scrollWrap}>
          <CategoryList navigation={navigation} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: obTheme.secondary,
  },
  headerWrapper: {
    flex: 1,
  },
  scrollWrap: {
    paddingVertical: 30,
  },
  scrollContainer: {
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    flex: 2,
    backgroundColor: obTheme.white,
    marginTop: 50,
  },
  headerWrapper: {
    backgroundColor: obTheme.secondary,
  },
});

export default AllCategoriesScreen;
