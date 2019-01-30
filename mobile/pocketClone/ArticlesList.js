import React from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { Button, ThemeProvider } from "react-native-elements";

export default class ArticlesList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ThemeProvider>
        <Button
          title="Go Home"
          onPress={() =>
            this.props.navigation.navigate("Home", {
              data: "test dummy",
              other: "this data here.....yes"
            })
          }
        />
        <Text>In Articles List</Text>
      </ThemeProvider>
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
