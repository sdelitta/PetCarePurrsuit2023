/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useCallback } from 'react';
import { collection, doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from "../firebase";
import axios from 'axios';
import BackButton from './BackButton';
import '../CSS/AnimalDetails.css'

const AnimalDetails = ({ animal, animals }) => {
  console.log("Here is the animal", animal)
  console.log("Here are the animals", animals)

  const [saveMessage, setSaveMessage] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [cardHeight, setCardHeight] = useState(null);


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

  const token = useToken();
  const [organization, setOrganization] = useState({});
  
  const fetchOrganization = useCallback(async () => {
    console.log(animal.organization_id)

    const res = await axios.get(`https://api.petfinder.com/v2/organizations/${animal.organization_id}`, {
      headers: {
        Authorization: "Bearer " + token
      }
    });
  
    setOrganization(res.data.organization);
    console.log("Here is the SHELTER:", res.data)
    return organization
  }, [organization, animal, token]);

  useEffect(() => {
    if (animal.organization_id && token) {
      fetchOrganization();
    }
  }, [token]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  
    return () => {
      unsubscribe();
    };
  }, []);
 
  
  const convertAnimalToPlainObject = (animal) => {
    return {
      id: animal.id,
      name: animal.name,
      type: animal.type,
      species: animal.breeds.primary,
      size: animal.size,
      age: animal.age,
      description: animal.description,
      breeds: animal.breeds,
      primary_photo_cropped: animal.primary_photo_cropped
    };
  };
  

  const handleSavePet = async () => {
    const user = currentUser;
    if (user) {
      try {
        const plainAnimalObject = convertAnimalToPlainObject(animal);
        const userCollection = collection(db, "users");
        const userDoc = doc(userCollection, user.uid);
        await setDoc(userDoc, {
          savedPets: arrayUnion({
            id: plainAnimalObject.id,
            name: plainAnimalObject.name,
            type: plainAnimalObject.type,
            species: plainAnimalObject.species,
            size: plainAnimalObject.size,
            age: plainAnimalObject.age,
            description: plainAnimalObject.description,
            breeds: {
              primary: plainAnimalObject.breeds.primary,
            },
            primary_photo_cropped: {
              small: plainAnimalObject.primary_photo_cropped.small,
              medium: plainAnimalObject.primary_photo_cropped.medium,
              large: plainAnimalObject.primary_photo_cropped.large,
              full: plainAnimalObject.primary_photo_cropped.full,
            },
          }),
        }, { merge: true });
        setIsSaved(true);
        setSaveMessage("Pet saved successfully!");
        console.log("Pet saved to user profile!");
      } catch (error) {
        console.error("Error saving pet: ", error);
        setSaveMessage("!! Error saving pet !!");
      }
    } else {
      console.log("User not logged in");
      setSaveMessage("Please sign in to save pets.");
    }
  };
  
  const handleImageLoad = (e) => {
    const imgHeight = e.target.offsetHeight;
    setCardHeight(imgHeight);
  };
  

  const filteredDescription = animal.description ? animal.description.replace(/&quot;/g, '"').replace(/&#039;/g, "'") : "";


  
  if (!animal) {
    return <p>Loading...</p> 
  } else {
    
    return (
      <div className="details">
        <BackButton animals={animals} />
        <div className="details_card" style={{ height: cardHeight ? `${cardHeight}px` : "auto" }}>
          <div className="details_content">
            <div className="details_img_container">
              <img
                className="details_img"
                src={
                  !animal.primary_photo_cropped
                    ? "No Image Available"
                    : animal.primary_photo_cropped.full
                }
                alt="Missing Photo"
                onLoad={handleImageLoad}
              />
            </div>

            <div className="details_info" style={{ height: cardHeight ? `${cardHeight - 20}px` : "auto" }}>
              <p className="name">{animal.name}</p>
              {/* <div className="save-pet-button">
                <button className="save-pet" onClick={handleSavePet}>{isSaved ? "Pet Saved" : "Save Pet"}</button>
                {saveMessage && <p>{saveMessage}</p>}
              </div> */}
              {/* <div className="info_row">
                <span className="info_key">Type:</span> <span className="info_value">{animal.type}</span>
              </div> */}
              <div className="info_row">
                <span className="info_key">Species:</span> <span className="info_value">{animal.species}</span>
              </div>
              <div className="info_row">
                <span className="info_key">Breeds:</span> <span className="info_value">{animal.breeds.primary} {animal.breeds.secondary && ` / ${animal.breeds.secondary}`}</span>
              </div>
              <div className="info_row">
                <span className="info_key">Colors:</span> <span className="info_value">{animal.colors.primary} {animal.colors.secondary && ` / ${animal.colors.secondary}`} {animal.colors.tertiary && ` / ${animal.colors.tertiary}`}</span>
              </div>
              <div className="info_row">
                <span className="info_key">Age:</span> <span className="info_value">{animal.age}</span>
              </div>
              <div className="info_row">
                <span className="info_key">Gender:</span> <span className="info_value">{animal.gender}</span>
              </div>
              <div className="info_row">
                <span className="info_key">Size:</span> <span className="info_value">{animal.size}</span>
              </div>
              <div className="info_row">
                <span className="info_key">Coat:</span> <span className="info_value">{animal.coat}</span>
              </div>
              <div className="info_row">
                <span className="info_key">Attributes:</span> <span className="info_value">Spayed/Neutered: {animal.attributes.spayed_neutered ? "Yes" : "No"}, House Trained: {animal.attributes.house_trained ? "Yes" : "No"}, Declawed: {animal.attributes.declawed ? "Yes" : "No"}, Special Needs: {animal.attributes.special_needs ? "Yes" : "No"}, Shots Current: {animal.attributes.shots_current ? "Yes" : "No"}</span>
              </div>
              <div className="info_row">
                <span className="info_key">Environment:</span> <span className="info_value">Children: {animal.environment.children ? "Yes" : "No"}, Dogs: {animal.environment.dogs ? "Yes" : "No"}, Cats: {animal.environment.cats ? "Yes" : "No"}</span>
              </div>
              {/* <div className="info_row">
                <span className="info_key">Status:</span> <span className="info_value">{animal.status}</span>
              </div> */}
              <div className="info_row">
                <span className="info_key">Contact:</span> <span className="info_value">Email: {animal.contact.email}, Phone: {animal.contact.phone}, Address: {animal.contact.address.address1}, {animal.contact.address.city}, {animal.contact.address.state} {animal.contact.address.postcode}, {animal.contact.address.country}</span>
              </div>
              <div className="info_row">
                <span className="info_key">Published At:</span> <span className="info_value">{new Date(animal.published_at).toLocaleDateString()}</span>
              </div>
              <div className="info_row">
                <span className="info_key">Shelter:</span> <span className="info_value">{organization.website ? <span><a href={organization.website} target="_blank" rel="noospanener noreferrer">{organization.name}</a></span> : <span>{organization.name} (No Website Provided)</span>} </span>
              </div>
              {/* <div className="info_row">  <span className="info_key">Distance:</span> <span className="info_value">{animal.distance ? `${animal.distance.toFixed(2)} miles` : 'N/A'}</span>
              </div> */}
              <span style={{height:"6px"}}></span>
              <div className="description" >"{filteredDescription}"</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AnimalDetails;