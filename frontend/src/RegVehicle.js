import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';



function RegVehicle(){
        const [RegNo,setRegNo] = useState();
        const [DName,setDName] = useState("");
        const [DNo,setDNo] = useState("");
        const [add,setAdd]=useState("No")
    
        const handleSubmit = (e) => {
            e.preventDefault();
            axios.post('http://localhost:3001/RegVehicle', {
                VehicleRegNo: RegNo,
                DriverName: DName,
                DriverNo: DNo,
                Status: "Avail"
            })
            .then(result => {
                console.log(result);
                console.log("Added");
                alert("Added New Vehicle to Fleet")
                setAdd("Yes");
            })
            .catch(err => console.log(err));
        };
        
    return(
        <div>
            <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="mb-4 text-center">Register a Vehicle</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="RegNo" className="form-label">Registeration Number</label>
                            <input type="RegNo" className="form-control" id="RegNo" name="RegNo" onChange={(e) => setRegNo(e.target.value)} placeholder="Enter Registration Number" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="DName" className="form-label">Driver Name</label>
                            <input type="text" className="form-control" id="DName" name="DName" onChange={(e) => setDName(e.target.value)} placeholder="Enter Driver's Name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="DNo" className="form-label">Driver Phone Number</label>
                            <input type="Number" className="form-control" id="DNo" name="DNo" onChange={(e) => setDNo(e.target.value)} placeholder="Enter Driver's Number" />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mb-2">Add</button>
                    </form>
                    {add==="Yes" && <p className="text-center">Registered New Vehicle</p>}
                    <Link to="/home " className="btn btn-outline-secondary w-100">Return To Home</Link>
                </div>
            </div>
        </div>
        </div>
    )
}
export default RegVehicle;