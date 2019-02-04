import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import { Button, ThemeProvider } from "react-native-elements";

export default class ArticlesList extends React.Component {
  constructor() {
    super();
  }
  render() {
    const { navigation } = this.props;
    const content = navigation.getParam("content", "Content belongs here");
    const title = navigation.getParam("title", "title belongs here");

    return (
      <ThemeProvider>
        <Button
          title="Go Home"
          onPress={() => this.props.navigation.navigate("Home")}
        />
        <Text>{title}</Text>
        <ScrollView>
          <Text>{content}</Text>
        </ScrollView>
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
