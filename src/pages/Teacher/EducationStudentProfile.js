import React from "react"
import ViewEducationStudentProfile from "../../components/ViewTeacher/ViewEducationStudentProfile";
 
const EducationStudentProfile = (props) => {
    return(
<>
    <ViewEducationStudentProfile id={props.match.params.id}/>
</>
    );
};
export default EducationStudentProfile;