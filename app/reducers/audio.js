import {ADD_TRACK} from "../constants/audio"

const initialState = {
  tracks:[
    {
      id:0,
      title:"track1",
      artist:"artist1",
    },
    {
      id:1,
      title:"track2",
      artist:"artist2",
    }
  ]
}

export default function update(state = initialState, action) {
  switch(action.type) {
    case ADD_TRACK:
      return {...state, tracks:[...state, action.payload.track] }
    default:
      return state;
  }
}