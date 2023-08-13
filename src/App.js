import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes } from 'react-router';
import { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/App.css'

import Blog from './components/Blog/Blog';
import BlogPost from './components/Blog/BlogPost';
import BlogByCategory from './components/Blog/BlogByCategory';

import SearchPage from './pages/SearchPage'
import AnimalDetailPage from './pages/AnimalDetailPage'
import DonatePage from './pages/DonatePage'
import About from './pages/About'
import AnimalList from './components/AnimalList'
import Nav from './components/Nav'
import Footer from './components/Footer'


function App() {

  return (
    <div className="App">
      <div>
        <HelmetProvider>
          <Router>
            <header className="App-header">
              <Nav />
            </header>  
            <Routes>
              <Route path='/' element={<Blog />} />
              <Route path='/search' element={<SearchPage />} />                        
              <Route path="/blog" element={<Blog />} />
              <Route path='/blog-post/:id' element={<BlogPost />} />

              <Route path="/animal-details/:id" element={<AnimalDetailPage />} />
              <Route path="/animal-list" element={<AnimalList />} />
              <Route path='/donate' element={<DonatePage />} />
              <Route path='/about' element={<About />} />
              <Route path='/category/:category' element={<BlogByCategory />} />
            </Routes>
          </Router>
        </HelmetProvider>
      </div>
      <Footer />
    </div>
  );
}

export default App;