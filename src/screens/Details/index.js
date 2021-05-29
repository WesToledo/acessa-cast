import React, { useEffect, useState, useLayoutEffect } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import { Layout, Spinner } from "@ui-kitten/components";
import { Audio } from "expo-av";

import api from "src/services/api";

import { SeekBar } from "./seekbar.component";
import { Header } from "./header.component";
import { PlayBackControls } from "./playback.component";
import { AlbumArt } from "./albumart.component";
import { TrackDetails } from "./trackdetails.component";

const audioBookPlaylist = [
  {
    title: "Hamlet - Act I",
    author: "William Shakespeare",
    source: "Librivox",
    uri: "https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3",
    imageSource:
      "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
  },
  {
    title: "Hamlet - Act II",
    author: "William Shakespeare",
    source: "Librivox",
    uri: "https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act2_shakespeare.mp3",
    imageSource:
      "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
  },
  {
    title: "Hamlet - Act III",
    author: "William Shakespeare",
    source: "Librivox",
    uri: "http://www.archive.org/download/hamlet_0911_librivox/hamlet_act3_shakespeare.mp3",
    imageSource:
      "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
  },
  {
    title: "Hamlet - Act IV",
    author: "William Shakespeare",
    source: "Librivox",
    uri: "https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act4_shakespeare.mp3",
    imageSource:
      "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
  },
  {
    title: "Hamlet - Act V",
    author: "William Shakespeare",
    source: "Librivox",
    uri: "https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act5_shakespeare.mp3",
    imageSource:
      "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
  },
];

export function TrackDetailsScreen({ navigation }) {
  const [state, setState] = useState({
    isPlaying: false,
    currentIndex: 0,
    volume: 1.0,
    isBuffering: false,
    trackLength: 1,
  });
  const [sound, setSound] = useState();
  const [load, setLoad] = useState(false);
  const [seekCurrentPosition, setSeekCurrentPosition] = useState({
    currentPosition: 0,
  });

  async function loadAudio() {
    const { currentIndex, isPlaying, volume } = state;

    try {
      const source = {
        uri: audioBookPlaylist[currentIndex].uri,
      };

      const initialStatus = {
        shouldPlay: isPlaying,
        volume,
      };
      const { sound, status } = await Audio.Sound.createAsync(
        source,
        initialStatus
      );

      const length = Math.floor(status.durationMillis / 1000);
      setState({
        ...state,
        trackLength: length,
      });

      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

      setSound(sound);
      setLoad(true);
    } catch (e) {
      console.log(e);
    }
  }

  async function handlePlayPause() {
    if (!state.isPlaying) {
      await sound.playAsync();
    } else {
      await sound.pauseAsync();
    }
    setState({ ...state, isPlaying: !state.isPlaying });
  }

  const handlePreviousTrack = async () => {};

  const handleNextTrack = async () => {};

  function onPlaybackStatusUpdate(status) {
    setSeekCurrentPosition({
      currentPosition: Math.floor(status.positionMillis / 1000),
    });
  }

  // async function getTrack() {
  //   console.log("entred");
  //   try {
  //     const response = await api.get("user/");
  //     console.log(response.data);
  //   } catch (err) {
  //     console.log("error", err);
  //   }
  // }

  // SEEK BAR CONTROLS

  // const setDuration = (data) => {
  //   setState({ trackLength: Math.floor(data.duration) });
  // };

  // const setTime = (data) => {
  //   setState({ currentPosition: Math.floor(data.currentTime) });
  // };

  async function onSeek(time) {
    time = Math.round(time);

    await sound.setPositionAsync(time * 1000);

    setSeekCurrentPosition({
      currentPosition: time,
    });

    setState({ ...state, isPlaying: true });
  }

  useEffect(() => {
    // getTrack();

    async function setAudio() {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
          shouldDuckAndroid: true,
          staysActiveInBackground: true,
          playThroughEarpieceAndroid: true,
        });

        loadAudio();
      } catch (e) {
        console.log(e);
      }
    }
    setAudio();
  }, []);

  useEffect(() => {
    console.log("seek changed", seekCurrentPosition);
  }, [seekCurrentPosition]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout style={styles.container}>
        <Header />
        <AlbumArt />
        {load ? (
          <View style={styles.footer}>
            <TrackDetails />

            <SeekBar
              trackLength={state.trackLength}
              currentPosition={seekCurrentPosition.currentPosition}
              onSeek={onSeek}
              onSlidingStart={() => setState({ ...state, isPlaying: false })}
            />
            <PlayBackControls
              onPressPlay={handlePlayPause}
              onPressPause={handlePlayPause}
              isPlaying={state.isPlaying}
            />
          </View>
        ) : (
          <View style={styles.spinner}>
            <Spinner size="giant" />
          </View>
        )}
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
  spinner: {
    height: "30%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
