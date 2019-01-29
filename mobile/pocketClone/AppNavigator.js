import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./Home";
import ArticlesList from "./ArticlesList";

const AppNav = createStackNavigator({
  Home: { screen: Home },
  ArticlesList: { screen: ArticlesList }
});

const AppNavigator = createAppContainer(AppNav);
export default AppNavigator;
