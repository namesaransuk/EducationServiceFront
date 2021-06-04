import React from "react"
import ViewEditCourse from "../../components/ViewTeacher/ViewEditCourse";
 
const EditCourse = (props) => {
    return(
<>
    <ViewEditCourse id={props.match.params.id}/>
</>
    );
};
export default EditCourse;