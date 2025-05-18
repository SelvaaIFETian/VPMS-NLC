import axios from "axios";
import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { useUser } from "./context";

function Book() {
  const [vehicle, setVehicle] = useState([]);
  const [select, setSelect] = useState(null);
  const [DName, setDName] = useState("");
  const [DNo, setDNo] = useState("");
  const [StartTime, setStartTime] = useState("");
  const [StartLocation, setStartLocation] = useState("");
  const [EndLocation, setEndLocation] = useState("");
  const name = localStorage.getItem("name");
  const dept = localStorage.getItem("dept");
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchAvailableVehicles();
  }, []);

  const fetchAvailableVehicles = () => {
    axios
      .get("http://localhost:3001/book")
      .then((res) => setVehicle(res.data))
      .catch((err) => console.log(err));
  };


  const handleChange = (e) => {
    const selectedRegNo = e.target.value;
    const selectedVehicle = vehicle.find(v => v.VehicleRegNo === selectedRegNo);

    if (selectedVehicle) {
      setSelect(selectedVehicle);
      setDName(selectedVehicle.DriverName);
      setDNo(selectedVehicle.DriverNo);
    } else {
      setSelect(null);
      setDName("");
      setDNo("");
    }
  };


  const BookIt = (e) => {
    e.preventDefault();
    if (!select || !StartTime || !StartLocation || !EndLocation) {
      alert("Please complete all fields before booking.");
      return;
    }

    const bookingData = {
      VehicleRegNo: select.VehicleRegNo,
      role,
      dept,
      name,
      StartTime,
      StartLocation,
      EndLocation,
      Status:"Booked"
    };

    axios
      .post("http://localhost:3001/Book", bookingData)
      .then((res) => {
        alert("Vehicle booked successfully!");
        console.log(res);
        fetchAvailableVehicles(); 
        clearForm(); 
      })
      .catch((err) => {
        console.error("Booking failed:", err);
        alert("Error booking vehicle.");
      });
  };

  const clearForm = () => {
    setSelect(null);
    setDName("");
    setDNo("");
    setStartTime("");
    setStartLocation("");
    setEndLocation("");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Book Your Vehicle</h1>
      <p className="text-muted text-center">
        View available vehicles, see driver information, and fill out your ride details below.
      </p>

      <form className="mt-4" onSubmit={BookIt}>
        <div className="mb-3">
          <label className="form-label">Select Vehicle:</label>
          <select
            value={select?.VehicleRegNo || ""}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">-- Select a vehicle --</option>
            {vehicle.map((v) => (
              <option key={v._id} value={v.VehicleRegNo}>
                {v.VehicleRegNo}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Driver Name:</label>
          <p className="form-control-plaintext">{DName || "Select a vehicle"}</p>
        </div>

        <div className="mb-3">
          <label className="form-label">Driver Number:</label>
          <p className="form-control-plaintext">{DNo || "Select a vehicle"}</p>
        </div>

        <div className="mb-3">
          <label className="form-label">Starting Time:</label>
          <input
            type="datetime-local"
            className="form-control"
            value={StartTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Starting Location:</label>
          <input
            type="text"
            className="form-control"
            value={StartLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ending Location:</label>
          <input
            type="text"
            className="form-control"
            value={EndLocation}
            onChange={(e) => setEndLocation(e.target.value)}
            required
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-success w-50">
            Book Ride
          </button>
        </div>
      </form>
    </div>
  );
}

export default Book;
