import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [pswd, setPswd] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, pswd, role })
            .then(result => {
                console.log(result.data);
                if (result.data.message === "Success") {
                    localStorage.setItem("name", result.data.name);
                    localStorage.setItem("dept", result.data.dept);
                    localStorage.setItem("role", result.data.role);

                    navigate("/home"); // You no longer need to pass state here
                } else {
                    alert("Login failed. Please check your credentials.");
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container mt-5" style={{ backgroundColor: '#F5EBE0', minHeight: '100vh' }}>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="mb-4 text-center" style={{ color: '#3A5A40' }}>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="role" className="form-label" style={{ color: '#344E41' }}>Login as:</label>
                            <select className="form-control" id="role" name="role" onChange={(e) => setRole(e.target.value)}>
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label" style={{ color: '#344E41' }}>Email</label>
                            <input type="email" className="form-control" id="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email Id" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pswd" className="form-label" style={{ color: '#344E41' }}>Password</label>
                            <input type="password" className="form-control" id="pswd" name="pswd" onChange={(e) => setPswd(e.target.value)} placeholder="Enter Your Password" />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mb-2" style={{ backgroundColor: '#588157' }}>Login</button>
                    </form>
                    <p className="text-center" style={{ color: '#344E41' }}>Already haven't an account?</p>
                    <Link to="/register" className="btn btn-outline-secondary w-100" style={{ color: '#3A5A40' }}>Signup</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
