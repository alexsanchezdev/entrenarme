import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import questions from './questions'
import ui from './ui'

const reducer = combineReducers({
    questions, ui, form: formReducer
})

export default reducer