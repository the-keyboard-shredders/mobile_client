import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./Home";
import Article from "./Article";
import Login from "./Login";

const AppNav = createStackNavigator({
  Login: { screen: Login },
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Home",
      headerLeft: null,
      gesturesEnabled: false
    }
  },
  Article: { screen: Article }
});

const AppNavigator = createAppContainer(AppNav);

export default AppNavigator;
