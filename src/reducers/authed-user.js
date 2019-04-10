import Actions from '../actions';

export default function(state=null, action) {
	switch(action.type) {
		case Actions.AuthedUser.SIGN_USER_IN:
			return action.user;
		case Actions.AuthedUser.SIGN_USER_OUT:
			return null;
		default:
			return state;
	}
}