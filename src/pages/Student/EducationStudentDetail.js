import React from "react"
import ViewEducationStudentDetail from "../../components/ViewStudent/ViewEducationStudentDetail";

const EducationStudentDetail = (props) => {
    return (
        <>
            <ViewEducationStudentDetail id={props.match.params.id} />
        </>
    );
};
export default EducationStudentDetail;