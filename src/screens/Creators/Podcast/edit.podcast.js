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

import api from "src/services/api";
import { useNavigation } from "@react-navigation/core";

import Form from "./form.edit.component";
import { useSelector } from "react-redux";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const BackAction = () => {
  const navigation = useNavigation();
  return (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );
};

export function EditPodcastScreen({ route }) {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);

  const {
    _id,
    title,
    description,
    audio_source,
    audio_key,
    image_key,
    tag,
    image_source,
    podcast,
    publish,
  } = route.params.podcast;

  const [form, setForm] = useState({
    authorId: user._id,
    _id,
    title,
    description,
    audio_source,
    audioChange: false,
    audio_key,
    image_key,
    image_source,
    imageChange: false,
    podcast,
    publish,
    selectedItems: tag,
  });

  async function onSubmit(onUploadProgress) {
    var formData = new FormData();
    var {
      _id,
      title,
      description,
      authorId,
      image_source,
      selectedItems,
      audio_source,
      audioChange,
      imageChange,
      audio_key,
      image_key,
    } = form;

    formData.append("_id", _id);
    formData.append("author", authorId);
    formData.append("title", title);
    formData.append("description", description);

    formData.append("image_source", image_source);
    formData.append("audio_source", audio_source);

    formData.append("audio_key", audio_key);
    formData.append("image_key", image_key);

    formData.append("audioChange", audioChange);
    formData.append("imageChange", imageChange);

    formData.append("tags", JSON.stringify(selectedItems));

    if (imageChange) {
      formData.append("thumb", {
        uri: image_source,
        name: `${title}`,
        type: `image/${image_source.substring(
          image_source.lastIndexOf(".") + 1
        )}`,
      });
    }
    if (audioChange) {
      formData.append("audio", {
        uri: audio_source.uri,
        name: `${"audio" + title}`,
        type: `audio/mpeg`,
      });
    }

    try {
      await api.put("/upload/podcast/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e) => onUploadProgress(e),
      });
      navigation.navigate("Creators", {
        shouldRefresh: true,
      });
    } catch (err) {
      console.warn(err);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout style={{ flex: 1 }}>
        <TopNavigation
          accessoryLeft={BackAction}
          title="Editar podcast"
          alignment="center"
        />
        <Form form={form} setForm={setForm} onSubmit={onSubmit} />
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});
