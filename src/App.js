import React, { useEffect, useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import Welcome from './components/Welcome'
import Nav from './components/Nav'
import { Component } from 'react'

import './App.css'

const privateRoute = ({component: Component, ...rest}) => {
    const user = localStorage.getItem('jwtToken')
    return <Route {...rest} render={(props) => {
        return user ? <Component {...rest} {...props}/> : <Redirect to="/login"/>
    }}/>
}

function App() {
    return (
        <div className="App">
            {/* <Nav /> */}
            <Welcome />
        </div>
    )
}

export default App