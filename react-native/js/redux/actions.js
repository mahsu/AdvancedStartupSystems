/*
 * action types
 */
export const SET_LOC = 'SET_LOC';
export const SET_PHONE = 'SET_PHONE';

/*
 * action creators
 */

export const setLoc = (loc) => {
    return { type: SET_LOC, loc }
};

export const setPhone = (phone) => {
    return {type: SET_PHONE, phone}
};
