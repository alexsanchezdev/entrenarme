import React from 'react'
import { Grid, Paper, Typography, CircularProgress} from 'material-ui'
import { NavLink } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import * as Entrenarme from '../helpers/EntrenarmeAPI'
import Divider from 'material-ui/Divider/Divider';
import indigo from 'material-ui/colors/indigo';

class Question extends React.Component {

    state = {
        text: 'Cargando pregunta...',
        answers: undefined
    }

    componentDidMount() {
        const { id } = this.props.match.params
        Entrenarme.getQuestion(id).then((res) => {
            res.json().then((result) => {
                console.log(result)
                this.setState({text: result.text, answers: result.answers})
            })
        })
    }

    render() {
        const { answers, text } = this.state
        return (
            <Grid container justify='center' alignItems='center' style={styles.container}>
                <Grid item xs={12} md={8}>
                    <Paper style={styles.paper}>
                        <NavLink to='/search' style={styles.link}>
                            <Typography style={styles.linkText}>Volver</Typography>
                        </NavLink>
                        <br/>
                        <Typography>{text}</Typography>
                        <br/>
                        <Typography type='body2'>Respuestas de los entrenadores</Typography>
                        <br/>
                        <div style={{ height: 300, overflowY: 'auto', border: '1px solid #ddd'}}>
                            {answers 
                                ? <div>{answers.map((answer, index) => (
                                    <div key={answer.id} style={{margin: 20}}>
                                        <p>{ ReactHtmlParser(answer.text) }</p>
                                        { index + 1 < answers.length ? <Divider/> : null}
                                    </div>
                                ))}</div>
                                : <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <CircularProgress/>
                                </div>
                            }
                            
                        </div>
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
    },
    paper: {
        padding: 40, 
    },
    link: {
        textDecoration: 'none'
    },
    linkText: {
        color: indigo[500]
    }
}

export default Question