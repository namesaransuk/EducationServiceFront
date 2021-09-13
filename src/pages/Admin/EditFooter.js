import React from 'react';
import ViewEditFooter from "../../components/ViewAdmin/ViewEditFooter";

const EditFooter = (props) => {

    return (
        <ViewEditFooter id={props.match.params.id}/>
    );
}

export default EditFooter;