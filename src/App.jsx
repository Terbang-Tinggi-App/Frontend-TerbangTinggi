import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Protected from './components/Routes/Protected';
import { Home } from './pages/Home';
import User from './pages/Profile/User';
import routes from './routes';

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="134468154099-apc6un8gp22f8dadi8tf1kf4o2fv2lnk.apps.googleusercontent.com">
        <Router>
          <Routes>
            <Route index element={<Home />} />
            <Route
              path="/user"
              element={
                <Protected>
                  <User />
                </Protected>
              }
            />
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={<route.component />} />
            ))}
          </Routes>
        </Router>
      </GoogleOAuthProvider>
      <ToastContainer autoClose={500} />
    </>
  );
}

export default App;
