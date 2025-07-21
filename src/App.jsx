import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Error from "Views/Common/Docs/error";
import { InitializeProjectSetup } from "Views/Common/Docs/InitializeProjectSetup";
import Login from "Views/Common/Docs/Login";
import Calendar from "Views/Student/Docs/Calendar";
import ClassRooms from "Views/Student/Docs/ClassRooms";
import Notes from "Views/Student/Docs/Notes";
import StudentDashboard from "Views/Student/Docs/StudentDashboard";

import { StudentAuth } from "Views/Student/Utils/Auth";
import { StudentLayout } from "Views/Student/Utils/StudentLayout";




function App() {
  return (
    <React.Fragment>
      <ToastContainer theme="light" />

      <Routes>
        <Route element={<InitializeProjectSetup />}>
          <Route index element={<Login />} />
          <Route path="*" element={<Error />} />
        </Route>


        {/* <Route>
          <Route element={<StudentLayout />} />
          <Route path="student_dashboard" element={<StudentDashboard />} />
        </Route> */}
        <Route element={<StudentAuth />}>
          <Route element={<StudentLayout />}>
            <Route path="student_dashboard" element={<StudentDashboard />} />
            <Route path="classrooms" >
              <Route index element={<ClassRooms />} />
              <Route path=":classroom_id" >
                {/* <Route index element={<TestClass/>} /> */}
                <Route path=":book_id" element={<p>book_id</p>} />
              </Route>
            </Route>
            <Route path="calendar" element={<Calendar />} />
            <Route path="notes" element={<Notes />} />
          </Route>
        </Route>

      </Routes>




    </React.Fragment>
  );
}

export default App;
