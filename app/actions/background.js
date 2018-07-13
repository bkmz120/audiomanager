import axios from "axios";
import {API_PATH} from "../constants/api.js";
import * as constants from "../constants/background";
import {logout} from "./user.js";

export function getBackgrounds() {
  return function(dispatch) {
     axios.get(API_PATH + '/backgrounds')
      .then(function (response) {
        dispatch({
          type:constants.GET_BACKGROUNDS_SUCCESS,
          payload:{
            backgrounds:response.data
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

export function changeEditForm(key,value) {
  return {
    type:constants.CHANGE_FORM_FIELD,
    payload:{key,value}
  }
}

export function uploadBackground(file) {
  return function(dispatch) {
    dispatch({
      type:constants.UPLOAD_BACKGROUND
    });

    let fd = new FormData();
    fd.append('file', file);
    axios
      .post(API_PATH + '/backgrounds/uploadfile', fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(function (response) {
          if (response.data.status) {
            dispatch({
              type:constants.UPLOAD_BACKGROUND_SUCCESS,
              payload:{
                fileName:file.name
              }
            });
          }
          else {
            dispatch({
              type:constants.UPLOAD_BACKGROUND_ERROR,
              payload:{
                message:response.data.message
              }
            });
          }

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

export function saveBackground(newBackground) {

  return function(dispatch, getState) {
    //validation
    let state = getState();
    let background = state.background.backgroundEditForm;
    let valid = true;
    let validProps = {
      title:true,
      fileName:true,
    }

    if (background.title === undefined || background.title === "") {
      validProps.title = false;
      valid = false;
    }
    if (background.fileName === undefined || background.fileName === "") {
      validProps.fileName = false;
      valid = false;
    }


    if (!valid) {
      dispatch({
        type:constants.VALIDATION_ERROR,
        payload:{
          backgroundEditFormValidProps:validProps,
        }
      });
    }
    else {
      dispatch({
        type:constants.SAVE_BACKGROUND
      });

      if (newBackground) {
        axios.post(API_PATH + '/backgrounds',background)
        .then(function (response) {
          dispatch({
            type:constants.SAVE_BACKGROUND_SUCCESS
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
        axios.patch(API_PATH + '/backgrounds/'+background.id,background)
        .then(function (response) {
          dispatch({
            type:constants.SAVE_BACKGROUND_SUCCESS
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

export function openBackgroundEdit(backgroundId) {
  return function(dispatch) {
    axios.get(API_PATH + '/backgrounds/'+backgroundId)
      .then(function (response) {
        dispatch({
          type:constants.OPEN_BACKGROUND_EDIT,
          payload:{
            background:response.data
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

export function deleteBackground(backgroundId) {
  return function(dispatch) {
    axios.delete(API_PATH + '/backgrounds/'+backgroundId)
      .then(function (response) {
        dispatch({
          type:constants.DELETE_BACKGROUND,
          payload:{backgroundId}
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

export function checkUseDefault() {
  return function(dispatch) {
    axios.get(API_PATH + '/backgrounds/usedefault')
      .then(function (response) {
        dispatch({
          type:constants.CHANGE_USE_DEFAULT,
          payload:{
            useDefaultBackground:response.data.usedefault,
            enableUseDefaultCheckbox:response.data.enableUsedefault,
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

export function setUseDefault(usedefault) {
  return function(dispatch) {
    axios.patch(API_PATH + '/backgrounds/usedefault',{usedefault})
      .then(function (response) {
        dispatch({
          type:constants.CHANGE_USE_DEFAULT,
          payload:{
            useDefaultBackground:response.data.usedefault,
            enableUseDefaultCheckbox:response.data.enableUsedefault,
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