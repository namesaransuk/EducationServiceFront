import React from "react"
import ViewUpdateDetailEducationStudent from "../../components/ViewStudent/ViewUpdateDetailEducationStudent";

const UpdateDetailEducationStudent = (props) => {
    return(
<>
    <ViewUpdateDetailEducationStudent id={props.match.params.id}/>
</>
    );
};
export default UpdateDetailEducationStudent;