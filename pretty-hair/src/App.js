import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Logo from './components/Logo';
import Home from './components/Home';
import ClientBook from './components/client/ClientBook';
import QueryClient from './components/client/QueryClient';
import AddClient from './components/client/AddClient'
import EditClient from './components/client/EditClient';
import AddService from './components/service/AddService';
import ClientFromPhone from './components/client/ClientFromPhone';
import AddSpecificService  from './components/service/AddSpecificService';
import RedirectPage from './components/client/RedirectPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <Logo/>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/phonetest" element={<ClientFromPhone/>}/>
          <Route path="/clientbook" element={<ClientBook/>}/>
          <Route path="/addclient" element={<AddClient/>}/>
          <Route path="/editclient/:id" element={<EditClient/>}/>
          <Route path="/viewclient/:id" element={<QueryClient />}/>
          <Route path="/addservice" element={<AddService/>}/>
          <Route path="/addspecificservice/:id" element={<AddSpecificService />}/>
          <Route path="/redirect/:id" element={<RedirectPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
