import { combineReducers } from 'redux'
import questions from './questions'
import ui from './ui'

const reducer = combineReducers({
    questions, ui
})

export default reducer