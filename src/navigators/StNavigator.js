import React from "react";
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
import AllCategoriesScreen from "../screens/AllCategoriesScreen";
import BlogPostDetailScreen from "../screens/BlogPostDetailScreen";
import UserDetailScreen from "../screens/UserDetailScreen";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

const StNavigator = ({userInfo}) => {
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
      initialRouteName={userInfo === null ? "AuthScreen" : "DrawerNavigation"}
      // initialRouteName={"AuthScreen"}
      screenOptions={{headerShown: false}}>
      {showAuth && (
        <>
          <Stack.Screen
            name="OtpScreen"
            options={{
              headerShown: false,
              presentation: "card", // Check this value
            }}
            component={OtpAuthWrapper}
          />
          <Stack.Screen
            name="UserDetailScreen"
            options={{
              headerShown: false,
              presentation: "card", // Check this value
            }}
            component={UserDetailScreen}
          />
          <Stack.Screen
            name="AuthScreen"
            options={{
              headerShown: false,
              presentation: "card", // Check this value
            }}
            component={AuthWrapper}
          />
        </>
      )}
      {/* <Stack.Screen
        name="DrawerNavigation"
        options={{
          headerShown: false,
          presentation: "card", // Check this value
        }}
        component={DrNavigator}
      /> */}
      <Stack.Screen
        name="CoursesScreen"
        options={{
          headerShown: false,
          presentation: "card", // Check this value
        }}
        component={CoursesScreen}
      />
      <Stack.Screen
        name="CategoryScreen"
        options={{
          headerShown: false,
          presentation: "card", // Check this value
        }}
        component={CategoryScreen}
      />
      <Stack.Screen
        name="AllCategoriesScreen"
        options={{
          headerShown: false,
          presentation: "card", // Check this value
        }}
        component={AllCategoriesScreen}
      />
      <Stack.Screen
        name="SingleCourseScreen"
        options={{
          headerShown: false,
          presentation: "card", // Check this value
        }}
        component={SingleCourseScreen}
      />
      <Stack.Screen
        name="PreviewTopicScreen"
        options={{
          headerShown: false,
          presentation: "card", // Check this value
        }}
        component={PreviewTopicScreen}
      />
      <Stack.Screen
        name="SearchScreen"
        options={{
          headerShown: false,
          presentation: "card", // Check this value
        }}
        component={SearchCourseScreen}
      />
      <Stack.Screen
        name="My Courses"
        options={{
          headerShown: false,
          presentation: "card", // Check this value
        }}
        component={MyCoursesScreen}
      />
      <Stack.Screen
        name="Cart"
        options={{
          headerShown: false,
          presentation: "card", // Check this value
        }}
        component={CartScreen}
      />
      <Stack.Screen
        name="Checkout"
        options={{
          headerShown: false,
          presentation: "card", // Check this value
        }}
        component={CheckoutScreen}
      />
      <Stack.Screen
        name="OrderSuccessScreen"
        options={{
          headerShown: false,
          presentation: "card", // Check this value
        }}
        component={OrderSuccessScreen}
      />
      <Stack.Screen
        name="MyProfileScreen"
        options={{
          headerShown: false,
          presentation: "card", // Check this value
        }}
        component={MyProfileScreen}
      />
      <Stack.Screen
        name="CourseDetailScreen"
        options={{
          headerShown: false,
          presentation: "card", // Check this value
        }}
        component={CourseDetailScreen}
      />
      <Stack.Screen
        name="BlogPostDetailScreen"
        component={BlogPostDetailScreen}
      />

      {/* <Stack.Screen name="My Account Screen" component={DrNavigator} /> */}
    </Stack.Navigator>
  );
};

export default StNavigator;
