import React from 'react'
import {Grid, Paper, Typography, Button, TextField, Snackbar, CircularProgress} from 'material-ui'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { indigo } from 'material-ui/colors'
import { newQuestionIsLoading } from '../actions/ui'
import * as Entrenarme from '../helpers/EntrenarmeAPI'
import NewQuestionForm from './NewQuestionForm';

class NewQuestion extends React.Component {

    state = {
        message: '',
        showMessage: false,
    }

    handleNewQuestion = (values) => {
        const { dispatch } = this.props
        const { name, question } = values
        
        dispatch(newQuestionIsLoading(true))
        Entrenarme.postQuestion(name, question).then(() => {
            dispatch(newQuestionIsLoading(false))
            this.setState({showMessage: true, message: 'Tu pregunta ha sido enviada.', name: '', text: ''})
        }).catch((err) => {
            dispatch(newQuestionIsLoading(false))
            this.setState({showMessage: true, message: 'Hubo un problema enviando tu pregunta.'})
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
                        <NewQuestionForm onSubmit={this.handleNewQuestion}/>
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

export default connect(mapStateToProps)(NewQuestion)