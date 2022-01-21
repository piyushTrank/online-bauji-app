import React from "react";
import {Animated, Easing, View} from "react-native";
import LottieView from "lottie-react-native";

const SuccessAnim = props => {
  const [progress, setProgress] = React.useState(new Animated.Value(0));

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     progress: new Animated.Value(0),
  //   };
  // }

  // componentDidMount() {
  //   Animated.timing(this.state.progress, {
  //     toValue: 1,
  //     duration: 5000,
  //     easing: Easing.linear,
  //   }).start();
  // }

  React.useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    // return () => {
    //   Animated.Value(0);
    // };
  });

  return (
    <View {...props}>
      <LottieView
        source={require("../../assets/animations/success.json")}
        progress={progress}
        autoPlay={true}
        loop={true}
      />
    </View>
  );
};

export default SuccessAnim;
