const FakeAPI = require('./_DATA');

exports.getUsers = (...args) => FakeAPI._getUsers(...args)

exports.getQuestions = (...args) => FakeAPI._getQuestions(...args)

exports.saveQuestion = (...args) => FakeAPI._saveQuestion(...args)

exports.saveQuestionAnswer = (...args) => FakeAPI._saveQuestionAnswer(...args)