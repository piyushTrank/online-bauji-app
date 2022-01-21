import React, {Component} from "react";
import PropTypes from "prop-types";
import {View, StatusBar, TextInput, StyleSheet, Platform} from "react-native";
import Animated, {EasingNode} from "react-native-reanimated";
import {obTheme} from "./utils/colors";

class FloatingTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
    this._animatedIsFocused = new Animated.Value(
      this.props.value === "" ? 0 : 1,
    );
  }

  handleFocus = () => this.setState({isFocused: true});
  handleBlur = () => this.setState({isFocused: false});

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.isFocused || this.props.value !== "" ? 1 : 0,
      duration: 200,
      easing: EasingNode.inOut(EasingNode.ease),
    }).start();
  }

  render() {
    const {label, containerStyle, style} = this.props;
    const labelStyle = {
      position: "absolute",
      left: 2,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [27, 8],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 11],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [
          Animated.color(210, 210, 210),
          Animated.color(253, 52, 98),
        ],
      }),
    };
    return (
      <View style={[{paddingTop: 18}, containerStyle]}>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>
        <TextInput
          {...this.props}
          style={[styles.txtInput, style]}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
        />
      </View>
    );
  }
}
export default FloatingTextInput;

const styles = StyleSheet.create({
  txtInput: {
    height: 35,
    fontSize: 14,
    color: "#000",
    borderBottomWidth: 1,
    borderBottomColor: obTheme.text,
    paddingBottom: Platform.OS == "ios" ? 0 : 8,
    width: "100%",
    textAlignVertical: "center",
    fontSize: 16,
    lineHeight: 24,
  },
});

FloatingTextInput.propTypes = {
  ...TextInput.propTypes,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
};
FloatingTextInput.defaultProps = {
  containerStyle: {},
  label: "Placeholder",
  hideLabel: false,
};
