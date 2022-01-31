import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Header from "../components/header/Header";
import {obTheme} from "../components/utils/colors";
import ChangePasswordForm from "../components/change-password-form/ChangePasswordForm";

const ChangePasswordScreen = ({navigation}) => {
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
          style={styles.scrollWrap}
          keyboardShouldPersistTaps="handled">
          <ChangePasswordForm />
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
});

export default ChangePasswordScreen;
