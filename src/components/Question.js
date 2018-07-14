import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

class Question extends Component {
    render() {

        const { question, user } = this.props

        return (
                <Fragment>
                        <Avatar alt="" src={user.avatarURL} />
                        <ListItemText primary={`${user.name} asks: Would you Rather? ${question.optionOne.text}...`} />
                </Fragment>
        )
    }
}

function mapStateToProps({questions, users}, {id}){
    const question = questions[id]
    const user = users[question.author]

    return {
        question,
        user: user ? user : null,
        id
    }
}

export default connect(mapStateToProps)(Question)