// import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import "tailwindcss/tailwind.css"
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import EducationStudent from "./pages/Student/EducationStudent";
// import Login from "./pages/Login";
// import EducationStudentDetail from "./pages/Student/EducationStudentDetail";
// import Profile from "./pages/Student/Profile";
// import EditProfile from "./pages/Student/EditProfile";
// import DetailEducationStudent from "./pages/Student/DetailEducationStudent";
// import InsertDetailEducationStudent from "./pages/Student/InsertDetailEducationStudent";
// import EducationStudentAllStudent from "./pages/Student/EducationStudentAllStudent";
// import UpdateDetailEducationStudent from "./pages/Student/UpdateDetailEducationStudent";
// import InsertEducation from "./pages/Teacher/InsertEducation";
// import EditEducation from "./pages/Teacher/EditEducation";
// import UniversityAll from "./pages/Teacher/UniversityAll";
// import EditUniversity from "./pages/Teacher/EditUniversity";
// import EditFaculty from "./pages/Teacher/EditFaculty";
// import EditCourse from "./pages/Teacher/EditCourse";
// import InsertUniversity from "./pages/Teacher/InsertUniversity";
// import DashboardTeacher from "./pages/Teacher/DashboardTeacher";
// import FacultyAll from "./pages/Teacher/FacultyAll";
// import InsertFaculty from "./pages/Teacher/InsertFaculty";
// import CourseAll from "./pages/Teacher/CourseAll";
// import InsertCourse from "./pages/Teacher/InsertCourse";
// import GroupCourseAll from "./pages/Teacher/GroupCourseAll";
// import InsertGroupCourse from "./pages/Teacher/InsertGroupCourse";
// import EditGroupCourse from "./pages/Teacher/EditGroupCourse";
// import EducationAll from "./pages/Teacher/EducationAll";
// import EducationStudentAll from "./pages/Teacher/EducationStudentAll";
// import DashBoardAdmin from "./pages/Admin/DashBoardAdmin";
// import DetailStudentEducation from "./pages/Teacher/DetailStudentEducation";
// import InsertStudent from "./pages/Admin/InsertStudent";
// import Educationdetail from "./pages/Teacher/InsertEdudetail";
// import Edudetailall from "./pages/Teacher/EdudetailAll";
// import EditEdudetail from "./pages/Teacher/EditEdudetail";
// import DegreeAll from "./pages/Teacher/DegreeAll";
// import InsertDegree from "./pages/Teacher/InsertDegree";
// import EditDegree from "./pages/Teacher/EditDegree";
// import Test from "./pages/Student/Test";

// import Hometeacher from "./pages/Hometeacher";

// const App = () => {
//   return (
//     <Router>
//       <Header />
//       <Switch>
//         <Route exact path="/" component={Home} />
//         <Route path="/home" component={Home} />
//         <Route path="/Hometeacher" component={Hometeacher} />
//         <Route path="/educationstudent" component={EducationStudent} />
//         <Route path="/educationstudentdetail/:id" component={EducationStudentDetail} />
//         <Route path="/login" component={Login} />
//         <Route path="/profile/:id" component={Profile} />
//         <Route path="/insertdetaileducationstudent/:id" component={InsertDetailEducationStudent} />
//         <Route path="/editprofile/:id" component={EditProfile} />
//         <Route path="/detaileducationstudent/:id" component={DetailEducationStudent} />
//         <Route path="/updatedetaileducationstudent/:id" component={UpdateDetailEducationStudent} />
//         <Route path="/inserteducation" component={InsertEducation} />
//         <Route path="/editeducation/:id" component={EditEducation} />
//         <Route path="/universityAll" component={UniversityAll} />
//         <Route path="/editUniversity/:id" component={EditUniversity} />
//         <Route path="/editFaculty/:id" component={EditFaculty} />
//         <Route path="/editCourse/:id" component={EditCourse} />
//         <Route path="/insertdetaileducationstudent/:id" component={InsertDetailEducationStudent} />
//         <Route path="/educationstudentallstudent" component={EducationStudentAllStudent} />
//         <Route path="/dashboardteacher" component={DashboardTeacher} />
//         <Route path="/insertuniversity" component={InsertUniversity} />
//         <Route path="/fucultyall" component={FacultyAll} />
//         <Route path="/insertfaculty" component={InsertFaculty} />
//         <Route path="/courseall" component={CourseAll} />
//         <Route path="/insertcourse" component={InsertCourse} />
//         <Route path="/groupcourseall" component={GroupCourseAll} />
//         <Route path="/insertgroupcourse" component={InsertGroupCourse} />
//         <Route path="/editgroupcourse/:id" component={EditGroupCourse} />
//         <Route path="/educationall" component={EducationAll} />
//         <Route path="/educationstudentall" component={EducationStudentAll} />
//         <Route path="/detailstudenteducation" component={DetailStudentEducation} />
//         <Route path="/insertstudent" component={InsertStudent} />
//         <Route path="/dashboardadmin" component={DashBoardAdmin} />
//         <Route path="/educationdetail" component={Educationdetail} />
//         <Route path="/edudatailall/:id" component={Edudetailall} />
//         <Route path="/editedudetail/:id" component={EditEdudetail} />
//         <Route path="/degreeall" component={DegreeAll} />
//         <Route path="/insertdegree" component={InsertDegree} />
//         <Route path="/Editdegree/:id" component={EditDegree} />









