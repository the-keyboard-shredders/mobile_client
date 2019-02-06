import React from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";
import { Google } from "expo";
import { iosClientId, androidClientId } from "./supersecret";
import { persistGoogleId, isSignedIn } from "./store/asyncStorageActions";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      googleId: ""
    };
  }

  async componentDidMount() {
    let status = await isSignedIn();
    if (status) {
      status = JSON.parse(status);
      this.setState({
        signedIn: true,
        googleId: status
      });
      this.props.navigation.navigate("Home", {
        googleId: status
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require("./saveforlater.png")} />
        <Text>Welcome To Save For Later</Text>
        <Button title="Sign in with Google" onPress={() => this.signIn()} />
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
        persistGoogleId(result.user.id);
        this.setState({
          signedIn: true,
          name: result.user.name,
          googleId: result.user.id
        });

        this.props.navigation.navigate("Home", {
          googleId: result.user.id
        });
      } else {
        console.log("Cancelled");
      }
    } catch (e) {
      console.log("error", e);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
