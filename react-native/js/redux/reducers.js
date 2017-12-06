import {combineReducers} from 'redux'
import {SET_LOC} from "./actions";

function loc(state = [null, null], action) {
    switch (action.type) {
        case SET_LOC:
            return action.loc;
        default:
            return state
    }
}

const reduxApp = combineReducers({
    loc
});

export default reduxApp;