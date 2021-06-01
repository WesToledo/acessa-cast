import React, { useEffect, useState, useLayoutEffect } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import { Layout, Spinner } from "@ui-kitten/components";
import { Audio } from "expo-av";

import api from "src/services/api";

import {
  beginPlaying,
  playPauseMusic,
  updateSeekCurrentPosition,
  nextMusic as controllerNextMusic,
  setLoading,
} from "actions/controller";
import { instancePlayback, unloadPlayback } from "actions/playback";
import { nextMusic as playlistNextMusic } from "actions/playlist";

import { SeekBar } from "./seekbar.component";
import { Header } from "./header.component";
import { PlayBackControls } from "./playback.component";
import { AlbumArt } from "./albumart.component";
import { TrackDetails } from "./trackdetails.component";
import { useDispatch, useSelector } from "react-redux";

export function TrackDetailsScreen({ navigation }) {
  const dispatch = useDispatch();

  const controller = useSelector((state) => state.controller);
  const playback = useSelector((state) => state.playback);
  const playlist = useSelector((state) => state.playlist);

  useEffect(() => {
    console.log(controller);
  }, [controller]);

  async function loadAudio({ fromStart }) {
    const { isPlaying, volume } = controller;

    await dispatch(setLoading());
    console.warn("current position", controller.seek.currentPosition);

    try {
      const source = {
        uri: playlist.podcasts[playlist.currentIndex].uri,
      };
      const initialStatus = {
        shouldPlay: isPlaying,
        volume,
        positionMillis: fromStart
          ? 0
          : Math.floor(controller.seek.currentPosition * 1000),
      };
      const { sound, status } = await Audio.Sound.createAsync(
        source,
        initialStatus
      );

      const trackLength = Math.floor(status.durationMillis / 1000);
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

      await dispatch(instancePlayback(sound));
      await dispatch(
        beginPlaying({
          trackLength,
        })
      );
    } catch (e) {
      console.log(e);
    }
  }

  async function handlePlayPause() {
    if (!controller.isPlaying) {
      await playback.sound.playAsync();
    } else {
      await playback.sound.pauseAsync();
    }
    dispatch(playPauseMusic(!controller.isPlaying));
  }

  const handlePreviousTrack = async () => {};

  async function handleNextTrack() {
    const { podcasts, currentIndex } = playlist;

    await playback.sound.pauseAsync();

    if (playback.sound != null) {
      await playback.sound.unloadAsync();
    }

    var index = currentIndex;
    index < podcasts.length - 1 ? (index += 1) : (index = 0);

    await dispatch(controllerNextMusic());
    await dispatch(playlistNextMusic(index));
    loadAudio({ fromStart: true });
  }

  function onPlaybackStatusUpdate(status) {
    if (status.isPlaying) {
      dispatch(
        updateSeekCurrentPosition(Math.floor(status.positionMillis / 1000))
      );
    }
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

    await playback.sound.setPositionAsync(time * 1000);
    console.warn("onSeek");

    dispatch(updateSeekCurrentPosition(time));
    dispatch(playPauseMusic(true));
  }

  useEffect(() => {
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

        loadAudio({ fromStart: false });
      } catch (e) {
        console.log(e);
      }
    }

    if (playback.sound == null) setAudio();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout style={styles.container}>
        <Header />
        <AlbumArt />
        {!controller.loading ? (
          <View style={styles.footer}>
            <TrackDetails />

            <SeekBar
              trackLength={controller.trackLength}
              currentPosition={
                controller.seek.currentPosition
                  ? controller.seek.currentPosition
                  : 0
              }
              onSeek={onSeek}
              onSlidingStart={() => dispatch(playPauseMusic(false))}
            />
            <PlayBackControls
              onPressPlay={handlePlayPause}
              onPressPause={handlePlayPause}
              isPlaying={controller.isPlaying}
              handleNextTrack={handleNextTrack}
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
