import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useState, useEffect } from 'react'
import ApplicantCard from './ApplicantCard'
import NewApplicantForm from './NewApplicantForm'
import jobProfileList from './jobProfileList'
import ShowEmptyListMsg from './ShowEmptyListMsg'

const ApplicantList = () => {

    const [applicantList, setApplicantList] = useState([])
    const applicantsURL = '/api/v1/applicants'

    const [filterOption, setFilterOption] = useState('All')
    const [searchField, setSearchField] = useState('')

    const fetchApplicantList = () => {
        fetch(applicantsURL)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                data.reverse()
                setApplicantList(data)
            })
    }

    const handleFilter = (event) => {
        setApplicantList([])
        setFilterOption(event.target.value)
        fetch(applicantsURL + `?job_profiles=${event.target.value}`)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                setApplicantList(data)
            })
    }

    const handleSearchField = (event) => {
        setSearchField(event.target.value)
    }

    const handleSearchClick = () => {
        setApplicantList([])
        fetch(applicantsURL + `?q=${searchField}`)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                setApplicantList(data)
            })
    }

    useEffect(() => {
        fetchApplicantList()
    }, [])

    return (
        <div className='container'>
            <div className='d-flex justify-content-around align-items-center'>
                <button type="button" className="btn btn-primary mt-1 mb-1 me-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Add New Applicant
                </button>
                <button type='button' className='btn btn-success mt-1 mb-1 me-3'>
                Upload .csv file
                </button>
                <div className='input-group me-3 w-40'>
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Filter by Dept.</label>
                    <select value={filterOption} onChange={(event) => handleFilter(event)} className="form-select" id="inputGroupSelect01">
                        <option>All</option>
                        {jobProfileList.map((jobProfile) => (
                            <option value={jobProfile.label} key={jobProfile.value}>{jobProfile.label}</option>
                        ))}
                    </select>
                </div> 
                <div className="input-group w-25">
                    <input type="text" value={searchField} onChange={(event) => handleSearchField(event)} className="form-control" placeholder="Search by name or status" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <button className="btn btn-outline-primary" type="button" onClick={handleSearchClick}><i className="bi bi-search"></i></button>
                    </div>
                </div>
            </div>
            <div className='row'>
                { applicantList.length > 0 ? applicantList.map((applicant) =>
                    <div key={applicant.id} id='cardItem' className='col-lg-10 mx-auto'>
                        <ApplicantCard applicant={applicant} />
                    </div>  
                ) : <ShowEmptyListMsg/>
                } 
            </div>
            <NewApplicantForm />
        </div>
    )
}

export default ApplicantList