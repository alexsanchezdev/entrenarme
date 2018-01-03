import React from 'react'
import {Grid, Paper, Typography, Button, TextField, CircularProgress} from 'material-ui'
import {NavLink} from 'react-router-dom';
import indigo from 'material-ui/colors/indigo';
import { connect } from 'react-redux'
import { fetchQuestions } from '../actions/questions'
import { updateMorePage } from '../actions/ui'
import SearchResults from './SearchResults';

class Search extends React.Component {

    state = {
        searchKeyword: this.props.keyword,
        buttonWidth: 0,
    }

    handleSearch = (e) => {
        const { dispatch } = this.props
        const { searchKeyword } = this.state

        this.setState({ buttonWidth: e.currentTarget.offsetWidth}, () => {
            dispatch(fetchQuestions(0, searchKeyword))
            dispatch(updateMorePage(1))
        })
        
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
                        <Typography type='title'>Buscador de preguntas al experto</Typography>
                        <br/>
                        <TextField
                            placeholder='Escribe una palabra o una frase'
                            margin='normal'
                            color='primary'
                            name='searchKeyword'
                            value={this.state.searchKeyword}
                            onChange={this.handleInputChange}
                            style={styles.textfield}/>
                        <Grid
                            container
                            justify='space-between'
                            alignItems='center'
                            style={styles.actions}>
                            <Grid item>
                                <NavLink to='/new' style={styles.link}>
                                    <Typography style={styles.linkText}>Añadir nueva pregunta</Typography>
                                </NavLink>
                            </Grid>
                            <Grid item>
                            {this.props.searchIsLoading 
                                ? <div style={{ textAlign: 'center', width: this.state.buttonWidth}}><CircularProgress size={32} /></div> 
                                : <Button raised color='primary' onClick={this.handleSearch}>BUSCAR</Button>} 
                            </Grid>
                        </Grid>
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