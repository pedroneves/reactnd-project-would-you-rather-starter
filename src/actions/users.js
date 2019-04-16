import * as API from '../api';

export const GET_USERS_START = 'GET_USERS_START';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILED = 'GET_USERS_FAILED';

function getUsers () {
	return { type: GET_USERS_START }
}

function getUsersSuccess (users={}) {
	return {
		type: GET_USERS_SUCCESS,
		users
	}
}

function getUsersFailed (error) {
	return {
		type: GET_USERS_FAILED,
		error
	}
}

export function handleGetUsers () {
	return dispatch => {
		dispatch(getUsers())

		API.getUsers()
			.then(users => {
				dispatch(getUsersSuccess(users))
			})
			.catch(error => {
				dispatch(getUsersFailed(error))
			})
	}
}