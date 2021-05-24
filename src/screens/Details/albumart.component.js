import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";

var width = Dimensions.get("window").width;

import img from "../../assets/thumb.jpg";

export const AlbumArt = () => {
  return (
    <View style={styles.album_art}>
      <Image source={img} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  album_art: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width - 30,
    height: width - 30,
    alignSelf: "center",
  },
});
