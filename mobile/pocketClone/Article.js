import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import { ThemeProvider } from "react-native-elements";

export default class Article extends React.Component {
  constructor() {
    super();
  }
  render() {
    const { navigation } = this.props;
    const content = navigation.getParam("content");
    const title = navigation.getParam("title");
    const url = navigation.getParam("url");

    return (
      <ThemeProvider style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.url}>{url}</Text>
        <ScrollView>
          <Text style={styles.content}>{content}</Text>
        </ScrollView>
      </ThemeProvider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8FF",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    textAlign: "center",
    color: "black",
    fontSize: 13,
    fontWeight: "bold",
    paddingLeft: 9,
    paddingRight: 9,
    marginBottom: 15,
    marginTop: 20
  },
  content: {
    paddingLeft: 9,
    paddingRight: 9,
    marginTop: 20
  },
  url: {
    paddingLeft: 9,
    paddingRight: 9,
    color: "blue",
    marginBottom: 15
  }
});
