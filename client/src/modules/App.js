import '../css/App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavigationBar';
import Home from './Home';
import About from './About';
import Review from './Review';
import Blog from './Blog';
import Post from './Post';
import Editor from './Editor';
import Login from './Login';
import { api, AuthContext } from './api';

function App() {
  const [admin, setAdmin] = useState(false);

  useEffect(() => { api('/me').then((r) => setAdmin(r.admin)).catch(() => {}); }, []);

  return (
    <AuthContext.Provider value={{ admin, setAdmin }}>
      <BrowserRouter>
        <NavBar />
        <div className="App">
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/review" element={<Review />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/new" element={<Editor />} />
            <Route path="/blog/:slug" element={<Post />} />
            <Route path="/blog/:slug/edit" element={<Editor />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
