import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useState, useEffect } from 'react'

const ShowPDF = ({id}) => {

    const [pdfUrl, setPdfUrl] = useState('')
    const resumeURL = `http://localhost:3000/applicants/`
    const fetchPdf = () => {
        fetch(resumeURL + `${id}/resume`, { method: 'GET', headers: { Accept: 'application/pdf' } })
            .then((response) => {
                if(response.ok) {
                    const pdfData = response.arrayBuffer();
                    const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
                    const pdfUrl = URL.createObjectURL(pdfBlob);
                    setPdfUrl(pdfUrl);

                    // const pdfBlob = response.blob()
                    // const reader = new FileReader()

                    // reader.onload = () => {
                    //     setPdfUrl(reader.result)
                    // }

                    // reader.readAsDataURL(pdfBlob)
                } else {
                    console.error('Failed to fetch PDF:', response.statusText)
                }
            })
            .catch((error) => {
                console.error('Error fetching PDF:', error)
            })
    }

    return (
        <>
            <div>
                <button onClick={fetchPdf}>Load PDF</button>
                { pdfUrl && 
                <object
                    data={pdfUrl}
                    type="application/pdf"
                    width="100%"
                    height="500px"
                >
                <p>
                  Your browser does not support PDFs. You can download the PDF{' '}
                  <a href={pdfUrl}>here</a>.
                </p>
                </object>
                }
                <p>{pdfUrl}</p>
            </div>
        </>
    )
}

export default ShowPDF