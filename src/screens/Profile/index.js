import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  View,
} from "react-native";
import {
  Text,
  Layout,
  TopNavigation,
  Divider,
  Icon,
  Button,
} from "@ui-kitten/components";

const SettingsIcon = (props) => <Icon {...props} name="settings-2" />;
const LogOutIcon = (props) => <Icon {...props} name="log-out" />;

export const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1 }}>
        <TopNavigation title="Perfil" alignment="center" />
        <Text category="h4" style={styles.title}>
          Wesley Toledo
        </Text>
        <Text category="s1" appearance="hint" style={styles.subtitle}>
          wesley@mail.com
        </Text>
        <Divider />
        <Layout style={styles.list_container}>
          <Button
            status="primary"
            appearance="ghost"
            accessoryLeft={SettingsIcon}
            size="large"
            style={styles.button}
          >
            Configurações
          </Button>
          <Button
            status="primary"
            appearance="ghost"
            accessoryLeft={LogOutIcon}
            size="large"
            style={styles.button}
          >
            Sair
          </Button>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingTop: 15,
    paddingLeft: 15,
    fontWeight: "bold",
  },
  subtitle: {
    paddingLeft: 15,
    fontWeight: "bold",
    paddingBottom: 15,
  },
  button: { width: "100%", justifyContent: "flex-start" },
  list_container: {
    marginHorizontal: 15,
    flexDirection: "column",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  list_text: {
    fontWeight: "700",
  },
});
