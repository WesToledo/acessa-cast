import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import Constants from "expo-constants";
import { Layout, Text } from "@ui-kitten/components";

import { SeekBar } from "./seekbar.component";
import { Header } from "./header.component";
import { PlayBackControls } from "./playback.component";
import { AlbumArt } from "./albumart.component";
import { TrackDetails } from "./trackdetails.component";

export const DetailsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout style={styles.container}>
        <Header />
        <AlbumArt />
        <View style={styles.footer}>
          <TrackDetails />
          <SeekBar />
          <PlayBackControls />
        </View>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  container: { flex: 1, justifyContent: "space-between" },
  footer: { height: "30%" },

  track_details: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});
