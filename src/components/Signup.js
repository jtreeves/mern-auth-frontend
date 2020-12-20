// Import external dependencies
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

// Create shortcut for environmental variable
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

// Create function
function Signup() {
    // Set initial state values
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [redirect, setRedirect] = useState(false)

    // Set name from form
    const handleName = (e) => {
        setName(e.target.value)
    }

    // Set email from form
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    // Set password from form
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    // Set confirm password from form
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

    // Submit form data
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            // Check that passwords match
            if (password === confirmPassword) {
                // Check password length
                if (password.length >= 8) {
                    // Create new user if pass both checks
                    const newUser = {name, email, password}
                    await axios.post(`${REACT_APP_SERVER_URL}/users/signup`, newUser)    
                    setRedirect(true)
                } else {
                    // Alert user if password too short
                    alert('Password must be at least 8 characters long')
                }
            } else {
                // Alert user if passwords do not match
                alert('Passwords must match')
            }
        } catch(error) {
            console.log(`SIGNUP ERROR: ${error}`)
        }
    }

    // Redirect to login page
    if (redirect) return <Redirect to="/login" />

    return (
        <div className="row mt-4 col-md-7 offset-md-3 card card-body">
            <h1 className="py-2">Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleName}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleEmail}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handlePassword}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPassword}
                        className="form-control"
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary float-right"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

// Export function
export default Signup