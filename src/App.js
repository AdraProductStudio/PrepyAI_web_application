import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Error from "Views/Common/Docs/error";
import { InitializeProjectSetup } from "Views/Common/Docs/InitializeProjectSetup";

import AdminLayout from "Views/Admin/Layout/Layout";
import AdminDashboard from "Views/Admin/Docs/Index";
import Classroom from "Views/Admin/Docs/Classroom";
import ClassroomDetails from "Views/Admin/Layout/ClassroomDetailsLayout";
import TeachersDetails from "Views/Admin/Docs/TeachersDetails";
import StudentDetails from "Views/Admin/Docs/StudentDetails";

import StudentLayout from "Views/Teachers/Layout/Layout";
import StudentDashboard from "Views/Teachers/Docs/Index";
import StudentOverview from "Views/Teachers/Docs/StudentOverview";
import StudentClassroom from "Views/Teachers/Docs/Classroom";
import Subject from "Views/Teachers/Docs/Subject";
import SubjectDetails from "Views/Teachers/Docs/SubjectDetails";
import Students from "Views/Teachers/Docs/Students";
import ScheduleTestLayout from "Views/Teachers/Layout/ScheduleTestLayout";


function App() {
  return (
    <React.Fragment>
      <ToastContainer theme="light" />
      <Routes>
        <Route element={<InitializeProjectSetup />}>
          {/* Admin */}
          <Route path="admin_dashboard" element={<AdminLayout />}>
            <Route path="home" element={<AdminDashboard />} />
            <Route path="classrooms">
              <Route index element={<Classroom />} />
              <Route path=":id" element={<ClassroomDetails />} >
                <Route path="teachers" element={<TeachersDetails />} />
                <Route path="students" element={<StudentDetails />} />
              </Route>
            </Route>
          </Route>

          {/* Teachers */}
          <Route path="teachers_dashboard" element={<StudentLayout />}>
            <Route path="home" element={<StudentDashboard />} />
            <Route path="classrooms" >
              <Route index element={<StudentClassroom />} />
              <Route path=":class_id" element={<Subject />} />
              <Route path=":class_id/:subject_id">
                <Route index element={<SubjectDetails />} />
                <Route path="students_details" element={<StudentOverview />} />
                <Route element={<ScheduleTestLayout />} >
                  <Route path="create_test" element={<p>create</p>} />
                  <Route path="preview_test" element={<p>preview</p>} />
                </Route>
              </Route>
            </Route>
            <Route path="students_details" >
              <Route index element={<Students />} />
              <Route path="overview" element={<StudentOverview />} />
            </Route>
            <Route path="calendar" element={<div>Calendar Page</div>} />
            <Route path="notes" element={<div>Notes Page</div>} />
          </Route>

          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;