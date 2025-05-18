import React from "react";
//  
import { Link } from "react-router-dom";

function Home() {
  const name = localStorage.getItem("name");
  const dept = localStorage.getItem("dept");
  const role = localStorage.getItem("role");
  


  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="col-md-6 text-center">
        <div className="mt-5">
          <h1>Vehicle Fleet Management System</h1>
          {name && <h2>Welcome Mr. {name}!</h2>}
          {dept && <h3>Department: {dept}</h3>}
          {role && <h4 className="text-muted">Role: {role}</h4>}

          <div className="d-flex justify-content-center gap-3 mt-4">
            <Link to="/Book" className="btn btn-outline-primary w-100">
              Booking a Ride
            </Link>
            <Link to="/Cancel" className="btn btn-outline-danger w-100">
              Cancel a Ride
            </Link>
          </div>

          {role === "Admin" && (
            <>
              <Link to="/RegVehicle" className="btn btn-outline-danger w-100">Register a Vehicle</Link>
              <Link to="/History" className="btn btn-outline-danger w-100">View Booking History</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
