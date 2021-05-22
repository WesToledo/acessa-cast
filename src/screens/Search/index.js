import React from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { Icon, Layout, Input, TopNavigation } from "@ui-kitten/components";

const SearchIcon = (props) => <Icon {...props} name="search-outline" />;

import { Card } from "./components/card.components";

export const SearchScreen = ({ navigation }) => {
  const [value, setValue] = React.useState("");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="MyApp" alignment="center" />
      <ScrollView>
        <Layout style={{ flex: 1 }}>
          <Input
            value={value}
            label=""
            placeholder="Procure um podcast"
            accessoryLeft={SearchIcon}
            onChangeText={(nextValue) => setValue(nextValue)}
            style={styles.search_input}
          />
        </Layout>

        <Layout style={styles.podcasts_list}>
          <Card />
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  search_input: {
    margin: 15,
  },
});
