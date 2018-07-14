import React from 'react'
import { Paper } from 'material-ui-next'
import { Typography, Button } from 'material-ui-next'
import { Link } from 'react-router-dom'

function FourOhFour() {
    return (
        <Paper style={{width: '75%', textJustify:'center', textAlign:'center', margin:'5% auto', padding: '5%'}}>
            <Typography variant="title" color="primary">404. Oops! Wrong URL ? </Typography>

            <Button component={Link} to="/">
                Take me Home !
            </Button>
        </Paper>
    )
}

export default FourOhFour
