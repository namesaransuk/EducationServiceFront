import React from "react"
import ViewEditProfile from "../../components/ViewStudent/ViewEditProfile";

const Profile = (props) => {
    return(
<>
    <ViewEditProfile id={props.match.params.id}/>
</>
    );
};
export default Profile;