import LinkComponent from "Components/Router_components/LinkComponent"
import NavLinkComp from "Components/Router_components/NavLink"
import { Card } from "react-bootstrap"
import { Outlet, useParams } from "react-router-dom"
import Icons from "Utils/Icons"
import JsonData from "Views/Teachers/Utils/JsonData"

const ScheduleTestLayout = () => {
    const { class_id, subject_id } = useParams();
    const { jsonOnly } = JsonData({ class_id, subject_id });

    return (
        <div className="h-100">
            <div className="container-fluid">
                <div className="w-100 border-bottom pb-3">
                    <LinkComponent to={`/teachers_dashboard/classrooms/${class_id}/${subject_id}`} className="brand-link-color">
                        <span>{Icons.back_button_icon_blue}</span>
                        <span className="align-middle">12th - A Section</span>
                    </LinkComponent>
                </div>
                <div className="sechdule_test_layout">
                    <div className="col-2 h-100 p-1">
                        <Card className="h-100 border rounded-3">
                            <Card.Body>
                                {jsonOnly?.schedule_test_options?.map((option, index) => (
                                    <div className={`py-2 ${index === 0 ? "border-bottom" : ""}`} key={index}>
                                        <NavLinkComp to={option?.route} className={`schedule_option px-2`}>
                                            <span className="title">{option?.title}</span>
                                            <span className="description">{option?.description}</span>
                                        </NavLinkComp>
                                    </div>
                                ))}
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-10 h-100 p-1">
                        <Card className="h-100 border rounded-3">
                            <Outlet />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScheduleTestLayout