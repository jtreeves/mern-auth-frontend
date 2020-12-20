// Import external dependencies
import { useEffect, useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

// Import internal utilities
import setAuthToken from './utils/setAuthToken'

// Import internal components
import Nav from './components/Nav'
import Footer from './components/Footer'
import Welcome from './components/Welcome'
import About from './components/About'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile'

// Import internal CSS
import './App.css'

// Create private route
const PrivateRoute = ({component: Component, ...rest}) => {
    const user = localStorage.getItem('jwtToken')
    return <Route {...rest} render={(props) => {
        return user ? <Component {...rest} {...props}/> : <Redirect to="/login"/>
    }}/>
}

// Create function for the main operations of the app
function App() {
    //  Set state values
    const [currentUser, setCurrentUser] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(true)

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

    const nowCurrentUser = (userData) => {
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