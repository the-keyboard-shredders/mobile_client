import { AsyncStorage } from "react-native";
import axios from "axios";
//setItem() - sets data to AsyncStorage
//function below will grab from cloud and save in AsyncStorage
export const grabFromCloudToStorage = async googleId => {
  axios({
    url: "http://172.16.23.161:4000/",
    method: "post",
    data: {
      query: `
        query {
          userArticles (googleId:"106274906883593409597") {
            title
            content
            url
          }
        }
      `
    }
  })
    .then(response => {
      AsyncStorage.setItem(googleId, JSON.stringify(response.data));
    })
    .catch(err => {
      console.log(err);
    });
};

// getItem() - grabs data from AsyncStorage
// function below will send data from AS to app
export const getAllData = async googleId => {
  try {
    const articles = (await AsyncStorage.getItem(googleId)) || "none";
    return articles;
  } catch (error) {
    // Error retrieving data
    console.log(error);
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
