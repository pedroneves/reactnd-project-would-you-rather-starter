export const SIGN_USER_IN = 'SIGN_USER_IN';
export const SIGN_USER_OUT = 'SIGN_USER_OUT';

function signIn (user) {
	return {
		type: SIGN_USER_IN,
		user
	}
}

function signOut () {
	return { type: SIGN_USER_OUT }
}

/**
 * Even though this "sign in mechanics" doesn't actually need a
 * asynchronous dispatch, I decided to keep this standard because,
 * in a real world scenario, async requests will have to be made.
 */

export function handleSignIn (user) {
	return dispatch => {
		dispatch(
			signIn(user)
		)
	}
}

export function handleSignOut () {
	return dispatch => {
		dispatch(
			signOut()
		)
	}
}