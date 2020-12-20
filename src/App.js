// Import external dependencies
import { useEffect, useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

// Import internal utilities
import setAuthToken from './utils/setAuthToken'

// Import internal components
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Welcome from './components/Welcome'
import About from './components/About'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile'

// Import internal CSS
import './App.css'

// Create private route
function PrivateRoute({component: Component, ...rest}) {
    const user = localStorage.getItem('jwtToken')
    return <Route {...rest} render={(props) => {
        return user ? <Component {...rest} {...props} /> : <Redirect to="/login" />
    }} />
}

// Create function for the main operations of the app
function App() {
    //  Set initial state values
    const [currentUser, setCurrentUser] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(true)

    // Implement useEffect
    useEffect(() => {
        let token
        if (!localStorage.getItem('jwtToken')) {
            setIsAuthenticated(false)
        } else {
            token = jwt_decode(localStorage.getItem('jwtToken'))
            setAuthToken(localStorage.jwtToken)
            setCurrentUser(token)
        }
    }, [])

    // Establish current user
    const nowCurrentUser = (userData) => {
        setCurrentUser(userData)
        setIsAuthenticated(true)
    }

    // Log out user
    const handleLogout = () => {
        if (localStorage.getItem('jwtToken')) {
            localStorage.removeItem('jwtToken')
            setCurrentUser(null)
            setIsAuthenticated(false)
        }
    }

    return (
        <div className="App">
            <Navigation handleLogout={handleLogout} isAuth={isAuthenticated} />
            <div className="container mt-5">
                <Switch>
                    <Route path="/signup" component={Signup} />
                    <Route
                        path="/login"
                        render={(props) => {
                            return <Login
                                {...props}
                                nowCurrentUser={nowCurrentUser}
                                setIsAuthenticated={setIsAuthenticated}
                                user={currentUser}
                            />
                        }}
                    />
                    <Route path="/about" component={About} />
                    <PrivateRoute
                        path="/profile"
                        component={Profile}
                        user={currentUser}
                    />
                    <Route exact path="/" component={Welcome} />
                </Switch>
            </div>
            <Footer />
        </div>
    )
}

// Export funtion
export default App