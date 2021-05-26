import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import { Layout, Text } from "@ui-kitten/components";

import api from "src/services/api";

import { SeekBar } from "./seekbar.component";
import { Header } from "./header.component";
import { PlayBackControls } from "./playback.component";
import { AlbumArt } from "./albumart.component";
import { TrackDetails } from "./trackdetails.component";

export function TrackDetailsScreen({ navigation }) {
  async function getTrack() {
    try {
      const response = await api.get("user/");
      console.log(response.data);
    } catch (err) {
      console.log("error", err);
    }
  }

  useEffect(() => {
    getTrack();
  }, []);

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
}

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
