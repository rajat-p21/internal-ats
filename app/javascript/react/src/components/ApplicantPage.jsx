import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import NoteEditor from './NoteEditor'
import EditApplicantForm from './EditApplicantForm'

const ApplicantPage = () => {
    
    const applicantURL = `http://localhost:3000/api/v1/applicants/`
    const [applicantData, setApplicantData] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
    const [date,setDate] = useState('')
    const [time,setTime] = useState('')

    const ConvertTime = (str) => {
        // Input string
        const inputString = str;

        // Convert to Date object
        const dateObj = new Date(inputString);

        // Extract date (DD:MM:YYYY)
        const dateStr = ("0" + dateObj.getDate()).slice(-2) + "/" +
                    ("0" + (dateObj.getMonth() + 1)).slice(-2) + "/" +
                    dateObj.getFullYear();

        // Extract time (HH:MM)
        const timeStr = ("0" + dateObj.getHours()).slice(-2) + ":" +
                    ("0" + dateObj.getMinutes()).slice(-2);

        // Output
        setDate(dateStr)
        setTime(timeStr)
        // console.log("Date:", dateStr);
        // console.log("Time (UTC+5:30):", timeStr);
    }

    const handleHomeBtn = () => {
        navigate('/')
    }

    const fetchApplicantData = (id) => {
        fetch(applicantURL + `${id}`)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                setApplicantData(data)
                ConvertTime(data.updated_at)
            })
    }

    useEffect(() => {
        fetchApplicantData(id)
    }, [])

    return (
        <>
        <div>
            <div className="container mt-4">
                <div className="row mb-2">
                    <div className="col me-2">
                        <div className="card">
                        <div className='d-flex'>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQq6gaTf6N93kzolH98ominWZELW881HqCgw&usqp=CAU" className="img-fluid" width={180} alt="prifile pic"/>
                            <div className="card-body text-center align-self-center">
                                <h2 className="card-title ">{applicantData.name}</h2>
                                <h2 className="bg-warning rounded-2">&nbsp;{applicantData.job_profile}</h2>
                            </div>
                        </div>
                        <ul className="list-group list-group-flush fs-5 text-center">
                            <li className="bg-light list-group-item">Email: <a href='https://mail.google.com/mail/u/0/#inbox?compose=new' target='_blank'>{applicantData.email}</a></li>
                            <li className="list-group-item">Phone Number: {applicantData.mobile}</li>
                            <li className="bg-light list-group-item">Last Status: {applicantData.last_status}</li>
                        </ul>
                        <div className="card-body d-flex justify-content-evenly">
                            <button className='btn btn-primary' onClick={handleHomeBtn}>Home</button>
                            <button className='btn btn-success'>Download Resume</button>
                            <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Edit Details
                            </button>
                            <button className='btn btn-danger'>Delete Profile</button>
                        </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                        <h5 className='card-header'>Write a note...</h5>
                        <div className="card-body">
                            <NoteEditor id={id} />
                        </div>
                        <div className="card-footer text-muted">
                            last updated at {date} {time}
                        </div>
                        </div>
                    </div>
                </div>
                <div className='justify-content-around align-items-center'>
                    <h3>Resume Preview</h3>
                    <div>
                        {applicantData.resume_url}
                    </div>
                </div>
            </div>
            <EditApplicantForm applicantData={applicantData} />
        </div>
        </>
    )
}

export default ApplicantPage