import Actions from '../actions';

export default function(state={}, action) {
	switch(action.type) {
		case Actions.Users.GET_USERS_START:
			return {
				...state,
				isLoading: true
			}
		case Actions.Users.GET_USERS_SUCCESS:
			const { users } = action;

			return {
				...state,
				isLoading: false,
				byId: { ...users },
				ids: Object.keys(users)
			}
		case Actions.Users.GET_USERS_FAILED:
			return {
				...state,
				isLoading: false,
				error: action.error
			}
		default:
			return state;
	}
}