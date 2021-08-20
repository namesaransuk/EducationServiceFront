import React from "react"
import ViewProfileAdmin from "../../components/ViewAdmin/ViewProfileAdmin";

const ProfileAdmin = (props) => {
    return(
<>
    <ViewProfileAdmin id={props.match.params.id}/>
</>
    );
};
export default ProfileAdmin;