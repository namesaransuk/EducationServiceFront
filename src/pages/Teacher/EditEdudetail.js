import React from "react"
import ViewEditEdudetail from "../../components/ViewTeacher/ViewEditEdudetail";
 
const EditEdudetail = (props) => {
    return(
<>
    <ViewEditEdudetail id={props.match.params.id}/>
</>
    );
};
export default EditEdudetail;