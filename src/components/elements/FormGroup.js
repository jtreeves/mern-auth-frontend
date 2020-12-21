function FormGroup(props) {
    return (
        // <div className="form-field">
            // <label htmlFor={props.label}>{props.display}</label>
            // <input type={props.type} value={props.value} name={props.label} onChange={props.onChange} className="form-control" />
        // </div>

        <div className="form-group">
            <label htmlFor={props.label}>{props.display}</label>
            <input
                type={props.type}
                name={props.label}
                value={props.value}
                onChange={props.onChange}
                className="form-control"
            />
        </div>
    )
}

export default FormGroup