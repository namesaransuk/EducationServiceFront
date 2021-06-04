import React from "react"
import ViewEdudetailAll from "../../components/ViewTeacher/ViewEdudetailAll";
 
const EducationAll = (props) => {
    return(
<>
    <ViewEdudetailAll id={props.match.params.id}/>
</>
    );
};
export default EducationAll;