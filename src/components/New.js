import React from 'react'
import {Grid, Paper, Typography, Button, TextField, Snackbar, CircularProgress} from 'material-ui'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { indigo } from 'material-ui/colors'
import { newQuestionIsLoading } from '../actions/ui'
import * as Entrenarme from '../helpers/EntrenarmeAPI'

class New extends React.Component {

    state = {
        name: '',
        text: '',
        message: '',
        showMessage: false,
        buttonWidth: 0
    }

    handleNewQuestion = (e) => {
        const { dispatch } = this.props
        const { name, text } = this.state

        this.setState({ buttonWidth: e.currentTarget.offsetWidth, loadingResults: true, showResults: true }, () => {
            dispatch(newQuestionIsLoading(true))
            Entrenarme.postQuestion(name, text).then(() => {
                dispatch(newQuestionIsLoading(false))
                this.setState({showMessage: true, message: 'Tu pregunta ha sido enviada.', name: '', text: ''})
            }).catch((err) => {
                dispatch(newQuestionIsLoading(false))
                this.setState({showMessage: true, message: 'Hubo un problema enviando tu pregunta.'})
            })
        })
        
    }

    handleClose = () => {
        this.setState({showMessage: false})
    }

    handleInputChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    render() {
        return (
            <Grid container justify='center' alignItems='center' spacing={40} style={styles.container}>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}
                    open={this.state.showMessage}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    message={<span id="message-id">{this.state.message}</span>}
                />
                <Grid item xs={12} md={4}>
                    <Paper style={styles.paper}>
                        <Typography type='title'>Añadir nueva pregunta</Typography>
                        <br/>
                        <TextField
                            label='Tu nombre'
                            margin='dense'
                            color='primary'
                            name='name'
                            value={this.state.name}
                            onChange={this.handleInputChange}
                            style={styles.textfield}/>
                        <br/>
                        <TextField
                            multiline
                            label='Escribe aquí tu pregunta'
                            margin='dense'
                            color='primary'
                            name='text'
                            value={this.state.text}
                            onChange={this.handleInputChange}
                            style={styles.textfield}/>
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
                                {this.props.newQuestionIsLoading 
                                ? <div style={{ textAlign: 'center', width: this.state.buttonWidth}}><CircularProgress size={32} /></div> 
                                : <Button raised color='primary' onClick={this.handleNewQuestion}>ENVIAR</Button>}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        )
    }

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

const mapStateToProps = ({ ui }) => {
    return {
        newQuestionIsLoading: ui.newQuestionIsLoading
    }
}

export default connect(mapStateToProps)(New)