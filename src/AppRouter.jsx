import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom"; //npm install react-router-dom --save


import Home from "./Home";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}
