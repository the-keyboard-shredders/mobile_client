import React from "react";
import { StyleSheet, View, Text } from "react-native";
import AppNavigator from "./AppNavigator";
import { Provider } from "react-redux";
import store from "./store/reducer";
import ArticlesList from "./ArticlesList";
import Test from "./Test";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ArticlesList />
      </Provider>
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
