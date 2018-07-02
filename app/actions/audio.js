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
    fd.append('file', file);
    axios
      .post('/api/tracks/uploadtrack', fd, {
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
        });
  }
}

export function addTrack() {

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
        type:constants.ADD_TRACK
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
}

export function initEditForm() {
  return {
    type:constants.INIT_EDIT_FORM
  }
}

export function openTrackEdit(trackId) {

  return function(dispatch) {
    axios.get('/api/tracks/'+trackId)
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
      });
  }
}
