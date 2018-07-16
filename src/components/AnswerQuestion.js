import React, { Component } from 'react'
import { Button, Paper, Typography } from 'material-ui-next'
import { connect } from 'react-redux'
import { Avatar } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { handleUserAnswer } from '../actions/shared'
import FourOhFour from '../components/FourOhFour'
import { getAvatar } from '../utils/constants'

class AnswerQuestion extends Component {
    handleAnswer(e, answer) {
        e.preventDefault()
        const { dispatch, authedUser, question } = this.props
        const qid = question.id

        dispatch(handleUserAnswer({authedUser, answer, qid}))
    }

    average(option) {
        const { question } = this.props
        const total = question.optionOne.votes.length + question.optionTwo.votes.length
        return (option.votes.length / total * 100).toFixed(2)
    }

    isSelectedOption (option) {
        const { authedUser } = this.props
        return option.votes.includes(authedUser)
    }

    isQuestionAnswered() {
        const { authedUser, question } = this.props

        return question.optionOne.votes.includes(authedUser) 
        || question.optionTwo.votes.includes(authedUser)
    }

    render() {

        const {author, question, authedUser} = this.props
        
        if(question === null || question === undefined) {
            return <FourOhFour />
        }

        if(authedUser === null){
            return <Redirect to='/login' />
        }


        return (
            <Paper style={{width: '75%', margin:'10px auto', textAlign:'center'}}>
            {this.isQuestionAnswered() ? (
                    <div style={{display:'flex', flexWrap: 'wrap', alignItems: 'center'}}>
                        <Avatar style={{margin: 10, marginLeft: '8%'}} alt="" src={getAvatar(author.avatarURL)} />
                        <Typography style={{textAlign: 'left'}}>{author.name} asks: <strong>Would you rather</strong>...</Typography>
                        <div style={{flex: '0 0 100%', marginBottom: '3%'}}>
                            <Typography variant="caption">{question.optionOne.votes.length} of {question.optionOne.votes.length + question.optionTwo.votes.length} voted </Typography>
                            <Button color={this.isSelectedOption(question.optionOne) ? "secondary" : "default"}>{question.optionOne.text} (%{this.average(question.optionOne)})</Button>
                            <Typography variant="caption">{question.optionTwo.votes.length} of {question.optionOne.votes.length + question.optionTwo.votes.length} voted </Typography>
                            <Button color={this.isSelectedOption(question.optionTwo) ? "secondary" : "default"}>{question.optionTwo.text} (%{this.average(question.optionTwo)})</Button>
                        </div>
                        <div style={{flex: '0 0 100%', marginBottom: '3%'}}>
                            <Typography style={{textAlign: 'center'}} color="secondary">You answered: <span style={{textTransform: 'uppercase', fontWeight: 'bold'}}>{this.isSelectedOption(question.optionOne) ? question.optionOne.text : question.optionTwo.text}</span></Typography>
                        </div>
                    </div>
                ) : (
                    <div style={{display:'flex', flexWrap: 'wrap', alignItems: 'center'}}>
                        <Avatar style={{margin: 10, marginLeft: '8%'}} alt="" src={getAvatar(author.avatarURL)} />
                        <Typography style={{textAlign: 'left'}}>{author.name} asks: <strong>Would you rather</strong>...</Typography>
                        <div style={{flex: '0 0 100%', marginBottom: '3%'}}>
                            <Button onClick={(e) => this.handleAnswer(e, 'optionOne')}>{question.optionOne.text}</Button>
                            <Button onClick={(e) => this.handleAnswer(e, 'optionTwo')}>{question.optionTwo.text}</Button>
                        </div>
                    </div>
                )}
            </Paper>
        )
    }
}

function mapStateToProps({questions, users, authedUser}, props){
    const id = props.match.params.id
    const question = questions[id]

    return {
        question: question ? question : null,
        author: question ? users[question.author] : null,
        authedUser
    }
}

export default connect(mapStateToProps)(AnswerQuestion)