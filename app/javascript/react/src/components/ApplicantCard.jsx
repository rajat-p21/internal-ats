import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ApplicantCard = ({applicant}) => {
    const navigate = useNavigate();
    const applicantURL = `http://localhost:3000/api/v1/applicants/${applicant.id}` 
    const handleViewProfileButton = () => {
        navigate(`applicant/${applicant.id}`)
    }

    return (
        <div className='card rounded-2 mt-3'>
            <div className='card-body d-flex' >
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQq6gaTf6N93kzolH98ominWZELW881HqCgw&usqp=CAU" width={180} className='img-fluid me-4' alt="profile pic" />
                <div>
                    <h5 className='card-title'>{applicant.name}</h5>
                    <h5 className='card-subtitle text-muted'>{applicant.job_profile}</h5>
                    <div>
                        <div className='bg-light rounded-1'>&nbsp;📧 : {applicant.email}</div>
                        <div className='bg-light rounded-1' style={{marginBottom: '3px'}}>&nbsp;📞 : {applicant.mobile}</div>
                        <div className='bg-warning rounded-1' style={{marginBottom: '5px'}}>&nbsp;Last Status: {applicant.last_status}</div>
                    </div>
                    <div className='column'>
                        <button type='button' className='btn btn-primary me-3' onClick={handleViewProfileButton}>View Profile</button>
                        <button type='button' className='btn btn-secondary'>Download Resume</button>
                    </div>
                </div>
            </div>
    </div>
    )
}

export default ApplicantCard