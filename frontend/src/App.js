// import logo from './logo.svg';
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { JobList } from "./features/Jobs/JobList";
import { AddEditJob } from "./features/Jobs/AddEditJob";
import { ViewJob } from "./features/Jobs/ViewJob";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/add" element={<AddEditJob />} />
        <Route path="/edit/:id" element={<AddEditJob />} />
        <Route path="/view/:id" element={<ViewJob />} />
      </Routes>
    </Router>
  );
}

export default App;
