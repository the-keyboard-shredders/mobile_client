import React from "react";
import { StyleSheet, Text, View, ScrollView, RefreshControl } from "react-native";
import { ThemeProvider, ListItem, Button } from "react-native-elements";
import {
  grabFromCloudToStorage,
  getAllData,
  signOut,

} from "./store/asyncStorageActions";

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      article : [],
      error: false,
      refreshing: false,
  
    };
    this.loadArticles = this.loadArticles.bind(this)
    // this._onRefresh = this._onRefresh.bind(this)
  }
  // _onRefresh = async() => {
  //   this.setState({refreshing: true});
  //   await this.loadArticles(this.props.navigation.getParam("googleId"))
  //   this.setState({refreshing: false});
  //   console.log("COMPONENT?", this.state.article)
  // }

  async loadArticles(googleId){
    let article;
      try{
        // throw new Error("er")
        article = await grabFromCloudToStorage(googleId)
        // console.log('thisstateart',article)
        article = article.data.userArticles
        this.setState({article})
        console.log("thisstateart", typeof this.state.article)
      }
      catch (err){
        try{
          article = await getAllData(googleId)
          if(article){
          article = article.data.userArticles}
          console.log('GETALLDATA',article)
          this.setState({article})
        }catch(err){
          this.setState({error:true})
          console.log(err)
        }
      }
    }


  async componentDidMount() {
    // const googleId = this.props.navigation.getParam("googleId");
    // await grabFromCloudToStorage(googleId);
    // const response = await getAllData();
    // if (response !== "none") {
    //   const articles = JSON.parse(response).data.userArticles;
    //   this.setState({ articles });
    // }
    await this.loadArticles(this.props.navigation.getParam("googleId"))
  }


  render() {
    return (
      <ThemeProvider>
        <Button
          title="Logout"
          onPress={() => {
            signOut();
            this.props.navigation.navigate("login");
          }}
        />
        <Text>Titles List</Text>
        {this.state.error? (<Text>You have no articles!</Text>) :(
          <ScrollView
                refreshControl={
                  <RefreshControl
                  refreshing={this.state.refreshing}
                  // onRefresh={this._onRefresh}
                  />} > 
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
                    this.props.navigation.navigate("ArticlesList", {
                      content: l.content,
                      title: l.title
                    })
                  }
                  />
                  ))
                  )}
            </ScrollView>
            </View>
          </ScrollView>)}
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
