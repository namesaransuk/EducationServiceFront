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
import CarouselAll from "./pages/Admin/CarouselAll";
import InsertCarousel from "./pages/Admin/InsertCarousel";
import EditCarousel from "./pages/Admin/EditCarousel";
import EditImageCarousel from "./pages/Admin/EditImageCarousel";
import EditNameLogo from "./pages/Admin/EditNameLogo";
import EditImageNameLogo from "./pages/Admin/EditImageNameLogo";
import EditImageEducation from "./pages/Teacher/EditImageEducation";
import NewAll from "./pages/Admin/NewAll";
import InsertNew from "./pages/Admin/InsertNew";
import EditNew from "./pages/Admin/EditNew";
import EditImageNew from "./pages/Admin/EditImageNew";
import EditFooter from "./pages/Admin/EditFooter";
import New_detail from "./pages/Admin/New_detail";
import Studentall from "./pages/Admin/Studentall";

import Hometeacher from "./pages/Hometeacher";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />

        <Route path="/Student/home" component={Home} />
        <Route path="/Student/educationstudent" component={EducationStudent} />
        <Route path="/Student/educationstudentdetail/:id" component={EducationStudentDetail} />
        <Route path="/Student/profile/:id" component={Profile} />
        <Route path="/Student/editprofile/:id" component={EditProfile} />
        <Route path="/Student/insertdetaileducationstudent/:id" component={InsertDetailEducationStudent} />
        <Route path="/Student/detaileducationstudent/:id" component={DetailEducationStudent} />
        <Route path="/Student/updatedetaileducationstudent/:id" component={UpdateDetailEducationStudent} />
        <Route path="/Student/educationstudentallstudent" component={EducationStudentAllStudent} />
        <Route path="/Student/New_detail/:id" component={New_detail} />


        <Route path="/Teacher/dashboardteacher" component={DashboardTeacher} />
        <Route path="/Teacher/inserteducation" component={InsertEducation} />
        <Route path="/Teacher/Hometeacher" component={Hometeacher} />
        <Route path="/Teacher/editeducation/:id" component={EditEducation} />
        <Route path="/Teacher/universityAll" component={UniversityAll} />
        <Route path="/Teacher/editUniversity/:id" component={EditUniversity} />
        <Route path="/Teacher/editFaculty/:id" component={EditFaculty} />
        <Route path="/Teacher/editCourse/:id" component={EditCourse} />
        <Route path="/Teacher/insertuniversity" component={InsertUniversity} />
        <Route path="/Teacher/facultyall" component={FacultyAll} />
        <Route path="/Teacher/insertfaculty" component={InsertFaculty} />
        <Route path="/Teacher/courseall" component={CourseAll} />
        <Route path="/Teacher/insertcourse" component={InsertCourse} />
        <Route path="/Teacher/groupcourseall" component={GroupCourseAll} />
        <Route path="/Teacher/insertgroupcourse" component={InsertGroupCourse} />
        <Route path="/Teacher/editgroupcourse/:id" component={EditGroupCourse} />
        <Route path="/Teacher/educationall" component={EducationAll} />
        <Route path="/Teacher/educationstudentall" component={EducationStudentAll} />
        <Route path="/Teacher/detailstudenteducation" component={DetailStudentEducation} />
        <Route path="/Teacher/InsertEdudetail/:id" component={InsertEdudetail} />
        <Route path="/Teacher/edudetailall/:id" component={Edudetailall} />
        <Route path="/Teacher/editedudetail/:id" component={EditEdudetail} />
        <Route path="/Teacher/InsertEdudetail/:id" component={InsertEdudetail} />
        <Route path="/Teacher/degreeall" component={DegreeAll} />
        <Route path="/Teacher/insertdegree" component={InsertDegree} />
        <Route path="/Teacher/Editdegree/:id" component={EditDegree} />
        <Route path="/Teacher/EducationStudentClass/:id" component={EducationStudentClass} />
        <Route path="/Teacher/EducationStudentData/:id" component={EducationStudentData} />
        <Route path="/Teacher/ProfileTeacher/:id" component={ProfileTeacher} />
        <Route path="/Teacher/EditProfileTeacher/:id" component={EditProfileTeacher} />
        <Route path="/Teacher/EditImageEducation/:id" component={EditImageEducation} />

        <Route path="/Teacher/EducationStudentProfile/:id" component={EducationStudentProfile} />
        <Route path="/Teacher/EditImageUniversity/:id" component={EditImageUniversity} />

        <Route path="/Admin/dashboardadmin" component={DashBoardAdmin} />
        <Route path="/Admin/ProfileAdmin/:id" component={ProfileAdmin} />
        <Route path="/Admin/EditProfileAdmin/:id" component={EditProfileAdmin} />
        <Route path="/Admin/Adminall" component={Adminall} />
        <Route path="/Admin/InsertStaff" component={InsertStaff} />
        <Route path="/Admin/CarouselAll" component={CarouselAll} />
        <Route path="/Admin/InsertCarousel" component={InsertCarousel} />
        <Route path="/Admin/EditCarousel/:id" component={EditCarousel} />
        <Route path="/Admin/EditImageCarousel/:id" component={EditImageCarousel} />
        <Route path="/Admin/EditNameLogo/:id" component={EditNameLogo} />
        <Route path="/Admin/EditImageNameLogo/:id" component={EditImageNameLogo} />
        <Route path="/Admin/NewAll" component={NewAll} />
        <Route path="/Admin/InsertNew" component={InsertNew} />
        <Route path="/Admin/EditNew/:id" component={EditNew} />
        <Route path="/Admin/EditImageNew/:id" component={EditImageNew} />
        <Route path="/Admin/insertstudent" component={InsertStudent} />
        <Route path="/Admin/EditFooter/:id" component={EditFooter} />
        <Route path="/Admin/Studentall" component={Studentall} />

        
      </Switch>
      <Footer/>
    </Router>
  );
};
export default App;