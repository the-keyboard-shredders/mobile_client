import React from "react";
import { StyleSheet, View, Text, AsyncStorage, Button } from "react-native";
// import AppNavigator from "./AppNavigator";
import Expo from 'expo';
import iosClientId from './supersecret'


export default class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    //   signedIn: false,
    //   name: ""
    };
  }

  render() {
    return <View style={styles.container}>
        {this.state.signIn ? (
          <LoggedInPage name={this.state.name} />
        ) : (
          <LoginPage signIn={this.signIn} />
        
        )}

      </View>
  }
}

async function signIn(){
  try {
    console.log('921083579017359018273590172', Expo)

    const result = await Expo.Google.logInAsync({
      // androidClientId: YOUR_CLIENT_ID_HERE,
      iosClientId: iosClientId,
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      this.setState({
        signedIn: true,
        name: result.user.name
      })
    } else {
      console.log("Cancelled");
    }
  } catch(e) {
    console.log("error", e);
  }
}

const LoginPage = props => {
  return(
    <View>
      <Text style={styles.header}>Sign in with Google</Text>
      <Button title="Sign in with Google" onPress={() => signIn()}/>
    </View>
  )
}

const LoggedInPage = props => {
  return(
    <View style={styles.container}>
      <Text style={styles.header}>Welcome:{props.name}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});