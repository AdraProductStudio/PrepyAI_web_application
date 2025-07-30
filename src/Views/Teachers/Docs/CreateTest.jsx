import ButtonComponent from "Components/Button/Button";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions"
import JsonData from "Views/Teachers/Utils/JsonData";

const CreateTest = () => {
    const { jsxJson } = JsonData();

    return (
        <div className="p-5 h-100">
            <div className="col" style={{ height: "80%" }}>
                <div className="h-100 overflowY">
                    <div className="row">
                        {Inputfunctions(jsxJson?.create_test || [])}
                    </div>
                </div>
            </div>
            <div className="col d-flex justify-content-end align-items-center" style={{ height: "20%" }}>
                <ButtonComponent
                    type="button"
                    className="btn-brand-color px-5"
                    onClick={() => console.log("Test Created")}
                    buttonName="Next"
                />
            </div>
        </div>
    )
}

export default CreateTest