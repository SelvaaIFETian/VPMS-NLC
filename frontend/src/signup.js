import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pswd, setPswd] = useState("");
    const [dept, setDept] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/register', { name, email, pswd, dept, role: 'user' })
            .then(result => {
                console.log(result);
                navigate("/login", { state: { name } });
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container mt-5" style={{ backgroundColor: '#F5EBE0', minHeight: '100vh' }}>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="mb-4 text-center" style={{ color: '#3A5A40' }}>New User Registration</h2>
                    <h3 className="text-lg text-center" style={{ color: '#A3B18A' }}>(Only Users Can Register to Signup for the Application)</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label" style={{ color: '#344E41' }}>Name</label>
                            <input type="text" className="form-control" id="name" name="name" onChange={(e) => setName(e.target.value)} placeholder="Enter Your Name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label" style={{ color: '#344E41' }}>Email</label>
                            <input type="email" className="form-control" id="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email Id" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pswd" className="form-label" style={{ color: '#344E41' }}>Password</label>
                            <input type="password" className="form-control" id="pswd" name="pswd" onChange={(e) => setPswd(e.target.value)} placeholder="Enter Your Password" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dept" className="form-label" style={{ color: '#344E41' }}>Department</label>
                            <input type="text" className="form-control" id="dept" name="dept" onChange={(e) => setDept(e.target.value)} placeholder="Enter Your Department" />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mb-2" style={{ backgroundColor: '#588157' }}>Register</button>
                    </form>
                    <p className="text-center" style={{ color: '#344E41' }}>Already have an account?</p>
                    <Link to="/login" className="btn btn-outline-secondary w-100" style={{ color: '#3A5A40' }}>Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
