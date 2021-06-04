import React from "react"
import ViewInsertdetailEducationStudent from "../../components/ViewStudent/ViewInsertdetailEducationStudent";
 
const InsertDetailEducationStudent = (props) => {
    return(
<>
    <ViewInsertdetailEducationStudent id={props.match.params.id}/>
</>
    );
};
export default InsertDetailEducationStudent;