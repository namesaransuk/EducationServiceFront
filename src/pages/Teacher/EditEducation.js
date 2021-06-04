import React from "react"
import ViewEditEducation from "../../components/ViewTeacher/ViewEditEducation";
 
const EditEducation = (props) => {
    return(
<>
    <ViewEditEducation id={props.match.params.id}/>
</>
    );
};
export default EditEducation;