import axios from "axios";
import * as constants from "../constants/audio";

export function getTracks() {
  return function(dispatch) {
     axios.get('/api/tracks')
      .then(function (response) {
        dispatch({
          type:constants.GET_TRACKS_SUCCESS,
          payload:{
            tracks:response.data
          }
        });
      })
      .catch(function (error) {
         //TODO: add error processing
        console.log(error);
      });
  }
}

export function addTrack(track) {

  return function(dispatch) {
    dispatch({
      type:constants.ADD_TRACK_PROCESS
    });

    axios.post('/api/tracks',track)
      .then(function (response) {
        dispatch({
          type:constants.ADD_TRACK_SUCCESS
        });
      })
      .catch(function (error) {
         //TODO: add error processing
        console.log(error);
      });
  }
}

export function initEditForm() {
  return {
    type:constants.INIT_EDIT_FORM
  }
}

