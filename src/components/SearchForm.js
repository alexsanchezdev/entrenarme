import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Typography, Grid, TextField, CircularProgress, Button} from 'material-ui'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import indigo from 'material-ui/colors/indigo';

const renderSearchTextField = ({ input }) => {
    return (<TextField
        placeholder='Escribe una palabra o una frase'
        margin='normal'
        color='primary'
        {...input}
        style={styles.textfield}/>)
}

const SearchForm = (props) => {

        const {handleSubmit, searchIsLoading} = props
        return (
            <form onSubmit={handleSubmit}>
                <Typography type='title'>Buscador de preguntas al experto</Typography>
                <br/>
                <Field name='keyword' component={renderSearchTextField}/>

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
                            ? <div
                                    style={{
                                    textAlign: 'center',
                                    width: 88
                                }}><CircularProgress size={32}/></div>
                            : <Button raised color='primary' type='submit'>BUSCAR</Button>}
                    </Grid>
                </Grid>
            </form>
        )
}

const styles = {
    container: {
        height: '100%',
        width: '100%',
        margin: 0
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
    }
}

const mapStateToProps = ({ui, questions}) => {
    return {searchIsLoading: ui.searchIsLoading}
}

export default connect(mapStateToProps)(reduxForm({
    form: 'search'
})(SearchForm))