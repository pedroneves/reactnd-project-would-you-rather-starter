import * as API from '../api';

export const FETCH_QUESTIONS_START = 'FETCH_QUESTIONS_START';
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const FETCH_QUESTIONS_FAIL = 'FETCH_QUESTIONS_FAIL';
export const CLEAR_QUESTIONS = 'CLEAR_QUESTIONS';

function fetchQuestions () {
	return { type: FETCH_QUESTIONS_START }
}

function fetchQuestionsSuccess ({ questions={} }={}) {
	return {
		type: FETCH_QUESTIONS_SUCCESS,
		questions
	}
}

function fetchQuestionsFail ({ error }={}) {
	return {
		type: FETCH_QUESTIONS_FAIL,
		error
	}
}

export function handleFetchQuestions () {
	return (dispatch) => {
		dispatch(fetchQuestions())

		API.getQuestions()
		.then(questions => {
			dispatch(fetchQuestionsSuccess({ questions }))
		})
		.catch(error => {
			dispatch(fetchQuestionsFail({ error }))
		})
	}
}
