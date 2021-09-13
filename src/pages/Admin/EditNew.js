import React from 'react';
import ViewEditNew from "../../components/ViewAdmin/ViewEditNew";

const EditNew = (props) => {

    return (
        <ViewEditNew id={props.match.params.id}/>
    );
}

export default EditNew;