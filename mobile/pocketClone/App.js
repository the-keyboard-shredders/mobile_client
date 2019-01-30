import React from "react";
import { StyleSheet, View, Text, AsyncStorage } from "react-native";
import AppNavigator from "./AppNavigator";

import ArticlesList from "./ArticlesList";

import {
  grabFromCloudToStorage,
  getAllData
} from "./store/asyncStorageActions";

export default class App extends React.Component {
  async componentDidMount() {
    await grabFromCloudToStorage("usersArticles");
    let articles = await getAllData("usersArticles");
    console.log("--------our articles are here---------", articles);
    console.log("-----------------end articles-----------------");
  }
  render() {
    return <ArticlesList />;
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
