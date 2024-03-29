import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Platform,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import {
  Button,
  Icon,
  Spinner,
  Text,
  Input,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "react-native-progress/Bar";
import MultiSelect from "react-native-multiple-select";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

import api from "src/services/api";

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" status="basic" />
  </View>
);

export default function Form({
  form,
  setForm,
  onSubmit,
  submitText = "Criar Podcast",
}) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0.0);
  const [areas, setAreas] = useState([]);

  const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
  const BackAction = () => {
    const navigation = useNavigation();
    return (
      <TopNavigationAction
        icon={BackIcon}
        onPress={() => !loading && navigation.goBack()}
      />
    );
  };

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

    async function getAreas() {
      try {
        const { data } = await api.get("/tag/");
        setAreas(data.tag);
      } catch (err) {
        console.log("erro", err);
      }
    }

    getAreas();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setForm({ ...form, image: result.uri, imageChange: true });
    }
  };

  const pickDocument = async () => {
    let options = {
      type: "audio/mpeg",
    };
    let result = await DocumentPicker.getDocumentAsync(options);
    if (result.type == "success") {
      setForm({ ...form, audio: result, audioChange: true });
    }
  };

  function onUploadProgress(e) {
    const progress = (e.loaded * 100) / e.total / 100;
    setProgress(progress);
  }

  const onSelectedItemsChange = (selectedItems) => {
    console.log(selectedItems);
    setForm({ ...form, selectedItems });
  };

  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigation
        accessoryLeft={BackAction}
        title="Criar novo podcast"
        alignment="center"
      />
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <ScrollView>
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

          <Text
            category="s2"
            style={{ color: "#8f9bb3", marginTop: 5, marginBottom: 10 }}
          >
            Selecione o áudio do podcast
          </Text>
          <Button status="primary" size="medium" onPress={pickDocument}>
            {form.audio ? (
              <Text category="s1">{form.audio.name}</Text>
            ) : (
              <Text category="s1">Selecione</Text>
            )}
          </Button>

          <Text
            category="s2"
            style={{ color: "#8f9bb3", marginTop: 5, marginBottom: 10 }}
          >
            Escolha a área do conhecimento do album:
          </Text>
          {areas.length > 0 ? (
            <MultiSelect
              items={areas}
              hideSubmitButton
              uniqueKey="_id"
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={form.selectedItems}
              selectText="Escolha as tags"
              searchInputPlaceholderText="Procure Tags..."
              onChangeInput={(text) => console.log(text)}
              tagRemoveIconColor="#ff3561"
              tagBorderColor="#111527"
              tagTextColor="#8f9bb3"
              selectedItemTextColor="#8f9bb3"
              selectedItemIconColor="#8f9bb3"
              itemTextColor="#8f9bb3"
              displayKey="name"
              selectedItemIconColor="green"
              searchInputStyle={{ color: "#8f9bb3" }}
              textColor="#8f9bb3"
              submitButtonColor="#8f9bb3"
              submitButtonText="Selecionar estes"
              styleMainWrapper={{ backgroundColor: "transparent" }}
              styleDropdownMenu={{ backgroundColor: "transparent" }}
              styleDropdownMenuSubsection={{
                backgroundColor: "#1a2138",
                paddingLeft: 20,
                borderRadius: 5,
                borderColor: "#111527",
                borderWidth: 1,
              }}
              styleInputGroup={{
                backgroundColor: "#1a2138",
                paddingVertical: 10,
              }}
              // styleItemsContainer={{ backgroundColor: "red" }}
              styleRowList={{
                backgroundColor: "#1a2138",
                borderWidth: 1,
                padding: 5,
                borderColor: "#111527",
              }}
            />
          ) : (
            <Layout style={styles.spinner}>
              <Spinner size="giant" />
            </Layout>
          )}

          {!loading ? (
            <Button
              style={styles.button}
              onPress={() => {
                setLoading(true);
                onSubmit(onUploadProgress);
              }}
              disabled={
                form.selectedItems.length === 0 ||
                form.image === null ||
                form.audio === null ||
                form.title == undefined ||
                form.description == undefined
              }
            >
              {submitText}
            </Button>
          ) : (
            <>
              <Button style={styles.button} accessoryLeft={LoadingIndicator} />
              <ProgressBar progress={progress} width={null} color="#02c497" />
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
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
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
