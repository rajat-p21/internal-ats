import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import ApplicantList from './ApplicantList'

const HomePage = () => {
    return (
        <div className='container'>
            <h1 className='text-center mb-3'>Applicant Tracking System (ATS) Dashboard</h1>
            <ApplicantList />
        </div>
    )
}

export default HomePage
