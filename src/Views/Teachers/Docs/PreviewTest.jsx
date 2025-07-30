import ButtonComponent from "Components/Button/Button";
import QuestionPaperCard from "Components/Card/QuestionPaperCard";
import Icons from "Utils/Icons";

const PreviewTest = () => {

    return (
        <div className="p-5 h-100">
            <div className="col" style={{ height: "80%" }}>
                <div className="h-100 overflowY">
                    <div className="row">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div className="col-3 p-2" key={index}>
                                <QuestionPaperCard
                                    className="mb-3"
                                    title="Sample Question Paper"
                                    onClickCard={() => console.log("Question Paper Clicked")}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="col d-flex justify-content-between align-items-center" style={{ height: "20%" }}>
                <div className="col-3">
                    <ButtonComponent type="button" className="w-100 btn-brand-outline py-2" onClick={() => console.log("Test Created")} >
                        <span className="col-2 pe-4">{Icons.download_question_icon}</span>
                       Download Question & Answer
                    </ButtonComponent>
                </div>
                <div className="col-4 row justify-content-end">
                    <div className="col p-2">
                        <ButtonComponent
                            type="button"
                            className="w-100 btn-brand-color py-2"
                            onClick={() => console.log("Test Created")}
                            buttonName="Print Test for Offline"
                        />
                    </div>
                    <div className="col p-2">
                        <ButtonComponent
                            type="button"
                            className="w-100 btn-brand-color py-2"
                            onClick={() => console.log("Test Created")}
                            buttonName="Schedule Test in Online"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreviewTest;