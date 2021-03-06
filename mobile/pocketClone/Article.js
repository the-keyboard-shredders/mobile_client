import React from "react";
import { StyleSheet, Text, ScrollView, Linking } from "react-native";
import { ThemeProvider, Button } from "react-native-elements";
import { deleteArticle } from "./store/asyncStorageActions";

export default class Article extends React.Component {
  constructor() {
    super();
  }
  render() {
    const { navigation } = this.props;
    const content = navigation.getParam("content");
    const title = navigation.getParam("title");
    const url = navigation.getParam("url");
    const id = navigation.getParam("id");

    return (
      <ThemeProvider style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text
          style={styles.url}
          onPress={() => {
            Linking.openURL(url);
          }}
        >
          {url}
        </Text>
        <ScrollView>
          <Text style={styles.content}>{content}</Text>
        </ScrollView>
        <Button
          title="Delete"
          type="outline"
          style={styles.button}
          containerStyle={{ borderColor: "black" }}
          wrapperStyle={{ borderColor: "black" }}
          onPress={() => {
            deleteArticle(id);
            this.props.navigation.navigate("Home");
          }}
        />
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
  },
  button: {
    paddingBottom: 20
  }
});
