import './App.css';
import { Routes, Route } from 'react-router-dom'
import SignIn from './components/SignIn/SignIn';
import Home from './components/Home/Home';
import Favorite from './components/Favorite/Favorite';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Favorite' element={<Favorite />}/>
        <Route path='/SignIn' element= { <SignIn/> }/>
      </Routes>
    </div>
  );
}

export default App;