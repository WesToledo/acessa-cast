import React from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  View,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Layout, Text, Button, Icon, Divider } from "@ui-kitten/components";
import Constants from "expo-constants";

var width = Dimensions.get("window").width;

import img from "../../../assets/thumb.jpg";

const EditIcon = (props) => <Icon {...props} name="edit-outline" />;
const TrashIcon = (props) => <Icon {...props} name="trash-outline" />;

export const MyPocasts = ({ albums }) => {
  const navigation = useNavigation();
  return (
    <Layout style={styles.container}>
      <ScrollView style={{ marginBottom: 70 }}>
        {albums.map(
          (
            { _id, title, description, author, image_source, podcasts },
            index
          ) => (
            <View key={_id}>
              <View style={styles.content}>
                <View style={styles.image_container}>
                  <Image
                    source={{
                      uri:
                        Constants.manifest.extra.SERVER_URL +
                        "/ftp/" +
                        image_source,
                    }}
                    style={styles.thumb}
                  />
                </View>
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
                  </View>
                  <View style={styles.buttons}>
                    <Button
                      style={styles.button}
                      status="primary"
                      size="small"
                      appearance="ghost"
                      accessoryLeft={EditIcon}
                    />
                    <Button
                      style={styles.button}
                      status="primary"
                      size="small"
                      appearance="ghost"
                      accessoryLeft={TrashIcon}
                    />
                  </View>
                </View>
              </View>

              <Divider />
            </View>
          )
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
    width: "50%",
  },
  title_container: {
    maxHeight: 50,
  },
  subtitle_container: {
    maxHeight: 70,
    height: "100%",
    flexDirection: "row",
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
    width: width - 120 - (15 * 2 + 20) - 50,
  },
  buttons: {
    justifyContent: "space-around",
    alignItems: "center",
  },
});
