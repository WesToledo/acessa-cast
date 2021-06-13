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

const EditIcon = (props) => <Icon {...props} name="edit-outline" />;
const TrashIcon = (props) => <Icon {...props} name="trash-outline" />;

export const AlbumPodcastEditScreen = ({ route, navigation }) => {
  const {
    _id,
    title,
    description,
    author,
    image_source,
    podcasts,
    knowledge_area,
    key,
  } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopNavigation
        title={"Editar Álbum"}
        alignment="center"
        accessoryLeft={BackAction}
        accessoryRight={() => (
          <Layout style={{ flexDirection: "row", justifyContent: "center" }}>
            <TopNavigationAction
              icon={EditIcon}
              onPress={() =>
                navigation.navigate("EditAlbum", {
                  _id,
                  title,
                  description,
                  author,
                  image_source,
                  key,
                  knowledge_area,
                })
              }
            />
            <TopNavigationAction
              icon={TrashIcon}
              onPress={() =>
                navigation.navigate("DeleteAlbum", {
                  _id,
                })
              }
            />
          </Layout>
        )}
      />
      <Layout style={{ flex: 1 }}>
        <AlbumDetails
          title={title}
          description={description}
          author={author}
          imageSource={image_source}
        />
        <AlbumPodcastList podcasts={podcasts} albumId={_id} />
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
