import {
	FETCH_QUESTIONS_START,
	FETCH_QUESTIONS_SUCCESS,
	FETCH_QUESTIONS_FAIL
} from '../actions/questions'

const INITIAL_STATE = {
	isLoading: false,
	isLoaded: false,
	isFail: false,
	isSuccess: false,
}

export default function(state=INITIAL_STATE, action) {
	switch(action.type) {
		case FETCH_QUESTIONS_START:
			return {
				...state,
				isLoading: true,
				isLoaded: false,
				isFail: false,
				isSuccess: false,
			}
		case FETCH_QUESTIONS_SUCCESS:
			const { questions } = action;
			const byId = Object.assign({}, questions);
			const ids = Object.keys(questions);
			return {
				...state,
				isLoading: false,
				isLoaded: true,
				isSuccess: true,
				byId,
				ids
			}
		case FETCH_QUESTIONS_FAIL:
			const { error } = action;
			return {
				...state,
				isLoading: false,
				isLoaded: true,
				isFail: true,
				error
			}
		default:
			return state;
	}
}