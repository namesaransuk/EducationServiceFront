import React from "react"
import ViewNew_detail from "../../components/ViewAdmin/ViewNew_detail";
 
const New_detail = (props) => {
    return(
<>
    <ViewNew_detail id={props.match.params.id}/>
</>
    );
};
export default New_detail;