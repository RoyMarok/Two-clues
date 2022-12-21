import React from 'react'
import { createRoot } from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import App from './App'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
    <React.StrictMode>
        <RecoilRoot>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </RecoilRoot>
    </React.StrictMode>
)

