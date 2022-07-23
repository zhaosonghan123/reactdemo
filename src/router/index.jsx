/*

  App >List + Means + Edit
  Login
  Register
  History模式 -- BrowserRouter
  Hash模式 -- HashRouter
  不用ngiux
*/

import App from '../App.jsx'
import Edit from '../pages/Edit'
import List from '../pages/List'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Means from '../pages/Means'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

const BaseRouter = () => (
  <Router >
    <Routes>
      <Route path='/' element={<App/>}>
        <Route path='/list' element={<List/>}/>
        <Route path='/edit' element={<Edit/>}/>
        <Route path='/means' element={<Means/>}/>
      </Route> 
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
  </Router>
)

export default BaseRouter