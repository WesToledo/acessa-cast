import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Text,
  Icon,
} from "@ui-kitten/components";

import { SignInScreen } from "src/screens/SignIn";
import { SignUpScreen } from "src/screens/SignUp";

import { HomeScreen } from "screens/Home";
import { SearchScreen } from "screens/Search";
import { DownloadsScreen } from "screens/Downloads";
import { ProfileScreen } from "screens/Profile";
import { TrackDetailsScreen } from "src/screens/Details";
import { TrackPlayer } from "src/screens/TrackBottomPlayer/index";
import { AlbumDetailsScreen } from "screens/AlbumDetails";

const { Navigator, Screen } = createBottomTabNavigator();
const RootStack = createStackNavigator();

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
  <>
    <TrackPlayer />
    <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Search" component={SearchScreen} />
      <Screen name="Creators" component={OrdersScreen} />
      <Screen name="Downloads" component={DownloadsScreen} />
      <Screen name="Profile" component={ProfileScreen} />
      <Screen name="AlbumDetails" component={AlbumDetailsScreen} />
      {/* <Screen name="Orders" component={OrdersScreen} /> */}
    </Navigator>
  </>
);

function RootStackScreen() {
  return (
    <RootStack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen
        name="Main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />

      <RootStack.Screen
        name="Details"
        component={TrackDetailsScreen}
        screenOptions={{
          headerShown: false,
        }}
      />

      {/* AlbumDetails */}
    </RootStack.Navigator>
  );
}

export const AppNavigator = () => (
  <NavigationContainer>
    <RootStack.Navigator>
      <RootStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: "" }}
      />
    </RootStack.Navigator>

    {/* <RootStackScreen /> */}
  </NavigationContainer>
);
