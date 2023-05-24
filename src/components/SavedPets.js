// // components/SavedPets.js
// import React, { useState, useEffect } from "react";
// import { db, auth } from "../firebase";
// import '../CSS/Profile.css'

// const SavedPets = () => {
//   const [savedPets, setSavedPets] = useState([]);

//   useEffect(() => {
//     const fetchSavedPets = async () => {
//       try {
//         const user = auth.currentUser;
//         if (user) {
//           const doc = await db.collection("users").doc(user.uid).get();
//           const userData = doc.data();
//           setSavedPets(userData.savedPets);
//         }
//       } catch (error) {
//         console.error("Error fetching saved pets: ", error);
//       }
//     };

//     fetchSavedPets();
//   }, []);

//   // Display the list of saved pets
//   // ... (the rest of the component)
//   return (
//     <div className="profile">
//       <div className="saved_pets">
//         <h1>Saved Pets</h1>
//         {savedPets}
//       </div>
//     </div>
//   )
// };

// export default SavedPets