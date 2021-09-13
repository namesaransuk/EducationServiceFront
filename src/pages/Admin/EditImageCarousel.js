import React from "react"
import ViewEditImageCarousel from "../../components/ViewAdmin/ViewEditImageCarousel";
 
const EditImageCarousel = (props) => {
    return(
<>
    <ViewEditImageCarousel id={props.match.params.id}/>
</>
    );
};
export default EditImageCarousel;