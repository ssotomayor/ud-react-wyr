import { _getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer } from './_DATA.js';
export const getInitialData = () => {
  return Promise.all([ _getUsers(), _getQuestions()]).then(([users, questions]) => ({
    users,
    questions,
  }));
};
export const saveQuestionAnswer = (vote) => _saveQuestionAnswer(vote)
export const savePoll = (question) =>  _saveQuestion(question)
