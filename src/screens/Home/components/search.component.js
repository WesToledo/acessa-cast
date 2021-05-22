import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Icon, Text, Input } from "@ui-kitten/components";

const SearchIcon = (props) => <Icon {...props} name="search-outline" />;

export const SearchSection = ({ navigation }) => {
  const [value, setValue] = React.useState("");

  return (
    <View style={styles.search_container}>
      <Input
        value={value}
        label=""
        placeholder="Procure um podcast"
        accessoryLeft={SearchIcon}
        onChangeText={(nextValue) => setValue(nextValue)}
      />
    </View>
  );
};

const styles = StyleSheet.create({ search_container: { marginHorizontal: 15 } });
