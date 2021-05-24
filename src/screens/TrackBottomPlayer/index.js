import React from "react";
import {
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Icon, Layout, Text } from "@ui-kitten/components";

import img from "../../assets/thumb.jpg";

var width = Dimensions.get("window").width;

export const TrackPlayer = ({}) => {
  const navigation = useNavigation();
  return (
    <Layout style={styles.container}>
      <Layout style={styles.image_container}>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => navigation.navigate("Details")}
        >
          <Image source={img} style={styles.image} />
        </TouchableHighlight>
      </Layout>
      <Layout style={styles.content}>
        <Layout style={styles.text_container}>
          <Text category="h6" style={{ fontWeight: "bold" }}>
            NerdCast # 800
          </Text>
          <Text category="s1" appearance="hint" style={{ fontWeight: "bold" }}>
            NerdCast
          </Text>
        </Layout>
        <TouchableHighlight
          style={styles.icon_container}
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => console.log("touch")}
        >
          <Icon
            style={{ width: 40, height: 40 }}
            fill="#0A0A0A"
            name="play-circle"
          />
        </TouchableHighlight>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: width,
    position: "absolute",
    zIndex: 50,
    elevation: Platform.OS === "android" ? 50 : 0,
    bottom: 55,
    flexDirection: "row",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image_container: {
    width: 70,
  },
  image: {
    width: 70,
    height: 70,
    alignSelf: "center",
  },
  text_container: {
    marginLeft: 15,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  icon_container: {
    padding: 15,
  },
});
