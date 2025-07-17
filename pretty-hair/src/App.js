import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Logo from './components/Logo';
import Home from './components/Home';
import ClientBook from './components/ClientBook';
import AddClient from './components/AddClient'
import EditClient from './components/EditClient';

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
          <Route path="/editclient/:id" element ={<EditClient/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
