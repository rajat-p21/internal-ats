import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useState, useEffect } from 'react'

const ShowPDF = ({id}) => {

    const resumeURL = `/applicants/${id}/resume`

    return (
        <>
            <object
                data={`/applicants/${id}/resume`}
                type="application/pdf"
                width="100%"
                height="500px"
            >
                <p>
                    Your browser does not support PDFs. You can download the PDF{' '}
                    <a href='#'>here</a>.
                </p>
            </object>
        </>
    )
}

export default ShowPDF