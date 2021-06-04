import React from "react"
import ViewProfile from "../../components/ViewStudent/ViewProfile";

const Profile = (props) => {
    return (
        <>
            <ViewProfile id={props.match.params.id} />
        </>
    );
};
export default Profile;