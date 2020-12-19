// Imports
import React, { useEffect, useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

// Utilities
import setAuthToken from './utils/setAuthToken'

// Components
import Nav from './components/Nav'
import Footer from './components/Footer'
import Welcome from './components/Welcome'
import About from './components/About'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile'

// CSS
import './App.css'

const PrivateRoute = ({component: Component, ...rest}) => {
    const user = localStorage.getItem('jwtToken')
    return <Route {...rest} render={(props) => {
        return user ? <Component {...rest} {...props}/> : <Redirect to="/login"/>
    }}/>
}

function App() {
    //  Set state values
    const [currentUser, setCurrentUser] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(true)

    useEffect(() => {
        let token
        // If there is a token in localStorage, but the user is not authenticated
        if (!localStorage.getItem('jwtToken')) {
            setIsAuthenticated(false)
        } else {
            token = jwt_decode(localStorage.getItem('jwtToken'))
            setAuthToken(localStorage.jwtToken)
            setCurrentUser(token)
        }
    }, [])

    const nowCurrentUser = (userData) => {
        // console.log(`LOG NOWCURRENTUSER IS HERE...`)
        setCurrentUser(userData)
        setIsAuthenticated(true)
    }

    const handleLogout = () => {
        if (localStorage.getItem('jwtToken')) {
            localStorage.removeItem('jwtToken')
            setCurrentUser(null)
            setIsAuthenticated(false)
        }
    }

    return (
        <div className="App">
            <Nav handleLogout={handleLogout} isAuth={isAuthenticated}/>
            <div className="container mt-5">
                <Switch>
                    <Route path="/signup" component={Signup}/>
                    <Route
                        path="/login"
                        render={(props) => {
                            return <Login
                                {...props}
                                nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated}
                                user={currentUser}
                            />
                        }}
                    />
                    <Route path="/about" component={About}/>
                    <PrivateRoute
                        path="/profile"
                        component={Profile}
                        user={currentUser}
                    />
                    <Route exact path="/" component={Welcome}/>
                </Switch>
            </div>
            <Footer />
        </div>
    )
}

export default App