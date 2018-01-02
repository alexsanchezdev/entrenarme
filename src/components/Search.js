import React from 'react'
import {Grid, Paper, Typography, Button, TextField} from 'material-ui'

const Search = () => (
    <Grid container justify='center' alignItems='center' style={styles.container}>
        <Grid item>
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
                        <Typography>Añadir nueva pregunta</Typography>
                    </Grid>
                    <Grid item>
                        <Button raised color='primary'>BUSCAR</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    </Grid>
)

const styles = {
    container: {
        height: '100%'
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
    }
}

export default Search