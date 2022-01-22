import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import OtpAuthWrapper from "../screens/OtpAuthWrapper";
import AuthWrapper from "../screens/AuthWrapper";
import {useSelector} from "react-redux";
import CoursesScreen from "../screens/CoursesScreen";
import SingleCourseScreen from "../screens/SingleCourseScreen";
import SearchCourseScreen from "../screens/SearchCourseScreen";
import DrNavigator from "./DrNavigator";
import MyCoursesScreen from "../screens/MyCourses";
import CartScreen from "../screens/CartScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import OrderSuccessScreen from "../screens/OrderSuccessScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import CourseDetailScreen from "../screens/CourseDetailScreen";
import CategoryScreen from "../screens/CategoryScreen";
import PreviewTopicScreen from "../screens/PreviewTopicScreen";

const StNavigator = () => {
  const Stack = createNativeStackNavigator();
  const [showAuth, setShowAuth] = React.useState(true);

  const currentUser = useSelector(state => state.user.userInfo);
  const authSkip = useSelector(state => state.metaData.authSkip);

  React.useEffect(() => {
    if (currentUser !== null) {
      setShowAuth(false);
    } else if (!!authSkip) {
      setShowAuth(false);
    } else {
      setShowAuth(true);
    }
  }, [currentUser, authSkip]);

  return (
    <Stack.Navigator
      initialRouteName="otpscreen"
      screenOptions={{headerShown: false}}>
      {showAuth ? (
        <>
          <Stack.Screen name="OtpScreen" component={OtpAuthWrapper} />
          <Stack.Screen name="AuthScreen" component={AuthWrapper} />
        </>
      ) : null}
      <Stack.Screen name="Drawer Navigation" component={DrNavigator} />
      {/* <Stack.Screen name="Go to Home Screen" component={TbNavigator} /> */}
      <Stack.Screen name="CoursesScreen" component={CoursesScreen} />
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
      <Stack.Screen name="SingleCourseScreen" component={SingleCourseScreen} />
      <Stack.Screen name="PreviewTopicScreen" component={PreviewTopicScreen} />
      <Stack.Screen name="SearchScreen" component={SearchCourseScreen} />
      <Stack.Screen name="My Courses" component={MyCoursesScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderSuccessScreen" component={OrderSuccessScreen} />
      <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} />
      <Stack.Screen name="CourseDetailScreen" component={CourseDetailScreen} />

      {/* <Stack.Screen name="My Account Screen" component={DrNavigator} /> */}
    </Stack.Navigator>
  );
};

export default StNavigator;
