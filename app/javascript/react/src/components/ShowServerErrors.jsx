import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useState, useEffect } from 'react'

const ShowServerErrors = ({errors}) => {
    return (
        <>
            <p className='lead fw-bold'>Please fix the errors below</p>
            { errors.map((error, index) => (
                <p className='text-danger' key={index}>{error}</p>
            ))}
        </>
    )
}

export default ShowServerErrors