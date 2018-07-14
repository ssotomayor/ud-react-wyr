import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListItem, List, Paper, Typography, Avatar, ListItemAvatar, ListItemText, ListItemIcon } from 'material-ui-next'
import StarIcon from '@material-ui/icons/Star'


class Leaderboard extends Component {
    render() {

        const {users, classes} = this.props

        return (
            <div>
            <Paper style={{ width: '75%', margin: '10px auto', textAlign:'center', padding: '25px' }}>
                <List dense={true}>
                {users.map((user, i) => (
                    <ListItem key={user.id} dense button className={classes.listItem} style={{boxShadow: '6px 6px 6px 2px #333', marginTop: '10px'}}>
                        <ListItemAvatar>
                            <Avatar alt={user.name} src={user.avatarURL} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={user.name}
                            secondary={`Answered: ${user.answered} | Asked: ${user.asked}`}
                        />
                        {i === 0 && <ListItemIcon color="primary">
                            <StarIcon />
                        </ListItemIcon>}
                        <Typography variant="display2" style={{textAlign: 'right'}}>{user.asked + user.answered}
                        </Typography>
                    </ListItem>
                ))}
                </List>
            </Paper>
            </div>
        )
    }
}

const mapStateToProps = ({users}, classes) => {
    return {
        users: users ?
            Object.values(users)
            .map(({ id, name, avatarURL, answers, questions}) => ({
                id,
                name,
                avatarURL,
                asked: questions ?
                    questions.length :
                    0,
                answered: answers ?
                    Object.keys(answers).length :
                    0,
            }))
            .sort((a, b) => (b.asked + b.answered) - (a.asked + a.answered)) :
            [],
            classes
    }
};

export default connect(mapStateToProps)(Leaderboard)