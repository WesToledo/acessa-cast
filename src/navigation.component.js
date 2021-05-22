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

import { HomeScreen } from "src/screens/Home";
import { SearchScreen } from "src/screens/Search/index";
import { DownloadsScreen } from "src/screens/Downloads";
import { ProfileScreen } from "screens/Profile/index";

const { Navigator, Screen } = createBottomTabNavigator();

const HomeIcon = (props) => <Icon {...props} name="home-outline" />;
const SearchIcon = (props) => <Icon {...props} name="search-outline" />;
const BulbIcon = (props) => <Icon {...props} name="bulb-outline" />;
const CloudIcon = (props) => <Icon {...props} name="cloud-download-outline" />;
const PersonIcon = (props) => <Icon {...props} name="person-outline" />;

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
    <BottomNavigationTab title="Home" icon={HomeIcon} />
    <BottomNavigationTab title="Buscar" icon={SearchIcon} />
    <BottomNavigationTab title="Criadores" icon={BulbIcon} />
    <BottomNavigationTab title="Downloads" icon={CloudIcon} />
    <BottomNavigationTab title="Perfil" icon={PersonIcon} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Buscar" component={SearchScreen} />
    <Screen name="Para Criadores" component={OrdersScreen} />
    <Screen name="Downloads" component={DownloadsScreen} />
    <Screen name="Perfil" component={ProfileScreen} />
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
