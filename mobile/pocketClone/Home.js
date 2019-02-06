import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl
} from "react-native";
import { ThemeProvider, ListItem, Button } from "react-native-elements";
import {
  grabFromCloudToStorage,
  getAllData,
  signOut
} from "./store/asyncStorageActions";

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      article: [],
      error: false,
      refreshing: false
    };
    this.loadArticles = this.loadArticles.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.loadArticles(this.props.navigation.getParam("googleId"));
    this.setState({ refreshing: false });
  };

  async loadArticles(googleId) {
    let article;
    try {
      article = await grabFromCloudToStorage(googleId);
      article = article.data.userArticles;
      this.setState({ article });
    } catch (err) {
      try {
        article = await getAllData(googleId);
        if (article) {
          article = JSON.parse(article).data.userArticles;
        }
        this.setState({ article });
      } catch (err) {
        this.setState({ error: true });
        console.log(err);
      }
    }
  }

  async componentDidMount() {
    await this.loadArticles(this.props.navigation.getParam("googleId"));
  }

  render() {
    return (
      <ThemeProvider>
        <Button
          title="Logout"
          onPress={() => {
            signOut();
            this.props.navigation.navigate("Login");
          }}
        />
        <Text>Titles List</Text>
        {this.state.error ? (
          <Text>You have no articles!</Text>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            <View>
              <ScrollView scrollEventThrottle={16}>
                {!this.state.article ? (
                  <Text> Loading ..... </Text>
                ) : (
                  this.state.article.map((l, i) => (
                    <ListItem
                      key={i}
                      title={l.title}
                      onPress={() =>
                        this.props.navigation.navigate("Article", {
                          content: l.content,
                          title: l.title
                        })
                      }
                    />
                  ))
                )}
              </ScrollView>
            </View>
          </ScrollView>
        )}
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
