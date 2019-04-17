import * as API from '../api';

import { handleGetUsers } from './users';
import { handleReloadAuthedUser } from './authed-user';

export const FETCH_QUESTIONS_START = 'FETCH_QUESTIONS_START';
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const FETCH_QUESTIONS_FAIL = 'FETCH_QUESTIONS_FAIL';
export const CLEAR_QUESTIONS = 'CLEAR_QUESTIONS';
export const SAVE_ANSWER_START = 'SAVE_ANSWER_START';
export const SAVE_ANSWER_SUCCESS = 'SAVE_ANSWER_SUCCESS';
export const SAVE_ANSWER_FAIL = 'SAVE_ANSWER_FAIL'

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

function saveAnswer () {
	return { type: SAVE_ANSWER_START }
}

function saveAnswerSuccess () {
	return {
		type: SAVE_ANSWER_SUCCESS
	}
}

function saveAnswerFail ({ error }={}) {
	return {
		type: SAVE_ANSWER_FAIL,
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

export function handleSelectAnswer ({ userId, questionId, answerType }) {
	return (dispatch) => {
		dispatch(saveAnswer())

		API.saveQuestionAnswer({
			authedUser: userId,
			qid: questionId,
			answer: answerType
		})
		.then(() => {
			dispatch(saveAnswerSuccess());
			dispatch(handleFetchQuestions());
			dispatch(handleGetUsers());
			dispatch(handleReloadAuthedUser());
		})
		.catch(error => {
			dispatch(saveAnswerFail({ error }))
		})
	}
}
