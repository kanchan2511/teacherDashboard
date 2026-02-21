
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [todayObservations, setTodayObservations] = useState(0);
  const [pendingReviews, setPendingReviews] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // 1️⃣ fetch students
    fetch("https://teacherdashboard-ixp3.onrender.com/api/students")
      .then(res => res.json())
      .then(async (students) => {

        setTotalStudents(students.length);

        let todayCount = 0;
        let pending = 0;

        const today = new Date().toDateString();

        // 2️⃣ fetch observations for each student
        await Promise.all(
          students.map(async (s) => {
            const res = await fetch(
              `https://teacherdashboard-ixp3.onrender.com/api/observations/${s._id}`
            );
            const obs = await res.json();

            // count today's observations
            obs.forEach(o => {
              if (new Date(o.date).toDateString() === today) {
                todayCount++;
              }
            });

            // pending review = no observation yet
            if (obs.length === 0) pending++;
          })
        );

        setTodayObservations(todayCount);
        setPendingReviews(pending);
        setLoading(false)
      })
      .catch(console.error);

  }, []);
  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>

        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white p-6 rounded shadow animate-pulse h-24"></div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">

        <div className="bg-blue-50 border border-blue-200 p-4 rounded shadow">
          <p className="text-blue-600 text-sm">Total Students</p>
          <p className="text-3xl font-bold text-blue-800">{totalStudents}</p>
        </div>

        <div className="bg-green-50 border border-green-200 p-4 rounded shadow">
          <p className="text-green-600 text-sm">Observations Today</p>
          <p className="text-3xl font-bold text-green-800">{todayObservations}</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 p-4 rounded shadow">
          <p className="text-orange-600 text-sm">Pending Reviews</p>
          <p className="text-3xl font-bold text-orange-800">{pendingReviews}</p>
        </div>

      </div>
      <div className="mt-6 bg-white p-4 rounded shadow">
        {pendingReviews === 0 ? (
          <p className="text-green-600 font-medium">
            ✅ All students reviewed. Great job today!
          </p>
        ) : (
          <p className="text-orange-600 font-medium">
            ⚠ {pendingReviews} students still need observations.
          </p>
        )}
      </div>
      <div className="mt-4 bg-gray-200 rounded h-3 overflow-hidden">
        <div
          className="bg-blue-600 h-full"
          style={{
            width: totalStudents
              ? `${((totalStudents - pendingReviews) / totalStudents) * 100}%`
              : "0%"
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;