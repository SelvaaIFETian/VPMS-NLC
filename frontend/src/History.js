import React, { useState, useEffect } from "react";
import axios from "axios";

function History() {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/history")
      .then(res => setHistoryData(res.data))
      .catch(err => console.log("Error fetching history:", err));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Booking History</h1>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>SNo</th>
            <th>Role</th>
            <th>Name</th>
            <th>Dept</th>
            <th>Vehicle No</th>
            <th>Start Date</th>
            <th>Start Location</th>
            <th>End Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {historyData.map((entry, index) => (
            <tr key={entry._id}>
              <td>{index + 1}</td>
              <td>{entry.role}</td>
              <td>{entry.name}</td>
              <td>{entry.dept}</td>
              <td>{entry.VehicleRegNo}</td>
              <td>{entry.StartTime}</td>
              <td>{entry.StartLocation}</td>
              <td>{entry.EndLocation}</td>
              <td>{entry.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
