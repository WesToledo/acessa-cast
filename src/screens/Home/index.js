import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Icon,
  Spinner,
} from "@ui-kitten/components";

import { Section } from "./components/section.component";
import api from "src/services/api";
import { useNavigation } from "@react-navigation/core";

const PlaylistIcon = (props) => <Icon {...props} name="layers-outline" />;

export const HomeScreen = () => {
  const navigation = useNavigation();

  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function getAlbums() {
      try {
        const { data } = await api.get("/album/");
        console.log(data.albums);
        setAlbums(data.albums);
      } catch (err) {}
    }
    getAlbums();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout style={{ flex: 1 }}>
        <TopNavigation
          title="Acessa Cast"
          alignment="center"
          accessoryRight={() => (
            <TopNavigationAction
              icon={PlaylistIcon}
              onPress={() => navigation.navigate("Playlist")}
            />
          )}
        />
        <ScrollView style={{ marginBottom: 70 }}>
          {albums.length != 0 ? (
            <Section title="Albuns" albums={albums} />
          ) : (
            <Layout style={styles.spinner}>
              <Spinner size="giant" />
            </Layout>
          )}

          {/* <Section title="Novos Podcasts" podcasts={[1, 2, 3, 4, 5, 6]} />

          <Section title="Top Podcasts" podcasts={[1, 2, 3, 4, 5, 6]} /> */}
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  spinner: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
