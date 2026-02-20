import React from 'react'
import Dashboard from './pages/Dashboard'
import Students from "./pages/Students";
import StudentDetail from "./pages/StudentDetail";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom"
import Layout from './components/Layout';

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/:id" element={<StudentDetail />} />

        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
