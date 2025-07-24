import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Logo from './components/Logo';
import Home from './components/Home';
import ClientBook from './components/client/ClientBook';
import AddClient from './components/client/AddClient'
import EditClient from './components/client/EditClient';
import AddService from './components/AddService';

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
          <Route path="/addservice" element={<AddService/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
