import {GET_QUESTIONS, GET_MORE_QUESTIONS} from '../actions/questions'

const questions = (state = {}, action) => {
    const {total, data, keyword} = action

    let questions = {}

    switch (action.type) {
        case GET_QUESTIONS:
            questions = data.reduce((obj, item) => {
                obj[item.id] = item
                return obj
            }, {})
            
            return {
                total,
                keyword,
                ...questions
            }
        case GET_MORE_QUESTIONS: 
            questions = data.reduce((obj, item) => {
                obj[item.id] = item
                return obj
            }, {})

            return {
                ...state,
                ...questions
            }
        default:
            return state
    }
}

export default questions