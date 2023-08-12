import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
// import { auth, db } from '../firebase';
// import { doc, getDoc } from "firebase/firestore";
import client from '../contentful';
import "../CSS/navbar.css";


const Nav = () => {
  const [loading, setLoading] = useState(false);
  const [dropdownMenuVisible, setDropdownMenuVisible] = useState(false);
  // const [currentUser, setCurrentUser] = useState(null);
  // const [username, setUsername] = useState('');
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categories, setCategories] = useState([]);



  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setCurrentUser(user);
  //   });   
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  // useEffect(() => {
  //   const fetchUsername = async () => {
  //     if (currentUser) {
  //       const userDocRef = doc(db, 'users', currentUser.uid);
  //       const userDocSnap = await getDoc(userDocRef);
  //       const data = userDocSnap.data();
  //       if (data && data.userName) {
  //         setUsername(data.userName);
  //       } else {
  //         setUsername('');
  //       }
  //     } else {
  //       setUsername('');
  //     }
  //     setLoading(false);
  //   };
  
  //   fetchUsername();
  //   console.log("Username is: ", username)
  // }, [currentUser]);

  // const handleSignOut = async () => {
  //   try {
  //     await auth.signOut();
  //     console.log('User signed out');
  //   } catch (error) {
  //     console.error('Error signing out:', error);
  //   }
  // };
  
  const toggleDropdownMenu = () => {
    console.log('Mouse left the menu');
    setDropdownMenuVisible(!dropdownMenuVisible);
};


  const handleLinkClick = () => {
    setDropdownMenuVisible(false);
  };

  useEffect(() => {
    setLoadingCategories(true);
    client.getEntries({
      content_type: 'pageBlogPost',
      select: 'fields.category',
    })
    .then(response => {
      const allCategoryIds = response.items.flatMap(item => 
        item.fields.category ? item.fields.category.map(cat => cat.sys.id) : []
      );
      const uniqueCategoryIds = Array.from(new Set(allCategoryIds));
    
      Promise.all(uniqueCategoryIds.map(id => client.getEntry(id)))
        .then(categoryEntries => {
          const categoryTitles = categoryEntries.map(entry => entry.fields.title);
          setCategories(categoryTitles);
          setLoadingCategories(false);
        });
    })
    .catch(console.error);    
  }, []);
  
  
    
  return (
    !loading && (
      <header>
        <nav>
          <div className="logo-container">
            <div className="nav-container left-container">
              <NavLink className="rightsideLink" to="/blog">Home</NavLink>
              <NavLink className="rightsideLink" to="/search">Search</NavLink>
              <NavLink className="rightsideLink hidden-link" to="/donate">Non-Profits</NavLink>
              <NavLink className="rightsideLink" to="/about">About</NavLink>
            </div>
          </div>

          <div className="emblem-container">
            <div className="emblem"></div>
          </div>

          <div className="right-container">
            <div className="nav-container right-container">
              <div className="dropdown">
                <h3 className="dropbtn">Categories{'>'}</h3>
                <div className="dropdown-content">
                  {!loadingCategories && categories.map(category => (
                    <NavLink
                      key={category}
                      className="dropdown-item"
                      to={`/category/${category}`}
                      onClick={handleLinkClick}
                    >
                      {category}
                    </NavLink>
                  ))}
                </div>
              </div>
              {/* {!loadingCategories && categories.map(category => (
                <NavLink 
                  key={category}
                  className="rightsideLink" 
                  to={`/category/${category}`}
                  onClick={handleLinkClick}
                >
                  {category}
                </NavLink>
              ))} */}
              {/* <NavLink className="rightsideLink hidden-link" to="/donate">Non-Profit</NavLink> */}
              {/* {currentUser ? (
                <>
                  <NavLink className="rightsideLink" to="/user-profile">{username}</NavLink>
                  <NavLink className="rightsideLink" to="/shopping-cart">Cart</NavLink>
                  <NavLink className="rightsideLink" to="/signin">
                    <div className="sign-out-button">
                      <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
                    </div>
                  </NavLink>
                </>
              ) : (
                <NavLink className="rightsideLink" to="/signin">Sign In</NavLink>
              )} */}
            </div>
            <div className="burger-menu-container">
              <div className="burger-menu" tabIndex="0">
                <div></div>
                <div></div>
                <div></div>
              </div>

              {/* Dropdown menu */}
              <div className={`dropdown-menu${dropdownMenuVisible ? ' show' : ''}`} id="dropdownMenu">
                <NavLink className="menu-link" to="/blog" onClick={handleLinkClick}>Home</NavLink>
                <NavLink className="menu-link" to="/search" onClick={handleLinkClick}>Search</NavLink>
                <NavLink className="menu-link" to="/about" onClick={handleLinkClick}>About</NavLink>
                <NavLink className="menu-link" to="/donate">Non-Profit</NavLink>
              </div>
            
              {/* {currentUser ? (
                <>
                  <NavLink to="/user-profile">{username}</NavLink>
                  <NavLink to="/shopping-cart">Cart</NavLink>
                  <NavLink to="/signin">
                    <div className="sign-out-button">
                      <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
                    </div>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink className="rightsideLink" to="/signin">Sign In</NavLink>
                  <div></div>
                </>
              )} */}
            </div>
          </div>
        </nav>
      </header>
    )
  )
}

export default Nav;