import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Button, ThemeProvider, ListItem, CheckBox } from "react-native-elements";
import {
  grabFromCloudToStorage,
  getAllData
} from "./store/asyncStorageActions";

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false
    };
  }

  async componentDidMount() {
    await grabFromCloudToStorage("usersArticles");
    let data = await getAllData("usersArticles");
    let articleData = data.data.articles;

    this.setState({ articleData });
  }

  render() {
    const{ checked } = this.state
    return (
      <ThemeProvider>
        <Text>Titles List</Text>
        <ScrollView>
          <View >
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
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  subtitleView: {
    flexDirection: 'row',
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
