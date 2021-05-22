import React from "react";
import { StyleSheet, Image, ScrollView, View, Dimensions } from "react-native";
import { Layout, Text } from "@ui-kitten/components";

import img from "../../../assets/thumb.jpg";

var width = Dimensions.get("window").width; 

export const Card = ({ navigation, name, description, imageSource }) => {
  return (
    <Layout style={styles.container}>
      <View style={styles.card_container}>
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
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    height: "auto",
    paddingVertical: 10,
  },
  title: {
    paddingTop: 15,
    fontWeight: "bold",
  },
  card_container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#ccc",
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
