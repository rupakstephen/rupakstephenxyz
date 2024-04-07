import '../css/App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import NavBar from './NavigationBar';
import Home from "./Home"
import About from './About';
import Review from './Review';

function App() {
  return (
    <>
    <NavBar/>
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
