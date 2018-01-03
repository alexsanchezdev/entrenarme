import React from 'react'
import {Grid, Typography} from 'material-ui'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Paper from 'material-ui/Paper/Paper';
import Button from 'material-ui/Button/Button';
import { fetchMoreQuestions } from '../actions/questions'
import background from '../img/sports_bg.png'

class SearchResults extends React.Component {

    state = {
        //TODO: fix morePage value on new search
        morePage: 1,
        moreMaxPage: 0,
        showMoreButton: false
    }

    componentWillReceiveProps(nextProps) {
        const {questions, total} = nextProps
        const moreMaxPage = Math.ceil(total / 5)

        if (Object.keys(questions).length < total) {
            this.setState({ moreMaxPage, showMoreButton: true })
        } else {
            this.setState({ moreMaxPage, showMoreButton: false })
        }  
    }

    handleQuestionClick = (id) => {
        const { history } = this.props
        history.push(`/question/${id}`)
    }

    handleShowMore = () => {
        const { morePage, moreMaxPage } = this.state
        const { dispatch, keyword } = this.props

        if (morePage <= moreMaxPage) {
            this.props.dispatch(fetchMoreQuestions(morePage, keyword))
            this.setState({morePage: morePage + 1}, () => {
                console.log(morePage)
                console.log(moreMaxPage)
                if (morePage + 1 === moreMaxPage) {
                    this.setState({showMoreButton: false})
                }
            })
        }
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
                    {this.state.showMoreButton ? <Button raised color='primary' onClick={() => this.handleShowMore()}>CARGAR MÁS</Button> : null}
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
        keyword: questions.keyword
        
    }
}

export default withRouter(connect(mapStateToProps)(SearchResults))