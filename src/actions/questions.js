import * as Entrenarme from '../helpers/EntrenarmeAPI'
import { searchIsLoading } from './ui'

export const GET_QUESTIONS = 'GET_QUESTIONS'

export const getQuestions = (data, total) => {
    return {
        type: GET_QUESTIONS,
        total,
        data
    }
}

export const fetchQuestions = (page, keyword) => dispatch => {
    dispatch(searchIsLoading(true))
    Entrenarme.getQuestions(page, keyword).then((res) => {
        res.json().then((results => {
            dispatch(getQuestions(results.data, results.total))
            dispatch(searchIsLoading(false))
        }))
    }).catch((err) => console.log(err))
}