import React from "react"
import ViewEditProfileTeacher from "../../components/ViewTeacher/ViewEditProfileTeacher";

const EditProfileTeacher = (props) => {
    return(
<>
    <ViewEditProfileTeacher id={props.match.params.id}/>
</>
    );
};
export default EditProfileTeacher;