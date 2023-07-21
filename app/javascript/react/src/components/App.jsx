import * as React from "react"
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./HomePage"
import ApplicantPage from "./ApplicantPage"
import Layout from "./Layout"

const App = () => {
    return (
        <>
            <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />  
                  <Route path="applicant/:id" element={<ApplicantPage />} />
              </Route>
            </Routes>
            </BrowserRouter>
        </>
    )

}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

export default App