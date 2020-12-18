// require('dotenv').config()
import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL
// import keys from '../utils/credentials'
// const { REACT_APP_SERVER_URL } = keys

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const userData = {email, password}
        axios
            .post(`${REACT_APP_SERVER_URL}/controllers/users/login`, userData)
            .then(response => {
                const {token} = response.data
                // Save token to localStorage
                localStorage.setItem('jwtToken', token)
                // Set token to auth header
                setAuthToken(token)
                // Decode token to get user data
                const decoded = jwt_decode(token)
                // Set current user
                props.nowCurrentUser(decoded)
            })
            .catch(error => {
                console.log(`LOG ERROR: ${error}`)
            })
    }

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

export default Login