import React from 'react';
import ViewEditDegree from "../../components/ViewTeacher/ViewEditDegree";

const EditDegree = (props) => {

    return (
        <ViewEditDegree id={props.match.params.id}/>
    );
}

export default EditDegree;