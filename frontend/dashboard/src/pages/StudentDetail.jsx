

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ratings = ["Poor", "Average", "Good", "Excellent"];

const StudentDetail = () => {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [observations, setObservations] = useState([]);
  const [summary, setSummary] = useState("");

  const [form, setForm] = useState({
    mastery: "",
    performance: "",
    behavior: "",
    notes: "",
  });

  // ✅ Fetch student + observations together
  useEffect(() => {
    fetch(`http://localhost:5000/api/students/${id}`)
      .then(res => res.json())
      .then(data => setStudent(data))
      .catch(console.error);

    fetch(`http://localhost:5000/api/observations/${id}`)
      .then(res => res.json())
      .then(data => setObservations(data))
      .catch(console.error);
  }, [id]);

  if (!student) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600">Loading student...</p>

      </div>
    </div>
  );
}


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

 
  const saveObservation = async () => {
    if (!form.mastery || !form.performance || !form.behavior) {
      alert("Fill all ratings");
      return;
    }

    const payload = {
      student: id,
      topicMastery: form.mastery,
      participation: form.performance,
      behavior: form.behavior,
      notes: form.notes,
    };

    try {
      const res = await fetch("http://localhost:5000/api/observations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const saved = await res.json();

      setObservations(prev => [saved, ...prev]);
      setSummary("");

      setForm({
        mastery: "",
        performance: "",
        behavior: "",
        notes: "",
      });

    } catch (err) {
      console.error(err);
      alert("Failed to save observation");
    }
  };


  const generateSummary = () => {
    if (observations.length === 0) {
      setSummary("No observations available yet.");
      return;
    }

    const latest = observations[0];

    const text = `
${student.name} is currently showing ${latest.participation.toLowerCase()} classroom performance with ${latest.topicMastery.toLowerCase()} topic understanding.
Behavior in class is rated as ${latest.behavior.toLowerCase()}.

Teacher notes indicate:
"${latest.notes || "No additional notes provided"}"

Overall, the student ${
  latest.participation === "Excellent" ||
  latest.topicMastery === "Excellent"
    ? "is progressing very well."
    : latest.participation === "Poor"
    ? "needs additional academic support."
    : "is progressing steadily."
}
`;

    setSummary(text);
  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">{student.name}</h1>

      {/* Observation Form */}
      <div className="bg-white p-6 rounded shadow mb-6">

        <h2 className="text-xl font-semibold mb-4">
          Add Observation
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <select name="mastery" value={form.mastery} onChange={handleChange} className="p-2 border rounded">
            <option value="">Topic Mastery</option>
            {ratings.map(r => <option key={r}>{r}</option>)}
          </select>

          <select name="performance" value={form.performance} onChange={handleChange} className="p-2 border rounded">
            <option value="">Performance</option>
            {ratings.map(r => <option key={r}>{r}</option>)}
          </select>

          <select name="behavior" value={form.behavior} onChange={handleChange} className="p-2 border rounded">
            <option value="">Behavior</option>
            {ratings.map(r => <option key={r}>{r}</option>)}
          </select>

        </div>

        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Teacher notes..."
          className="mt-4 w-full p-2 border rounded"
        />

        <button
          onClick={saveObservation}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Observation
        </button>

      </div>

      {/* AI Summary */}
      <div className="bg-white p-6 rounded shadow mb-6">

        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">AI Summary</h2>

          <button
            onClick={generateSummary}
            className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
          >
            Generate Summary
          </button>
        </div>

        {!summary && (
          <p className="text-gray-500">Click button to generate report</p>
        )}

        {summary && (
          <p className="whitespace-pre-line">{summary}</p>
        )}

      </div>

      {/* Observation History */}
      <div className="bg-white p-6 rounded shadow">

        <h2 className="text-xl font-semibold mb-4">
          Observation History
        </h2>

        {observations.length === 0 && (
          <p className="text-gray-500">No observations yet</p>
        )}

        {observations.map((obs) => (
          <div key={obs._id} className="border-b py-3">

            <p className="text-sm text-gray-500">
              {new Date(obs.date).toLocaleString()}
            </p>

            <p>
              <strong>Mastery:</strong> {obs.topicMastery} |
              <strong> Performance:</strong> {obs.participation} |
              <strong> Behavior:</strong> {obs.behavior}
            </p>

            {obs.notes && <p>Notes: {obs.notes}</p>}

          </div>
        ))}

      </div>

    </div>
  );
};

export default StudentDetail;