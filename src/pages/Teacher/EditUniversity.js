import React from "react"
import ViewEditUniversity from "../../components/ViewTeacher/ViewEditUniversity";
 
const EditUniversity = (props) => {
    return(
<>
    <ViewEditUniversity id={props.match.params.id}/>
</>
    );
};
export default EditUniversity;