import React from "react";
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { Layout, Text, Divider } from "@ui-kitten/components";

import img from "../../../assets/thumb.jpg";

var width = Dimensions.get("window").width;

export const Card = ({ navigation, name, description, imageSource }) => {
  return (
    <TouchableHighlight
      style={styles.container}
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => console.log("touch")}
    >
      <>
        <Image source={img} style={styles.thumb} />
        <View>
          <Text numberOfLines={3} style={styles.thumb_text} category="s1">
            {name}
          </Text>
          <Text
            numberOfLines={2}
            style={styles.thumb_text}
            category="s1"
            appearance="hint"
          >
            {description}
          </Text>
        </View>
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "auto",
    marginVertical: 5,
    flex: 1,
    flexDirection: "row",
    zIndex: 1000,
  },
  thumb: {
    width: 90,
    height: 90,
    marginRight: 10,
  },
  thumb_text: {
    fontWeight: "700",
    width: width - 125,
  },
});
