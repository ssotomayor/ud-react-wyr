import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Typography } from '@material-ui/core'
import Paper from 'material-ui-next/Paper'
import Question from './Question'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import FadeIn from 'react-fade-in'

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    )
  }

class Home extends Component {
    state = {
        value: 0,
      }
    
    handleChange = (event, value) => {
        event.preventDefault()
        this.setState({ value })
    }

    render() {

        const { authedUser, classes, unansweredQuestions, answeredQuestions } = this.props
        const { value } = this.state
        
        if(authedUser === null){
            return <Redirect to='/login' />
        }

        return (
            <div>
                <Paper style={{ width: '75%', margin: '10px auto', textAlign:'center', padding: '25px' }}>
                    <Tabs value={value} style={{color: '#FFF'}} onChange={this.handleChange}>
                        <Tab label="Unanswered Questions" />
                        <Tab label="Answered Questions" />
                    </Tabs>
                    {value === 0 && <TabContainer>
                            <List dense={true}>
                                <FadeIn>
                                {unansweredQuestions.map(questionId => (
                                    <Link key={questionId} to={`/questions/${questionId}`}>
                                        <ListItem dense button className={classes.listItem} style={{boxShadow: '6px 6px 6px 2px #333', marginTop: '10px'}}>
                                            <Question id={questionId} />
                                        </ListItem>
                                    </Link>
                                ))}
                                </FadeIn>
                            </List>
                        </TabContainer>}
                    {value === 1 && <TabContainer>
                        <List dense={true}>
                            <FadeIn>
                            {answeredQuestions.map(questionId => (
                                <Link key={questionId} to={`/questions/${questionId}`}>
                                    <ListItem dense button className={classes.listItem} style={{boxShadow: '6px 6px 6px 2px #333', marginTop: '10px'}}>
                                        <Question id={questionId} />
                                    </ListItem>
                                </Link>
                            ))}
                            </FadeIn>
                        </List>
                    </TabContainer>}
                </Paper>
            </div>
        )
    }
}

function getFilteredQuestions(questions, authedUser){
    let questionsFiltered = {
        answered: Object.keys(questions).filter((qId) => 
        questions[qId].optionOne.votes.includes(authedUser) || 
        questions[qId].optionTwo.votes.includes(authedUser))
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    }

    questionsFiltered.unanswered = Object.keys(questions)
    .filter((ans) => !questionsFiltered.answered.includes(ans))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)

    return questionsFiltered
}

function mapStateToProps({authedUser, questions, users}, classes){

    const { unanswered, answered } = getFilteredQuestions(questions, authedUser)

    return {
        authedUser,
        unansweredQuestions: unanswered.length ? unanswered : [],
        answeredQuestions: answered.length ? answered: [],
        users: users ? users : null,
        classes
    }
}

export default connect(mapStateToProps)(Home)