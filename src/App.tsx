// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import { Login } from './components/login/login';
import Home from './components/home/home';
import { PrivateOutlet } from './components/utils/private-outlet';
import UserForm from './components/user-form/user-form';

export const App = () => {
  return (
    <div>
      {/* <ToastContainer /> */}

      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateOutlet />}>
            <Route index element={<Home />} />
            <Route path="/user" element={<UserForm />} />
          </Route>
        </Routes>
      </Router>

      {/* <Loader open={store.loader_toggle} /> */}
    </div>
  )
}