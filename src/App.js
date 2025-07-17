import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// pages
import Home from './Pages/Home'
// Auth
import Login from './Pages/Auth/Login'
import SignUp from './Pages/Auth/SignUp'
// Dashboard components
import Dashboard from './components/Dashboard/Dashboard'
// Users
import Users from './components/Dashboard/Users/Users'
import UpdateUser from './components/Dashboard/Users/UpdateUser'                                                                                                                                                                                                                                               
import CreateUser from './components/Dashboard/Users/CreateUser'
import RequireAuth from './Pages/Auth/RequireAuth'
import PresistLogin from './Pages/Auth/PresistLogin'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        {/* <ProtectedRoute /> */}
        <Route element={<PresistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path='users' element={<Users />} />
              <Route path='user/create' element={<CreateUser />} />
              <Route path='users/:id' element={<UpdateUser />} /> 
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

 

export default App







