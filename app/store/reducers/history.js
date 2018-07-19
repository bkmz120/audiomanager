import * as constants from "Constants/history"

const initialState = {
  historyItems:[],
 }

export default function update(state = initialState, action) {
  switch(action.type) {
    case constants.GET_HISTORY_SUCCESS:
      return {...state,historyItems:action.payload.historyItems}
    case constants.CLEAR_HISTORY:
      return {...state,historyItems:[]}
    default:
      return state;
  }
}