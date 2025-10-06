import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Error from "Views/Common/Docs/error";
import { InitializeProjectSetup } from "Views/Common/Docs/InitializeProjectSetup";
import TimeTableCard from "Components/Card/TimeTableCard";
import Books from "Views/Common/Docs/Books";
import Notes from "Views/Common/Docs/Notes";
import ReusableProfile from "Views/Common/Docs/ReusableProfile";

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
import AdminProfile from "Views/Admin/Docs/AdminProfile";
import AdminPersonalInfo from "Views/Admin/Docs/AdminPersonalInfo";
import AdminSettings from "Views/Admin/Docs/AdminSettings";

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
import TeachersAssigned from "Views/Teachers/Docs/TeachersAssigned";
import SelfTakingTest from "Views/Teachers/Docs/SelfTakingTest";
import StudentsPerformanceLayout from "Views/Teachers/Layout/StudentsPerformanceLayout";
import TeachersAuth from "Views/Teachers/Layout/TeachersAuth";
import TeachersProfile from "Views/Teachers/Docs/TeachersProfile";
import TeachersPersonalInfo from "Views/Teachers/Docs/TeachersPersonalInfo";
import TeachersSettings from "Views/Teachers/Docs/TeachersSettings";

import StudentsLayout from "Views/Students/Layout/Layout";
import StudentDashboard from "Views/Students/Docs/index";
import StudentSubject from "Views/Students/Docs/StudentSubject";
import BooksAndAttachmentsLayout from "Views/Students/Layout/BooksAndAttachmentsLayout";
import StudentsBooks from "Views/Students/Docs/Books";
import StudentAttachments from "Views/Students/Docs/StudentAttachments";
import BooksOverviewLayout from "Views/Students/Layout/BooksOverviewLayout";
import McqTest from "Views/Students/Docs/McqTest";
import McqTestStatus from "Views/Students/Docs/McqTestStatus";
import StudentAuth from "Views/Students/Layout/StudentAuth";
import GenerateQuestionLayout from "Views/Students/Layout/GenerateQuestionLayout";
import GenerateQuestion from "Views/Students/Docs/GenerateQuestion";
import McqQuestions from "Views/Students/Docs/McqQuestions";
import LongQuestions from "Views/Students/Docs/LongQuestions";
import McqTestLayout from "Views/Students/Layout/McqTestLayout";
import StudentProfile from "Views/Students/Docs/StudentProfile";
import StudentPersonalInfo from "Views/Students/Docs/StudentPersonalInfo";
import StudentSettings from "Views/Students/Docs/StudentSettings";
import LearnerBooksOverview from "Views/Students/Docs/LearnerBooksOverview";


import LearnersLayout from 'Views/Learners/Layout/Layout'
import Dashboard from "Views/Learners/Docs/Dashboard";
import Calendar from "Views/Learners/Docs/Calendar";
import PricingPlan from "Views/Learners/Docs/PricingPlan";
import SelfTestLayout from "Views/Learners/Layout/SelfTestLayout";
import SelfTest from "Views/Learners/Docs/SelfTest";
import MCQ from "Views/Learners/Docs/MCQ";
import LongAnswers from "Views/Learners/Docs/LongAnswers";
import LearnersAuth from "Views/Learners/Layout/LearnersAuth";

import OrganisationLayout from "Views/Organisation/Layout/Layout";
import OrganisationDashboard from "Views/Organisation/Docs/OrganisationDashboard";
import OrgAnnualPlan from "Views/Organisation/Docs/OrgAnnualPlan";
import OrgMonthlyPlan from "Views/Organisation/Docs/OrgMonthlyPlan";
import OrgPersonalInfo from "Views/Organisation/Docs/OrgPersonalInfo";
import OrgPricingPlan from "Views/Organisation/Docs/OrgPricingPlan";
import OrgProfile from "Views/Organisation/Docs/OrgProfile";
import OrgSettings from "Views/Organisation/Docs/OrgSettings";

