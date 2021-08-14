import React from "react"
import ViewEditImageUniversity from "../../components/ViewTeacher/ViewEditImageUniversity";
 
const EditImageUniversity = (props) => {
    return(
<>
    <ViewEditImageUniversity id={props.match.params.id}/>
</>
    );
};
export default EditImageUniversity;