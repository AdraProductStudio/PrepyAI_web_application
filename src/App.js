import ClassroomCard from "Components/Card/ClassroomCard";
import SubjectsCard from "Components/Card/SubjectsCard";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Error from "Views/Common/Docs/error";
import { InitializeProjectSetup } from "Views/Common/Docs/InitializeProjectSetup";
import Login from "Views/Common/Docs/Login";

function App() {
  return (
    // <React.Fragment>
    //   <ToastContainer theme="light" />

    //   <Routes>
    //     <Route element={<InitializeProjectSetup />}>
    //       <Route index element={<ClassroomCard />} />
    //       <Route path="*" element={<Error />} />
    //     </Route>
    //   </Routes>

    // </React.Fragment>

    // <ClassroomCard
    //   data={{ title: 'hii', date: '23/7/2025', no_of_stu: 10, no_of_books: 10 }}
    //   onclick={() => console.log("Button clicked")}
    // />

    <SubjectsCard
      data={{ subject: 'Tamil', teacher_name: 'John Doe', no_of_tests: 10, no_of_books: 10 }}
      onclick={() => console.log("Button clicked")}
    />
  );
}

export default App;
