import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './signup';
import Login from './Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home';
import Book from './book';
import Cancel from './Cancel';
import RegVehicle from './RegVehicle';
import History from './History';
import { UserProvider } from "./context";

function App() {
  return (
    <div style={{ backgroundColor: '#EDDEE9' }}>
      <UserProvider>
        <BrowserRouter>
          {/* Navbar Section */}
          <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#A3B18A' }}>
            <div className="container-fluid">
              <a className="navbar-brand" href="/" style={{ color: '#344E41' }}>
                Vehicle Fleet Management System
              </a>
            </div>
          </nav>

          <div className="container mt-5" style={{ backgroundColor: '#F5EBE0', minHeight: '100vh' }}>
            <Routes>
              <Route path='/register' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path='/home' element={<Home />} />
              <Route path='/Book' element={<Book />} />
              <Route path='/Cancel' element={<Cancel />} />
              <Route path='/RegVehicle' element={<RegVehicle />} />
              <Route path='/History' element={<History />} />
            </Routes>
          </div>

          {/* Footer Section */}
          <footer className="text-center" style={{ backgroundColor: '#3A5A40', color: 'white', padding: '10px' }}>
            <p>Vehicle Fleet Management System &copy; 2025</p>
            <a href="/contact" style={{ color: 'white', textDecoration: 'none' }}>
              Contact Us
            </a>
          </footer>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
