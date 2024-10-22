
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './Signin';
import Home from './Home';
import React, { useEffect, useState} from 'react'
import Sessions from './Sessions';

export default function App() {
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/users").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} /> 
        <Route path="/home/*" element={<Home />} />
      </Routes>
    </Router>
  );
}
