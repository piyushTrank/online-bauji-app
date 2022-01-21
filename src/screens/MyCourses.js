import axios from "axios";
import {decode} from "html-entities";
import moment from "moment";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import FastImage from "react-native-fast-image";
import {useSelector} from "react-redux";
import Header from "../components/header/Header";
import {CoursePlaySvg} from "../components/svg/GlobalIcons";
import TabNavbar from "../components/tab-navbar/TabNavbar";
import {api_url} from "../components/utils/apiInfo";
import {obTheme} from "../components/utils/colors";

const width = Dimensions.get("window").width;

const ListItem = props => {
  return (
    <View style={styles.listItemCont}>
      <TouchableWithoutFeedback
        onPress={() =>
          props.handleItemClick(props.item.id, props.item.subscriptionId)
        }>
        <View style={styles.listItemWrap}>
          <View style={styles.listItemImg}>
            <View style={styles.playIcon}>
              <CoursePlaySvg />
            </View>
            {props.item.courseFeatImgUrl !== null ? (
              <FastImage
                style={{
                  width: "100%",
                  height: "100%",
                  alignSelf: "stretch",
                  flex: 1,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  borderTopStartRadius: 15,
                  borderBottomStartRadius: 15,
                }}
                source={{
                  uri: props.item.courseFeatImgUrl,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : null}
          </View>
          <View style={styles.listItemContent}>
            <Text style={styles.listItemTxt}>
              {decode(props.item.courseName)}
            </Text>
            <Text style={styles.listItemAuthor}>
              Course By: {decode(props.item.authorName)}
            </Text>
            <Text style={styles.courseDt}>
              Start Date: {moment(props.item.start_date).format("DD/MM/YYYY")}
            </Text>
            {props.item.end_date !== null ? (
              <Text style={styles.courseDt}>
                End Date: {moment(props.item.end_date).format("DD/MM/YYYY")}
              </Text>
            ) : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const MyCoursesScreen = ({navigation}) => {
  const currentUser = useSelector(state => state.user.userInfo);
  const [coursesData, setCoursesData] = React.useState({
    data: null,
  });

  React.useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    let res = await axios.get(`${api_url}/myCourse?user_id=${currentUser.id}`);
    console.log("User Courses res", res.data);

    if (res.data.code === 1) {
      setCoursesData({
        ...coursesData,
        data: res.data.demoData,
      });
    }
  };

  const handleCourseChange = (prodId, subId) => {
    console.log("ProdId", prodId, subId);
    navigation.navigate("CourseDetailScreen", {
      prodId,
      subId,
    });
  };

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
        {coursesData.data !== null ? (
          coursesData.data.length > 0 ? (
            <FlatList
              ListHeaderComponent={
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryHeaderTxt}>Your Courses</Text>
                </View>
              }
              data={coursesData.data}
              renderItem={({item, index}) => (
                <ListItem
                  item={{...item, ind: index}}
                  handleItemClick={handleCourseChange}
                />
              )}
              style={styles.sliderContainer}
              contentContainerStyle={{
                flexGrow: 1,
                paddingVertical: 30,
                paddingHorizontal: 16,
              }}
            />
          ) : (
            <Text style={styles.emptyTxt}>
              You aren't subscribed to any course.
            </Text>
          )
        ) : (
          <View style={styles.loadWrap}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
      <View style={styles.tabNavCont}>
        <TabNavbar />
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
    marginTop: 50,
  },
  headerWrapper: {
    backgroundColor: obTheme.secondary,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  categoryHeaderTxt: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 14,
    color: obTheme.text,
    textTransform: "uppercase",
  },
  listItemWrap: {
    flexDirection: "row",
  },
  listItemImg: {
    width: 120,
    borderRightColor: obTheme.lightGray,
    borderRightWidth: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  playIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 9999,
  },
  listItemContent: {
    paddingHorizontal: 8,
    paddingBottom: 8,
    flex: 1,
  },
  listItemCont: {
    flex: 1,
    marginTop: 24,
    borderRadius: 15,
    backgroundColor: obTheme.white,
    elevation: 5,
  },
  listItemTxt: {
    color: obTheme.text,
    flexShrink: 1,
    fontSize: 12,
    lineHeight: 15,
    marginVertical: 8,
    fontWeight: "600",
  },
  listItemAuthor: {
    color: obTheme.text,
    fontSize: 10,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  courseDt: {
    color: obTheme.text,
    fontSize: 10,
    textTransform: "uppercase",
    marginBottom: 4,
    fontWeight: "500",
  },
  emptyTxt: {
    color: obTheme.lightGray,
    fontSize: 14,
    flex: 1,
    textAlign: "center",
    paddingVertical: 30,
    paddingHorizontal: 16,
  },
});

export default MyCoursesScreen;
