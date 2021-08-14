import React from "react"
import ViewProfileTeacher from "../../components/ViewTeacher/ViewProfileTeacher";

const ProfileTeacher = (props) => {
    return(
<>
    <ViewProfileTeacher id={props.match.params.id}/>
</>
    );
};
export default ProfileTeacher;