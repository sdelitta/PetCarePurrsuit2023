import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import client from '../contentful';
import "../CSS/navbar.css";


const Nav = () => {
  const [loading, setLoading] = useState(false);
  const [dropdownMenuVisible, setDropdownMenuVisible] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categories, setCategories] = useState([]);
    
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
                <div>
                    <div className="left-container">
                        
                        <div className="dropdown">
                            <h3 className="dropbtn dropdown-toggle" id="categoriesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Categories
                            </h3>
                            <div className="dropdown-menu" aria-labelledby="categoriesDropdown">
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
                        <NavLink className="rightsideLink" to="/search">Search</NavLink>                   
                    </div>
                </div>
                
                <NavLink className="rightsideLink" to="/blog">
                  <div className="emblem-container">
                      <div className="emblem"></div>
                  </div>
                </NavLink>

                <div className="right-container">
                    <div className="nav-container right-container">
                        <NavLink className="rightsideLink hidden-link" to="/donate">Non Profits</NavLink>
                        <NavLink className="rightsideLink" to="/about">About</NavLink>           
                    </div>                    
                </div>
            </nav>
        </header>
    )
  )
}

export default Nav;