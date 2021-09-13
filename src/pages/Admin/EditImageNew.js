import React from "react"
import ViewEditImageNew from "../../components/ViewAdmin/ViewEditImageNew";
 
const EditImageNew = (props) => {
    return(
<>
    <ViewEditImageNew id={props.match.params.id}/>
</>
    );
};
export default EditImageNew;