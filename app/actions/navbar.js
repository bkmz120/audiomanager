import {CHANGE_TAB} from "../constants/navbar"

export function changeTab(tabIndex){
  return {
    type:CHANGE_TAB,
    payload:{
      selectedTab:tabIndex
    }
  }
}