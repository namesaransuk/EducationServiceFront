import React from 'react';
import ViewEditNameLogo from "../../components/ViewAdmin/ViewEditNameLogo";

const EditNameLogo = (props) => {

    return (
        <ViewEditNameLogo id={props.match.params.id}/>
    );
}

export default EditNameLogo;