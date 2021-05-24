import React from "react";
import { StyleSheet, Dimensions, TouchableHighlight } from "react-native";
import { Layout, Icon } from "@ui-kitten/components";

var width = Dimensions.get("window").width;

export function PlayBackControls() {
  return (
    <Layout style={styles.playback_controls}>
      <TouchableHighlight
        style={styles.icon_container}
        activeOpacity={0.9}
        underlayColor="#DDDDDD"
        onPress={() => console.log("touch")}
      >
        <Icon style={styles.icon} fill="#0A0A0A" name="rewind-left" />
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.icon_container}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => console.log("touch")}
      >
        <Icon
          style={{ width: 90, height: 90 }}
          fill="#0A0A0A"
          name="play-circle"
        />
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.icon_container}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => console.log("touch")}
      >
        <Icon style={styles.icon} fill="#0A0A0A" name="rewind-right" />
      </TouchableHighlight>
    </Layout>
  );
}

const styles = StyleSheet.create({
  playback_controls: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginBottom: 30,
  },
  icon_container: {
    borderRadius: 100,
    margin: 10,
  },
  icon: {
    width: 60,
    height: 60,
  },
});
