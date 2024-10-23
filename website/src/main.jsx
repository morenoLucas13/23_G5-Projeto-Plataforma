import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './estilo.css'
// import './meutema.css'

import { ativarLogRequisicoes } from './apiAxiosLog.js'
import axios from 'axios'
ativarLogRequisicoes(axios);

axios.defaults.baseURL = 'http://10.132.224.34:3313'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
