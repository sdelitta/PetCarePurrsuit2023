import AnimalDetails from "../components/AnimalDetails";
import { useLocation } from "react-router-dom"

const AnimalDetailPage = () => {
    const location = useLocation();
    const { animal } = location.state;
    const { animalsProps } = location.state
    return (
      <div>
        <AnimalDetails animal={animal} animals={animalsProps} />
      </div>
    )
  }
  export default AnimalDetailPage