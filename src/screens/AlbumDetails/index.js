import React from "react";
import { SafeAreaView, StyleSheet, Dimensions } from "react-native";
import {
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
  Layout,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";

import { AlbumDetails } from "./components/album.details.component";
import { AlbumPodcastList } from "./components/podcast.list.component";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const BackAction = () => {
  const navigation = useNavigation();
  return (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );
};

var podcasts = [
  { name: "NerdCast", description: "asd" },
  { name: "NerdCast", description: "asd" },
  { name: "NerdCast", description: "asd" },
  { name: "NerdCast", description: "asd" },
  { name: "NerdCast", description: "asd" },
  { name: "NerdCast", description: "asd" },
  { name: "NerdCast", description: "asd" },
  { name: "NerdCast", description: "asd" },
  { name: "NerdCast", description: "asd" },
  { name: "NerdCast", description: "asd" },
];

export const AlbumDetailsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <TopNavigation
        accessoryLeft={BackAction}
        title="Nerdcasts"
        alignment="center"
      />
      <Layout style={{ flex: 1 }}>
        <AlbumDetails />
        <AlbumPodcastList podcasts={podcasts} />
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});
