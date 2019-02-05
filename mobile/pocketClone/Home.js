import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { ThemeProvider, ListItem } from "react-native-elements";
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
    const googleId = this.props.navigation.getParam("googleId");
    await grabFromCloudToStorage(googleId);
    const response = await getAllData();
    const articles = JSON.parse(response).data.userArticles;
    this.setState({ articles });
  }

  render() {
    return (
      <ThemeProvider>
        <Text>Titles List</Text>
        <ScrollView>
          <View>
            {!this.state.articles ? (
              <Text> Loading ..... </Text>
            ) : (
              this.state.articles.map((l, i) => (
                <ListItem
                  key={i}
                  title={l.title}
                  onPress={() =>
                    this.props.navigation.navigate("ArticlesList", {
                      content: l.content,
                      title: l.title
                    })
                  }
                />
              ))
            )}
          </View>
        </ScrollView>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  subtitleView: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 5
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
