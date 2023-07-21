import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useEffect, useState } from 'react'

const NoteEditor = ({id}) => {
    const [text, setText] = useState('');
    const [edit, setEdit] = useState(false);
    const applicantURL = `/api/v1/applicants/`

    /* fetch the current notes on loading */
    const fetchNotes = (id) => {
        fetch(applicantURL + `${id}`)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                setText(data.notes)
            })
    }

    /* handle toggle between input field & paragraph field */
    const handleToggleEdit = () => {
        setEdit(true);
    }

    /* handle text area of note editor */
    const handleTextArea = (event) => {
        setText(event.target.value);
    }

    /* handle submit */
    const handleSubmit = () => {
        const data = new FormData()
        data.append('applicant[notes]', text)
        updateNotes(data)
        setEdit(false)
    }

    /* patch the input data via api call */
    const updateNotes = (data) => {
        fetch(applicantURL + `${id}`,{
            method: 'PATCH',
            body: data
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                setText(data.notes)
            })
    }

    useEffect(() => {
        fetchNotes(id)
    },[])

    return (
        <>
        <div>
        { edit ? (
            <div>
                <textarea className='fs-5 mb-1' value={text} onChange={(event) => handleTextArea(event)} name="text" cols="52" rows="8">
                {text}
                </textarea>
                <button className='btn btn-success' onClick={handleSubmit}>Add</button>
            </div>
        ) : (
            <p className='fs-5' style={{ whiteSpace: 'pre-line' }} onClick={handleToggleEdit}>{text}</p>
        ) }
        </div>
        </>
    )
}

export default NoteEditor;
