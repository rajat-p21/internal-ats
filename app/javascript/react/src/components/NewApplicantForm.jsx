import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useState, useEffect } from 'react'
import jobProfileList from './jobProfileList'
import lastStatusList from './lastStatusList'
import ShowServerErrors from './ShowServerErrors'
import ShowSuccessMsg from './ShowSuccessMsg'

const NewApplicantForm = () => {

    const [formField, setFormField] = useState({
        name: '', jobProfile: '', mobile: '', email: '', lastStatus: ''
    })

    const [isServerSideError, setIsServerSideError] = useState(false)
    const [serverError,setServerError] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleFormField = (event) => {
        setFormField({
            ...formField,
            [event.target.name]: event.target.value
        })
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        // console.log(formField)
        const data = {
            name: formField.name,
            email: formField.email,
            mobile: formField.mobile,
            job_profile: formField.jobProfile,
            last_status: formField.lastStatus
        }
        createForm(data)
    }

    const createForm = (data) => {
        fetch('api/v1/applicants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            // console.log('success', data)
            if(data.status === 'failure')
            {
                setIsServerSideError(true)
                setServerError(data['data'])
            } else {
                setIsServerSideError(false)
                setServerError([])
                setIsSubmitted(true)
                setFormField({
                    name: '',
                    email: '',
                    mobile: '',
                    jobProfile: '',
                    lastStatus: ''
                })
            }
        })
        .catch((error) => {
            console.log('error', error)
        })
    }

    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add Applicant Details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={(event) => handleFormSubmit(event)}>
                        <div className="modal-body">
                            { isServerSideError && <ShowServerErrors errors={serverError} /> }
                            { isSubmitted && <ShowSuccessMsg /> }
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Full Name</span>
                                <input type="text" name='name' value={formField.name} onChange={(event) => handleFormField(event)} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                            </div>

                            <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Job Profile</label>
                            <select value={formField.jobProfile} name='jobProfile' onChange={(event) => handleFormField(event)} className="form-select" id="inputGroupSelect01">
                                <option>Choose...</option>
                                {jobProfileList.map(jobProfile => (
                                    <option key={jobProfile.value} value={jobProfile.label}>{jobProfile.label}</option>
                                ))}
                            </select>
                            </div>

                            <div className="input-group mb-3">
                                <span htmlFor="exampleFormControlInput1" className="input-group-text" id="inputGroup-sizing-default">Email</span>
                                <input type="email" name='email' onChange={(event) => handleFormField(event)} className="form-control" id="exampleFormControlInput1" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder='name@example.com' />
                            </div>

                            <div className="input-group mb-3 ">
                                <span className="input-group-text" id="inputGroup-sizing-default">Contact Number</span>
                                <input type="tel" pattern='.{10}' name='mobile' value={formField.mobile} onChange={(event) => handleFormField(event)} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder='10-digit' />
                            </div>

                            <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Last Status</label>
                            <select value={formField.lastStatus} name='lastStatus' onChange={(event) => handleFormField(event)} className="form-select" id="inputGroupSelect01">
                                <option>Choose...</option>
                                {lastStatusList.map(lastStatus => (
                                    <option key={lastStatus.value} value={lastStatus.label}>{lastStatus.label}</option>
                                ))}
                            </select>
                            </div>

                            <div className="input-group mb-3">
                                <label className="input-group-text" htmlFor="inputGroupFile01">Upload Resume</label>
                                <input type="file" className="form-control" id="inputGroupFile01" />
                            </div>
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-outline-success">Submit</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewApplicantForm