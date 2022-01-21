import React, {Component} from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {obTheme} from "../utils/colors";

const Accordian = props => {
  const [accStatus, setAccStatus] = React.useState({
    //data: props.data,
    expanded: false,
  });

  React.useEffect(() => {
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAccStatus({...accStatus, expanded: !accStatus.expanded});
  };

  return (
    <View>
      <TouchableOpacity style={styles.row} onPress={toggleExpand}>
        <Text style={[styles.title, styles.font]}>{props.title}</Text>
        <Icon
          name={
            accStatus.expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"
          }
          size={30}
          color={obTheme.text}
        />
      </TouchableOpacity>
      <View style={styles.parentHr} />
      {accStatus.expanded && (
        <View style={styles.child}>
          {/* <Text style={{color: obTheme.text}}>{props.data}</Text> */}
          {props.children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    color: obTheme.text,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    marginHorizontal: 16,
    paddingRight: 18,
    alignItems: "center",
    backgroundColor: obTheme.white,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: obTheme.lightGray,
  },
  parentHr: {
    height: 1,
    color: obTheme.text,
    width: "100%",
  },
  child: {
    backgroundColor: obTheme.white,
    padding: 16,
  },
});

export default Accordian;
