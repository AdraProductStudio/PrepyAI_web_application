import ButtonComponent from "Components/Button/Button";
import { useCustomNavigate } from "Components/CustomHooks";
import { Card } from "react-bootstrap";
import Icons from "Utils/Icons";
import JsonData from "Views/Teachers/Utils/JsonData";

const StudentsTableCard = ({
    className, navigate_to
}) => {
    const { jsonOnly } = JsonData();
    const navigate = useCustomNavigate();
    const data = [
        { student_name: "John Doe", contact_no: "123-456-7890", email: "john@example.com", status: "Developing", number_of_attempt: 3, reg_no: "REG001", action: "View" },
        { student_name: "John Doe", contact_no: "123-456-7890", email: "john@example.com", status: "Developing", number_of_attempt: 3, reg_no: "REG001", action: "View" },
        { student_name: "John Doe", contact_no: "123-456-7890", email: "john@example.com", status: "Developing", number_of_attempt: 3, reg_no: "REG001", action: "View" },
        { student_name: "John Doe", contact_no: "123-456-7890", email: "john@example.com", status: "Developing", number_of_attempt: 3, reg_no: "REG001", action: "View" },
    ]

    return (
        <Card className={`border-0 rounded-4 shadow-sm ${className}`}>
            <Card.Header className="bg-transparent pt-3 border-0">
                <h5>Students</h5>
                <p className="text-secondary fs-14 mb-1">112 students</p>
            </Card.Header>
            <Card.Body className="p-0">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                {jsonOnly?.student_table_headers?.map((header, index) => (
                                    <th key={index} className="text-center border student_table_heading">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="staff_table_data">
                            {data.map((student, index) => (
                                <tr key={index}>
                                    <td className="border-end">{index + 1}</td>
                                    <td className="border-end">{student.student_name}</td>
                                    <td className="border-end">{student.contact_no}</td>
                                    <td className="border-end">{student.email}</td>
                                    <td className="border-end">{student.status}</td>
                                    <td className="border-end">{student.number_of_attempt}</td>
                                    <td className="border-end">{student.reg_no}</td>
                                    <td className="text-center">
                                        <ButtonComponent type="button" className="btn-transparent" buttonName={Icons?.edit_icon} />
                                        <ButtonComponent type="button" className="btn-transparent" buttonName={Icons?.delete_icons} />
                                        <ButtonComponent type="button" className="btn-transparent" buttonName={Icons?.extend_icon} clickFunction={() => navigate(navigate_to)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card.Body>
        </Card>
    )
}

export default StudentsTableCard;