import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Logo from './components/Logo';
import Home from './components/Home';
import ClientBook from './components/ClientBook';
import AddClient from './components/AddClient'

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
