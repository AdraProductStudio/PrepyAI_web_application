// import ButtonComponent from "Components/Button/Button";
// import QuestionPaperCard from "Components/Card/QuestionPaperCard";
// import { useEffect } from "react";
// import Icons from "Utils/Icons";

// const PreviewTest = () => {
    

//     return (
//         <div className="p-5 h-100">
//             <div className="col" style={{ height: "80%" }}>
//                 <div className="h-100 overflowY">
//                     <div className="row">
//                         {Array.from({ length: 4 }).map((_, index) => (
//                             <div className="col-3 p-2" key={index}>
//                                 <QuestionPaperCard
//                                     className="mb-3"
//                                     title="Sample Question Paper"
//                                     onClickCard={() => console.log("Question Paper Clicked")}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//             <div className="col d-flex justify-content-between align-items-center" style={{ height: "20%" }}>
//                 <div className="col-3">
//                     <ButtonComponent type="button" className="w-100 btn-brand-outline py-2" clickFunction={() => console.log("Test Created")} >
//                         <span className="col-2 pe-4">{Icons.download_question_icon}</span>
//                         Download Question & Answer
//                     </ButtonComponent>
//                 </div>
//                 <div className="col-4 row justify-content-end">
//                     <div className="col p-2">
//                         <ButtonComponent
//                             type="button"
//                             className="w-100 btn-brand-color py-2"
//                             onClick={() => console.log("Test Created")}
//                             buttonName="Print Test for Offline"
//                         />
//                     </div>
//                     <div className="col p-2">
//                         <ButtonComponent
//                             type="button"
//                             className="w-100 btn-brand-color py-2"
//                             onClick={() => console.log("Test Created")}
//                             buttonName="Schedule Test in Online"
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default PreviewTest;



import ButtonComponent from "Components/Button/Button";
import QuestionPaperCard from "Components/Card/QuestionPaperCard";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Icons from "Utils/Icons";

const PreviewTest = () => {
    const location = useLocation();
    const payload = location.state?.payload || {}; // payload passed from save schedule
    const [sets, setSets] = useState(0);

    useEffect(() => {
        if (payload?.set_questions) {
            setSets(payload.set_questions);
        }
    }, [payload]);

    return (
        <div className="p-5 h-100">
            <div className="col" style={{ height: "80%" }}>
                <div className="h-100 overflowY">
                    <div className="row">
                        {Array.from({ length: sets }).map((_, index) => (
                            <div className="col-3 p-2" key={index}>
                                <QuestionPaperCard
                                    className="mb-3"
                                    title={`Question Paper Set ${index + 1}`}
                                    onClickCard={() => console.log(`Question Paper Set ${index + 1} Clicked`)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="col d-flex justify-content-between align-items-center" style={{ height: "20%" }}>
                <div className="col-3">
                    <ButtonComponent
                        type="button"
                        className="w-100 btn-brand-outline py-2"
                        clickFunction={() => console.log("Download Questions & Answers")}
                    >
                        <span className="col-2 pe-4">{Icons.download_question_icon}</span>
                        Download Question & Answer
                    </ButtonComponent>
                </div>
                <div className="col-4 row justify-content-end">
                    <div className="col p-2">
                        <ButtonComponent
                            type="button"
                            className="w-100 btn-brand-color py-2"
                            onClick={() => console.log("Print Test")}
                            buttonName="Print Test for Offline"
                        />
                    </div>
                    <div className="col p-2">
                        <ButtonComponent
                            type="button"
                            className="w-100 btn-brand-color py-2"
                            onClick={() => console.log("Schedule Test")}
                            buttonName="Schedule Test in Online"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewTest;
