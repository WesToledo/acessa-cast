import React from "react";
import { Dimensions, StyleSheet, ScrollView, View } from "react-native";
import { Icon, Text, Layout, Divider, Button } from "@ui-kitten/components";

var width = Dimensions.get("window").width;

import { Card } from "./card.component";

const NewIcon = (props) => <Icon {...props} name="plus-outline" />;

export const AlbumPodcastList = ({ podcasts }) => {
  return (
    <Layout style={styles.container}>
      <Layout style={styles.title_container}>
        <>
          <Text style={styles.title} category="h4">
            Todos os episódios
          </Text>
        </>
        <Button
          style={styles.button}
          status="primary"
          size="small"
          accessoryLeft={NewIcon}
        />
      </Layout>
      {podcasts.length > 0 ? (
        <ScrollView style={styles.card_container}>
          {podcasts.map((podcast, index) => (
            <View key={index}>
              <Card
                title={podcast.title}
                description={podcast.description}
                imageSource={podcast.image_source}
                podcast={podcast}
              />
              <Divider />
            </View>
          ))}

          <Layout style={{ height: 55 }} />
        </ScrollView>
      ) : (
        <Layout style={{ marginTop: 10 }}>
          <Text appearance="hint">Este álbum ainda não tem podcasts</Text>
        </Layout>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    margin: 15,
  },
  title_container: {
    width: width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  title: {
    fontWeight: "bold",
  },
  card_container: {
    flex: 1,
    marginTop: 10,
  },
  button: {
    height: 50,
    borderRadius: 100,
    marginRight: 40,
  },
});
