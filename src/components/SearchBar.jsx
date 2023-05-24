import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Select, Button } from "antd";
import AnimalList from "./AnimalList"
import "../CSS/SearchBar.css"

const useToken = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      const data = {
        grant_type: "client_credentials",
        client_id: "LRoTpzqY9jsdlxb3076H4ptXpjdyEKDkunLACNP7pxCznAMYb2",
        client_secret: "dMSfOTIDmmGxQksfGEKkn3wk0XfXanFpw2PMQ7Lg"
      };

      try {
        const response = await axios.post(
          "https://api.petfinder.com/v2/oauth2/token",
          data
        );
        setToken(response.data.access_token);
      } catch (error) {
        console.error(error);
      }
    };
    fetchToken();
  }, []);
  return token;
};

const { Option } = Select;

const SearchBar = (props) => {
  const [zipCode, setZipCode] = useState("");
  const [type, setType] = useState("Dog or Cat");
  const [size, setSize] = useState("Size");
  const [age, setAge] = useState("Age");
  const [animals, setAnimals] = useState(false);
  const token = useToken();

  const fetchAnimalsByZipCode = async (zipCode, type, size, age, id) => {
    
    const params = {
      location: zipCode,
      limit: 20,
    };
  
    if (type && type !== "Dog or Cat") {
      params.type = type;
    }
  
    if (size && size !== "Size") {
      params.size = size;
    }
  
    if (age && age !== "Age") {
      params.age = age;
    }
  
    
    const res = await axios.get("https://api.petfinder.com/v2/animals", {
      headers: {
        Authorization: "Bearer " + token
      },
      params,
    });

    setAnimals(res.data.animals);
    console.log(res)
  };

  const handleSubmit = async event => {
    event.preventDefault();
    await fetchAnimalsByZipCode(zipCode, type, size, age);
  };

  const handleClearList = () => {
    setAnimals(false); // clear the list
  }
  
  useEffect(() => {
    return () => {
      setAnimals(null);
    };
  }, []);
  


  return (
    <div className="home" 
      style={{display:"flex", 
      flexDirection:"column", 
      justifyContent:"center"
      }}>
      <div className="search_container">
        <h1 className="landing">
        Discover adoptable pets within 30-miles of any zip code and find your new furry companion today!
        </h1>

        <div className="search_panel">
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Enter zip code"
              value={zipCode}
              onChange={event => setZipCode(event.target.value)}
            />
            
            <div className="dropdowns">
              <Select
                placeholder="Select type"
                value={type}
                onChange={value => setType(value)}
                style={{ width: 120, margin: 7 }}
                >
                <Option value="dog">Dog</Option>
                <Option value="cat">Cat</Option>
              </Select>

              <Select
                placeholder="Select size"
                value={size}
                onChange={value => setSize(value)}
                style={{ width: 120, margin: 7 }}
                >
                <Option value="small">Small</Option>
                <Option value="medium">Medium</Option>
                <Option value="large">Large</Option>
                <Option value="xlarge">Extra Large</Option>
              </Select>
              
              <Select
                placeholder="Select age"
                value={age}
                onChange={value => setAge(value)}
                style={{ width: 120, margin: 7 }}
                >
                <Option value="baby">Baby</Option>
                <Option value="young">Young</Option>
                <Option value="adult">Adult</Option>
                <Option value="senior">Senior</Option>
              </Select>
            </div>

            <Button className="search_button" type="primary" htmlType="submit">
              Search
            </Button>
          </form>
          
          <div>
            {animals && (
              <button type="button" onClick={handleClearList}>
                Clear List
              </button>
            )}
            {animals ? <AnimalList animals={animals} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;