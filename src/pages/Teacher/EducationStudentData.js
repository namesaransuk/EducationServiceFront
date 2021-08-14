import React from "react"
import ViewEducationStudentData from "../../components/ViewTeacher/ViewEducationStudentData";
 
const EducationStudentData = (props) => {
    return(
<>
    <ViewEducationStudentData id={props.match.params.id}/>
</>
    );
};
export default EducationStudentData;