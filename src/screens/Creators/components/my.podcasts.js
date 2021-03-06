import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  View,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import {
  Layout,
  Text,
  Button,
  Icon,
  Divider,
  Toggle,
} from "@ui-kitten/components";
import Constants from "expo-constants";

var width = Dimensions.get("window").width;

import api from "src/services/api";

const EditIcon = (props) => <Icon {...props} name="edit-outline" />;
const TrashIcon = (props) => <Icon {...props} name="trash-outline" />;
const PodcastIcon = (props) => <Icon {...props} name="headphones-outline" />;

export const MyPodcasts = ({ albums, getAlbums }) => {
  const navigation = useNavigation();

  async function onChangeToggle(_id, publish) {
    try {
      await api.put("/album/publish/" + _id, { publish: !publish });
      getAlbums();
    } catch (err) {
      console.log("erro", err);
    }
  }

  return (
    <Layout style={styles.container}>
      <ScrollView style={{ marginBottom: 70 }}>
        {albums.map(
          ({
            _id,
            title,
            description,
            author,
            image_source,
            key,
            knowledge_area,
            podcasts,
            publish: podcastPublishState,
          }) => {
            const [publish, setPublish] = useState(podcastPublishState);
            return (
              <View key={_id}>
                <View style={styles.content}>
                  <TouchableHighlight
                    style={styles.image_container}
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    onPress={() => {
                      navigation.navigate("AlbumPodcastEdit", {
                        _id,
                        title,
                        description,
                        author,
                        image_source,
                        podcasts,
                        knowledge_area,
                        key,
                      });
                    }}
                  >
                    <Image
                      source={{
                        uri: image_source,
                      }}
                      style={styles.thumb}
                    />
                  </TouchableHighlight>
                  <View style={styles.right}>
                    <View style={styles.info}>
                      <View style={styles.title_container}>
                        <Text
                          numberOfLines={3}
                          style={styles.title_text}
                          category="s1"
                        >
                          {title}
                        </Text>
                      </View>
                      <View style={styles.subtitle_container}>
                        <Text
                          numberOfLines={2}
                          style={styles.subtitle_text}
                          category="s1"
                          appearance="hint"
                        >
                          {description}
                        </Text>
                      </View>
                      <View style={styles.podcast_container}>
                        <PodcastIcon
                          style={{ width: 20, height: 20, marginRight: 5 }}
                          fill="#8f9bb3"
                        />
                        <Text numberOfLines={1} category="s1" appearance="hint">
                          {podcasts.length} podcasts
                        </Text>
                      </View>
                    </View>
                    <View style={styles.buttons}>
                      {/* <Button
                      style={styles.button}
                      status="primary"
                      size="small"
                      appearance="ghost"
                      accessoryLeft={EditIcon}
                      onPress={() => {
                        navigation.navigate("EditAlbum", {
                          _id,
                          title,
                          description,
                          author,
                          image_source,
                          key,
                          knowledge_area,
                        });
                      }}
                    /> */}
                      <Toggle
                        checked={publish}
                        status="primary"
                        onChange={() => {
                          setPublish(!publish);
                          onChangeToggle(_id, publish);
                        }}
                      />
                      <Text appearance="default" style={{ margin: 2 }}>
                        Publicado
                      </Text>
                      {/* <Button
                      style={styles.button}
                      status="primary"
                      size="small"
                      appearance="ghost"
                      accessoryLeft={TrashIcon}
                    /> */}
                    </View>
                  </View>
                </View>

                <Divider />
              </View>
            );
          }
        )}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    height: "auto",
  },
  content: {
    flexDirection: "row",
    marginVertical: 5,
    height: 120,
  },
  right: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  info: {
    width: "45%",
  },
  title_container: {
    maxHeight: 50,
  },
  subtitle_container: {
    maxHeight: 70,
    height: "100%",
    flexDirection: "row",
    width: "90%",
  },
  podcast_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  button_container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image_container: {
    width: 120,
    height: 120,
    marginRight: 10,
  },
  thumb: {
    height: 120,
  },
  title_text: {
    width: width - 120 - (15 * 2 + 20),
    maxHeight: 50,
    margin: 5,
    fontWeight: "700",
  },
  subtitle_text: {
    marginTop: 5,
    marginLeft: 5,
    fontWeight: "700",
    // width: width - 120 - (15 * 2 + 20) - 50,
    width: "100%",
  },
  buttons: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});
