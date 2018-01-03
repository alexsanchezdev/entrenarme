import React from 'react'
import {Grid, Typography} from 'material-ui'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Paper from 'material-ui/Paper/Paper';
import Button from 'material-ui/Button/Button';
import { fetchMoreQuestions } from '../actions/questions'
import { updateMorePage } from '../actions/ui'
import background from '../img/sports_bg.png'

class SearchResults extends React.Component {

    handleQuestionClick = (id) => {
        const { history } = this.props
        history.push(`/question/${id}`)
    }

    handleShowMore = () => {
        const { morePage, dispatch, keyword} = this.props
        dispatch(fetchMoreQuestions(morePage, keyword))
        dispatch(updateMorePage(morePage + 1))
    }

    render() {
        const {questions, total, searchIsLoading} = this.props
        return (
            <Grid item xs={12} md style={styles.resultsContainer}>
            <div
                style={{
                background: '#115566',
                paddingLeft: 20,
                paddingRight: 20,
                color: '#fff', 
                position: 'fixed', 
                top: 0, 
                right: 0
            }}>
                {searchIsLoading ? <p>Cargando...</p> : <p>Mostrando {Object.keys(questions).length} de {total} resultados</p>}
            </div>
            <div style={{
                backgroundImage: `url(${background})`,
                padding: 20,
                paddingTop: 72,
                height: 'calc(100% - 92px)',
                overflowY: 'scroll'
            }}>
                {questions.map(value => (
                    <div key={value.id}>
                        <Paper
                            onClick={() => this.handleQuestionClick(value.id)}
                            style={{
                            padding: 20,
                            marginBottom: 16
                        }}>
                            <Typography>{value.text}</Typography>
                            <br/>
                            <Typography type='body2'>{value.answers} respuestas de entrenadores</Typography>
                        </Paper>
                    </div>
                ))}

                <Grid
                    item
                    style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    {Object.keys(questions).length < total ? <Button raised color='primary' onClick={() => this.handleShowMore()}>CARGAR MÁS</Button> : null}
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

const mapStateToProps = ({questions, ui}) => {

    return {
        total: questions.total,
        questions: Object
            .keys(questions)
            .filter((value) => value !== 'total')
            .filter((value) => value !== 'keyword')
            .map((key) => questions[key]).reverse(),
        searchIsLoading: ui.searchIsLoading,
        keyword: questions.keyword,
        morePage: ui.morePage,
        
    }
}

export default withRouter(connect(mapStateToProps)(SearchResults))