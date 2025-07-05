import React from 'react'
import SignUp from './SignUp'
import Dashboard from './Dashboard'
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Users from './Users'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="users" element={<Users />} />
        </Route>
        
      </Routes>
    </Router>
  )
}

 

export default App







