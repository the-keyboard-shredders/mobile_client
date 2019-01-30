import React from "react";
import { StyleSheet, Text, View, Button, AsyncStorage } from "react-native";

import grabFromCloudToStorage from "./store/asyncStorageActions";

export default class ArticlesList extends React.Component {
  render() {
    return (
      <View>
        <Text>Nothing else will appear</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
