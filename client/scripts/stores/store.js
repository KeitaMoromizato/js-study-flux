import { createStore, combineReducers } from 'redux';
import { FETCH_REPOSITORIES } from '../actions/repositoryAction';

function repositories(state = [], action) {
  console.log("handle in Store", action.type, action);
  switch (action.type) {
    case FETCH_REPOSITORIES:
      return state.concat(action.repositories);
    default:
      return state;
  }
}

const reducer = combineReducers({
  repositories
  
})
export default createStore(reducer);
