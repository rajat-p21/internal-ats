import * as React from 'react'
import * as ReactDOM from 'react-dom'

const ShowEmptyListMsg = () => {
    return (
        <>
            <div>
                <div className="alert alert-warning alert-dismissible mt-3 fade show" role="alert">
                    <strong>Oops!</strong> No Profile match available.
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        </>
    )
}

export default ShowEmptyListMsg