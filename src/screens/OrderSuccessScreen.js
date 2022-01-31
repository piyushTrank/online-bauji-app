import React from "react";
import moment from "moment";
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import FastImage from "react-native-fast-image";
import {useSelector} from "react-redux";
import Header from "../components/header/Header";
import {obTheme} from "../components/utils/colors";
import SuccessAnim from "../components/animations/SuccessAnim";

const defaultImage = require("../assets/images/global/image_place.png");

const OrderSuccessScreen = ({navigation}) => {
  const orderData = useSelector(state => state.order);

  console.log("Order", orderData);

  React.useEffect(() => {
    const backAction = () => {
      navigation.navigate("Home");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const loadCourses = (arr, subArr) => {
    console.log("loadCourses", subArr);

    return arr.map(el => {
      //Get Subscription Dates
      let subDates = {
        startDate: null,
        endDate: null,
        imageUrl: null,
        subId: null,
      };

      subArr.forEach(subEl => {
        //Simple Product (match product id)
        if (subEl.course_id === el.product_id) {
          subDates.startDate = subEl.start_date;
          subDates.imageUrl = subEl.image;
          subDates.subId = subEl.subscriptionId;
          if (subEl.end_date !== null) {
            subDates.endDate = subEl.end_date;
          }
        }
      });

      console.log("subDates", subDates, el.id);

      const handleCourseNav = () => {
        navigation.navigate("CourseDetailScreen", {
          prodId: el.product_id,
          subId: subDates.subId,
        });
      };

      return (
        <View style={styles.orderItem} key={el.id}>
          <View style={styles.orderItemImgWrap}>
            <FastImage
              style={{
                width: 120,
                height: 100,
                alignSelf: "center",
                flex: 1,
                borderRadius: 8,
              }}
              source={
                !!subDates.imageUrl
                  ? {
                      uri: subDates.imageUrl,
                      priority: FastImage.priority.normal,
                    }
                  : defaultImage
              }
              resizeMode={FastImage.resizeMode.cover}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleCourseNav()}>
              <View style={styles.startBtn}>
                <Text
                  style={{
                    color: obTheme.white,
                    fontSize: 12,
                    textTransform: "uppercase",
                  }}>
                  Start Course
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.orderInfoItem}>
            <Text style={styles.orderInfoVal}>Course Name: {el.name}</Text>
          </View>
          <View style={styles.orderInfoItem}>
            <Text style={styles.orderInfoVal}>
              Price: {orderData.currency_symbol} {el.price}
            </Text>
          </View>
          <View style={styles.orderInfoItem}>
            <Text style={styles.orderInfoVal}>
              Subscription Start Date:{" "}
              {moment(subDates.startDate).format("DD/MM/YYYY")}
            </Text>
          </View>
          {subDates.endDate !== null ? (
            <View style={styles.orderInfoItem}>
              <Text style={styles.orderInfoVal}>
                Subscription End Date:{" "}
                {moment(subDates.endDate).format("DD/MM/YYYY")}
              </Text>
            </View>
          ) : null}
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <View style={styles.headerWrapper}>
        <Header
          navigation={navigation}
          showDrawer={false}
          showBack={false}
          showCart={false}
          showSearch={false}
        />
      </View>
      <View style={styles.scrollContainer}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={styles.scrollWrap}>
          <View style={styles.orderHead}>
            <SuccessAnim style={{width: 64, height: 64, textAlign: "center"}} />
            <Text style={styles.orderHeadTxt}>
              Thank you for purchasing the{" "}
              {orderData.line_items.length > 1 ? "courses" : "course"}. Your
              Order Id is {orderData.id}.
            </Text>
          </View>
          <View style={styles.orderInfoCont}>
            <Text style={styles.orderInfoHead}>Purchased By:</Text>
            <View style={styles.orderInfoItem}>
              <Text style={styles.orderInfoVal}>
                Name:{" "}
                {orderData.billing.first_name +
                  " " +
                  orderData.billing.last_name}
              </Text>
            </View>
            <View style={styles.orderInfoItem}>
              <Text style={styles.orderInfoVal}>
                Purchase Date:{" "}
                {moment(orderData.date_created).format("DD-MM-YYYY")}
              </Text>
            </View>

            <View style={styles.orderInfoItem}>
              <Text style={styles.orderInfoVal}>
                Email Id: {orderData.billing.email}
              </Text>
            </View>

            <View style={styles.orderInfoItem}>
              <Text style={styles.orderInfoVal}>
                Mobile No: {orderData.billing.phone}
              </Text>
            </View>
            <View style={styles.orderInfoItem}>
              <Text style={styles.orderInfoVal}>
                Billing Address:{" "}
                {`${orderData.billing.company} ${orderData.billing.address_1} ${orderData.billing.address_2} ${orderData.billing.city}, ${orderData.billing.state}-${orderData.billing.postcode},  ${orderData.billing.country}`}
              </Text>
            </View>
          </View>
          <View style={styles.orderDetWrap}>
            {loadCourses(orderData.line_items, orderData.subData.data)}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
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
  orderHead: {
    marginBottom: 24,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  orderHeadTxt: {
    color: obTheme.text,
    fontSize: 16,
    lineHeight: 22,
    flex: 1,
    fontWeight: "500",
  },
  orderInfoHead: {
    color: obTheme.text,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },
  orderInfoCont: {
    paddingHorizontal: 16,
  },
  orderInfoItem: {
    marginVertical: 4,
  },
  orderInfoVal: {
    color: obTheme.text,
    lineHeight: 20,
  },

  orderDetWrap: {
    marginVertical: 24,
  },

  orderItem: {
    shadowOffset: {width: 10, height: 10},
    shadowColor: "black",
    shadowOpacity: 1,
    marginBottom: 24,
    marginHorizontal: 16,
    elevation: 6,
    flex: 1,
    padding: 8,
    borderRadius: 8,
    backgroundColor: obTheme.white,
  },
  startBtn: {
    backgroundColor: obTheme.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 8,
  },
});

export default OrderSuccessScreen;
