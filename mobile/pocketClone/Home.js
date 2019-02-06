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
      <ThemeProvider style={styles.container}>
        <Text style={styles.title}>Titles List</Text>
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
                  this.state.article.map((l) => (
                    <ListItem
                      key={l.id}
                      title={l.title}
                      style={styles.list}
                      onPress={() =>
                        this.props.navigation.navigate("Article", {
                          content: l.content,
                          title: l.title,
                          url: l.url
                        })
                      }
                    />
                  ))
                )}
              </ScrollView>
            </View>
          </ScrollView>
        )}
        <Button
          title="Logout"
          type="outline"
          style={styles.button}
          containerStyle={{ borderColor: "black" }}
          wrapperStyle={{ borderColor: "black" }}
          onPress={() => {
            signOut();
            this.props.navigation.navigate("Login");
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
    color: "#191970",
    fontSize: 20,
    fontWeight: "bold",
    padding: 2,
    marginBottom: 15,
    marginTop: 20
  },
  button: {
    paddingBottom: 20
  },
  list: {
    paddingLeft: 5,
    paddingRight: 5
  }
});