//         <Route path="/Test" component={Test} />
//         <Route path="/Tests" component={Test} />

//       </Switch>
//       <Footer/>
//     </Router>
//   );
// };
// export default App;
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "tailwindcss/tailwind.css"
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import EducationStudent from "./pages/Student/EducationStudent";
import Login from "./pages/Login";
import EducationStudentDetail from "./pages/Student/EducationStudentDetail";
import Profile from "./pages/Student/Profile";
import EditProfile from "./pages/Student/EditProfile";
import DetailEducationStudent from "./pages/Student/DetailEducationStudent";
import InsertDetailEducationStudent from "./pages/Student/InsertDetailEducationStudent";
import EducationStudentAllStudent from "./pages/Student/EducationStudentAllStudent";
import UpdateDetailEducationStudent from "./pages/Student/UpdateDetailEducationStudent";
import InsertEducation from "./pages/Teacher/InsertEducation";
import EditEducation from "./pages/Teacher/EditEducation";
import UniversityAll from "./pages/Teacher/UniversityAll";
import EditUniversity from "./pages/Teacher/EditUniversity";
import EditFaculty from "./pages/Teacher/EditFaculty";
import EditCourse from "./pages/Teacher/EditCourse";
import InsertUniversity from "./pages/Teacher/InsertUniversity";
import DashboardTeacher from "./pages/Teacher/DashboardTeacher";
import FacultyAll from "./pages/Teacher/FacultyAll";
import InsertFaculty from "./pages/Teacher/InsertFaculty";
import CourseAll from "./pages/Teacher/CourseAll";
import InsertCourse from "./pages/Teacher/InsertCourse";
import GroupCourseAll from "./pages/Teacher/GroupCourseAll";
import InsertGroupCourse from "./pages/Teacher/InsertGroupCourse";
import EditGroupCourse from "./pages/Teacher/EditGroupCourse";
import EducationAll from "./pages/Teacher/EducationAll";
import EducationStudentAll from "./pages/Teacher/EducationStudentAll";
import DashBoardAdmin from "./pages/Admin/DashBoardAdmin";
import DetailStudentEducation from "./pages/Teacher/DetailStudentEducation";
import InsertStudent from "./pages/Admin/InsertStudent";
import InsertEdudetail from "./pages/Teacher/InsertEdudetail";
import Edudetailall from "./pages/Teacher/EdudetailAll";
import EditEdudetail from "./pages/Teacher/EditEdudetail";
import DegreeAll from "./pages/Teacher/DegreeAll";
import InsertDegree from "./pages/Teacher/InsertDegree";
import EditDegree from "./pages/Teacher/EditDegree";
import Test from "./pages/Student/Test";
import EducationStudentClass from "./pages/Teacher/EducationStudentClass";
import EducationStudentData from "./pages/Teacher/EducationStudentData";
import EducationStudentProfile from "./pages/Teacher/EducationStudentProfile";
import Adminall from "./pages/Admin/Adminall";
import InsertStaff from "./pages/Admin/InsertStaff";
import EditImageUniversity from "./pages/Teacher/EditImageUniversity";
import ProfileTeacher from "./pages/Teacher/ProfileTeacher";
import EditProfileTeacher from "./pages/Teacher/EditProfileTeacher";
import ProfileAdmin from "./pages/Admin/ProfileAdmin";
import EditProfileAdmin from "./pages/Admin/EditProfileAdmin";

