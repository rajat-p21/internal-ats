import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ApplicantPage = () => {
    
    const applicantURL = `http://localhost:3000/api/v1/applicants/`
    const [applicantData, setApplicantData] = useState([])
    const { id } = useParams()

    const fetchApplicantData = (id) => {
        fetch(applicantURL + `${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setApplicantData(data)
            })
    }

    useEffect(() => {
        fetchApplicantData(id)
    }, [])

    return (
        <>
            <h1>{applicantData.name}</h1>
            <h2>{applicantData.job_profile}</h2>
        </>
    )
}

export default ApplicantPage