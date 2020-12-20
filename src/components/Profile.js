// Import external dependency
import { Link } from 'react-router-dom'

// Create function
function Profile(props) {
    // Pull current user data from props
    const userData = props.user
    ? (<div>
        <h1>Profile</h1>
        <p><strong>Name:</strong> {props.user.name}</p> 
        <p><strong>Email:</strong> {props.user.email}</p> 
        <p><strong>ID:</strong> {props.user.id}</p> 
    </div>)
    : <h4>Loading...</h4>

    // Display error message if not logged in
    const errorDiv = () => {
        return (
            <div className="text-center pt-4">
                <h3>Please <Link to="/login">login</Link> to view this page</h3>
            </div>
        )
    }
    
    return (
        <div>
            { props.user ? userData : errorDiv() }
        </div>
    )
}

// Export function
export default Profile