import React from 'react'
import {Grid, Typography, Paper, Button} from 'material-ui'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchMoreQuestions} from '../actions/questions'
import {updateMorePage} from '../actions/ui'
import ReactHtmlParser from 'react-html-parser'
import styled from 'styled-components'
import background from '../img/sports_bg.png'

class SearchResults extends React.Component {

    renderText = (text, wordsToBold) => {
        const { keyword } = this.props
        return text.replace(new RegExp('(\\b)(' + [keyword].join('|') + ')(\\b)','ig'), '$1<b>$2</b>$3')
    }

    handleQuestionClick = (id) => {
        const {history} = this.props
        history.push(`/question/${id}`)
    }

    handleShowMore = () => {
        const {morePage, dispatch, keyword} = this.props
        dispatch(fetchMoreQuestions(morePage, keyword))
        dispatch(updateMorePage(morePage + 1))
    }

    render() {
        const {questions, total, searchIsLoading} = this.props
        return (
            <Grid item xs={12} md style={styles.resultsContainer}>
                <ResultsCounter>
                    {searchIsLoading
                        ? <p>Cargando...</p>
                        : <p>Mostrando {Object.keys(questions).length} de {total} resultados</p>}
                </ResultsCounter>
                <ResultsWrapper>
                    {questions.map(value => (
                            <Paper key={value.id} onClick={() => this.handleQuestionClick(value.id)} style={styles.resultCard}>
                                <Typography>{ ReactHtmlParser(this.renderText(value.text)) }</Typography>
                                <br/>
                                <Typography type='body2'>{value.answers} respuestas de entrenadores</Typography>
                            </Paper>
                    ))}
                    <Grid item style={styles.buttonWrapper}>
                        {Object
                            .keys(questions)
                            .length < total
                            ? <Button raised color='primary' onClick={() => this.handleShowMore()}>CARGAR MÁS</Button>
                            : null}
                    </Grid>
                </ResultsWrapper>
            </Grid>

        )
    }
}

const ResultsCounter = styled.div `
    background: #115566;
    padding-left: 20px;
    padding-right: 20px;
    color: #fff; 
    position: fixed; 
    top: 0;
    right: 0;
`;

const ResultsWrapper = styled.div `
    background-image: url(${background});
    padding: 20px;
    padding-top: 72px;
    height: calc(100% - 92px);
    overflow-y: scroll
`;

const styles = {
    resultsContainer: {
        height: '100%',
        padding: 0
    },
    resultCard: {
        padding: 20,
        marginBottom: 16
    },
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'center'
    }
}

const mapStateToProps = ({questions, ui}) => {

    return {
        total: questions.total,
        questions: Object
            .keys(questions)
            .filter((value) => value !== 'total')
            .filter((value) => value !== 'keyword')
            .map((key) => questions[key])
            .reverse(),
        keyword: questions.keyword,
        searchIsLoading: ui.searchIsLoading,
        morePage: ui.morePage
    }
}

export default withRouter(connect(mapStateToProps)(SearchResults))