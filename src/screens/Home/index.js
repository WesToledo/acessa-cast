import React from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { Button, Divider, Layout, TopNavigation } from "@ui-kitten/components";

import { Section } from "./components/section.component";

export const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1 }}>
        <ScrollView>
          <TopNavigation title="MyApp" alignment="center" />

          <Section title="Top Podcasts" podcasts={[1, 2, 3, 4, 5, 6]} />

          <Section title="Novos Podcasts" podcasts={[1, 2, 3, 4, 5, 6]} />

          <Section title="Top Podcasts" podcasts={[1, 2, 3, 4, 5, 6]} />
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
