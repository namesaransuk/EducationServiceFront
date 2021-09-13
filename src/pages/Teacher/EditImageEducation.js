import React from "react"
import ViewEditImageEducation from "../../components/ViewTeacher/ViewEditImageEducation";
 
const EditImageEducation = (props) => {
    return(
<>
    <ViewEditImageEducation id={props.match.params.id}/>
</>
    );
};
export default EditImageEducation;