import React from "react"
import ViewEducationStudentClass from "../../components/ViewTeacher/ViewEducationStudentClass";
 
const EducationStudentClass = (props) => {
    return(
<>
    <ViewEducationStudentClass id={props.match.params.id}/>
</>
    );
};
export default EducationStudentClass;