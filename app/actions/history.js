import axios from "axios";
import {API_PATH} from "../constants/api.js";
import * as constants from "../constants/history";
import {logout} from "./user.js";

export function getHistory() {
  return function(dispatch) {
     axios.get(API_PATH + '/logs')
      .then(function (response) {
        for (let i=0;i<response.data.length;i++) {
          response.data[i].log = JSON.parse(response.data[i].log);
        }

        dispatch({
          type:constants.GET_HISTORY_SUCCESS,
          payload:{
            historyItems:response.data
          }
        });
      })
      .catch(function (error) {
         //TODO: add error processing
        console.log(error);
        if (error.response && error.response.status==403) {
          dispatch(logout());
        }
      });
  }
}


export function clearHistory() {
  return function(dispatch) {
     axios.post(API_PATH + '/logs/clear')
      .then(function (response) {
        dispatch({
          type:constants.CLEAR_HISTORY,
        });
      })
      .catch(function (error) {
         //TODO: add error processing
        console.log(error);
        if (error.response && error.response.status==403) {
          dispatch(logout());
        }
      });
  }
}
