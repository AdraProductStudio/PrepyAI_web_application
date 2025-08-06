import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Error from "Views/Common/Docs/error";
import { InitializeProjectSetup } from "Views/Common/Docs/InitializeProjectSetup";

import LoginForm from "Views/Auth/Docs/LoginForm";
import LearnersRegister from "Views/Auth/Docs/LearnersRegister";
import OrganizationRegister from "Views/Auth/Docs/OrganizationRegister";
import AdminRegister from "Views/Auth/Docs/AdminRegister";
import TeacherRegister from "Views/Auth/Docs/TeacherRegister";
import StudentRegister from "Views/Auth/Docs/StudentRegister";
import ForgotPassword from "Views/Auth/Docs/ForgotPassword";
import CreatePassword from "Views/Auth/Docs/CreatePassword";
import Verification from "Views/Auth/Docs/Verification";
import SucessfullMessage from "Views/Auth/Docs/SucessfullMessage";

import AdminLayout from "Views/Admin/Layout/Layout";
import AdminDashboard from "Views/Admin/Docs/Index";
import Classroom from "Views/Admin/Docs/Classroom";
import ClassroomDetails from "Views/Admin/Layout/ClassroomDetailsLayout";
import TeachersDetails from "Views/Admin/Docs/TeachersDetails";
import StudentDetails from "Views/Admin/Docs/StudentDetails";

import TeacherLayout from "Views/Teachers/Layout/Layout";
import TeacherDashboard from "Views/Teachers/Docs/Index";
import StudentOverview from "Views/Teachers/Docs/StudentOverview";
import StudentClassroom from "Views/Teachers/Docs/Classroom";
import Subject from "Views/Teachers/Docs/Subject";
import SubjectDetails from "Views/Teachers/Docs/SubjectDetails";
import Students from "Views/Teachers/Docs/Students";
import ScheduleTestLayout from "Views/Teachers/Layout/ScheduleTestLayout";
import CreateTest from "Views/Teachers/Docs/CreateTest";
import PreviewTest from "Views/Teachers/Docs/PreviewTest";
import TestPageLayout from "Views/Teachers/Layout/TestPageLayout";
import UpcomingTest from "Views/Teachers/Docs/UpcomingTest";
import OngoingTest from "Views/Teachers/Docs/OngoingTest";
import CompletedTest from "Views/Teachers/Docs/CompletedTest";
import Books from "Views/Common/Docs/Books";

import StudentsLayout from "Views/Students/Layout/Layout";
import StudentDashboard from "Views/Students/Docs/index";
import StudentSubject from "Views/Students/Docs/StudentSubject";
import BooksAndAttachmentsLayout from "Views/Students/Layout/BooksAndAttachmentsLayout";
import StudentsBooks from "Views/Students/Docs/Books";
import StudentAttachments from "Views/Students/Docs/StudentAttachments";
import BooksOverviewLayout from "Views/Students/Layout/BooksOverviewLayout";
import McqTest from "Views/Students/Docs/McqTest";
import Notes from "Views/Common/Docs/Notes";

function App() {
  return (
    <Fragment>
      <ToastContainer theme="light" />
      <Routes>
        <Route element={<InitializeProjectSetup />}>
          {/* Auth */}
          <Route index element={<LoginForm />} />
          <Route path="learners_registration" element={<LearnersRegister />} />
          <Route path="organization_registration" element={<OrganizationRegister />} />
          <Route path="admin_registration" element={<AdminRegister />} />
          <Route path="teacher_registration" element={<TeacherRegister />} />
          <Route path="student_registration" element={<StudentRegister />} />
          <Route path="forgot_password" element={<ForgotPassword />} />
          <Route path="create_password" element={<CreatePassword />} />
          <Route path="otp_verification" element={<Verification />} />
          <Route path="success_message" element={<SucessfullMessage />} />

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
          <Route path="teachers_dashboard" element={<TeacherLayout />}>
            <Route path="home" element={<TeacherDashboard />} />
            <Route path="classrooms" >
              <Route index element={<StudentClassroom />} />
              <Route path=":class_id" element={<Subject />} />
              <Route path=":class_id/:subject_id">
                <Route index element={<SubjectDetails />} />
                <Route path="students_details" element={<StudentOverview />} />
                <Route element={<ScheduleTestLayout />} >
                  <Route path="create_test" element={<CreateTest />} />
                  <Route path="preview_test" element={<PreviewTest />} />
                </Route>
                <Route path="test" element={<TestPageLayout />}>
                  <Route index element={<UpcomingTest />} />
                  <Route path="ongoing_test" element={<OngoingTest />} />
                  <Route path="completed_test" element={<CompletedTest />} />
                </Route>
                <Route path="student_performance" element={<p>student_performance</p>} />
                <Route path="book" element={<Books />} />
              </Route>
            </Route>
            <Route path="students_details" >
              <Route index element={<Students />} />
              <Route path="overview" element={<StudentOverview />} />
            </Route>
            {/* <Route path="calendar" element={<div>Calendar Page</div>} /> */}
            <Route path="notes" element={<Notes />} />
          </Route>

          {/* Students */}
          <Route path="student_dashboard" element={<StudentsLayout />}>
            <Route path="home" element={<StudentDashboard />} />
            <Route path="subjects">
              <Route index element={<StudentSubject />} />
              <Route path=":subject_id" element={<BooksAndAttachmentsLayout />}>
                <Route index element={<StudentsBooks />} />
                <Route path="attachments" element={<StudentAttachments />} />
              </Route>
              <Route path=":subject_id/attachments/:attachment_id" element={<BooksOverviewLayout />} />
            </Route>
            <Route path="test" element={<McqTest />} />
            <Route path="notes" element={<Notes />} />
          </Route>

          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;