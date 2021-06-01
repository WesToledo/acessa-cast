import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  Spinner,
} from "@ui-kitten/components";

import { Section } from "./components/section.component";
import api from "src/services/api";

export const HomeScreen = ({ navigation }) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function getAlbums() {
      try {
        const { data } = await api.get("/album/");
        setAlbums(data.albums);
        console.log(data);
      } catch (err) {}
    }
    getAlbums();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1 }}>
        {/* Se trackplayer estiver aberto, dar espaçamento de 70  */}
        <ScrollView style={{ marginBottom: 70 }}>
          <TopNavigation title="MyApp" alignment="center" />
          {albums.length != 0 ? (
            <Section
              title="Albuns"
              albums={albums}
            />
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
  spinner: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
