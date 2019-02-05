import { AsyncStorage } from "react-native";
import axios from "axios";
//setItem() - sets data to AsyncStorage
//function below will grab from cloud and save in AsyncStorage
export const grabFromCloudToStorage = googleId => {
  axios
    .post("http://172.16.23.161:4000/", {
      query: `
         {
          userArticles (googleId: "${googleId}") {
            title
            content
            url
          }
        }
      `
    })
    .then(response => {
      AsyncStorage.setItem("articles", JSON.stringify(response.data));
    })
    .catch(err => {
      console.log(err);
    });
};

// getItem() - grabs data from AsyncStorage
// function below will send data from AS to app
export const getAllData = async () => {
  try {
    const articles = (await AsyncStorage.getItem("articles")) || "none";
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
    return JSON.parse(googleId);
  } catch (error) {
    return false;
  }
};

//removeItem() - removes item from AsyncStorage
//TBD
// const deleteUserId = async () => {
//   try {
//     await AsyncStorage.removeItem("userId");
//   } catch (error) {
//     // Error retrieving data
//     console.log(error.message);
//   }
// };
