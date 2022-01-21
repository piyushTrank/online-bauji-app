import React from "react";
import PropTypes from "prop-types";
import {View, ActivityIndicator, Dimensions} from "react-native";
const {width, height} = Dimensions.get("window");

class ProgressDialog extends React.PureComponent {
  render() {
    const {loading, style} = this.props;
    return loading ? (
      <View
        style={{
          backgroundColor: "#00000012",
          //opacity: 0,
          position: "absolute",
          height: height,
          width: width,
          justifyContent: "center",
          alignItems: "center",
          elevation: 3,
          shadowOpacity: 0.2,
          shadowRadius: 1,
          shadowOffset: {height: 3, width: 0},
        }}>
        <ActivityIndicator color="#fd3462" size="large" style={style} />
      </View>
    ) : null;
  }
}
ProgressDialog.defaultProps = {
  loading: false,
};

ProgressDialog.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default ProgressDialog;
