import * as Entrenarme from '../helpers/EntrenarmeAPI'
import { searchIsLoading } from './ui'

export const GET_QUESTIONS = 'GET_QUESTIONS'
export const GET_MORE_QUESTIONS = 'GET_MORE_QUESTIONS'

export const getQuestions = (data, total, keyword) => {
    return {
        type: GET_QUESTIONS,
        total,
        keyword,
        data
    }
}

export const getMoreQuestions = (data) => {
    return {
        type: GET_MORE_QUESTIONS,
        data
    }
} 

export const fetchQuestions = (page, keyword) => dispatch => {
    dispatch(searchIsLoading(true))
    Entrenarme.getQuestions(page, keyword).then((res) => {
        res.json().then((results => {
            dispatch(getQuestions(results.data, results.total, keyword))
            dispatch(searchIsLoading(false))
        }))
    }).catch((err) => console.log(err))
}

export const fetchMoreQuestions = (page, keyword) => dispatch => {
    dispatch(searchIsLoading(true))
    Entrenarme.getQuestions(page, keyword).then((res) => {
        res.json().then((results => {
            dispatch(getMoreQuestions(results.data))
            dispatch(searchIsLoading(false))
        }))
    })
}