import Actions from '../actions';

export default function(state=null, action) {
	switch(action.type) {
		case Actions.AuthedUser.SET_AUTHED_USER:
			return action.user;
		case Actions.AuthedUser.CLEAR_AUTHED_USER:
			return null;
		default:
			return state;
	}
}