const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Employee, Vehicle,History } = require('./models/Details'); 
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/vpms");

// Login route
app.post('/login', (req, res) => {
    const { email, pswd, role } = req.body;
    Employee.findOne({ email: email })
    .then(user => {
        if (user) {
            if (user.role==role){
            if (user.pswd === pswd) {
                res.json({
                    message: "Success",
                    name: user.name,  
                    dept: user.dept,
                    role: user.role
                });
            } else {
                res.json({ message: "Wrong Password" });
            }
        } else {
            res.json({ message: "No records found" });
        }}
    })
    .catch(err => res.status(500).json({ message: "Error", error: err }));
});

// Register employee
app.post('/register', (req, res) => {
    Employee.create(req.body)
        .then(employee => res.json(employee))
        .catch(err => res.status(500).json(err));  
});

// Register vehicle
app.post('/RegVehicle', (req, res) => {
    Vehicle.create(req.body)
        .then(vehicle => res.json(vehicle))
        .catch(err => res.status(500).json(err));
});

app.get('/Book',(req,res)=>{
    Vehicle.find({ Status: "Avail" })
        .then(vehicles => res.json(vehicles))
        .catch(err => res.status(500).json({ message: "Error fetching vehicles", error: err }));
})
app.post("/Book", (req, res) => {
    const { VehicleRegNo, role, name, dept, StartTime, StartLocation, EndLocation } = req.body;

    Vehicle.findOneAndUpdate(
        { VehicleRegNo },
        { Status: "Booked" },
        { new: true }
    )
    .then(updatedVehicle => {
        if (!updatedVehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        return History.create({
            VehicleRegNo,
            role,
            name,
            dept,
            StartTime,
            StartLocation,
            EndLocation,
            Status: "Booked"
        }).then(() => {
            res.status(200).json(req.body);
        });
    })
    .catch(err => {
        console.error("Booking failed:", err);
        res.status(500).json({ message: "Error booking vehicle", error: err });
    });
});
app.get('/history', (req, res) => {
    History.find()
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ message: "Error fetching history", error: err }));
});
app.get("/cancel/:username", (req, res) => {
    const username = req.params.username;
  
    History.find({ name: username, Status: "Booked" })
      .then((records) => res.json(records))
      .catch((err) => res.status(500).json({ error: "Failed to fetch bookings", details: err }));
  });
  app.post("/cancel", async (req, res) => {
    const { VehicleRegNo } = req.body;
  
    try {
      // Update vehicle to Available
      await Vehicle.findOneAndUpdate({ VehicleRegNo }, { Status: "Avail" });
  
      // Update booking history to Completed
      await History.findOneAndUpdate(
        { VehicleRegNo, Status: "Booked" },
        { Status: "Completed" }
      );
  
      res.json({ message: "Ride ended successfully." });
    } catch (err) {
      res.status(500).json({ error: "Error ending ride", details: err });
    }
  });
    

  

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
