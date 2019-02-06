import { AsyncStorage } from "react-native";
import axios from "axios";
//setItem() - sets data to AsyncStorage
//function below will grab from cloud and save in AsyncStorage
export const grabFromCloudToStorage = async googleId => {
  try {
    const response = await axios.post(
      "https://headless-capstone-1810.herokuapp.com/",
      {
        query: `
         {
          userArticles (googleId: "${googleId}") {
            title
            content
            url
            id
          }
        }
      `
      }
    );
    await AsyncStorage.setItem(googleId, JSON.stringify(response.data));
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// getItem() - grabs data from AsyncStorage
// function below will send data from AS to app
export const getAllData = async googleId => {
  try {
    const articles = await AsyncStorage.getItem(googleId);
    return articles;
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
};

export const persistGoogleId = async googleId => {
  AsyncStorage.setItem("googleId", JSON.stringify(googleId));
};

export const isSignedIn = async () => {
  try {
    const googleId = await AsyncStorage.getItem("googleId");
    return googleId;
  } catch (error) {
    return false;
  }
};

export const signOut = async () => {
  try {
    await AsyncStorage.removeItem("googleId");
  } catch (error) {
    console.log(error);
  }
};
