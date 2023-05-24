/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/AnimalList.css"

const AnimalList = (props) => {
    const { animals, onRemove } = props;
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [animalsProps, setAnimalsProps] = useState(animals)
    const navigate = useNavigate()
    console.log("Here are the animals", animalsProps)

    const truncateString = (str, maxLength) => {
        if (str.length > maxLength) {
            return str.substring(0, maxLength) + '...';
        }
        return str;
    };

    function handleRemove(id) {
        onRemove(id);
      }

    
    if (animals){
        return(
            <div className="animal_list">
                {animals.map(animal => (
                    <div key={animal.id} className="animal_card">
                        <div className="animal_list_wrapper">
                            <div className="animal_list_img_container">
                                <img className="animal_img" 
                                    src={
                                        !animal.primary_photo_cropped ? "No Image Available" 
                                        : animal.primary_photo_cropped.full
                                    }
                                    alt="Missing Photo"
                                />
                            </div>
                            <div className="animal_info">
                                <p className="list_name" title={animal.name || "No Name"}>{truncateString(animal.name || "No Name", 15)}</p>
                                <div className="list_info">
                                    <p>{animal.age} | {animal.gender}</p>
                                    <p>{animal.breeds.primary}</p>
                                </div>
                            </div>
                            <button className="animal_button"
                                onClick={() => {
                                    setSelectedAnimal(animal);
                                    console.log("Selected animal:",selectedAnimal);
                                    navigate(`/animal-details/${animal.id}`, 
                                    { state: {animal, animalsProps} })
                                    
                                }}
                                >Learn More
                            </button>
                            {onRemove && (
                                <button className="remove" onClick={() => handleRemove(animal.id)}>Remove</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
export default AnimalList