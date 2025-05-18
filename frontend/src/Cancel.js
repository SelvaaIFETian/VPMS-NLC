import React, { useEffect, useState } from "react";
import axios from "axios";

function Cancel() {
  const [bookings, setBookings] = useState([]);
  const name = localStorage.getItem("name"); // from login

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios.get(`http://localhost:3001/cancel/${name}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Failed to fetch bookings", err));
  };

  const endRide = (vehicleNo) => {
    axios.post("http://localhost:3001/cancel", { VehicleRegNo: vehicleNo })
      .then(() => {
        alert("Ride ended successfully.");
        fetchBookings(); // Refresh list
      })
      .catch((err) => {
        console.error("Error ending ride:", err);
        alert("Failed to end ride.");
      });
  };

  return (
    <div className="container mt-5">
      <h2>My Active Bookings</h2>
      {bookings.length === 0 ? (
        <p>No active bookings found.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Vehicle</th>
              <th>Start Time</th>
              <th>Start Location</th>
              <th>End Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, index) => (
              <tr key={b._id}>
                <td>{index + 1}</td>
                <td>{b.VehicleRegNo}</td>
                <td>{b.StartTime}</td>
                <td>{b.StartLocation}</td>
                <td>{b.EndLocation}</td>
                <td>{b.Status}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => endRide(b.VehicleRegNo)}
                  >
                    End Ride
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Cancel;
