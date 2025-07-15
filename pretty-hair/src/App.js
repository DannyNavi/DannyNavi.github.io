import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Logo from './Logo';
import Home from './Home';
import ClientBook from './ClientBook';
import AddClient from './AddClient'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <Logo/>
        </header>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clientbook" element={<ClientBook/>}/>
          <Route path="/addclient" element={<AddClient/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
