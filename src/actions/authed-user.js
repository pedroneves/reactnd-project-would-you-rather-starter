import { saveAuthedUser, clearAuthedUser, hasAuthedUser, getAuthedUser } from '../local-storage';

export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const CLEAR_AUTHED_USER = 'CLEAR_AUTHED_USER';

function set (user) {
	return {
		type: SET_AUTHED_USER,
		user
	}
}

function clear () {
	return { type: CLEAR_AUTHED_USER }
}

/**
 * Even though this "sign in mechanics" doesn't actually need a
 * asynchronous dispatch, I decided to keep this standard because,
 * in a real world scenario, async requests will have to be made.
 */

export function handleSignIn (user) {
	return dispatch => {
		saveAuthedUser(user);
		dispatch(set(user));
	}
}

export function handleSignOut () {
	return dispatch => {
		clearAuthedUser();
		dispatch(clear());
	}
}

export function handleVerifyAuthedUser () {
	return dispatch => {
		if (hasAuthedUser()) {
			const user = getAuthedUser();
			dispatch(set(user));
		}
	}
}