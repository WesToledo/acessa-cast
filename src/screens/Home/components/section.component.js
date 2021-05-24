import React from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  View,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Layout, Text } from "@ui-kitten/components";

import img from "../../../assets/thumb.jpg";

export const Section = ({ title, podcasts }) => {
  const navigation = useNavigation();
  return (
    <Layout style={styles.container}>
      <Text category="h4" style={styles.title}>
        {title}
      </Text>

      <ScrollView horizontal={true} style={styles.cards}>
        {podcasts.map((podcast, index) => (
          <View key={index}>
            <TouchableHighlight
              key={index}
              style={{ width: 120, marginRight: 10 }}
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              onPress={() => navigation.navigate("AlbumDetails")}
            >
              <Image source={img} style={styles.thumb} />
            </TouchableHighlight>
            <Text numberOfLines={2} style={styles.thumb_text} category="s2">
              NerdCast #200 - Agora já é tarde asdasd
            </Text>
          </View>
        ))}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    height: "auto",
    paddingVertical: 10,
  },
  title: {
    paddingTop: 15,
    fontWeight: "bold",
  },
  cards: {
    marginTop: 5,
  },
  thumb: {
    width: 120,
    height: 120,
    marginRight: 10,
  },
  thumb_text: {
    width: 120,
    fontWeight: "700",
  },
});
