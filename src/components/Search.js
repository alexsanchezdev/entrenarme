import React from 'react'
import {Grid, Paper} from 'material-ui'
import indigo from 'material-ui/colors/indigo';
import { connect } from 'react-redux'
import { fetchQuestions } from '../actions/questions'
import { updateMorePage } from '../actions/ui'
import SearchResults from './SearchResults';
import SearchForm from './SearchForm';

class Search extends React.Component {

    state = {
        buttonRef: null
    }

    setButtonRef = (button) => {
        this.setState({ buttonRef: button}, () => console.log(this.state))
    }

    handleSearch = (values) => {

        const { dispatch } = this.props

        dispatch(fetchQuestions(0, values.keyword))
        dispatch(updateMorePage(1))        
    }

    handleInputChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    render() {

        const { questions } = this.props

        return (
            <Grid
                container
                justify='center'
                alignItems='center'
                spacing={40}
                style={styles.container}>
                <Grid item xs={12} md={5}>
                    <Paper style={styles.paper}>
                        <SearchForm onSubmit={this.handleSearch} setButtonRef={this.setButtonRef} buttonWidth={this.state.buttonWidth}/>
                    </Paper>
                </Grid>
                { questions.length > 0
                    ? <SearchResults />    
                    : null}
            </Grid>
        )
    }
}
const styles = {
    container: {
        height: '100%',
        width: '100%',
        margin: 0, 
    },
    paper: {
        padding: 40,
        display: 'flex',
        flexDirection: 'column'
    },
    actions: {
        marginTop: 20
    },
    textfield: {
        width: '100%'
    },
    link: {
    
    textDecoration: 'none'
    },
    linkText: {
        color: indigo[500]
    },
    resultsContainer: {
        
        height: '100%',
    }
}

const mapStateToProps = ({ questions, ui }) => {
    return {
        searchIsLoading: ui.searchIsLoading,
        questions: Object
            .keys(questions)
            .filter((value) => value !== 'total')
            .filter((value) => value !== 'keyword')
            .map((key) => questions[key]).reverse(),
        keyword: questions.keyword,
        total: questions.total
    }
}
export default connect(mapStateToProps)(Search)