import SuperadminLayout from "Views/Superadmin/Layout/Layout";
import PersonalInfo from "Views/Superadmin/Docs/PersonalInfo";
import Profile from "Views/Superadmin/Docs/Profile";
import Settings from "Views/Superadmin/Docs/Settings";
import SuperAdminDashboard from "Views/Superadmin/Docs/SuperAdminDashboard";
import AdminAuth from "Views/Admin/Docs/AdminAuth";
import SuperadminAuth from "Views/Superadmin/Docs/SuperadminAuth";
import OrganisationAuth from "Views/Organisation/Docs/OrganisationAuth";
import TestHistory from "Views/Teachers/Docs/TestHistory";
import { UpdateDynamic_Class_Subject_id } from "Views/Teachers/Docs/UpdateDynamic_Class_Subject_id";





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
          <Route path="admin_dashboard" element={<AdminAuth />}>
            <Route element={<AdminLayout />}>
              <Route path="home" element={<AdminDashboard />} />
              <Route path="classrooms">
                <Route index element={<Classroom />} />
                <Route path=":id" element={<ClassroomDetails />} >
                  <Route path="teachers" element={<TeachersDetails />} />
                  <Route path="students" element={<StudentDetails />} />
                </Route>
              </Route>
              <Route path="profile" element={<AdminProfile />} >
                <Route index element={<AdminPersonalInfo/>} />
                <Route path="settings" element={<AdminSettings/>} />
              </Route>
            </Route>
          </Route>

          {/* Teachers */}
          <Route path="teachers_dashboard" element={<TeachersAuth />}>
            <Route element={<TeacherLayout />}>
              <Route path="home" element={<TeacherDashboard />} />
              <Route path="classrooms" >
                <Route index element={<StudentClassroom />} />
                <Route path=":class_id" element={<Subject />} />
                <Route path=":class_id/:subject_id" element={<UpdateDynamic_Class_Subject_id/>}>
                  <Route index element={<SubjectDetails />} />
                  <Route path=":student_id/overview" element={<StudentOverview />} />
                  <Route element={<ScheduleTestLayout />} >
                    <Route path="create_test" element={<CreateTest />} />
                    <Route path="preview_test/:test_id?" element={<PreviewTest />} />
                  </Route>
                    <Route path="test" element={<TestPageLayout />} />
                  <Route path="test_history" element={<TestHistory />} />

                <Route element={<StudentsPerformanceLayout />} >
                    <Route path="teachers_assigned" element={<TeachersAssigned />} />
                    <Route path="self_taking_test" element={<SelfTakingTest />} />
                  </Route>
                  <Route path="book" element={<Books />} />
                </Route>
              </Route>
              <Route path="students_details" >
                <Route index element={<Students />} />
                <Route path=":student_id/overview" element={<StudentOverview />} />
              </Route>
              <Route path="notes" element={<Notes />} />

              <Route path="profile" element={<TeachersProfile />} >
                <Route index element={<TeachersPersonalInfo />} />
                <Route path="settings" element={<TeachersSettings/>} />
              </Route>
            </Route>
          </Route>

          {/* Students */}
          <Route path="student_dashboard" element={<StudentAuth />}>
            <Route element={<StudentsLayout />}>
              <Route path="home" element={<StudentDashboard />} />
              <Route path="notes" element={<Notes />} />
              
              <Route path="learner_book/:book_id"  element={<LearnerBooksOverview/>} />
              <Route path="subjects">
                <Route index element={<StudentSubject />} />
                <Route path=":subject_id" element={<BooksAndAttachmentsLayout />}>
                  <Route index element={<StudentsBooks />} />
                  <Route path="attachments" element={<StudentAttachments />} />
                </Route>
                <Route path=":subject_id/books/:book_id" element={<BooksOverviewLayout />} />
              </Route>

              <Route path="profile" element={<StudentProfile />} >
                <Route index element={<StudentPersonalInfo />} />
                <Route path="settings" element={<StudentSettings />} />
              </Route>

            </Route>

            <Route path="generate_question/:id" element={<GenerateQuestionLayout />}>
              <Route index element={<GenerateQuestion />} />
              <Route path="mcq_questions" element={<McqQuestions />} />
              <Route path="long_questions" element={<LongQuestions />} />
            </Route>

            <Route path="test" element={<McqTestLayout />}>
              <Route index element={<McqTest />} />
              <Route path="test_status" element={<McqTestStatus />} />
            </Route>
          </Route>

          {/* Learners */}
          <Route path="learners_dashboard" element={<LearnersAuth />}>
            <Route element={<LearnersLayout />}>
              <Route index path="home" element={<Dashboard />} />
              <Route element={<SelfTestLayout />}>
                <Route path="self_test" element={<SelfTest />} />
                <Route path="mcq" element={<MCQ />} />
                <Route path="long_answers" element={<LongAnswers />} />
              </Route>
              <Route index path="calendar" element={<Calendar />} />
              <Route index path="notes" element={<Notes />} />
              <Route index path="pricing_plan" element={<PricingPlan />} />
            </Route>
          </Route>

          {/* Superadmin */}
          <Route path="superadmin_dashboard" element={<SuperadminAuth />}>
            <Route element={<SuperadminLayout />}>
              <Route path="home" element={<SuperAdminDashboard />} />
              <Route path="profile" element={<Profile />}>
                <Route index element={<PersonalInfo />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>
          </Route>

          {/* Organisation */}
          <Route path="organisation_dashboard" element={<OrganisationAuth />}>
            <Route element={<OrganisationLayout />}>
              <Route path="home" element={<OrganisationDashboard />} />
              <Route path="org_profile" element={<OrgProfile />}>
                <Route index element={<OrgPersonalInfo />} />
                <Route path="settings" element={<OrgSettings />} />
                <Route path="timetable" element={<TimeTableCard />} />
              </Route>
              <Route path="pricing_plan" element={<OrgPricingPlan />} >
                <Route index element={<OrgMonthlyPlan />} />
                <Route path="annually" element={<OrgAnnualPlan />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;