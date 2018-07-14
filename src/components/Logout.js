import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IconButton } from 'material-ui-next'
import { setAuthedUser } from '../actions/authedUser'
import ExitIcon from '@material-ui/icons/ExitToApp'

class Logout extends Component {
    handleLogOut(e) {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(setAuthedUser(null))
    }

    render() {
        const { authedUser } = this.props
        if(authedUser === null){
            return <span></span>
        }
        return (
             <div>
                <IconButton onClick={(e) => this.handleLogOut(e)} color="inherit" aria-label="Menu" style={{color:"#FFF"}}>
                    <ExitIcon />
                </IconButton>
            </div>
        )
    }
}

function mapStateToProps({authedUser}){
    return { 
        authedUser 
    }
}

export default connect(mapStateToProps)(Logout)