import { SEARCH_LOADING, NEW_QUESTION_LOADING} from '../actions/ui'

const initialState = {
    searchIsLoading: false,
    newQuestionIsLoading: false
}

const ui = (state = initialState, action) => {
    const { value } = action

    switch (action.type) {
        case SEARCH_LOADING:
            return {
                ...state,
                searchIsLoading: value
            }
        case NEW_QUESTION_LOADING:
            return {
                ...state,
                newQuestionIsLoading: value
            }
        default:
            return state
    }
}

export default ui