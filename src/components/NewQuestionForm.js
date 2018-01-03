import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Typography, Grid, TextField, CircularProgress, Button} from 'material-ui'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import indigo from 'material-ui/colors/indigo'

const renderNameTextField = ({input}) => {
    return (<TextField
                label='Tu nombre'
                margin='dense'
                color='primary'
                style={styles.textfield}/>)
}

const renderQuestionTextField = ({ input }) => {
    return (<TextField
        multiline
        label='Escribe aquí tu pregunta'
        margin='dense'
        color='primary'
        style={styles.textfield}/>)
}

const NewQuestionForm = (props) => {
    const { handleSubmit, newQuestionIsLoading } = props
    return (
        <form onSubmit={handleSubmit}>
            <Typography type='title'>Añadir nueva pregunta</Typography>
            <br/>
            <Field name='name' component={renderNameTextField}/>
            <br/>
            <Field name='question' component={renderQuestionTextField}/>
            <Grid
                container
                justify='space-between'
                alignItems='center'
                style={styles.actions}>
                <Grid item>
                    <NavLink to='/search' style={styles.link}>
                        <Typography style={styles.linkText}>Volver</Typography>
                    </NavLink>
                </Grid>
                <Grid item>
                    {newQuestionIsLoading
                        ? <CircularProgress size={32}/>
                        : <Button raised color='primary' type='submit'>ENVIAR</Button>}
                </Grid>
            </Grid>
        </form>
    )
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

const mapStateToProps = ({ ui }) => {
    return {
        newQuestionIsLoading: ui.newQuestionIsLoading
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'newQuestion'
})(NewQuestionForm))