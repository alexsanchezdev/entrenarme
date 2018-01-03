import React from 'react'
import {Grid, Paper, Snackbar} from 'material-ui'
import { connect } from 'react-redux'
import { fetchQuestions } from '../actions/questions'
import { updateMorePage } from '../actions/ui'
import SearchResults from './SearchResults';
import SearchForm from './SearchForm';

class Search extends React.Component {

    handleSearch = ({keyword}) => {
        const { dispatch } = this.props

        dispatch(fetchQuestions(0, keyword))
        dispatch(updateMorePage(1))        
    }

    render() {
        const { questions, keyword } = this.props

        return (
            <Grid
                container
                justify='center'
                alignItems='center'
                spacing={40}
                style={styles.container}>
                <Grid item xs={12} md={5}>
                    <Paper style={styles.paper}>
                        <SearchForm onSubmit={this.handleSearch}/>
                    </Paper>
                </Grid>
                { questions.length > 0
                    ? <SearchResults />    
                    : <div>{ keyword && <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}
                        open={true}
                        message={<span id="message-id">{`No se encontraron resultados para "${keyword}"`}</span>}/>}
                    </div>}
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
    }
}

const mapStateToProps = ({ questions, ui }) => {
    return {
        searchIsLoading: ui.searchIsLoading,
        keyword: questions.keyword,
        questions: Object
            .keys(questions)
            .filter((value) => value !== 'total')
            .filter((value) => value !== 'keyword')
            .map((key) => questions[key]).reverse(),
    }
}
export default connect(mapStateToProps)(Search)