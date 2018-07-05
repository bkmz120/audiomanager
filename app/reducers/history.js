import * as constants from "../constants/history"

const initialState = {
  historyItems:[],
 }

export default function update(state = initialState, action) {
  switch(action.type) {
    case constants.GET_HISTORY_SUCCESS:
      return {...state,historyItems:action.payload.historyItems}
    default:
      return state;
  }
}