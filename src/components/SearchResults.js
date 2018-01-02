import React from 'react'
import {Grid, Typography} from 'material-ui'
import {connect} from 'react-redux'
import Paper from 'material-ui/Paper/Paper';
import Button from 'material-ui/Button/Button';
import background from '../img/sports_bg.png'

class SearchResults extends React.Component {
    render() {
        const {questions, total} = this.props
        return (
            <Grid item xs={12} md style={styles.resultsContainer}>
            <div
                style={{
                background: '#115566',
                padding: 20,
                color: '#fff', 
                position: 'fixed', 
                top: 0, 
                right: 0
            }}>
                Mostrando {Object.keys(questions).length} de {total} resultados
            </div>
            <div style={{
                backgroundImage: `url(${background})`,
                padding: 20,
                paddingTop: 72,
                minHeight: 'calc(100% - 92px)',
            }}>
                {questions.map(value => (
                    <div key={value.id}>
                        <Paper
                            style={{
                            padding: 20,
                            marginBottom: 16
                        }}>
                            <Typography>{value.text}</Typography>
                            <br/>
                            <Typography>{value.answers} respuestas de entrenadores</Typography>
                        </Paper>
                    </div>
                ))}

                <Grid
                    item
                    style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Button raised color='primary'>CARGAR MÁS</Button>
                </Grid>
            </div>
        </Grid>
                
        )
    }
}

const styles = {
    resultsContainer: {
        height: '100%',
        padding: 0,
    }
}

const mapStateToProps = ({questions}) => {

    return {
        total: Object
            .keys(questions)
            .filter((value) => value === 'total')
            .map((key) => questions[key]),
        questions: Object
            .keys(questions)
            .filter((value) => value !== 'total')
            .map((key) => questions[key])
    }
}

export default connect(mapStateToProps)(SearchResults)