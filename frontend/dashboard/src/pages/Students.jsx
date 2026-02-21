import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Students = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState("");
const [selectedClass, setSelectedClass] = useState("");
const [counts, setCounts] = useState({});
const [students, setStudents] = useState([])
const filteredStudents = students.filter((s) => {
  const matchName = s.name.toLowerCase().includes(search.toLowerCase());
  const matchClass = selectedClass
  ? `${s.class}${s.section}` === selectedClass
  : true;
  return matchName && matchClass;
});
useEffect(() => {
  fetch("https://teacherdashboard-ixp3.onrender.com/api/students")
    .then(res => res.json())
    .then(data => setStudents(data))
    .catch(err => console.error(err));
}, []);
useEffect(() => {
  students.forEach((s) => {
    fetch(`https://teacherdashboard-ixp3.onrender.com/api/observations/${s._id}`)
      .then(res => res.json())
      .then(data =>
        setCounts(prev => ({ ...prev, [s._id]: data.length }))
      )
      .catch(console.error);
  });
}, [students]);
  return (
    <div>
        <h1 className='text-3xl font-bold mb-6'>Student Catalog</h1>
        <div className="bg-white rounded shadow overflow-hidden">
            <div className="flex gap-3 mb-4">

  <input
    type="text"
    placeholder="Search student..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border p-2 rounded w-64"
  />

  <select
    value={selectedClass}
    onChange={(e) => setSelectedClass(e.target.value)}
    className="border p-2 rounded"
  >
    <option value="">All Classes</option>
    <option value="5A">5A</option>
    <option value="5B">5B</option>
    <option value="6A">6A</option>
    <option value="6B">6B</option>
  </select>

</div>
        <table className="w-full">


          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3">Student ID</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Class</th>
              <th className="text-left p-3">Observations</th>
            </tr>
          </thead>
           <tbody>
            {filteredStudents.map((student) => (
              <tr
                key={student.studentId}
                className="border-t hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/students/${student._id}`)}
              >
                <td className="p-3 font-medium">{student.studentId}</td>
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.class}-{student.section}</td>
                <td className="p-3">{counts[student._id] || 0}</td>
              </tr>
            ))}
          </tbody>
       </table>
       </div>
    </div>
  )
}

export default Students