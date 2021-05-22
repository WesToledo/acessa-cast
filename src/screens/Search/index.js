import React from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import {
  Icon,
  Layout,
  Input,
  TopNavigation,
  Text,
} from "@ui-kitten/components";

const SearchIcon = (props) => <Icon {...props} name="search-outline" />;

import { ListCards } from "./components/list.cards.components";

export const SearchScreen = ({ navigation }) => {
  const [value, setValue] = React.useState("");

  var podcasts = [
    { name: "NerdCast", description: "asd" },
    { name: "NerdCast", description: "asd" },
    { name: "NerdCast", description: "asd" },
    { name: "NerdCast", description: "asd" },
    { name: "NerdCast", description: "asd" },
    { name: "NerdCast", description: "asd" },
    { name: "NerdCast", description: "asd" },
    { name: "NerdCast", description: "asd" },
    { name: "NerdCast", description: "asd" },
    { name: "NerdCast", description: "asd" },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1 }}>
        <TopNavigation title="MyApp" alignment="center" />

        <ScrollView>
          <Text category="h4" style={styles.title}>
            Buscar
          </Text>
          <Layout style={{ flex: 1 }}>
            <Input
              value={value}
              label=""
              placeholder="Procure por um podcast"
              accessoryLeft={SearchIcon}
              onChangeText={(nextValue) => setValue(nextValue)}
              style={styles.search_input}
            />
          </Layout>

          <Layout style={styles.podcasts_list}>
            <ListCards podcasts={podcasts} />
          </Layout>
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingTop: 15,
    marginLeft: 15,
    fontWeight: "bold",
  },
  search_input: {
    margin: 15,
  },
});
