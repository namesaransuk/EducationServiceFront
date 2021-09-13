import React from "react"
import ViewEditImageNameLogo from "../../components/ViewAdmin/ViewEditImageNameLogo";
 
const EditImageNameLogo = (props) => {
    return(
<>
    <ViewEditImageNameLogo id={props.match.params.id}/>
</>
    );
};
export default EditImageNameLogo;