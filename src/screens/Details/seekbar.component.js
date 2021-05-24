import React from "react";
import { StyleSheet, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import Slider from "@react-native-community/slider";

export function SeekBar() {
  return (
    <Layout style={styles.seek_bar}>
      <View style={{ flexDirection: "row", marginHorizontal: 15 }}>
        <Text style={styles.text}>00:00</Text>
        <View style={{ flex: 1 }} />
        <Text style={styles.text}>00:00</Text>
      </View>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  seek_bar: {},
});
