import './App.css';
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import SignIn from './components/SignIn/SignIn';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/SignIn' element= { <SignIn/> }/>
      </Routes>
    </div>
  );
}

export default App;