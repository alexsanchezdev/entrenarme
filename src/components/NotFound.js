import React from 'react'
import { Grid, Paper, Typography, Button} from 'material-ui'
import { NavLink } from 'react-router-dom'

const NotFound = () => (
    <Grid container justify='center' alignItems='center' style={styles.container}>
        <Grid item>
            <Paper style={styles.paper}>
                <Typography type='title'>404 Not Found</Typography>
                <br/>
                <Typography>La página que estás buscando no existe o está entrenando en otro lugar.</Typography>
                <br/>
                <NavLink to='/' style={styles.link}>
                    <Button raised style={styles.button}>VOLVER</Button>
                </NavLink>
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
        textAlign: 'center'
    },
    button: {
        background: '#285364', 
        color: '#fff'
    },
    link: {
        textDecoration: 'none'
    }
}

export default NotFound