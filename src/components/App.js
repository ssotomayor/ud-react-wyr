import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import Nav from './Nav'
import { Helmet } from 'react-helmet'
import Home from './Home'
import AnswerQuestion from './AnswerQuestion'
import Leaderboard from './Leaderboard'
import AddQuestion from './AddQuestion'
import FourOhFour from './FourOhFour'
import FadeIn from 'react-fade-in'

class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <Nav />
                    <LoadingBar />
                    <div className="App">
                            <Helmet>
                                <style>{'body { background-color: #333333 }'}</style>
                            </Helmet>
                            {
                            this.props.loading === true 
                            ? null
                            : <Fragment>
                                <FadeIn>
                                    <Switch>
                                        <Route path='/login' exact component={Login} />
                                        <Route path='/' exact component={Home} />
                                        <Route path='/questions/:id' exact component={AnswerQuestion} />
                                        <Route path='/leaderboard' exact component={Leaderboard} />
                                        <Route path='/add' exact component={AddQuestion} />
                                        <Route component={FourOhFour} />
                                    </Switch>
                                </FadeIn>
                            </Fragment>
                            }
                    </div>
                </Fragment>
            </Router>
        )
    }
}

const mapStateToProps = ({ users, questions }) => {
    return {
        loading: Object.keys(users).length === 0 && Object.keys(questions).length === 0
    }
}

export default connect(mapStateToProps)(App)