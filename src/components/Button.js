import React from "react";
import {TouchableOpacity} from "react-native";
import withPreventDoubleClick from "./withPreventDoubleClick";

class Button extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity activeOpacity={0.6} {...this.props}>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}
export default withPreventDoubleClick(Button);
