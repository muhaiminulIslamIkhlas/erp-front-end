import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Dashboard from "./pages/dashboard/dashboard";
import Login from "./pages/login/login";

const App: React.FC = () => {
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL2p3dFwvcHVibGljXC9hcGlcL2xvZ2luIiwiaWF0IjoxNjUzNzI0MzEzLCJleHAiOjE2NTM3Mjc5MTMsIm5iZiI6MTY1MzcyNDMxMywianRpIjoicGJMb0lMc2R2eFBYRXpiZiIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.8irVtWpQD69M9H876BjrybKd0V9gsYGQ5pCwThwixOk";
  // axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard>
              <h1>Hello World</h1>
            </Dashboard>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/*"
          element={
            <Dashboard>
              <h1>Hello World</h1>
            </Dashboard>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
