import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Typography, Grid, TextField, CircularProgress, Button} from 'material-ui'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import indigo from 'material-ui/colors/indigo'

class SearchForm extends React.Component {

    renderSearchTextField = ({input}) => {
        return (<TextField
            autoComplete='off'
            placeholder='Escribe una palabra o una frase'
            margin='normal'
            color='primary'
            {...input}
            style={styles.textfield}/>)
    }

    render() {
        const {handleSubmit, searchIsLoading} = this.props
        
        return (
            <form onSubmit={handleSubmit}>
                <Typography type='title'>Buscador de preguntas al experto</Typography>
                <br/>
                <Field name='keyword' component={this.renderSearchTextField}/>
    
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
                        {searchIsLoading
                            ? <CircularProgress size={32}/>
                            : <Button raised color='primary' type='submit'>BUSCAR</Button>}
                    </Grid>
                </Grid>
            </form>
        )
    }
}

const styles = {
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
    }
}

const mapStateToProps = ({ui, questions}) => {
    return {
        searchIsLoading: ui.searchIsLoading, 
        initialValues: {
            keyword: questions.keyword
        }
    }
}

export default connect(mapStateToProps)(reduxForm({form: 'search'})(SearchForm))