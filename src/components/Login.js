// Import external dependencies
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

// Import internal utility
import setAuthToken from '../utils/setAuthToken'

// Create shortcut for environmental variable
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

// Create function
function Login(props) {
    // Set initial state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Set email from form
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    // Set password from form
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    // Submit form data
    const handleSubmit = (e) => {
        e.preventDefault()
        const userData = {email, password}
        axios
            .post(`${REACT_APP_SERVER_URL}/users/login`, userData)
            .then(response => {
                // Create token from response data
                const {token} = response.data
                // Store token in local storage
                localStorage.setItem('jwtToken', token)
                // Set token to auth header
                setAuthToken(token)
                // Decode token to get user data
                const decoded = jwt_decode(token)
                // Set current user
                props.nowCurrentUser(decoded)
            })
            .catch(error => {
                console.log(`LOGIN ERROR: ${error}`)
                alert('Either Email or password is incorrect')
            })
    }

    // Redirect to profile page
    if (props.user) return <Redirect to="/profile" />

    return (
        <div className="row mt-4">
            <div className="col-md-7 offset-md-3">
                <div className="card card-body">
                    <h2 className="py-2">Log In</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" value={email} onChange={handleEmail} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={password} onChange={handlePassword} className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

// Export function
export default Login