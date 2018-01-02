import React from 'react'
import {Grid, Paper, Typography, Button, TextField} from 'material-ui'
import { NavLink } from 'react-router-dom'
import { indigo } from 'material-ui/colors'

const New = () => (
    <Grid container justify='center' alignItems='center' spacing={40} style={styles.container}>
        <Grid item xs={12} md={4}>
            <Paper style={styles.paper}>
                <Typography type='title'>Añadir nueva pregunta</Typography>
                <br/>
                <TextField
                    label='Tu nombre'
                    margin='dense'
                    color='primary'
                    style={styles.textfield}/>
                <br/>
                <TextField
                    label='Escribe aquí tu pregunta'
                    margin='dense'
                    color='primary'
                    multiline
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
                        <Button raised color='primary'>ENVIAR</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    </Grid>
)

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

export default New