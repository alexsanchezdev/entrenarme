import React from 'react'
import {Grid, Paper, Typography, Button, TextField} from 'material-ui'
import {NavLink} from 'react-router-dom';
import indigo from 'material-ui/colors/indigo';

class Search extends React.Component {

    state = {
        showResults: false
    }

    render() {
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
                                <Button raised color='primary' onClick={() => this.setState({showResults: !this.state.showResults})}>BUSCAR</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                {this.state.showResults
                    ? <Grid item xs={12} md style={styles.resultsContainer}>
                            <Typography>Results</Typography>
                        </Grid>
                    : null}
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
    },
    resultsContainer: {
        background: '#fff',
        height: '100%'
    }
}

export default Search