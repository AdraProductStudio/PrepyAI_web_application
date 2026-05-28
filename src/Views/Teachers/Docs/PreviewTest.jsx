import React, { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { saveAs } from "file-saver";
import ButtonComponent from "Components/Button/Button";
import QuestionPaperCard from "Components/Card/QuestionPaperCard";
import Icons from "Utils/Icons";
import { get_test_questions, scheduleTest } from "../Actions/TeacherActions";
import { useCommonState } from "Components/CustomHooks";
import ButtonSpinner from "Components/Spinner/ButtonSpinner";
import Spinner from "Components/Spinner/CustomSpinner";
import { generateQuestionPaperPDF } from "ResuableFunctions/GeneratePDF";


const PreviewTest = () => {
  const { test_id } = useParams();
  const dispatch = useDispatch();
  const { teachersState } = useCommonState();
  const navigate = useNavigate();
  const { class_id, subject_id } = useParams();

  const [selectedSet, setSelectedSet] = useState(null);

  useEffect(() => {
    dispatch(get_test_questions({test_id: test_id || teachersState?.schedule_test_data?.data?.test_id}))
  }, [])


  const handleDownload = () => {
    if (!selectedSet) {
      alert("Please select a question set first!")
      return
    }
    const questions =
      teachersState?.test_questions?.question_with_answer?.[selectedSet] || []

    if (!questions.length) {
      alert("No questions with answers found!")
      return
    }

    generateQuestionPaperPDF(questions,`${selectedSet}_questions_with_answers.pdf`,true)
  }


  const handlePrint = () => {
    if (!selectedSet) {
      alert("Please select a question set first!");
      return;
    }
    const questions = teachersState?.test_questions?.questions_without_answer?.[selectedSet] || [];

    if (!questions.length) {
      alert("No questions found for print!")
      return;
    }

    generateQuestionPaperPDF(questions, `${selectedSet}_questions_without_answers.pdf`,false)
  };


  const handleDownloadAll = () => {
    const allSets = teachersState?.test_questions?.question_with_answer || {};
    const questions = Object.values(allSets).flat();

    if (!questions.length) {
      alert("No questions with answers found!");
      return;
    }

    generateQuestionPaperPDF(questions, "all_sets_with_answers.pdf", true);
  };

  return (
    <div className="p-1 p-md-5 h-100">
      {teachersState?.get_test_questions_loading ? (
        <div className="h-100 row align-items-center justify-content-center">
          <div className="col-6 text-center">
            <Spinner />
            <p>Getting Questions...</p>
          </div>
        </div>
      ) : (
          <React.Fragment>
            <div className="col" style={{ height: "80%" }}>
              <div className="h-100 overflowY">
                <div className="row">
                  {Object.entries(
                    teachersState?.schedule_test_data?.data?.test_questions || {}
                  ).map(([setName, questions], index) => (
                    <div className="col-3 p-2" key={index}>
                      <QuestionPaperCard
                        className={
                          selectedSet === setName
                            ? "selected-card"
                            : "bg-white"
                        }
                        title={`Question Paper ${setName}`}
                        questions={questions}
                        onClickCard={() => setSelectedSet(setName)}
                      />
                    </div>
                  ))}
                </div>

              </div>
            </div>

            <div className="col d-flex flex-wrap justify-content-evenly align-items-center" style={{ height: "20%" }}>
              <div className="col-12 col-md-6 col-lg-4 col-xl-3 p-1">
                <ButtonComponent
                  type="button"
                  className="w-100 btn-brand-outline py-2"
                  clickFunction={handleDownload}
                >
                  <span className="col-2 pe-4">{Icons.download_question_icon}</span>
                  Download Selected Set (Q & A)
                </ButtonComponent>
              </div>
                
              <div className="col-12 col-md-6 col-lg-4 col-xl-3 p-1">
                <ButtonComponent
                  type="button"
                  className="w-100 btn-brand-outline py-2"
                  clickFunction={handleDownloadAll}
                  buttonName="Download All Sets"
                />

              </div>
              <div className="col-12 col-md-6 col-lg-4 col-xl-3 p-1">
                <ButtonComponent
                  type="button"
                  className="w-100 btn-brand-color py-2"
                  buttonName="Print Selected Set"
                  clickFunction={handlePrint}
                />

              </div>
              <div className="col-12 col-md-6 col-lg-4 col-xl-3 p-1">
                <ButtonSpinner
                  type="button"
                  className="w-100 btn-brand-color py-2"
                  title={
                    teachersState?.schedule_test?.glow
                      ? "Scheduling Test "
                      : " Schedule Test in Online"
                  }
                  is_spinner={teachersState?.schedule_test?.glow}
                  clickFunction={() =>
                    dispatch(scheduleTest(test_id, navigate, class_id, subject_id))
                  }
                  buttonName="Schedule Test in Online"
                />
              </div>
              </div>
          </React.Fragment>
      )}
    </div>
  );
};

export default PreviewTest;
