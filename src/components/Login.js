import React, { Component } from 'react'
import { connect } from 'react-redux'
import MenuItem from '@material-ui/core/MenuItem'
import Button from 'material-ui-next/Button'
import Paper from 'material-ui-next/Paper'
import { Typography, Select, InputLabel } from '@material-ui/core'
import { FormControl, withStyles } from 'material-ui-next'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

const styles = theme => ({
    button: {
        display: 'block',
        marginTop: theme.spacing.unit * 2,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
})
  

class Login extends Component {
    state = {
        user: '',
        error: false,
        toHome: false
      }
    
    handleChange = (e) => {
        e.preventDefault()
        this.setState({ [e.target.name]: e.target.value }, () => {
            // console.log(this.state.user)
        })
    }

    handleLogin = (e) => {
        e.preventDefault()
        if (this.state.user !== ''){
            this.props.dispatch(setAuthedUser(this.state.user))
            this.setState({error:false, toHome: true})
        } else this.setState({error:true})
    }

    render() {
        const {toHome} = this.state

        if(toHome){
            return <Redirect to='/' />
        }

        const { users, classes } = this.props
        return (
            <div>
            <Typography style={{ textAlign: 'center', margin: '5%' }} variant='display1'>Login</Typography>
            <Paper style={{ width: '35%', margin: 'auto', textAlign:'center', padding: '25px' }}>
            <FormControl className={classes.formControl} style={{ width: '100%', margin: 'auto', textAlign:'center' }}>
                <InputLabel htmlFor="user-select">Select User</InputLabel>
                    <Select
                        style={{marginBottom: '25px',}}
                        onChange={this.handleChange}
                        value={this.state.user}
                        inputProps={{
                        name: 'user',
                        id: 'user-select',
                        }}>
                        {users.map((user) => 
                            <MenuItem key={user.id} value={user.id}>{user.avatarURL && <img src={user.avatarURL} style={{borderRadius: '100%', margin: '5px', marginBottom: '0px'}} width='25' height='25' alt=""/>} {user.name}</MenuItem>
                        )}
                </Select>
            </FormControl>
            <Button onClick={this.handleLogin} style={{width: '100%', background: '#47ad53'}}>
                Sign In
            </Button>
            {this.state.error && <Typography variant="caption" style={{color:'#FFEB3B', marginTop: '.6em'}} gutterBottom>Select a user</Typography>}
            </Paper>
            </div>
        )
    }
}

function mapStateToProps({users}){
    return {
        users: users ? Object.values(users).map(({ id, name, avatarURL }) => ({ id, name, avatarURL })) : [],
    }
}

export default withStyles(styles)(connect(mapStateToProps)(Login))