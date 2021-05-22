import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Text,
  Icon,
} from "@ui-kitten/components";

import { HomeScreen } from "src/screens/Home/index";
import { SearchScreen } from "src/screens/Search/index";

const { Navigator, Screen } = createBottomTabNavigator();

const PersonIcon = (props) => <Icon {...props} name="person-outline" />;
const SearchIcon = (props) => <Icon {...props} name="search-outline" />;
const BulbIcon = (props) => <Icon {...props} name="bulb-outline" />;
const CloudIcon = (props) => <Icon {...props} name="cloud-download-outline" />;

const UsersScreen = () => (
  <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text category="h1">USERS</Text>
  </Layout>
);

const OrdersScreen = () => (
  <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text category="h1">ORDERS</Text>
  </Layout>
);

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="Home" icon={PersonIcon} />
    <BottomNavigationTab title="Buscar" icon={SearchIcon} />
    <BottomNavigationTab title="Para Criadores" icon={BulbIcon} />
    <BottomNavigationTab title="Biblioteca" icon={CloudIcon} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Buscar" component={SearchScreen} />
    <Screen name="Para Criadores" component={OrdersScreen} />
    <Screen name="Biblioteca" component={UsersScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 8,
  },
});
