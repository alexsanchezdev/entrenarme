export const SEARCH_LOADING = 'SEARCH_LOADING'
export const NEW_QUESTION_LOADING = 'NEW_LOADING'

export const searchIsLoading = (value) => {
    return {
        type: SEARCH_LOADING,
        value
    }
}  

export const newQuestionIsLoading = (value) => {
    return {
        type: NEW_QUESTION_LOADING,
        value
    }
}