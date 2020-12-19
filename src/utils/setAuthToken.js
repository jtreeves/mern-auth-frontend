import axios from 'axios'

// Add the authorized user's JWT to the request header
// Any protected routes will require the JWT to access them

const setAuthToken = (token) => {
    if (token) {
        // Apply the token to every request header
        axios.defaults.headers.common['Authorization'] = token
        console.log(`LOG AXIOS DEFAULTS HEADERS COMMON: ${axios.defaults.headers.common}`)
    } else {
        delete axios.defaults.headers.common['Authorization']   
    }
}

export default setAuthToken