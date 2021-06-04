import React from "react"
import ViewDetailEducationStudent from "../../components/ViewStudent/ViewDetailEducationStudent";
 
const DetailEducationStudent = (props) => {
    return(
<>
    <ViewDetailEducationStudent id={props.match.params.id}/>
</>
    );
};
export default DetailEducationStudent;