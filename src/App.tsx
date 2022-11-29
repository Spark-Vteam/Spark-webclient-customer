// import cell from './img/cell.png';
import './App.css';
import './components/Typography.css';
import './components/Buttons.css';
import './components/Navbar.css';
import './components/Footer.css';

import Home from './components/Home';
import About from './components/About';
import Policy from './components/Policy';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      {/* <img src={cell} className="bg-layer" alt="cellphone" /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
