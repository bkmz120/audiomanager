import axios from "axios";
import {API_PATH} from "../constants/api.js";
import * as constants from "../constants/audio";
import {logout} from "./user.js";

export function getTracks() {
  return function(dispatch) {
     axios.get(API_PATH + '/tracks')
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
        if (error.response && error.response.status==403) {
          dispatch(logout());
        }
      });
  }
}

export function changeEditForm(key,value) {
  return {
    type:constants.CHANGE_FORM_FIELD,
    payload:{key,value}
  }
}

export function uploadTrack(file) {
  return function(dispatch) {
    dispatch({
      type:constants.UPLOAD_TRACK
    });

    let fd = new FormData();
    fd.append('trackFile', file);
    axios
      .post(API_PATH + '/tracks/uploadtrack', fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(function (response) {
          dispatch({
            type:constants.UPLOAD_TRACK_SUCCESS,
            payload:{
              fileName:file.name
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

export function saveTrack(newTrack) {

  return function(dispatch, getState) {
    //validation
    let state = getState();
    let track = state.audio.trackEditForm;
    let valid = true;
    let validProps = {
      title:true,
      fileName:true,
    }

    if (track.title === undefined || track.title === "") {
      validProps.title = false;
      valid = false;
    }
    if (track.fileName === undefined || track.fileName === "") {
      validProps.fileName = false;
      valid = false;
    }


    if (!valid) {
      dispatch({
        type:constants.VALIDATION_ERROR,
        payload:{
          trackEditFormValidProps:validProps,
        }
      });
    }
    else {
      dispatch({
        type:constants.SAVE_TRACK
      });

      if (newTrack) {
        axios.post(API_PATH + '/tracks',track)
        .then(function (response) {
          dispatch({
            type:constants.SAVE_TRACK_SUCCESS
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
      else {
        axios.patch(API_PATH + '/tracks/'+track.id,track)
        .then(function (response) {
          dispatch({
            type:constants.SAVE_TRACK_SUCCESS
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
  }
}

export function initEditForm() {
  return {
    type:constants.INIT_EDIT_FORM
  }
}

export function openTrackEdit(trackId) {
  return function(dispatch) {
    axios.get(API_PATH + '/tracks/'+trackId)
      .then(function (response) {
        dispatch({
          type:constants.OPEN_TRACK_EDIT,
          payload:{
            track:response.data
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

export function deleteTrack(trackId) {
  return function(dispatch) {
    axios.delete(API_PATH + '/tracks/'+trackId)
      .then(function (response) {
        dispatch({
          type:constants.DELETE_TRACK,
          payload:{trackId}
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