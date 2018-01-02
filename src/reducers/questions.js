import { GET_QUESTIONS } from '../actions/questions'

const questions = (state = {}, action) => {
    const { total, data} = action

    switch (action.type) {
        case GET_QUESTIONS:
            const questions = data.reduce((obj, item) => {
                obj[item.id] = item
                return obj
              }, {})

            return {
                total,
                ...questions
            }

        default:
            return state
    }
}

export default questions