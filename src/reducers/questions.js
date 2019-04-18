import * as Actions from '../actions/questions'

const INITIAL_STATE = {
	isLoading: false,
	isLoaded: false,
	isFail: false,
	isSuccess: false,
	isSavingQuestion: false,
	hasFinishedSaving: false,
	isQuestionSavedSuccess: false,
	isQuestionSavedFail: false,
}

export default function(state=INITIAL_STATE, action) {
	switch(action.type) {
		case Actions.SAVE_QUESTION_START:
			return {
				...state,
				isSavingQuestion: true,
				hasFinishedSaving: false,
				isQuestionSavedSuccess: false,
				isQuestionSavedFail: false,
			}
		case Actions.SAVE_QUESTION_SUCCESS:
			return {
				...state,
				isSavingQuestion: false,
				hasFinishedSaving: true,
				isQuestionSavedSuccess: true,
				isQuestionSavedFail: false,
			}
		case Actions.SAVE_QUESTION_FAIL:
			return {
				...state,
				isSavingQuestion: false,
				hasFinishedSaving: true,
				isQuestionSavedSuccess: false,
				isQuestionSavedFail: true,
			}
		case Actions.SAVE_QUESTION_RESET:
			return {
				...state,
				isSavingQuestion: false,
				hasFinishedSaving: false,
				isQuestionSavedSuccess: false,
				isQuestionSavedFail: false,
			}
		case Actions.FETCH_QUESTIONS_START:
			return {
				...state,
				isLoading: true,
				isLoaded: false,
				isFail: false,
				isSuccess: false,
			}
		case Actions.FETCH_QUESTIONS_SUCCESS:
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
		case Actions.FETCH_QUESTIONS_FAIL:
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