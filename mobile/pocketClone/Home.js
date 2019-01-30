import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, ThemeProvider } from "react-native-elements";
import {
  grabFromCloudToStorage,
  getAllData
} from "./store/asyncStorageActions";

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    await grabFromCloudToStorage("usersArticles");
    let data = await getAllData("usersArticles");
    let titles = data.data.articles;
    this.setState(titles);
  }

  render() {
    const { navigation } = this.props;
    const data = navigation.getParam("data", "NO-ID");
    const other = navigation.getParam("other", "some default value");

    return (
      <ThemeProvider>
        <Button
          title="Go to Articles"
          onPress={() => this.props.navigation.navigate("ArticlesList")}
        />

        <Text>Titles List</Text>

        <Text>data: {JSON.stringify(data)}</Text>
        <Text>other: {JSON.stringify(other)}</Text>

        <Text> In home screen </Text>
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
