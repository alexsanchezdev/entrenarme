import { SEARCH_LOADING, NEW_QUESTION_LOADING, UPDATE_MORE_PAGE} from '../actions/ui'

const initialState = {
    searchIsLoading: false,
    newQuestionIsLoading: false,
    morePage: 1
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
        case UPDATE_MORE_PAGE:
            return {
                ...state,
                morePage: value
            }
        default:
            return state
    }
}

export default ui