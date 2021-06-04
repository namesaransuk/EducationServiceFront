import React from "react"
import ViewEditFaculty from "../../components/ViewTeacher/ViewEditFaculty";
 
const EditFaculty = (props) => {
    return(
<>
    <ViewEditFaculty id={props.match.params.id}/>
</>
    );
};
export default EditFaculty;