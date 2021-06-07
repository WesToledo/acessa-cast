import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Platform,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import { Button, Icon, Spinner, Text, Input } from "@ui-kitten/components";
import Constants from "expo-constants";

import api from "src/services/api";

import * as ImagePicker from "expo-image-picker";

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" status="basic" />
  </View>
);

export default function Form({ form, setForm, onSubmit }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setForm({ ...form, image: result.uri });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text category="s2" style={{ color: "#8f9bb3" }}>
        Escolha a thumbnail do podcast:
      </Text>
      <View style={styles.image_container}>
        {form.image ? (
          <Image
            source={{ uri: form.image }}
            style={{ width: 200, height: 200 }}
          />
        ) : (
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={pickImage}
          >
            <View style={styles.image_upload}>
              <Icon
                style={styles.icon}
                fill="#8F9BB3"
                name="cloud-upload-outline"
              />
            </View>
          </TouchableHighlight>
        )}
      </View>
      <Input
        placeholder="Place your Text"
        style={styles.input}
        label="Título"
        placeholder="Escreva o título do podcast"
        value={form.title}
        onChangeText={(nextValue) => setForm({ ...form, title: nextValue })}
      />
      <Input
        style={styles.input}
        label="Descrição"
        multiline={true}
        textStyle={{ minHeight: 64 }}
        placeholder="Escreva o descrição do podcast"
        value={form.description}
        onChangeText={(nextValue) =>
          setForm({ ...form, description: nextValue })
        }
      />
      {!loading ? (
        <Button
          style={styles.button}
          onPress={() => {
            setLoading(true);
            onSubmit();
          }}
        >
          Criar Álbum
        </Button>
      ) : (
        <Button style={styles.button} accessoryLeft={LoadingIndicator} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  image_container: {
    marginTop: 15,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image_upload: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginVertical: 5,
  },
  icon: {
    width: 100,
    height: 100,
  },
  button: {
    marginVertical: 5,
  },
});
