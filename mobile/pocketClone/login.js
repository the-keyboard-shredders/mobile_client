import React from "react";
import { StyleSheet, View, Text, AsyncStorage, Button } from "react-native";
import AppNavigator from "./AppNavigator";
import Expo from "expo";
import { Google } from "expo";
import { iosClientId, androidClientId } from "./supersecret";
import Home from "./Home";

export default class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      name: "",
      googleId: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.signedIn ? (
          <LoggedInPage name={this.state.name} googleId={this.state.googleId} />
        ) : (
          <LoginPage signIn={this.signIn} />
        )}
      </View>
    );
  }

  signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: androidClientId,
        iosClientId: iosClientId,
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        this.setState({
          signedIn: true,
          name: result.user.name,
          googleId: result.user.id
        });
        // this.props.navigation.navigate("Home");
      } else {
        console.log("Cancelled");
      }
    } catch (e) {
      console.log("error", e);
    }
  };
}

const LoginPage = props => {
  return (
    <View>
      <Text style={styles.header}>Sign in with Google</Text>
      <Button title="Sign in with Google" onPress={() => props.signIn()} />
    </View>
  );
};

const LoggedInPage = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome:{props.name}</Text>
      <Home googleId={props.googleId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
