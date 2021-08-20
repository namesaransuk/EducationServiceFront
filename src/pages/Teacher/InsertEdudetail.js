import React from "react"
import ViewInsertEduDetail from "../../components/ViewTeacher/ViewInsertEduDetail";
 
const InsertEdudetail = (props) => {
    return(
<>
    <ViewInsertEduDetail id={props.match.params.id}/>
</>
    );
};
export default InsertEdudetail;