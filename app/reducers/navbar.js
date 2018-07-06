import {CHANGE_TAB} from "../constants/navbar"

const initialState = generateInitState();

function generateInitState() {
  let selectedTab = 0;

  switch (window.location.hash.substring(1)) {
    case "":
      selectedTab = 0;
      break;
    case "/audio":
      selectedTab = 0;
      break;
    case "/playlist":
      selectedTab = 1;
      break;
    case "/background":
      selectedTab = 2;
      break;
    case "/history":
      selectedTab = 3;
      break;
  }

  return {
    selectedTab
  }
}

export default function update(state = initialState, action) {
  switch(action.type) {
    case CHANGE_TAB:
      return {...state,selectedTab: action.payload.selectedTab }
    default:
      return state;
  }
}
