import { AsyncStorage } from "react-native";
import axios from "axios";

//setItem() - sets data to AsyncStorage
//function below will grab from cloud and save in AsyncStorage
export const grabFromCloudToStorage = async (key, response) => {
  try {
    let response = await axios.post(
      "https://headless-capstone-1810.herokuapp.com/",
      {
        query: "{articles{ title}}"
      }
    );

    await AsyncStorage.setItem(key, JSON.stringify(response.data));
  } catch (error) {
    // Error retrieving data
  }
};

//getItem() - grabs data from AsyncStorage
//function below will send data from AS to app
export const getAllData = async key => {
  let articles;
  try {
    articles = (await AsyncStorage.getItem(key)) || "none";
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
  return JSON.parse(articles);
};

//removeItem() - removes item from AsyncStorage
//TBD
const deleteUserId = async () => {
  try {
    await AsyncStorage.removeItem("userId");
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
};
