import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes } from 'react-router';
import { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';


import './CSS/App.css'

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import UserProfile from "./components/UserProfile";
import ShoppingCart from './components/ShoppingCart';

import Blog from './components/Blog/Blog';
import BlogPost from './components/Blog/BlogPost';
import BlogByCategory from './components/Blog/BlogByCategory';

import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage'
import AnimalDetailPage from './pages/AnimalDetailPage'
import DonatePage from './pages/DonatePage'
import About from './pages/About'
import AnimalList from './components/AnimalList'
import Nav from './components/Nav'
import Footer from './components/Footer'


function App() {

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      <HelmetProvider>
        <div>
          <Router>
          <header className="App-header">
          <Nav />
          </header>  
            <Routes>
              <Route path='/' element={<Blog />} />
              <Route path='/search' element={<SearchPage />} />
              
              <Route path='/signup' element={<SignUp />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path="/user-profile" element={<UserProfile />} />

              <Route path='/shopping-cart' element={<ShoppingCart />} />

              <Route path="/blog" element={<Blog />} />
              <Route path='/blog-post/:id' element={<BlogPost />} />

              <Route path="/animal-details/:id" element={<AnimalDetailPage />} />
              <Route path="/animal-list" element={<AnimalList />} />
              <Route path='/donate' element={<DonatePage />} />
              <Route path='/about' element={<About />} />
              <Route path='/category/:category' element={<BlogByCategory />} />
            </Routes>
          </Router>
        </div>
      </HelmetProvider>
      <Footer />
    </div>
  );
}

export default App;