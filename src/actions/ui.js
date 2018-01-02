export const SEARCH_LOADING = 'SEARCH_LOADING'

export const searchIsLoading = (value) => {
    return {
        type: SEARCH_LOADING,
        value
    }
}   