import Hometeacher from "./pages/Hometeacher";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/Hometeacher" component={Hometeacher} />
        <Route path="/educationstudent" component={EducationStudent} />
        <Route path="/educationstudentdetail/:id" component={EducationStudentDetail} />
        <Route path="/login" component={Login} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/insertdetaileducationstudent/:id" component={InsertDetailEducationStudent} />
        <Route path="/editprofile/:id" component={EditProfile} />
        <Route path="/detaileducationstudent/:id" component={DetailEducationStudent} />
        <Route path="/updatedetaileducationstudent/:id" component={UpdateDetailEducationStudent} />
        <Route path="/inserteducation" component={InsertEducation} />
        <Route path="/editeducation/:id" component={EditEducation} />
        <Route path="/universityAll" component={UniversityAll} />
        <Route path="/editUniversity/:id" component={EditUniversity} />
        <Route path="/editFaculty/:id" component={EditFaculty} />
        <Route path="/editCourse/:id" component={EditCourse} />
        <Route path="/insertdetaileducationstudent/:id" component={InsertDetailEducationStudent} />
        <Route path="/educationstudentallstudent" component={EducationStudentAllStudent} />
        <Route path="/dashboardteacher" component={DashboardTeacher} />
        <Route path="/insertuniversity" component={InsertUniversity} />
        <Route path="/facultyall" component={FacultyAll} />
        <Route path="/insertfaculty" component={InsertFaculty} />
        <Route path="/courseall" component={CourseAll} />
        <Route path="/insertcourse" component={InsertCourse} />
        <Route path="/groupcourseall" component={GroupCourseAll} />
        <Route path="/insertgroupcourse" component={InsertGroupCourse} />
        <Route path="/editgroupcourse/:id" component={EditGroupCourse} />
        <Route path="/educationall" component={EducationAll} />
        <Route path="/educationstudentall" component={EducationStudentAll} />
        <Route path="/detailstudenteducation" component={DetailStudentEducation} />
        <Route path="/insertstudent" component={InsertStudent} />
        <Route path="/dashboardadmin" component={DashBoardAdmin} />
        <Route path="/InsertEdudetail/:id" component={InsertEdudetail} />
        <Route path="/edudetailall/:id" component={Edudetailall} />
        <Route path="/editedudetail/:id" component={EditEdudetail} />
        <Route path="/InsertEdudetail/:id" component={InsertEdudetail} />
        <Route path="/degreeall" component={DegreeAll} />
        <Route path="/insertdegree" component={InsertDegree} />
        <Route path="/Editdegree/:id" component={EditDegree} />
        <Route path="/EducationStudentClass/:id" component={EducationStudentClass} />
        <Route path="/EducationStudentData/:id" component={EducationStudentData} />

        <Route path="/EducationStudentProfile/:id" component={EducationStudentProfile} />
        <Route path="/EditImageUniversity/:id" component={EditImageUniversity} />

        <Route path="/ProfileTeacher/:id" component={ProfileTeacher} />
        <Route path="/EditProfileTeacher/:id" component={EditProfileTeacher} />

        <Route path="/ProfileAdmin/:id" component={ProfileAdmin} />
        <Route path="/EditProfileAdmin/:id" component={EditProfileAdmin} />

        <Route path="/Adminall" component={Adminall} />
        <Route path="/InsertStaff" component={InsertStaff} />

        <Route path="/Test" component={Test} />
        <Route path="/Tests" component={Test} />

      </Switch>
      <Footer/>
    </Router>
  );
};
export default App;