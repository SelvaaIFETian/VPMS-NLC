const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pswd: { type: String, required: true },
  dept: { type: String },
  role: { type: String }
});

const VehicleSchema = new mongoose.Schema({
  VehicleRegNo: { type: String, required: true },
  DriverName: { type: String, required: true },
  DriverNo: { type: String, required: true },
  Status: { type: String}
});

const HistorySchema =new mongoose.Schema({
  name: String,
  dept: String,
  role: String,
  VehicleRegNo: String,
  StartTime: Date,
  StartLocation: String,
  EndLocation: String,
  Status:String
});

const Employee = mongoose.model("employee", EmployeeSchema);
const Vehicle = mongoose.model("vehicle", VehicleSchema);
const History=mongoose.model("history",HistorySchema);

module.exports = { Employee, Vehicle,History };
