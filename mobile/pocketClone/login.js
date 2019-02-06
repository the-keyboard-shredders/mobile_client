import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { Google } from "expo";
import { iosClientId, androidClientId } from "./supersecret";
import { persistGoogleId, isSignedIn } from "./store/asyncStorageActions";

export default class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      googleId: ""
    };
  }

  async componentDidMount() {
    const status = await isSignedIn();

    if (status !== false) {
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
        <LoginPage signIn={this.signIn} />
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

const LoginPage = props => {
  return (
    <View>
      <Text style={styles.header}>Sign in with Google</Text>
      <Button title="Sign in with Google" onPress={() => props.signIn()} />
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
