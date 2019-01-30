import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Button, ThemeProvider, ListItem } from "react-native-elements";
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
    let articleData = data.data.articles;

    this.setState({ articleData });
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
        <ScrollView>
          <View>
            {!this.state.articleData ? (
              <Text> Loading ..... </Text>
            ) : (
              this.state.articleData.map((l, i) => (
                <ListItem
                  key={i}
                  title={l.title}
                  content={l.content}
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
