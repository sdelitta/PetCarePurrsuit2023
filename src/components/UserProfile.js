import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import AnimalList from "./AnimalList";
import '../CSS/Profile.css'

const UserProfile = (props) => {
    const [savedPets, setSavedPets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            await new Promise((resolve) => {
                const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    fetchSavedPets(user);
                } else {
                    setSavedPets([]);
                }
                resolve();
                });

                return () => {
                unsubscribe();
                };
            });
            setLoading(false);
        })();
    }, []);

    function handleRemove(id) {
        const newSavedPets = savedPets.filter((pet) => pet.id !== id);
        setSavedPets(newSavedPets);
      }

    const fetchSavedPets = (user) => {
        if (user) {
            try {
                const userCollection = collection(db, "users");
                const userDoc = doc(userCollection, user.uid);
                onSnapshot(userDoc, (doc) => {
                const userData = doc.data();
                if (userData) {
                    setSavedPets(userData.savedPets || []);
                } else {
                    setSavedPets([]);
                }
                });
            } catch (error) {
                console.error("Error fetching saved pets: ", error);
            }
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="saved_pets">
            {/* <div className="emblem"></div> */}
            <h2>Your Saved Pets</h2>
            {savedPets.length > 0 ? (
                <AnimalList animals={savedPets} onRemove={handleRemove}/>
            ) : (
                <p>No saved pets found</p>
            )}
        </div>
    );
};

export default UserProfile;