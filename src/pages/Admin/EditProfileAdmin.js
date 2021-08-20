import React from "react"
import ViewEditProfileAdmin from "../../components/ViewAdmin/ViewEditProfileAdmin";

const EditProfileAdmin = (props) => {
    return(
<>
    <ViewEditProfileAdmin id={props.match.params.id}/>
</>
    );
};
export default EditProfileAdmin;