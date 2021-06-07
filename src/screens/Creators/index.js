import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/core";
import {
  Icon,
  Spinner,
  Layout,
  Input,
  TopNavigation,
  Text,
  TopNavigationAction,
} from "@ui-kitten/components";
import Constants from "expo-constants";

import api from "src/services/api";

import { MyPocasts } from "./components/my.podcasts";

const NewIcon = (props) => <Icon {...props} name="plus-outline" />;

export function CreatorsScreen({ route }) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [albums, setAlbums] = useState([]);

  async function getAlbums() {
    try {
      const { data } = await api.get("/album/");
      setAlbums(data.albums);
    } catch (err) {
      console.log("erro", err);
    }
  }
  useEffect(() => {
    getAlbums();
  }, []);

  useEffect(() => {
    if (isFocused && route.params) {
      getAlbums();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout style={{ flex: 1 }}>
        <TopNavigation
          title="Acessa Cast"
          alignment="center"
          accessoryRight={() => (
            <TopNavigationAction
              icon={NewIcon}
              onPress={() => navigation.navigate("NewAlbum")}
            />
          )}
        />

        <Text category="h4" style={styles.title}>
          Meus podcasts
        </Text>

        <ScrollView>
          {albums.length != 0 ? (
            <MyPocasts albums={albums} />
          ) : (
            <Layout style={styles.spinner}>
              <Spinner size="giant" />
            </Layout>
          )}
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    marginLeft: 15,
    fontWeight: "bold",
  },
});
