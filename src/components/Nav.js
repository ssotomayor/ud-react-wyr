import React from 'react'
import { Link } from 'react-router-dom'
import Toolbar from 'material-ui-next/Toolbar'
import AppBar from 'material-ui-next/AppBar'
import Logout from './Logout'
import { IconButton } from 'material-ui-next'
import HomeIcon from '@material-ui/icons/Home'
import ListIcon from '@material-ui/icons/List'
import PlayListAddIcon from '@material-ui/icons/PlaylistAdd'

const Nav = () => (
    <AppBar position="static">
        <Toolbar>
            <div style={{ flex: 1 }}>
                <Link to="/" style={{textDecoration:'none'}}>
                    <IconButton color="inherit" aria-label="Menu" style={{color:"#FFF"}}>
                        <HomeIcon />
                    </IconButton>
                </Link>
                <Link to="/leaderboard" style={{textDecoration:'none'}}>
                    <IconButton color="inherit" aria-label="Menu" style={{color:"#FFF"}}>
                        <ListIcon />
                    </IconButton>
                </Link>
                <Link to="/add" style={{textDecoration:'none'}}>
                    <IconButton color="inherit" aria-label="Menu" style={{color:"#FFF"}}>
                        <PlayListAddIcon />
                    </IconButton>
                </Link>
            </div>
            <div style={{ display: 'flex' }}>
                <Logout />
            </div>
        </Toolbar>
    </AppBar>
    )
export default Nav