import { SEARCH_LOADING } from '../actions/ui'

const initialState = {
    searchIsLoading: false
}

const ui = (state = initialState, action) => {
    const { value } = action

    switch (action.type) {
        case SEARCH_LOADING:
            return {
                ...state,
                searchIsLoading: value
            }

        default:
            return state
    }
}

export default ui