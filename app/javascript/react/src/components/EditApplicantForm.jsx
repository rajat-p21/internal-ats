import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useState, useEffect } from 'react'
import jobProfileList from './jobProfileList'
import lastStatusList from './lastStatusList'
import { useNavigate } from 'react-router-dom'

const EditApplicantForm = ({applicantData}) => {
    // console.log(applicantData)
    
    const [formField, setFormField] = useState({})
    const applicantURL = `/api/v1/applicants/`

    /* handle all form fields */
    const handleFormField = (event) => {
        setFormField({
            ...formField,
            [event.target.name]: event.target.value
        })
    }

    /* handle form submit */
    const handleFormSubmit = (event) => {
        event.preventDefault()
        
        const data = new FormData()
        if(event.target.name.value) data.append('applicant[name]', event.target.name.value)
        if(event.target.email.value) data.append('applicant[email]', event.target.email.value)
        if(event.target.mobile.value) data.append('applicant[mobile]', event.target.mobile.value)
        data.append('applicant[last_status]', event.target.lastStatus.value)
        data.append('applicant[job_profile]', event.target.jobProfile.value)
        updateForm(data)
    }

    /* patch data via api call  */
    const updateForm = (data) => {
        fetch(applicantURL + `${applicantData.id}`,{
            method: 'PATCH',
            body: data
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                location.reload()
            })
    }



    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit Applicant Details</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={(event) => handleFormSubmit(event)}>
                    <div className="modal-body">
                            {/* { isServerSideError && <ShowServerErrors errors={serverError} /> }
                            { isSubmitted && <ShowSuccessMsg /> } */}
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Full Name</span>
                                <input type="text" name='name' value={formField.name} onChange={(event) => handleFormField(event)} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                            </div>

                            {/* <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Job Profile</label>
                            <select value={formField.jobProfile} name='jobProfile' onChange={(event) => handleFormField(event)} className="form-select" id="inputGroupSelect01">
                                <option>Choose...</option>
                                {jobProfileList.map(jobProfile => (
                                    <option key={jobProfile.value} value={jobProfile.label}>{jobProfile.label}</option>
                                ))}
                            </select>
                            </div> */}

                            <div className="input-group mb-3">
                                <label htmlFor="validationCustom04" className="input-group-text">Department</label>
                                <select value={formField.jobProfile} name='jobProfile' onChange={(event) => handleFormField(event)} className="form-select" id="validationCustom04" required>
                                <option selected disabled value="">Choose...</option>
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

                            {/* <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Last Status</label>
                            <select value={formField.lastStatus} name='lastStatus' onChange={(event) => handleFormField(event)} className="form-select" id="inputGroupSelect01">
                                <option>Choose...</option>
                                {lastStatusList.map(lastStatus => (
                                    <option key={lastStatus.value} value={lastStatus.label}>{lastStatus.label}</option>
                                ))}
                            </select>
                            </div> */}

                            <div className="input-group mb-3">
                                <label htmlFor="validationCustom04" className="input-group-text">Last Status</label>
                                <select value={formField.lastStatus} name='lastStatus' onChange={(event) => handleFormField(event)} className="form-select" id="validationCustom04" required>
                                <option selected disabled value="">Choose...</option>
                                {lastStatusList.map(lastStatus => (
                                    <option key={lastStatus.value} value={lastStatus.label}>{lastStatus.label}</option>
                                ))}
                                </select>
                            </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-success">Save changes</button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </>
    )
}

export default EditApplicantForm