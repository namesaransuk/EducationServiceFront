import React from "react"
import ViewEditCarousel from "../../components/ViewAdmin/ViewEditCarousel";
 
const EditCarousel = (props) => {
    return(
<>
    <ViewEditCarousel id={props.match.params.id}/>
</>
    );
};
export default EditCarousel;