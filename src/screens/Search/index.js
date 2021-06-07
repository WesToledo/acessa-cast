import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import {
  Icon,
  Layout,
  Input,
  TopNavigation,
  Text,
} from "@ui-kitten/components";
import Constants from "expo-constants";

const SearchIcon = (props) => <Icon {...props} name="search-outline" />;

import { ListCards } from "./components/list.cards.components";

export const SearchScreen = ({ navigation }) => {
  const [value, setValue] = React.useState("");
  const [shouldRender, setShouldRender] = useState(false);
  const [shouldLoadSpinner, setShouldLoadSpinner] = useState(false);

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
    <SafeAreaView style={styles.safeArea}>
      <Layout style={{ flex: 1 }}>
        <TopNavigation title="" alignment="center" />

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
          {shouldRender ? (
            <Layout style={styles.podcasts_list}>
              {!shouldLoadSpinner ? (
                <ListCards podcasts={podcasts} />
              ) : (
                <View style={styles.spinner}>
                  <Spinner size="giant" />
                </View>
              )}
            </Layout>
          ) : undefined}
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    marginLeft: 15,
    fontWeight: "bold",
  },
  search_input: {
    margin: 15,
  },
});
