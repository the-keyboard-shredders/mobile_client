import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import axios from "axios";
import { persistStore, persistReducer } from "redux-persist";

//action type
const GET_TITLE_DATA = "GET_TITLE_DATA";

//action creator
export const grabTitles = titles => ({
  type: GET_TITLE_DATA,
  titles
});

//reducer
const ourData = (state = {}, action) => {
  switch (action.type) {
    case "GET_TITLE_DATA":
      return {
        ...state,
        allTitles: action.titles
      };
    default:
      return state;
  }
};

//dispatch actions
export const retrieveTitles = () => dispatch => {
  return axios
    .post("https://headless-capstone-1810.herokuapp.com/", {
      query: "{articles{ title}}"
    })

    .then(res => {
      dispatch(grabTitles(res.data));
    })
    .catch(console.error.bind(console));
};

export default createStore(
  ourData,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
