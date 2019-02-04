import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./Home";
import ArticlesList from "./ArticlesList";
import login from "./login";

const AppNav = createStackNavigator({
  login: { screen: login },
  Home: { screen: Home },
  ArticlesList: { screen: ArticlesList }
});

const AppNavigator = createAppContainer(AppNav);
export default AppNavigator;
