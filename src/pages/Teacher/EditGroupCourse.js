import React from "react"
import ViewEditGroupCourse from "../../components/ViewTeacher/ViewEditGroupCourse";
 
const EditGroupCourse = (props) => {
    return(
<>
    <ViewEditGroupCourse id={props.match.params.id}/>
</>
    );
};
export default EditGroupCourse;