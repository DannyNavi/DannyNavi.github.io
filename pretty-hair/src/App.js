import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Logo from './Logo';
import Home from './Home';
import ClientBook from './ClientBook';

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
