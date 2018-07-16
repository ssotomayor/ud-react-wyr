import React, { Component, Fragment } from 'react'
import { Button, Paper, Typography } from 'material-ui-next'
import { connect } from 'react-redux'
import { Avatar, Input } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/shared'
import { getAvatar } from '../utils/constants'
import { withRouter } from 'react-router-dom'


class AddQuestion extends Component {

    state = {
        optionOne: '',
        optionTwo: ''
    }

    handleChange = (e, option) => {
        const text = e.target.value
        this.setState(() => ({
          [option]: text
        }))
    }

    render() {

        const {authedUser, users, handleSubmit, history} = this.props

        if(authedUser === null){
            return <Redirect to='/login' />
        }

        return (
            <Fragment>
                <Typography variant="title" color="primary" style={{textAlign: 'center', margin: '5%'}}><strong>Would you rather</strong>...</Typography>
                <Paper style={{width: '75%', margin:'10px auto', textAlign:'center'}}>
                    <div style={{display:'flex', flexWrap: 'wrap', alignItems: 'center'}}>
                        <Avatar style={{margin: '10px', marginLeft: '8%'}} alt="" src={getAvatar(users[authedUser].avatarURL)} />
                        <Typography style={{textAlign: 'left'}}>{users[authedUser].name} asks: <strong>Would you rather</strong>...</Typography>
                        <div style={{flex: '0 0 100%', marginBottom: '3%'}}>
                        <form onSubmit={(e) => handleSubmit(e, this.state.optionOne, this.state.optionTwo, history)}>
                            <Typography variant="caption">Option One</Typography>
                            <Input style={{margin: '5%'}} onChange={(e) => this.handleChange(e, 'optionOne')} />
                            <Typography variant="caption">Option Two</Typography>
                            <Input style={{margin: '5%'}} onChange={(e) => this.handleChange(e, 'optionTwo')} />
                            <Button disabled={(this.state.optionOne === '' || this.state.optionTwo === '')} type="submit" style={{width: '80%', background: '#47ad53'}}>
                                Submit
                            </Button>
                        </form>
                        </div>
                    </div>
                </Paper>
            </Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      handleSubmit: (e, optionOneText, optionTwoText, history) => {
        e.preventDefault()
        const question = {
            optionOneText: optionOneText,
            optionTwoText: optionTwoText
        }

        dispatch(handleAddQuestion(question)).then(() => {
            history.push('/')
        })
      }
    }
}

function mapStateToProps({users, authedUser}){
    return {
        authedUser,
        users
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddQuestion))