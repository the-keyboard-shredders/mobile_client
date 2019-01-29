import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";
import { retrieveTitles } from "./store/reducer";

class Test extends React.Component {
  async componentDidMount() {
    await this.props.updateTitlesList();
    console.log(this.props.allTitles);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is test component</Text>
      </View>
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
const mapStateToProps = state => {
  const { allTitles } = state;
  return { allTitles };
};

const mapDispatchToProps = dispatch => ({
  updateTitlesList: () => dispatch(retrieveTitles())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);
