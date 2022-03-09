import React from 'react'

const AlertBlock = props => {
    return (
        <div className="alert alert-primary" role="alert">
            <p>Status: {props.status}</p>
            <p>Message: {props.message}</p>

        </div>
    )
}

export default AlertBlock