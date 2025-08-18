import LinkComponent from "Components/Router_components/LinkComponent"
import NavLinkComp from "Components/Router_components/NavLink"
import { useEffect } from "react"
import { Card } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import Icons from "Utils/Icons"
import JsonData from "Views/Teachers/Utils/JsonData"

const TestPageLayout = () => {
    const { class_id, subject_id } = useParams();
    const { jsonOnly } = JsonData({ class_id, subject_id });
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch()
    }, [])

    return (
        <div className="h-100">
            <div className="container-fluid">
                <div className="w-100 border-bottom pb-3">
                    <LinkComponent to={`/teachers_dashboard/classrooms/${class_id}/${subject_id}`} className="brand-link-color">
                        <span>{Icons.back_button_icon_blue}</span>
                        <span className="align-middle">Back to classroom</span>
                    </LinkComponent>
                </div>
                <div className="sechdule_test_layout">
                    <div className="w-100 h-100 p-1">
                        <div className="row" style={{ height: "5%" }}>
                            {jsonOnly?.test_options.map((item, index) => (
                                <div className="col-4 col-md-3 col-lg-2 col-xxl-1">
                                    <NavLinkComp to={item.route} key={index} end={true} className="test_page_options">
                                        {item.name}
                                    </NavLinkComp>
                                </div>
                            ))}
                        </div>
                        <Card className="border-0 rounded-3 bg-transparent overflowY" style={{ height: "95%" }}>
                            <Outlet />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestPageLayout