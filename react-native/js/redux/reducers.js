import {combineReducers} from 'redux'
import {SET_LOC, SET_PHONE} from "./actions";

function loc(state = [null, null], action) {
    switch (action.type) {
        case SET_LOC:
            return action.loc;
        default:
            return state
    }
}

function phone(state = null, action) {
    switch (action.type) {
        case SET_PHONE:
            return action.phone;
        default:
            return state
    }
}

const reduxApp = combineReducers({
    loc,
    phone
});

export default reduxApp;