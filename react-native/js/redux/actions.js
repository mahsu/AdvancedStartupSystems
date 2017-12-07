/*
 * action types
 */
export const SET_LOC = 'SET_LOC';

/*
 * action creators
 */

export const setLoc = (loc) => {
    return { type: SET_LOC, loc }
};
